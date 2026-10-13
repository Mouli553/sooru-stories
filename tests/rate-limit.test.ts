import { describe, it, expect } from "vitest";
import { checkRateLimit } from "../lib/rate-limit";

describe("Rate Limiting", () => {
  it("permits requests within configured window threshold", () => {
    const key = `test_ip_${Date.now()}`;
    expect(checkRateLimit(key, 3, 1000)).toBe(true);
    expect(checkRateLimit(key, 3, 1000)).toBe(true);
    expect(checkRateLimit(key, 3, 1000)).toBe(true);
  });

  it("blocks requests exceeding maximum allowance", () => {
    const key = `test_blocked_${Date.now()}`;
    checkRateLimit(key, 2, 1000);
    checkRateLimit(key, 2, 1000);
    // 3rd request must be blocked
    expect(checkRateLimit(key, 2, 1000)).toBe(false);
  });
});
