class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = status;
  }
}

module.exports = { AppError };
