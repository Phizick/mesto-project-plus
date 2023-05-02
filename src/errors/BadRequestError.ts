class BadRequestError extends Error {
  private status: number;

  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
    this.status = 400;
  }
}

export default BadRequestError;
