export const getHello = () => {
  return "Hello";
};

export const getFallbackName = (fullName: string) : string => {
  return fullName
  .split(" ") // Split the name into words
  .filter(word => word.length > 0) // Remove empty strings (in case of extra spaces)
  .map(word => word[0].toUpperCase()) // Get the first letter and uppercase it
  .slice(-2) // Take the last two initials
  .join(""); // Join them together
}