const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export const apiClient = {
  async fetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { requireAuth = false, headers, ...restOptions } = options;
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (requireAuth) {
      // For Next.js client side, we access localStorage
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) {
          defaultHeaders['Authorization'] = `Bearer ${token}`;
        }
      }
    }

    const config: RequestInit = {
      ...restOptions,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401 && requireAuth) {
        // TODO: Handle token refresh logic here if needed
        // For now, if we get 401, we might just want to let the UI handle logout
      }
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  },

  get<T>(endpoint: string, options?: FetchOptions) {
    return this.fetch<T>(endpoint, { ...options, method: 'GET' });
  },

  post<T>(endpoint: string, body: any, options?: FetchOptions) {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put<T>(endpoint: string, body: any, options?: FetchOptions) {
    return this.fetch<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  delete<T>(endpoint: string, options?: FetchOptions) {
    return this.fetch<T>(endpoint, { ...options, method: 'DELETE' });
  },
};
