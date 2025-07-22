const API_BASE_URL = "http://localhost:8000";

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Ajouter le token d'authentification s'il existe
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        // Note: Le backend utilise des cookies httpOnly, donc pas besoin d'ajouter le token manuellement
      } catch (e) {
        // Ignorer les erreurs de parsing
      }
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: "include", // Inclure les cookies
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      // Si la réponse est vide, retourner un objet vide
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

  // Méthodes d'authentification
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

  // Méthodes pour les clients
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

  // Méthodes pour les opportunités
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

  // Méthode pour vérifier l'authentification
  async checkAuth() {
    return this.request("/clients/me");
  }
}

export const apiService = new ApiService();
export default apiService;
