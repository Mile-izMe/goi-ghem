import assert from "node:assert/strict";
import test from "node:test";
import { getAuthRedirect } from "../features/auth/lib/redirects.ts";
import {
  validateLogin,
  validateRegister,
} from "../features/auth/lib/validation.ts";
import { getAuthErrorMessage } from "../features/auth/lib/errors.ts";

test("redirect accepts workspace routes and rejects external or malformed destinations", () => {
  for (const path of [
    "/app",
    "/app/plans",
    "/app/plans/trip-123",
    "/app/items",
    "/app/templates",
  ]) {
    assert.equal(getAuthRedirect(path), path);
  }
  for (const path of [
    null,
    "",
    "https://example.com",
    "//example.com",
    "/\\example.com",
    "/app/../admin",
    "/app/%2f%2fevil",
    "/app/plans?next=//evil",
    "/app/items\n",
    "/app/not-found",
  ]) {
    assert.equal(getAuthRedirect(path), "/app/plans");
  }
});

const registration = {
  fullName: "An",
  email: "an@example.com",
  password: "Long password!",
  confirmPassword: "Long password!",
};

test("login accepts existing passwords without imposing the signup length policy", () => {
  assert.equal(
    validateLogin({ email: " an@example.com ", password: "short" }),
    null,
  );
  assert.ok(validateLogin({ email: "invalid", password: "test" }));
  assert.ok(validateLogin({ email: "an@example.com", password: "" }));
});

test("registration validates full name, email, password and confirmation", () => {
  assert.equal(validateRegister(registration), null);
  assert.ok(validateRegister({ ...registration, fullName: "   " }));
  assert.ok(validateRegister({ ...registration, fullName: "a".repeat(61) }));
  assert.ok(validateRegister({ ...registration, email: "invalid" }));
  assert.ok(
    validateRegister({
      ...registration,
      password: "short",
      confirmPassword: "short",
    }),
  );
  assert.ok(
    validateRegister({
      ...registration,
      password: "a".repeat(129),
      confirmPassword: "a".repeat(129),
    }),
  );
  assert.ok(
    validateRegister({
      ...registration,
      confirmPassword: "different password",
    }),
  );
});

test("password whitespace is significant and must not be trimmed", () => {
  assert.ok(
    validateRegister({
      ...registration,
      password: "abcdefgh ",
      confirmPassword: "abcdefgh",
    }),
  );
  assert.equal(
    validateRegister({
      ...registration,
      password: "abcdefgh ",
      confirmPassword: "abcdefgh ",
    }),
    null,
  );
});

test("provider errors become safe messages without echoing raw error details", () => {
  assert.match(
    getAuthErrorMessage({ code: "invalid_credentials" }),
    /Email hoặc mật khẩu/,
  );
  assert.match(
    getAuthErrorMessage({ code: "email_not_confirmed" }),
    /xác nhận email/,
  );
  assert.match(
    getAuthErrorMessage({ code: "over_email_send_rate_limit" }),
    /chờ/,
  );
  for (const error of [
    null,
    new Error("private provider details"),
    { code: "unknown", message: "private provider details" },
  ]) {
    assert.doesNotMatch(getAuthErrorMessage(error), /private provider details/);
  }
});
