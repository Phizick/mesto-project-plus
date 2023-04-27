interface IError {
  status: number;
  message: string;
}

function serverError(status: number, message: string): IError {
  return { status, message };
}

export default {
  badRequest(message: string): IError {
    return serverError(400, message);
  },
  authorization(message: string): IError {
    return serverError(401, message);
  },
  notFound(message: string): IError {
    return serverError(404, message);
  },
  internal(message: string): IError {
    return serverError(500, message);
  },
};
