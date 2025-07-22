<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Gestion des Opportunités</h1>
          <p class="text-gray-600 mt-2">Suivez vos opportunités commerciales</p>
        </div>
        <router-link
          to="/opportunities/new"
          class="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nouvelle Opportunité
        </router-link>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher par titre ou client..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div class="sm:w-48">
            <label for="statusFilter" class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
            <select
              id="statusFilter"
              v-model="statusFilter"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Tous les statuts</option>
              <option value="in_progress">En cours</option>
              <option value="won">Gagnée</option>
              <option value="lost">Perdue</option>
            </select>
          </div>
          <div class="sm:w-48">
            <label for="sort" class="block text-sm font-medium text-gray-700 mb-2">Trier par</label>
            <select
              id="sort"
              v-model="sortBy"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="title">Titre</option>
              <option value="amount">Montant</option>
              <option value="status">Statut</option>
              <option value="createdAt">Date de création</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- Opportunities List -->
      <div v-else-if="filteredOpportunities.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="opportunity in filteredOpportunities"
          :key="opportunity.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">{{ opportunity.title }}</h3>
                  <span :class="getStatusBadgeClass(opportunity.status)">
                    {{ getStatusLabel(opportunity.status) }}
                  </span>
                </div>
                <p class="text-2xl font-bold text-gray-900 mb-2">
                  {{ formatCurrency(opportunity.amount) }}
                </p>
                <div class="space-y-1 text-sm text-gray-500">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {{ getClientName(opportunity.clientId) }}
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <span class="text-xs text-gray-500">
                Créée le {{ formatDate(opportunity.createdAt) }}
              </span>
              <div class="flex space-x-2">
                <router-link
                  :to="`/opportunities/edit/${opportunity.id}`"
                  class="inline-flex items-center px-3 py-1 text-sm text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Modifier
                </router-link>
                <button
                  @click="confirmDelete(opportunity)"
                  class="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-lg shadow-sm p-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Aucune opportunité trouvée</h3>
        <p class="text-gray-600 mb-6">
          {{ searchQuery || statusFilter ? 'Aucune opportunité ne correspond à vos critères.' : 'Commencez par créer votre première opportunité.' }}
        </p>
        <router-link
          to="/opportunities/new"
          class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Créer une opportunité
        </router-link>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Confirmer la suppression</h3>
        <p class="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer l'opportunité "{{ opportunityToDelete?.title }}" ? Cette action est irréversible.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
          <button
            @click="deleteOpportunity"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useOpportunitiesStore, type Opportunity, Status } from '../stores/opportunities'
import { useClientsStore } from '../stores/clients'

const opportunitiesStore = useOpportunitiesStore()
const clientsStore = useClientsStore()

// État local
const searchQuery = ref('')
const statusFilter = ref('')
const sortBy = ref('title')
const showDeleteModal = ref(false)
const opportunityToDelete = ref<Opportunity | null>(null)

// Computed properties
const loading = computed(() => opportunitiesStore.loading)
const error = computed(() => opportunitiesStore.error)

const filteredOpportunities = computed(() => {
  let filtered = opportunitiesStore.opportunities

  // Filtrage par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(opp =>
      opp.title.toLowerCase().includes(query) ||
      getClientName(opp.clientId).toLowerCase().includes(query)
    )
  }

  // Filtrage par statut
  if (statusFilter.value) {
    filtered = filtered.filter(opp => opp.status === statusFilter.value)
  }

  // Tri
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'amount':
        return b.amount - a.amount
      case 'status':
        return a.status.localeCompare(b.status)
      case 'createdAt':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  return filtered
})

// Méthodes
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(date))
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

const getClientName = (clientId: string) => {
  const client = clientsStore.getClientById(clientId)
  return client ? client.name : 'Client inconnu'
}

const confirmDelete = (opportunity: Opportunity) => {
  opportunityToDelete.value = opportunity
  showDeleteModal.value = true
}

const deleteOpportunity = async () => {
  if (opportunityToDelete.value) {
    try {
      await opportunitiesStore.deleteOpportunity(opportunityToDelete.value.id)
      showDeleteModal.value = false
      opportunityToDelete.value = null
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }
}

onMounted(async () => {
  await Promise.all([
    opportunitiesStore.fetchOpportunities(),
    clientsStore.fetchClients()
  ])
})
</script> 