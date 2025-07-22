<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
        <p class="text-gray-600 mt-2">Vue d'ensemble de votre activité commerciale</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Clients</p>
              <p class="text-2xl font-semibold text-gray-900">{{ totalClients }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Opportunités</p>
              <p class="text-2xl font-semibold text-gray-900">{{ totalOpportunities }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Chiffre d'Affaires</p>
              <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(totalRevenue) }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Taux de Conversion</p>
              <p class="text-2xl font-semibold text-gray-900">{{ conversionRate }}%</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Répartition par Statut</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-yellow-400 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-gray-700">En cours</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-semibold text-gray-900 mr-2">{{ opportunitiesByStatus.in_progress }}</span>
                <span class="text-sm text-gray-500">({{ getPercentage(opportunitiesByStatus.in_progress) }}%)</span>
              </div>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-yellow-400 h-2 rounded-full" 
                :style="{ width: getPercentage(opportunitiesByStatus.in_progress) + '%' }"
              ></div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-green-400 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-gray-700">Gagnées</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-semibold text-gray-900 mr-2">{{ opportunitiesByStatus.won }}</span>
                <span class="text-sm text-gray-500">({{ getPercentage(opportunitiesByStatus.won) }}%)</span>
              </div>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-green-400 h-2 rounded-full" 
                :style="{ width: getPercentage(opportunitiesByStatus.won) + '%' }"
              ></div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-red-400 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-gray-700">Perdues</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm font-semibold text-gray-900 mr-2">{{ opportunitiesByStatus.lost }}</span>
                <span class="text-sm text-gray-500">({{ getPercentage(opportunitiesByStatus.lost) }}%)</span>
              </div>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-red-400 h-2 rounded-full" 
                :style="{ width: getPercentage(opportunitiesByStatus.lost) + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
          <div class="space-y-4">
            <div v-if="recentOpportunities.length === 0" class="text-center py-8">
              <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p class="text-gray-500">Aucune activité récente</p>
            </div>
            <div 
              v-for="opportunity in recentOpportunities" 
              :key="opportunity.id"
              class="flex items-center p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex-shrink-0">
                <div :class="getStatusIconClass(opportunity.status)" class="w-8 h-8 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-gray-900">{{ opportunity.title }}</p>
                <p class="text-sm text-gray-500">{{ getClientName(opportunity.clientId) }} - {{ formatCurrency(opportunity.amount) }}</p>
              </div>
              <div class="flex-shrink-0">
                <span :class="getStatusBadgeClass(opportunity.status)" class="text-xs">
                  {{ getStatusLabel(opportunity.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Clients par Opportunités</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entreprise</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunités</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant Total</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="client in topClients" :key="client.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ client.name }}</div>
                  <div class="text-sm text-gray-500">{{ client.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ client.company }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ getClientOpportunitiesCount(client.id) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ formatCurrency(getClientTotalAmount(client.id)) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useClientsStore } from '../stores/clients'
import { useOpportunitiesStore, Status } from '../stores/opportunities'

const clientsStore = useClientsStore()
const opportunitiesStore = useOpportunitiesStore()

const totalClients = computed(() => clientsStore.totalClients)
const totalOpportunities = computed(() => opportunitiesStore.totalOpportunities)
const totalRevenue = computed(() => opportunitiesStore.totalRevenue)
const opportunitiesByStatus = computed(() => opportunitiesStore.opportunitiesByStatus)

const conversionRate = computed(() => {
  if (totalOpportunities.value === 0) return 0
  return Math.round((opportunitiesByStatus.value.won / totalOpportunities.value) * 100)
})

const recentOpportunities = computed(() => {
  return opportunitiesStore.opportunities
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
})

const topClients = computed(() => {
  return clientsStore.clients
    .sort((a, b) => getClientOpportunitiesCount(b.id) - getClientOpportunitiesCount(a.id))
    .slice(0, 5)
})

// Méthodes
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

const getPercentage = (value: number) => {
  if (totalOpportunities.value === 0) return 0
  return Math.round((value / totalOpportunities.value) * 100)
}

const getStatusLabel = (status: Status) => {
  switch (status) {
    case Status.IN_PROGRESS:
      return 'En cours'
    case Status.WON:
      return 'Gagnée'
    case Status.LOST:
      return 'Perdue'
    default:
      return status
  }
}

const getStatusBadgeClass = (status: Status) => {
  switch (status) {
    case Status.IN_PROGRESS:
      return 'px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full'
    case Status.WON:
      return 'px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full'
    case Status.LOST:
      return 'px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full'
    default:
      return 'px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full'
  }
}

const getStatusIconClass = (status: Status) => {
  switch (status) {
    case Status.IN_PROGRESS:
      return 'bg-yellow-100 text-yellow-600'
    case Status.WON:
      return 'bg-green-100 text-green-600'
    case Status.LOST:
      return 'bg-red-100 text-red-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const getClientName = (clientId: string) => {
  const client = clientsStore.getClientById(clientId)
  return client ? client.name : 'Client inconnu'
}

const getClientOpportunitiesCount = (clientId: string) => {
  return opportunitiesStore.getOpportunitiesByClient(clientId).length
}

const getClientTotalAmount = (clientId: string) => {
  return opportunitiesStore.getOpportunitiesByClient(clientId)
    .reduce((sum, opp) => sum + opp.amount, 0)
}

onMounted(async () => {
  await Promise.all([
    clientsStore.fetchClients(),
    opportunitiesStore.fetchOpportunities()
  ])
})
</script> 