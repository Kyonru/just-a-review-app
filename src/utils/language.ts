export const compareLanguageOptions = (
  value1: any,
  value2: string,
): boolean => {
  return `${value1.languageCode}`.trim() === `${value2}`.trim();
};
