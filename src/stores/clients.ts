import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { apiService } from "../services/api";

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
      const response = await apiService.getClients();
      const data = (response as { data?: Client[] })?.data || (response as Client[]);
      clients.value = data;
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
      const response = await apiService.createClient(clientData);
      const newClient = (response as { data?: Client })?.data || (response as Client);
      clients.value.push(newClient);
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
      const response = await apiService.updateClient(id, clientData);
      const updatedClient = (response as { data?: Client })?.data || (response as Client);
      const index = clients.value.findIndex((client) => client.id === id);
      if (index !== -1) {
        clients.value[index] = { ...clients.value[index], ...updatedClient };
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
      await apiService.deleteClient(id);
      const index = clients.value.findIndex((client) => client.id === id);
      if (index !== -1) {
        clients.value.splice(index, 1);
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
