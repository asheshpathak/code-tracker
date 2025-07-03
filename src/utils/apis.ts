const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:7007/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(firstName: string, lastName: string, email: string, password: string) {
    console.log('API CLIENT:');
    console.log('Registering user:', { firstName, lastName, email, password });
    const userData = { firstName, lastName, email, password };
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async verifyToken(token: string) {
    return this.request('/auth/verify', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Problems methods
  async getProblems(id: string) {
    return this.request(`/users/${id}/problems`);
  }

  async createProblem(problemData: any, user: { id: string | undefined }) {
    return this.request(`/users/${user.id}/problems`, {
      method: 'POST',
      body: JSON.stringify(problemData),
    });
  }

  // Analytics methods
  async getAnalytics() {
    return this.request('/analytics');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);