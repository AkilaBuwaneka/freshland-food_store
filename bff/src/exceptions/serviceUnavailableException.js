class ServiceUnavailableException extends Error {
  constructor(message) {
    super(message);
    this.name = "ServiceUnavailableException";
    this.statusCode = 503;
  }
}

module.exports = ServiceUnavailableException;
