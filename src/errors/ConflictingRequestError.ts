class ConflictingRequestError extends Error {
  private status: number;

  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
    this.status = 409;
  }
}

export default ConflictingRequestError;
