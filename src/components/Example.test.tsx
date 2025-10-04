import { describe, it, expect } from "vitest";

describe("Example", () => {
  it("should return true", () => {
    expect(true).toBe(true);
  });

  it("should perform basic arithmetic", () => {
    expect(2 + 2).toBe(4);
  });

  it("should handle string operations", () => {
    expect("hello" + " " + "world").toBe("hello world");
  });
});
