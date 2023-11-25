import { isApiError } from "./is-api-error.util";

describe("isApiError", () => {
  it("should return true if the object has type, message, and errors properties", () => {
    const obj = {
      type: "test",
      message: null,
      errors: null,
    };
    expect(isApiError(obj)).toBe(true);
  });
});
