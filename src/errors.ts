class BaseError extends Error {
  // @ts-ignore
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AlreadyImplementedError);
    }
  }
}

export class AlreadyImplementedError extends BaseError {
  // @ts-ignore
  constructor(...params) {
    super(...params);
    this.name = 'AlreadyImplementedError';
  }
}

export class NotFoundError extends BaseError {
  // @ts-ignore
  constructor(...params) {
    super(...params);
    this.name = 'NotFoundError';
  }
}
