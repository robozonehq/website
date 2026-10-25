import { test } from "node:test";
import assert from "node:assert/strict";
import {
  allAvailability,
  availabilityFor,
  canRegister,
  enrollFaq,
  hasFee,
  headerCta,
  isFree,
  sessionState,
} from "../src/lib/programs.ts";
import type { Offering, OfferingId, Session } from "../src/data/site.ts";

const offerings: Record<OfferingId, Offering> = {
  "in-person": {
    id: "in-person",
    name: "In-person workshops",
    maturity: "established",
    summary: "",
    noSessionText: "Next session not scheduled",
    href: "/program#in-person",
    inquiry: { label: "Ask", subject: "Ask" },
  },
  online: {
    id: "online",
    name: "Online classes",
    maturity: "exploring",
    summary: "",
    noSessionText: "No classes scheduled",
    href: "/program#online",
    inquiry: { label: "Ask", subject: "Ask" },
  },
  branches: {
    id: "branches",
    name: "Local branches",
    maturity: "exploring",
    summary: "",
    noSessionText: "No other branches yet",
    href: "/program#branches",
    inquiry: { label: "Ask", subject: "Ask" },
  },
};

const complete: Session = {
  offering: "in-person",
  name: "Summer 2027 workshops",
  state: "open",
  dates: "July 12 – August 6, 2027",
  schedule: "Mondays and Fridays, 4–6 PM",
  location: "Somewhere, NJ",
  grades: [4, 5, 6, 7, 8],
  fee: "$175",
  registrationCloses: "2027-07-01",
  registration: { kind: "signup-form" },
};
const today = "2027-06-01";

test("no sessions: the established course reads 'not scheduled', the ideas stay 'being explored'", () => {
  const a = allAvailability(offerings, [], today);
  assert.equal(a.inPerson.state, "unannounced");
  assert.equal(a.inPerson.statusText, "Next session not scheduled");
  assert.equal(a.inPerson.offering.maturity, "established");
  assert.equal(a.online.offering.maturity, "exploring");
  assert.equal(a.online.registrable, null);
});

test("a complete, open session can show a registration action", () => {
  assert.equal(canRegister(complete, today), true);
  assert.equal(availabilityFor(offerings["in-person"], [complete], today).registrable?.name, complete.name);
});

test("a registration action needs every essential fact and a real destination", () => {
  const required = ["dates", "schedule", "location", "grades", "fee", "registrationCloses", "registration"] as const;
  for (const key of required) {
    const missing = { ...complete, [key]: undefined };
    assert.equal(canRegister(missing, today), false, `missing ${key}`);
  }
  assert.equal(canRegister({ ...complete, grades: [] }, today), false, "empty grades");
  assert.equal(canRegister({ ...complete, registration: { kind: "link", url: "TBD" } }, today), false, "fake link");
  assert.equal(canRegister({ ...complete, registration: { kind: "link", url: "https://example.org/r" } }, today), true);
});

test("online sessions need a timezone and their own registration link", () => {
  const online: Session = {
    ...complete,
    offering: "online",
    location: undefined,
    fee: "Free",
    afterRegistering: "Submitting the form requests a place; we'll email to confirm.",
    registration: { kind: "link", url: "https://example.org/register" },
  };
  assert.equal(canRegister(online, today), false, "no timezone");
  assert.equal(canRegister({ ...online, timezone: "Eastern Time (ET)" }, today), true);
  assert.equal(
    canRegister({ ...online, timezone: "Eastern Time (ET)", registration: { kind: "signup-form" } }, today),
    false,
    "the PocketBase form is in-person only",
  );
});

test("a forgotten open session closes itself after its closing date", () => {
  assert.equal(sessionState(complete, "2027-07-02"), "closed");
  assert.equal(canRegister(complete, "2027-07-02"), false);
});

test("sessions only affect their own offering", () => {
  const a = allAvailability(offerings, [complete], today);
  assert.ok(a.inPerson.registrable);
  assert.equal(a.online.registrable, null);
  assert.equal(a.online.state, "unannounced");
});

test("open beats upcoming beats completed when several sessions exist", () => {
  const upcoming: Session = { offering: "in-person", name: "Fall", state: "upcoming" };
  const done: Session = { offering: "in-person", name: "Spring", state: "completed" };
  assert.equal(availabilityFor(offerings["in-person"], [done, upcoming, complete], today).session?.name, complete.name);
  assert.equal(availabilityFor(offerings["in-person"], [done, upcoming], today).state, "upcoming");
  assert.equal(availabilityFor(offerings["in-person"], [done], today).state, "unannounced");
});

test("the header says 'Program updates' unless a session is actually open", () => {
  const none = allAvailability(offerings, [], today);
  assert.deepEqual(headerCta(none.inPerson, none.online), { label: "Program updates", href: "/signup" });
  const open = allAvailability(offerings, [complete], today);
  assert.equal(headerCta(open.inPerson, open.online).label, "Workshop sign-up");
  const incomplete = allAvailability(offerings, [{ ...complete, fee: undefined }], today);
  assert.equal(headerCta(incomplete.inPerson, incomplete.online).label, "Program updates");
});

test("'Can I enroll now?' follows the data", () => {
  const none = allAvailability(offerings, [], today);
  assert.match(enrollFaq(none.inPerson, none.online).a, /^Not at the moment/);
  assert.match(enrollFaq(none.inPerson, none.online).a, /Free online workshops are being planned/);
  const open = allAvailability(offerings, [complete], today);
  assert.match(enrollFaq(open.inPerson, open.online).a, /^Yes, for in-person workshops/);
});

test("a zero fee is a valid fee; a missing or blank fee is not", () => {
  for (const fee of ["Free", "free", "$0", "0", "$0.00"]) {
    assert.equal(hasFee(fee), true, fee);
    assert.equal(isFree(fee), true, fee);
    assert.equal(canRegister({ ...complete, fee }, today), true, `in-person with ${fee}`);
  }
  for (const fee of [undefined, "", "   "]) {
    assert.equal(hasFee(fee), false, String(fee));
    assert.equal(canRegister({ ...complete, fee }, today), false, `missing fee ${JSON.stringify(fee)}`);
  }
  assert.equal(isFree("$175"), false);
});

test("online workshops must be free and must say what submitting the form means", () => {
  const online: Session = {
    ...complete,
    offering: "online",
    location: undefined,
    timezone: "America/New_York (Eastern Time)",
    fee: "Free",
    afterRegistering: "Submitting the form requests a place; we'll email to confirm.",
    registration: { kind: "link", url: "https://example.org/register" },
  };
  assert.equal(canRegister(online, today), true);
  assert.equal(canRegister({ ...online, fee: "$25" }, today), false, "online can't be paid");
  assert.equal(canRegister({ ...online, fee: undefined }, today), false, "fee must still be stated");
  assert.equal(canRegister({ ...online, afterRegistering: undefined }, today), false, "must explain the form");
});
