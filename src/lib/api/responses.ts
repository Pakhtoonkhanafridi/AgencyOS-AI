type ErrorResponseOptions = {
  code: string;
  message: string;
  status: number;
  details?: unknown;
  headers?: HeadersInit;
};

const noStoreHeader = "no-store";

export function okJson<TData>(data: TData, init: ResponseInit = {}) {
  return Response.json(data, {
    ...init,
    headers: withDefaultHeaders(init.headers),
  });
}

export function errorJson({ code, message, status, details, headers }: ErrorResponseOptions) {
  return Response.json(
    {
      error: {
        code,
        message,
        ...(details === undefined ? {} : { details }),
      },
    },
    {
      status,
      headers: withDefaultHeaders(headers),
    },
  );
}

export function validationErrorJson(message: string, details: unknown) {
  return errorJson({
    code: "VALIDATION_ERROR",
    message,
    status: 400,
    details,
  });
}

export async function readJsonBody(request: Request): Promise<unknown> {
  return request.json().catch(() => null);
}

function withDefaultHeaders(headers: HeadersInit = {}) {
  const mergedHeaders = new Headers(headers);

  if (!mergedHeaders.has("Cache-Control")) {
    mergedHeaders.set("Cache-Control", noStoreHeader);
  }

  return mergedHeaders;
}
