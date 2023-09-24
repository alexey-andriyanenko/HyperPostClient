import { formatDate } from "./format-date";

describe("formatDate", () => {
  it("should return a date in the format dd/mm/yyyy", () => {
    const date = new Date("2021-01-01");
    expect(formatDate(date)).toEqual("01/01/2021");
  });

  it('should return "Invalid Date" if the date is invalid', () => {
    const date = new Date("invalid date");
    expect(formatDate(date)).toEqual("Invalid Date");
  });
});
