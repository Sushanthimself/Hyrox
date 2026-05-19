export type FieldErrors<T extends string> = Partial<Record<T, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | undefined {
  const value = email.trim();

  if (!value) {
    return 'Email is required.';
  }

  if (!EMAIL_PATTERN.test(value)) {
    return 'Enter a valid email address.';
  }

  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) {
    return 'Password is required.';
  }

  if (password.length < 8) {
    return 'Use at least 8 characters.';
  }

  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Include upper, lower, and a number.';
  }

  return undefined;
}

export function validatePasswordConfirmation(
  password: string,
  confirmation: string
): string | undefined {
  if (!confirmation) {
    return 'Confirm your password.';
  }

  if (password !== confirmation) {
    return 'Passwords do not match.';
  }

  return undefined;
}

export function validateDisplayName(displayName: string): string | undefined {
  const value = displayName.trim();

  if (!value) {
    return 'Athlete name is required.';
  }

  if (value.length < 2) {
    return 'Use at least 2 characters.';
  }

  return undefined;
}
