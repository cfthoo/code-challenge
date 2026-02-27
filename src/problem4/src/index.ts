/**
 * Calculates the sum to n using an iterative loop (Brute Force).
 * * This approach manually counts every integer from 1 to n.
 * - Complexity: O(n) Time | O(1) Space
 * - Efficiency: Linear growth; execution time increases as n gets larger.
 * * @param n - The integer to sum up to
 * @returns The total sum from 1 to n
 */
function sum_to_n_a(n: number): number {
  let sum = 0;

  for (let i = 0; i <= n; i++) {
    sum += i; // Add the current number to the total
  }

  return sum;
}

/**
 * Calculates the sum to n using recursive (Self-calling) approach.
 * * This approach breaks the problem into smaller sub-problems.
 * - Complexity: O(n) Time | O(n) Space
 * - Efficiency: Linear growth; execution time increases as n gets larger.
 * * @param n - The integer to sum up to
 * @returns The total sum from 1 to n
 */

function sum_to_n_b(n: number): number {
  if (n <= 1) return n; // Stop when it gets to 1
  return n + sum_to_n_b(n - 1); // Sum n + everything below it
}

/**
 * Calculates the sum to n using the arithmetic series formula.
 * * This approach directly calculates the sum without iteration or recursion.
 * - Complexity: O(1) Time | O(1) Space
 * - Efficiency: Constant time; execution time remains the same regardless of n.
 * * @param n - The integer to sum up to
 * @returns The total sum from 1 to n
 */
function sum_to_n_c(n: number): number {
  return (n * (n + 1)) / 2;
}

export { sum_to_n_a, sum_to_n_b, sum_to_n_c };
