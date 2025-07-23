<template>
  <span :class="badgeClasses">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  status: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const statusConfig = {
  in_progress: {
    label: 'En cours',
    classes: 'bg-yellow-100 text-yellow-800'
  },
  won: {
    label: 'Gagnée',
    classes: 'bg-green-100 text-green-800'
  },
  lost: {
    label: 'Perdue',
    classes: 'bg-red-100 text-red-800'
  }
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm'
}

const label = computed(() => {
  return statusConfig[props.status as keyof typeof statusConfig]?.label || props.status
})

const badgeClasses = computed(() => {
  const baseClasses = 'font-medium rounded-full'
  const statusClasses = statusConfig[props.status as keyof typeof statusConfig]?.classes || 'bg-gray-100 text-gray-800'
  
  return `${baseClasses} ${statusClasses} ${sizeClasses[props.size]}`
})
</script> 