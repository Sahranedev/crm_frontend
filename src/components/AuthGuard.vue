<template>
  <div v-if="authStore.isAuthenticated">
    <slot />
  </div>
  <div v-else class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-4">
        Accès restreint
      </h2>
      <p class="text-gray-600 mb-8">
        Vous devez être connecté pour accéder à cette page.
      </p>
      <div class="space-y-4">
        <router-link
          to="/login"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Se connecter
        </router-link>
        <div>
          <router-link
            to="/register"
            class="text-blue-600 hover:text-blue-500 font-medium"
          >
            Créer un compte
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script> 