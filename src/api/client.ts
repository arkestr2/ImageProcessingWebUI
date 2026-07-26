const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

type RequestOptions = {
    headers?: Record<string, string>;
    response?: "json" | "blob";
};

async function request<T>(url: string, options?: RequestInit & { response?: "json" | "blob" }): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${url}`, options);

    if (!res.ok) {
        const text = await res.text().catch(() => "No body");
        throw new Error(`HTTP ${res.status}: ${text}`);
    }

    if (options?.response === "blob") {
        return res.blob() as Promise<T>;
    }

    return res.json() as Promise<T>;
}

export const apiClient = {
    get: async <T>(url: string, options?: RequestOptions): Promise<T> => {
        return request<T>(url, {
            method: "GET",
            headers: options?.headers,
            response: options?.response,
        });
    },
    post: async <T>(url: string, body: unknown, options?: RequestOptions): Promise<T> => {
        const isFormData = body instanceof FormData;

        return request<T>(url, {
            method: "POST",
            headers: isFormData ? options?.headers : { "Content-Type": "application/json", ...options?.headers },
            body: isFormData ? body : JSON.stringify(body),
        });
    },
};
