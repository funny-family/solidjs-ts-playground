/**
 * @see https://bobbyhadz.com/blog/javascript-check-if-number-between-two-numbers
 */
export const isNumberInRange = (number: number, min: number, max: number) => {
  if (number >= min && number <= max) {
    return true;
  }

  return false;
};
