<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import router from '../router'

const mobileMenuOpen = ref(false)
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <!-- Navigation -->
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-900">CRM</span>
        </router-link>

        <!-- Navigation Links - Only for authenticated users -->
        <div v-if="authStore.isAuthenticated" class="hidden md:flex items-center space-x-8">
          <router-link
            to="/dashboard"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-blue-600 bg-blue-50"
          >
            Tableau de Bord
          </router-link>
          <router-link
            to="/clients"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-blue-600 bg-blue-50"
          >
            Clients
          </router-link>
          <router-link
            to="/opportunities"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-blue-600 bg-blue-50"
          >
            Opportunités
          </router-link>
        </div>

        <!-- Auth Links -->
        <div class="hidden md:flex items-center space-x-4">
          <template v-if="authStore.isAuthenticated">
            <span class="text-sm text-gray-600">
              Bonjour, {{ authStore.user?.email }}
            </span>
            <button
              @click="logout"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Déconnexion
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="text-blue-600 bg-blue-50"
            >
              Connexion
            </router-link>
            <router-link
              to="/register"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Inscription
            </router-link>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
          <!-- Navigation Links for authenticated users -->
          <template v-if="authStore.isAuthenticated">
            <router-link
              to="/dashboard"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              active-class="text-blue-600 bg-blue-50"
              @click="mobileMenuOpen = false"
            >
              Tableau de Bord
            </router-link>
            <router-link
              to="/clients"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              active-class="text-blue-600 bg-blue-50"
              @click="mobileMenuOpen = false"
            >
              Clients
            </router-link>
            <router-link
              to="/opportunities"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              active-class="text-blue-600 bg-blue-50"
              @click="mobileMenuOpen = false"
            >
              Opportunités
            </router-link>
            
            <!-- Mobile Auth Links for authenticated users -->
            <div class="border-t border-gray-200 pt-4 mt-4">
              <div class="px-3 py-2 text-sm text-gray-600">
                Bonjour, {{ authStore.user?.email }}
              </div>
              <button
                @click="logout; mobileMenuOpen = false"
                class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </template>
          
          <!-- Mobile Auth Links for non-authenticated users -->
          <template v-else>
            <router-link
              to="/login"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              active-class="text-blue-600 bg-blue-50"
              @click="mobileMenuOpen = false"
            >
              Connexion
            </router-link>
            <router-link
              to="/register"
              class="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              @click="mobileMenuOpen = false"
            >
              Inscription
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style> 