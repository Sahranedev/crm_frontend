<template>
  <BaseCard class="border-l-4" :class="borderColorClass">
    <div class="flex items-center">
      <div class="p-3 rounded-full" :class="iconBgClass">
        <svg class="w-6 h-6" :class="iconColorClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon" />
        </svg>
      </div>
      <div class="ml-4">
        <p class="text-sm font-medium text-gray-600">{{ label }}</p>
        <p class="text-2xl font-semibold text-gray-900">{{ formattedValue }}</p>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '../ui/BaseCard.vue'
import { useFormatting } from '../../composables/useFormatting'

interface Props {
  label: string
  value: string | number
  icon: string
  variant?: 'blue' | 'purple' | 'green' | 'yellow' | 'red'
  format?: 'number' | 'currency' | 'percentage' | 'text'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'blue',
  format: 'text'
})

const { formatCurrency } = useFormatting()

const borderColorClass = computed(() => {
  const colors = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    yellow: 'border-yellow-500',
    red: 'border-red-500'
  }
  return colors[props.variant]
})

const iconBgClass = computed(() => {
  const colors = {
    blue: 'bg-blue-100',
    purple: 'bg-purple-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    red: 'bg-red-100'
  }
  return colors[props.variant]
})

const iconColorClass = computed(() => {
  const colors = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600'
  }
  return colors[props.variant]
})

const formattedValue = computed(() => {
  switch (props.format) {
    case 'currency':
      return formatCurrency(Number(props.value))
    case 'percentage':
      return `${props.value}%`
    case 'number':
      return new Intl.NumberFormat('fr-FR').format(Number(props.value))
    default:
      return props.value
  }
})
</script> 