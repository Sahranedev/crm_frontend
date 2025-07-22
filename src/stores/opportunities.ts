import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { apiService } from "../services/api";

export const Status = {
  IN_PROGRESS: "in_progress",
  WON: "won",
  LOST: "lost",
} as const;
export type Status = (typeof Status)[keyof typeof Status];

export interface Opportunity {
  id: string;
  title: string;
  amount: number;
  status: Status;
  createdAt: Date;
  clientId: string;
  client?: {
    name: string;
    company: string;
  };
}

export const useOpportunitiesStore = defineStore("opportunities", () => {
  const opportunities = ref<Opportunity[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const getOpportunityById = computed(() => (id: string) =>
    opportunities.value.find((opp) => opp.id === id)
  );

  const getOpportunitiesByClient = computed(() => (clientId: string) =>
    opportunities.value.filter((opp) => opp.clientId === clientId)
  );

  const totalOpportunities = computed(() => opportunities.value.length);

  const totalRevenue = computed(() =>
    opportunities.value
      .filter((opp) => opp.status === Status.WON)
      .reduce((sum, opp) => sum + opp.amount, 0)
  );

  const opportunitiesByStatus = computed(() => {
    const stats = {
      [Status.IN_PROGRESS]: 0,
      [Status.WON]: 0,
      [Status.LOST]: 0,
    };
    opportunities.value.forEach((opp) => {
      stats[opp.status]++;
    });
    return stats;
  });

  // Actions
  const fetchOpportunities = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await apiService.getOpportunities();
      opportunities.value = data as Opportunity[];
    } catch (err: any) {
      error.value = "Erreur lors du chargement des opportunités";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addOpportunity = async (opportunityData: Omit<Opportunity, "id" | "createdAt">) => {
    loading.value = true;
    error.value = null;
    try {
      const created = await apiService.createOpportunity(opportunityData);
      opportunities.value.push(created as Opportunity);
      return created;
    } catch (err) {
      error.value = "Erreur lors de l'ajout de l'opportunité";
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateOpportunity = async (id: string, opportunityData: Partial<Opportunity>) => {
    loading.value = true;
    error.value = null;
    try {
      const updated = await apiService.updateOpportunity(id, opportunityData);
      const index = opportunities.value.findIndex((opp) => opp.id === id);
      if (index !== -1) {
        opportunities.value[index] = updated as Opportunity;
        return updated;
      }
      throw new Error("Opportunité non trouvée");
    } catch (err) {
      error.value = "Erreur lors de la mise à jour de l'opportunité";
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteOpportunity = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      await apiService.deleteOpportunity(id);
      const index = opportunities.value.findIndex((opp) => opp.id === id);
      if (index !== -1) {
        opportunities.value.splice(index, 1);
        return true;
      }
      throw new Error("Opportunité non trouvée");
    } catch (err) {
      error.value = "Erreur lors de la suppression de l'opportunité";
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    opportunities,
    loading,
    error,
    getOpportunityById,
    getOpportunitiesByClient,
    totalOpportunities,
    totalRevenue,
    opportunitiesByStatus,
    fetchOpportunities,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
  };
});
