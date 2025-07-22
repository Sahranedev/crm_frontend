import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Types basés sur le schéma Prisma
export enum Status {
  IN_PROGRESS = "in_progress",
  WON = "won",
  LOST = "lost",
}

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
  // État réactif
  const opportunities = ref<Opportunity[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const getOpportunityById = computed(() => {
    return (id: string) => opportunities.value.find((opp) => opp.id === id);
  });

  const getOpportunitiesByClient = computed(() => {
    return (clientId: string) =>
      opportunities.value.filter((opp) => opp.clientId === clientId);
  });

  const totalOpportunities = computed(() => opportunities.value.length);

  const totalRevenue = computed(() => {
    return opportunities.value
      .filter((opp) => opp.status === Status.WON)
      .reduce((sum, opp) => sum + opp.amount, 0);
  });

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
      // Simulation d'un appel API - à remplacer par un vrai appel
      const storedOpportunities = localStorage.getItem("crm_opportunities");
      if (storedOpportunities) {
        opportunities.value = JSON.parse(storedOpportunities);
      }
    } catch (err) {
      error.value = "Erreur lors du chargement des opportunités";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addOpportunity = async (
    opportunityData: Omit<Opportunity, "id" | "createdAt">
  ) => {
    loading.value = true;
    error.value = null;
    try {
      const newOpportunity: Opportunity = {
        ...opportunityData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };
      opportunities.value.push(newOpportunity);
      localStorage.setItem(
        "crm_opportunities",
        JSON.stringify(opportunities.value)
      );
      return newOpportunity;
    } catch (err) {
      error.value = "Erreur lors de l'ajout de l'opportunité";
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateOpportunity = async (
    id: string,
    opportunityData: Partial<Opportunity>
  ) => {
    loading.value = true;
    error.value = null;
    try {
      const index = opportunities.value.findIndex((opp) => opp.id === id);
      if (index !== -1) {
        opportunities.value[index] = {
          ...opportunities.value[index],
          ...opportunityData,
        };
        localStorage.setItem(
          "crm_opportunities",
          JSON.stringify(opportunities.value)
        );
        return opportunities.value[index];
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
      const index = opportunities.value.findIndex((opp) => opp.id === id);
      if (index !== -1) {
        opportunities.value.splice(index, 1);
        localStorage.setItem(
          "crm_opportunities",
          JSON.stringify(opportunities.value)
        );
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
    // État
    opportunities,
    loading,
    error,
    // Getters
    getOpportunityById,
    getOpportunitiesByClient,
    totalOpportunities,
    totalRevenue,
    opportunitiesByStatus,
    // Actions
    fetchOpportunities,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
  };
});
