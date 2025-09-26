/**
 * Common regex patterns for validation
 */

// Romanian mobile phone numbers (without country code)
// Format: 7xxxxxxxx (where x is 0-9)
export const PHONE_REGEX = /^7\d{8}$/;

// Romanian mobile phone numbers (with full international format)
// Format: +407xxxxxxxx or 407xxxxxxxx
export const FULL_PHONE_REGEX = /^(\+40|40)?7\d{8}$/;

// Email validation
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

// Romanian CNP (Cod Numeric Personal) - 13 digits
export const CNP_REGEX = /^[12]\d{12}$/;

// Romanian IBAN format
export const IBAN_REGEX = /^RO[0-9]{2}[A-Z0-9]{4}[0-9]{14}$/;

// URL validation
export const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

// Postal code (Romanian format - 6 digits)
export const POSTAL_CODE_REGEX = /^\d{6}$/;

/**
 * Utility functions for validation
 */

export const validatePhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone);
};

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string): boolean => {
  return PASSWORD_REGEX.test(password);
};

export const validateCNP = (cnp: string): boolean => {
  return CNP_REGEX.test(cnp);
};

export const validateIBAN = (iban: string): boolean => {
  return IBAN_REGEX.test(iban);
};

export const validateURL = (url: string): boolean => {
  return URL_REGEX.test(url);
};

export const validatePostalCode = (postalCode: string): boolean => {
  return POSTAL_CODE_REGEX.test(postalCode);
};
