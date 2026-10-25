
export function todayISO(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isAcceptingSignups(session: { registrationCloses?: string }, today: string): boolean {
  return !session.registrationCloses || today <= session.registrationCloses;
}

export type SignupField = "name" | "grade" | "email" | "guardian" | "guardian_email";

export interface SignupValues {
  name: string;
  grade: string;
  email: string;
  guardian: string;
  guardian_email: string;
}

export type SignupErrors = Partial<Record<SignupField, string>>;

export const FIELD_ORDER: SignupField[] = ["name", "grade", "email", "guardian", "guardian_email"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function validateSignup(values: SignupValues, allowedGrades: number[]): SignupErrors {
  const errors: SignupErrors = {};
  const name = values.name.trim();
  const guardian = values.guardian.trim();
  const email = values.email.trim();
  const guardianEmail = values.guardian_email.trim();
  const grade = Number.parseInt(values.grade, 10);

  if (name.length < 2) errors.name = "Enter the student's full name.";

  if (!values.grade) errors.grade = "Choose the student's grade.";
  else if (!allowedGrades.includes(grade)) errors.grade = "Choose one of the listed grades.";

  if (!email) errors.email = "Enter the student's email address.";
  else if (!isEmail(email)) errors.email = "Enter an email address like name@example.com.";

  if (!guardian) errors.guardian = "Enter a parent or guardian's full name.";

  if (!guardianEmail) errors.guardian_email = "Enter a parent or guardian's email address.";
  else if (!isEmail(guardianEmail))
    errors.guardian_email = "Enter an email address like name@example.com.";

  return errors;
}

export interface SignupPayload {
  name: string;
  email: string;
  guardian: string;
  guardian_email: string;
  grade: number;
}

export function toPayload(values: SignupValues): SignupPayload {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    guardian: values.guardian.trim(),
    guardian_email: values.guardian_email.trim(),
    grade: Number.parseInt(values.grade, 10),
  };
}

export function ordinal(n: number): string {
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
}

export function gradeRange(grades: number[]): string {
  const sorted = [...grades].sort((a, b) => a - b);
  if (sorted.length === 0) return "";
  if (sorted.length === 1) return `Grade ${sorted[0]}`;
  const contiguous = sorted.every((g, i) => i === 0 || g === sorted[i - 1] + 1);
  if (contiguous) return `Grades ${sorted[0]}–${sorted[sorted.length - 1]}`;
  return `Grades ${sorted.slice(0, -1).join(", ")} and ${sorted[sorted.length - 1]}`;
}
