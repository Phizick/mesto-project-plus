class AuthorizationError extends Error {
  private status: number;

  constructor(message: string) {
    super(message);
    this.name = 'AuthorizationError';
    this.status = 401;
  }
}

export default AuthorizationError;
