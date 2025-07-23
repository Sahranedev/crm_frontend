<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <router-link
              to="/opportunities"
              class="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors mr-4"
            >
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Retour
            </router-link>
          </div>
          <h1 class="text-3xl font-bold text-gray-900">
            {{ isEditing ? 'Modifier l\'opportunité' : 'Nouvelle opportunité' }}
          </h1>
          <p class="text-gray-600 mt-2">
            {{ isEditing ? 'Modifiez les informations de l\'opportunité' : 'Créez une nouvelle opportunité commerciale' }}
          </p>
        </div>

        <!-- Form -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
            <!-- Title Field -->
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
                Titre de l'opportunité <span class="text-red-500">*</span>
              </label>
              <input
                id="title"
                v-model="form.title"
                type="text"
                required
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500',
                  errors.title ? 'border-red-300' : 'border-gray-300'
                ]"
                placeholder="Ex: Développement d'une application web"
              />
              <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
            </div>

            <!-- Client Selection -->
            <div>
              <label for="clientId" class="block text-sm font-medium text-gray-700 mb-2">
                Client <span class="text-red-500">*</span>
              </label>
              <select
                id="clientId"
                v-model="form.clientId"
                required
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500',
                  errors.clientId ? 'border-red-300' : 'border-gray-300'
                ]"
              >
                <option value="">Sélectionnez un client</option>
                <option
                  v-for="client in clients"
                  :key="client.id"
                  :value="client.id"
                >
                  {{ client.name }} - {{ client.company }}
                </option>
              </select>
              <p v-if="errors.clientId" class="mt-1 text-sm text-red-600">{{ errors.clientId }}</p>
            </div>

            <!-- Amount Field -->
            <div>
              <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">
                Montant (€) <span class="text-red-500">*</span>
              </label>
              <input
                id="amount"
                v-model.number="form.amount"
                type="number"
                min="0"
                step="0.01"
                required
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500',
                  errors.amount ? 'border-red-300' : 'border-gray-300'
                ]"
                placeholder="0.00"
              />
              <p v-if="errors.amount" class="mt-1 text-sm text-red-600">{{ errors.amount }}</p>
            </div>

            <!-- Status Field -->
            <div>
              <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
                Statut <span class="text-red-500">*</span>
              </label>
              <select
                id="status"
                v-model="form.status"
                required
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500',
                  errors.status ? 'border-red-300' : 'border-gray-300'
                ]"
              >
                <option value="">Sélectionnez un statut</option>
                <option value="in_progress">En cours</option>
                <option value="won">Gagnée</option>
                <option value="lost">Perdue</option>
              </select>
              <p v-if="errors.status" class="mt-1 text-sm text-red-600">{{ errors.status }}</p>
            </div>

            <!-- Form Actions -->
            <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <router-link
                to="/opportunities"
                class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuler
              </router-link>
              <button
                type="submit"
                :disabled="loading"
                class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ isEditing ? 'Mettre à jour' : 'Créer l\'opportunité' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Error Display -->
        <div v-if="error" class="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-red-600">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOpportunitiesStore, Status } from '../stores/opportunities'
import { useClientsStore } from '../stores/clients'

const route = useRoute()
const router = useRouter()
const opportunitiesStore = useOpportunitiesStore()
const clientsStore = useClientsStore()

// État local
const loading = ref(false)
const error = ref<string | null>(null)
const errors = ref<Record<string, string>>({})

const form = ref({
  title: '',
  clientId: '',
  amount: 0,
  status: '' as Status
})

// Computed properties
const isEditing = computed(() => !!route.params.id)
const opportunityId = computed(() => route.params.id as string)
const clients = computed(() => clientsStore.clients)

// Méthodes
const validateForm = () => {
  errors.value = {}

  if (!form.value.title.trim()) {
    errors.value.title = 'Le titre est requis'
  }

  if (!form.value.clientId) {
    errors.value.clientId = 'Le client est requis'
  }

  if (!form.value.amount || form.value.amount <= 0) {
    errors.value.amount = 'Le montant doit être supérieur à 0'
  }

  if (!form.value.status) {
    errors.value.status = 'Le statut est requis'
  }

  return Object.keys(errors.value).length === 0
}

const loadOpportunity = async () => {
  if (isEditing.value) {
    loading.value = true
    try {
      await opportunitiesStore.fetchOpportunities()
      const opportunity = opportunitiesStore.getOpportunityById(opportunityId.value)
      if (opportunity) {
        form.value = {
          title: opportunity.title,
          clientId: opportunity.clientId,
          amount: opportunity.amount,
          status: opportunity.status
        }
      } else {
        error.value = 'Opportunité non trouvée'
      }
    } catch (err) {
      error.value = 'Erreur lors du chargement de l\'opportunité'
    } finally {
      loading.value = false
    }
  }
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  error.value = null

  try {
    if (isEditing.value) {
      await opportunitiesStore.updateOpportunity(opportunityId.value, form.value)
    } else {
      await opportunitiesStore.addOpportunity(form.value)
    }
    router.push('/opportunities')
  } catch (err) {
    error.value = isEditing.value 
      ? 'Erreur lors de la mise à jour de l\'opportunité'
      : 'Erreur lors de la création de l\'opportunité'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    clientsStore.fetchClients(),
    loadOpportunity()
  ])
})
</script> 