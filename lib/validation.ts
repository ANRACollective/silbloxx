/** Client-side checks shared by the application and enquiry forms. */

export const MAX_CV_BYTES = 5 * 1024 * 1024;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isFilled(value: string): boolean {
  return value.trim().length > 0;
}

/** A CV must be a PDF no larger than `MAX_CV_BYTES`. */
export function isValidCv(file: File): boolean {
  return file.type === "application/pdf" && file.size <= MAX_CV_BYTES;
}
