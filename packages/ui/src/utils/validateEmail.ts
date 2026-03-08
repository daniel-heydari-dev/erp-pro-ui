const validateEmail = (email: string) => {
  // Regular expression for email validation
  const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email.match(regex);
};

export default validateEmail;
