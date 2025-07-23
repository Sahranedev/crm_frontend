<template>
  <BaseCard class="hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-semibold text-gray-900">{{ opportunity.title }}</h3>
          <StatusBadge :status="opportunity.status" />
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
        <BaseButton
          variant="secondary"
          size="sm"
          icon="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          @click="$emit('edit', opportunity)"
        >
          Modifier
        </BaseButton>
        <BaseButton
          variant="danger"
          size="sm"
          icon="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          @click="$emit('delete', opportunity)"
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
import StatusBadge from './StatusBadge.vue'
import { useFormatting } from '../../composables/useFormatting'
import type { Opportunity } from '../../types'

interface Props {
  opportunity: Opportunity
  getClientName: (clientId: string) => string
}

defineProps<Props>()

defineEmits<{
  edit: [opportunity: Opportunity]
  delete: [opportunity: Opportunity]
}>()

const { formatCurrency, formatDate } = useFormatting()
</script> 