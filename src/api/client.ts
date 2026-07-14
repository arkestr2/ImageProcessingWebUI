const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`, options)
  
  if (!res.ok) {
      const text = await res.text().catch(() => "No body");
      throw new Error(`HTTP ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>
}

export const apiClient = {
  get: async <T>(url: string): Promise<T> => request<T>(url),
  post: async <T>(url: string, body: unknown): Promise<T> => {
    return request<T>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }
}