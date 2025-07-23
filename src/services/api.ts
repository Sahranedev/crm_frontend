const API_BASE_URL = "http://localhost:8000";

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: "include",
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Une erreur réseau est survenue");
    }
  }

  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  async getClients() {
    return this.request("/clients");
  }

  async getClient(id: string) {
    return this.request(`/clients/${id}`);
  }

  async createClient(clientData: any) {
    return this.request("/clients", {
      method: "POST",
      body: JSON.stringify(clientData),
    });
  }

  async updateClient(id: string, clientData: any) {
    return this.request(`/clients/${id}`, {
      method: "PATCH",
      body: JSON.stringify(clientData),
    });
  }

  async deleteClient(id: string) {
    return this.request(`/clients/${id}`, {
      method: "DELETE",
    });
  }

  async getOpportunities() {
    return this.request("/opportunities");
  }

  async getOpportunity(id: string) {
    return this.request(`/opportunities/${id}`);
  }

  async createOpportunity(opportunityData: any) {
    return this.request("/opportunities", {
      method: "POST",
      body: JSON.stringify(opportunityData),
    });
  }

  async updateOpportunity(id: string, opportunityData: any) {
    return this.request(`/opportunities/${id}`, {
      method: "PATCH",
      body: JSON.stringify(opportunityData),
    });
  }

  async deleteOpportunity(id: string) {
    return this.request(`/opportunities/${id}`, {
      method: "DELETE",
    });
  }

  async checkAuth() {
    return this.request("/clients/me");
  }
}

export const apiService = new ApiService();
export default apiService;
