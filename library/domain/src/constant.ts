const USERNAME_MIN_LENGTH = 3
const USERNAME_MAX_LENGTH = 14

export const usernamePattern = new RegExp(`^[A-Z\d]{${USERNAME_MIN_LENGTH},${USERNAME_MAX_LENGTH}}$`)
