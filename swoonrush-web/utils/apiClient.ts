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

    let response = await fetch(url, config);

    if (!response.ok) {
      if (response.status === 401 && requireAuth && typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refreshToken }),
            });

            if (refreshRes.ok) {
              const refreshData = await refreshRes.json();
              const newAccessToken = refreshData.data.accessToken;

              localStorage.setItem('accessToken', newAccessToken);
              if (refreshData.data.refreshToken) {
                localStorage.setItem('refreshToken', refreshData.data.refreshToken);
              }

              // Retry original request
              const retryConfig = { ...config };
              retryConfig.headers = {
                ...retryConfig.headers,
                Authorization: `Bearer ${newAccessToken}`,
              };

              const retryResponse = await fetch(url, retryConfig);
              const retryData = await retryResponse.json().catch(() => ({}));

              if (!retryResponse.ok) {
                throw new Error(retryData.message || 'Something went wrong after retry');
              }
              return retryData;
            } else {
              // Refresh token is expired or invalid
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              window.location.reload();
            }
          } catch (e) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
        } else {
          // No refresh token available
          localStorage.removeItem('accessToken');
        }
      }

      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Something went wrong');
    }

    return await response.json();
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
