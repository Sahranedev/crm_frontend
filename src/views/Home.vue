<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Bienvenue dans votre CRM
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Gérez vos clients et opportunités avec une interface moderne et
          intuitive
        </p>
      </div>

      <div class="text-center mb-12">
        <div class="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Commencez dès maintenant
          </h2>
          <p class="text-gray-600 mb-6">
            Connectez-vous ou créez un compte pour accéder à votre tableau de bord
          </p>
          <div class="space-y-4">
            <router-link
              to="/login"
              class="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Se connecter
            </router-link>
            <router-link
              to="/register"
              class="block w-full bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Créer un compte
            </router-link>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Gestion des Clients</h3>
            <p class="text-gray-600">Gérez vos contacts clients avec des informations détaillées et un suivi personnalisé.</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Suivi des Opportunités</h3>
            <p class="text-gray-600">Suivez vos opportunités commerciales et optimisez votre pipeline de vente.</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Tableaux de Bord</h3>
            <p class="text-gray-600">Visualisez vos performances avec des graphiques et des métriques en temps réel.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
  }
})
</script>
