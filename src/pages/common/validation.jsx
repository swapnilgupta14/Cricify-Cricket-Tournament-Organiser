export const isRequired = (value) => {
  return value.trim() !== "";
};

export const isNumber = (value) => {
  return !isNaN(value) && value > 0;
};

export const isValidCountry = (value) => {
  const validCountries = [
    "India",
    "Australia",
    "England",
    "South Africa",
    "Pakistan",
    "New Zealand",
  ];
  return validCountries.includes(value);
};

export const isValidOvers = (value) => {
  const validOvers = ["10", "20", "50", "Test Match (Unlimited)"];
  return validOvers.includes(value);
};
