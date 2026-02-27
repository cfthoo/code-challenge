import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./index";

// Test suite for the iterative solution
describe("sum_to_n_a (Iterative)", () => {
  test("should return the correct sum for a positive integer", () => {
    // For n=10, the sum is 1+2+3+4+5+6+7+8+9+10 = 55
    expect(sum_to_n_a(10)).toBe(55);
  });

  test("should return 0 for n = 0", () => {
    expect(sum_to_n_a(0)).toBe(0);
  });

  test("should return 1 for n = 1", () => {
    expect(sum_to_n_a(1)).toBe(1);
  });
});

// Test suite for the recursive solution
describe("sum_to_n_b (Recursive)", () => {
  test("should return the correct sum for a positive integer", () => {
    expect(sum_to_n_b(10)).toBe(55);
  });

  test("should return 0 for n = 0", () => {
    expect(sum_to_n_b(0)).toBe(0);
  });

  test("should return 1 for n = 1", () => {
    expect(sum_to_n_b(1)).toBe(1);
  });
});

// Test suite for the formulaic solution
describe("sum_to_n_c (Formula)", () => {
  test("should return the correct sum for a positive integer", () => {
    expect(sum_to_n_c(10)).toBe(55);
  });

  test("should return 0 for n = 0", () => {
    expect(sum_to_n_c(0)).toBe(0);
  });

  test("should return 1 for n = 1", () => {
    expect(sum_to_n_c(1)).toBe(1);
  });
});
