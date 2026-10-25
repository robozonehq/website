import { test } from "node:test";
import assert from "node:assert/strict";
import {
  formatDate,
  gradeRange,
  isAcceptingSignups,
  ordinal,
  toPayload,
  validateSignup,
  type SignupValues,
} from "../src/lib/registration.ts";

const valid: SignupValues = {
  name: "Ada Lovelace",
  grade: "6",
  email: "ada@example.com",
  guardian: "Anne Byron",
  guardian_email: "anne@example.com",
};

test("sign-ups are accepted through the closing date, not after", () => {
  assert.equal(isAcceptingSignups({ registrationCloses: "2027-07-01" }, "2027-07-01"), true);
  assert.equal(isAcceptingSignups({ registrationCloses: "2027-07-01" }, "2027-07-02"), false);
  assert.equal(isAcceptingSignups({}, "2027-07-02"), true);
});

test("a complete, valid form has no errors", () => {
  assert.deepEqual(validateSignup(valid, [5, 6, 7, 8]), {});
});

test("an empty form flags every field", () => {
  const errors = validateSignup(
    { name: "", grade: "", email: "", guardian: "", guardian_email: "" },
    [5, 6, 7, 8],
  );
  assert.deepEqual(Object.keys(errors).sort(), ["email", "grade", "guardian", "guardian_email", "name"]);
});

test("whitespace-only answers count as empty", () => {
  const errors = validateSignup({ ...valid, name: "   ", guardian: "  " }, [5, 6, 7, 8]);
  assert.ok(errors.name);
  assert.ok(errors.guardian);
});

test("malformed emails are rejected with a helpful message", () => {
  for (const bad of ["ada", "ada@", "@example.com", "ada@example", "ada @example.com"]) {
    const errors = validateSignup({ ...valid, email: bad, guardian_email: bad }, [5, 6, 7, 8]);
    assert.match(errors.email ?? "", /name@example\.com/, `student email: ${bad}`);
    assert.match(errors.guardian_email ?? "", /name@example\.com/, `guardian email: ${bad}`);
  }
});

test("grades outside the session's range are rejected", () => {
  assert.ok(validateSignup({ ...valid, grade: "9" }, [5, 6, 7, 8]).grade);
  assert.ok(validateSignup({ ...valid, grade: "abc" }, [5, 6, 7, 8]).grade);
  assert.equal(validateSignup({ ...valid, grade: "9" }, [6, 7, 8, 9]).grade, undefined);
});

test("payload keeps the existing `signups` field names and types", () => {
  const payload = toPayload({ ...valid, name: "  Ada Lovelace ", grade: "7" });
  assert.deepEqual(Object.keys(payload).sort(), ["email", "grade", "guardian", "guardian_email", "name"]);
  assert.equal(payload.name, "Ada Lovelace");
  assert.equal(payload.grade, 7);
  assert.equal(typeof payload.grade, "number");
});

test("formatting helpers", () => {
  assert.equal(formatDate("2027-08-06"), "August 6, 2027");
  assert.equal(gradeRange([8, 5, 6, 7]), "Grades 5–8");
  assert.equal(gradeRange([6]), "Grade 6");
  assert.equal(gradeRange([5, 7]), "Grades 5 and 7");
  assert.deepEqual([1, 2, 3, 4, 5, 11, 12, 13, 21].map(ordinal), [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "11th",
    "12th",
    "13th",
    "21st",
  ]);
});
