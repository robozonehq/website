
import type { FaqItem, Offering, OfferingId, Session, SessionState } from "../data/site.ts";
import { isAcceptingSignups } from "./registration.ts";

export type AvailabilityState = SessionState | "unannounced";

export type RegistrableSession = Session &
  Required<Pick<Session, "dates" | "schedule" | "grades" | "fee" | "registrationCloses" | "registration">>;

export function hasFee(fee: string | undefined): fee is string {
  return typeof fee === "string" && fee.trim() !== "";
}

export function isFree(fee: string | undefined): boolean {
  return hasFee(fee) && /^(free|\$?0+(\.0+)?)$/i.test(fee.trim());
}

export function sessionState(session: Session, today: string): SessionState {
  const live = session.state === "open" || session.state === "upcoming" || session.state === "full";
  if (live && !isAcceptingSignups(session, today)) return "closed";
  return session.state;
}

export function canRegister(session: Session, today: string): session is RegistrableSession {
  if (sessionState(session, today) !== "open") return false;
  const hasPlace = session.offering === "online" ? Boolean(session.timezone) : Boolean(session.location);
  if (session.registration?.kind === "signup-form" && session.offering !== "in-person") return false;
  if (session.offering === "online" && (!isFree(session.fee) || !session.afterRegistering?.trim())) return false;
  return Boolean(
    session.dates &&
      session.schedule &&
      hasPlace &&
      session.grades?.length &&
      hasFee(session.fee) &&
      session.registrationCloses &&
      session.registration &&
      (session.registration.kind !== "link" || /^https?:\/\//.test(session.registration.url)),
  );
}

export interface Availability {
  offering: Offering;
  state: AvailabilityState;
  session: Session | null;
  registrable: RegistrableSession | null;
  statusText: string;
}

const PRIORITY: SessionState[] = ["open", "upcoming", "full", "closed", "completed"];

export function availabilityFor(offering: Offering, sessions: Session[], today: string): Availability {
  const own = sessions.filter((s) => s.offering === offering.id);
  const ranked = own
    .map((s) => ({ s, state: sessionState(s, today) }))
    .sort((a, b) => PRIORITY.indexOf(a.state) - PRIORITY.indexOf(b.state));
  const top = ranked[0];
  if (!top || top.state === "completed") {
    return { offering, state: "unannounced", session: null, registrable: null, statusText: offering.noSessionText };
  }
  const { s, state } = top;
  const statusText: Record<SessionState, string> = {
    open: `Registration open: ${s.name}`,
    upcoming: `Announced: ${s.name}${s.dates ? `, ${s.dates}` : ""}`,
    full: `${s.name} is full`,
    closed: `Registration closed: ${s.name}`,
    completed: offering.noSessionText,
  };
  return {
    offering,
    state,
    session: s,
    registrable: canRegister(s, today) ? s : null,
    statusText: statusText[state],
  };
}

export function allAvailability(offerings: Record<OfferingId, Offering>, sessions: Session[], today: string) {
  return {
    inPerson: availabilityFor(offerings["in-person"], sessions, today),
    online: availabilityFor(offerings.online, sessions, today),
    branches: availabilityFor(offerings.branches, sessions, today),
  };
}

export interface Cta {
  label: string;
  href: string;
}

export function headerCta(inPerson: Availability, online: Availability): Cta {
  if (inPerson.registrable) return { label: "Workshop sign-up", href: "/signup#in-person" };
  if (online.registrable) return { label: "Online class sign-up", href: "/signup#online" };
  return { label: "Program updates", href: "/signup" };
}

export function enrollFaq(inPerson: Availability, online: Availability): FaqItem {
  const parts: string[] = [];
  if (inPerson.registrable) {
    parts.push(
      `Yes, for in-person workshops: ${inPerson.registrable.name} is open for registration until the closing date on the Program updates page.`,
    );
  } else if (inPerson.state === "upcoming") {
    parts.push(`Not yet. ${inPerson.statusText}; registration hasn't opened.`);
  } else {
    parts.push("Not at the moment. The next in-person session in South Brunswick hasn't been scheduled.");
  }
  parts.push(
    online.registrable
      ? `Online classes are open for registration: ${online.registrable.name}.`
      : {
          exploring: "Free online workshops are being planned, but dates and registration haven't been announced.",
          "in-development": "Online classes are in development and aren't open for enrollment yet.",
          established: "No online classes are open for enrollment right now.",
          retired: "Online classes are no longer offered.",
        }[online.offering.maturity],
  );
  parts.push("The Program updates page always shows where each one stands.");
  return { q: "Can I enroll now?", a: parts.join(" ") };
}
