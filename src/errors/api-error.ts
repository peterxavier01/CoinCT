export class ApiError extends Error {
  status: number;
  endpoint: string;
  url: string;
  body?: unknown;

  constructor(options: {
    message: string;
    status: number;
    endpoint: string;
    url: string;
    body?: unknown;
    cause?: unknown;
  }) {
    super(options.message);
    this.name = "ApiError";
    this.status = options.status;
    this.endpoint = options.endpoint;
    this.url = options.url;
    this.body = options.body;

    if (options.cause) {
      (this as { cause?: unknown }).cause = options.cause;
    }
  }
}
