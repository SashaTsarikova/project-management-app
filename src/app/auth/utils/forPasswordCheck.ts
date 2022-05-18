function isMoreThen8(password: string) {
  return password.length >= 8;
}
function isLowerCaseIncluded(password: string) {
  return /[a-z]/.test(password);
}
function isUpperCaseIncluded(password: string) {
  return /[A-Z]/.test(password);
}
function hasNumbers(password: string) {
  return !!password.match(/\d/g);
}
function hasSpecialChar(password: string) {
  return /[.*+?^${}()|&@#[\]\\]/g.test(password);
}

export {
  isMoreThen8,
  isLowerCaseIncluded,
  isUpperCaseIncluded,
  hasNumbers,
  hasSpecialChar,
};
