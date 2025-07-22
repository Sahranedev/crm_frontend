import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Types basés sur le schéma Prisma
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes?: string;
  createdAt: Date;
}

export const useClientsStore = defineStore("clients", () => {
  // État réactif
  const clients = ref<Client[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const getClientById = computed(() => {
    return (id: string) => clients.value.find((client) => client.id === id);
  });

  const totalClients = computed(() => clients.value.length);

  // Actions
  const fetchClients = async () => {
    loading.value = true;
    error.value = null;
    try {
      // Simulation d'un appel API - à remplacer par un vrai appel
      const storedClients = localStorage.getItem("crm_clients");
      if (storedClients) {
        clients.value = JSON.parse(storedClients);
      }
    } catch (err) {
      error.value = "Erreur lors du chargement des clients";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addClient = async (clientData: Omit<Client, "id" | "createdAt">) => {
    loading.value = true;
    error.value = null;
    try {
      const newClient: Client = {
        ...clientData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };
      clients.value.push(newClient);
      localStorage.setItem("crm_clients", JSON.stringify(clients.value));
      return newClient;
    } catch (err) {
      error.value = "Erreur lors de l'ajout du client";
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateClient = async (id: string, clientData: Partial<Client>) => {
    loading.value = true;
    error.value = null;
    try {
      const index = clients.value.findIndex((client) => client.id === id);
      if (index !== -1) {
        clients.value[index] = { ...clients.value[index], ...clientData };
        localStorage.setItem("crm_clients", JSON.stringify(clients.value));
        return clients.value[index];
      }
      throw new Error("Client non trouvé");
    } catch (err) {
      error.value = "Erreur lors de la mise à jour du client";
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteClient = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const index = clients.value.findIndex((client) => client.id === id);
      if (index !== -1) {
        clients.value.splice(index, 1);
        localStorage.setItem("crm_clients", JSON.stringify(clients.value));
        return true;
      }
      throw new Error("Client non trouvé");
    } catch (err) {
      error.value = "Erreur lors de la suppression du client";
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    // État
    clients,
    loading,
    error,
    // Getters
    getClientById,
    totalClients,
    // Actions
    fetchClients,
    addClient,
    updateClient,
    deleteClient,
  };
});
