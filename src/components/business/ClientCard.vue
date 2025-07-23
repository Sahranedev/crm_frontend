<template>
  <BaseCard class="hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ client.name }}</h3>
        <p class="text-sm text-gray-600 mb-2">{{ client.company }}</p>
        <div class="space-y-1 text-sm text-gray-500">
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {{ client.email }}
          </div>
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {{ client.phone }}
          </div>
        </div>
        <p v-if="client.notes" class="text-sm text-gray-500 mt-2 line-clamp-2">
          {{ client.notes }}
        </p>
      </div>
    </div>

    <div class="flex items-center justify-between pt-4 border-t border-gray-100">
      <span class="text-xs text-gray-500">
        Créé le {{ formatDate(client.createdAt) }}
      </span>
      <div class="flex space-x-2">
        <BaseButton
          variant="secondary"
          size="sm"
          icon="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          @click="$emit('edit', client)"
        >
          Modifier
        </BaseButton>
        <BaseButton
          variant="danger"
          size="sm"
          icon="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          @click="$emit('delete', client)"
        >
          Supprimer
        </BaseButton>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '../ui/BaseCard.vue'
import BaseButton from '../ui/BaseButton.vue'
import { useFormatting } from '../../composables/useFormatting'
import type { Client } from '../../types'

interface Props {
  client: Client
}

defineProps<Props>()

defineEmits<{
  edit: [client: Client]
  delete: [client: Client]
}>()

const { formatDate } = useFormatting()
</script> 