<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Bienvenue dans votre CRM
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Gérez vos clients et opportunités avec une interface moderne et
          intuitive
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div
          class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500"
        >
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Clients</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ totalClients }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500"
        >
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Opportunités</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ totalOpportunities }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500"
        >
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">
                Chiffre d'Affaires
              </p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ formatCurrency(totalRevenue) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Gestion des Clients
          </h2>
          <p class="text-gray-600 mb-6">
            Gérez votre base de données clients avec des outils puissants pour
            suivre les informations de contact et les interactions.
          </p>
          <div class="space-y-3">
            <router-link
              to="/clients"
              class="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
            >
              Voir tous les clients
            </router-link>
            <router-link
              to="/clients/new"
              class="block w-full bg-green-600 text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-green-700 transition-colors"
            >
              Ajouter un nouveau client
            </router-link>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Gestion des Opportunités
          </h2>
          <p class="text-gray-600 mb-6">
            Suivez vos opportunités commerciales, leur progression et leur
            statut pour optimiser votre pipeline de vente.
          </p>
          <div class="space-y-3">
            <router-link
              to="/opportunities"
              class="block w-full bg-purple-600 text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-purple-700 transition-colors"
            >
              Voir toutes les opportunités
            </router-link>
            <router-link
              to="/opportunities/new"
              class="block w-full bg-indigo-600 text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-indigo-700 transition-colors"
            >
              Créer une nouvelle opportunité
            </router-link>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="mt-12 bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Activité Récente</h2>
        <div class="space-y-4">
          <div class="flex items-center p-4 bg-gray-50 rounded-lg">
            <div class="p-2 rounded-full bg-blue-100 text-blue-600 mr-4">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900">Bienvenue dans votre CRM</p>
              <p class="text-sm text-gray-600">
                Commencez par ajouter vos premiers clients et opportunités
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useClientsStore } from "../stores/clients";
import { useOpportunitiesStore } from "../stores/opportunities";

const clientsStore = useClientsStore();
const opportunitiesStore = useOpportunitiesStore();

const totalClients = computed(() => clientsStore.totalClients);
const totalOpportunities = computed(
  () => opportunitiesStore.totalOpportunities
);
const totalRevenue = computed(() => opportunitiesStore.totalRevenue);

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};

onMounted(async () => {
  await Promise.all([
    clientsStore.fetchClients(),
    opportunitiesStore.fetchOpportunities(),
  ]);
});
</script>
