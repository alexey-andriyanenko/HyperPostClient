export const formatDate = (date: Date): string => {
  try {
    return new Intl.DateTimeFormat("en-GB").format(date);
  } catch (e) {
    console.error(e);
    return "Invalid Date";
  }
};
