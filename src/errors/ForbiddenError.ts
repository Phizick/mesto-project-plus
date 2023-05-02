class ForbiddenError extends Error {
  private status: number;

  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
    this.status = 403;
  }
}

export default ForbiddenError;
