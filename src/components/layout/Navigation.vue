<template>
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
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-blue-600 bg-blue-50"
          >
            {{ item.label }}
          </router-link>
        </div>

        <!-- Auth Links -->
        <div class="hidden md:flex items-center space-x-4">
          <template v-if="authStore.isAuthenticated">
            <span class="text-sm text-gray-600">
              Bonjour, {{ authStore.user?.email }}
            </span>
            <BaseButton
              variant="secondary"
              size="sm"
              @click="handleLogout"
            >
              Déconnexion
            </BaseButton>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="text-blue-600 bg-blue-50"
            >
              Connexion
            </router-link>
            <BaseButton
              variant="primary"
              size="sm"
              @click="$router.push('/register')"
            >
              Inscription
            </BaseButton>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <BaseButton
            variant="secondary"
            size="sm"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </BaseButton>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
          <!-- Navigation Links for authenticated users -->
          <template v-if="authStore.isAuthenticated">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              active-class="text-blue-600 bg-blue-50"
              @click="mobileMenuOpen = false"
            >
              {{ item.label }}
            </router-link>
            
            <!-- Mobile Auth Links for authenticated users -->
            <div class="border-t border-gray-200 pt-4 mt-4">
              <div class="px-3 py-2 text-sm text-gray-600">
                Bonjour, {{ authStore.user?.email }}
              </div>
              <BaseButton
                variant="secondary"
                size="sm"
                full-width
                @click="handleLogout; mobileMenuOpen = false"
              >
                Déconnexion
              </BaseButton>
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
            <BaseButton
              variant="primary"
              size="sm"
              full-width
              @click="$router.push('/register'); mobileMenuOpen = false"
            >
              Inscription
            </BaseButton>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import BaseButton from '../ui/BaseButton.vue'

const mobileMenuOpen = ref(false)
const authStore = useAuthStore()

const navigationItems = [
  { path: '/dashboard', label: 'Tableau de Bord' },
  { path: '/clients', label: 'Clients' },
  { path: '/opportunities', label: 'Opportunités' }
]

const handleLogout = () => {
  authStore.logout()
}
</script> 