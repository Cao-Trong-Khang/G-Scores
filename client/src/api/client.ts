export const API_BASE_URL = 'http://localhost:4000/api'

type ErrorResponse = {
  message?: string
}

function isErrorResponse(value: unknown): value is ErrorResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof (value as ErrorResponse).message === 'string'
  )
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    return null
  }
}

export async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)
  const body = await readJson(response)

  if (!response.ok) {
    if (isErrorResponse(body)) {
      throw new Error(body.message)
    }

    throw new Error('Request failed')
  }

  return body as T
}
