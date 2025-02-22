class AppError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
    this.name = this.constructor.name
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400)
  }
}

class AuthenticationError extends AppError {
  constructor(message) {
    super(message, 401)
  }
}

module.exports = {
  AppError,
  ValidationError,
  AuthenticationError
} 