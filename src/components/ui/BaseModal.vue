<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="handleBackdropClick"
    >
      <div
        :class="modalClasses"
        @click.stop
      >
        <div v-if="showHeader" class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
          <button
            v-if="showCloseButton"
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-6">
          <slot />
        </div>
        
        <div v-if="$slots.footer" class="flex justify-end space-x-3">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  isOpen: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showHeader?: boolean
  showCloseButton?: boolean
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showHeader: true,
  showCloseButton: true,
  closeOnBackdrop: true
})

const emit = defineEmits<{
  close: []
}>()

const modalClasses = computed(() => {
  const baseClasses = 'bg-white rounded-lg p-6 max-w-md w-full mx-4'
  
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }
  
  return `${baseClasses} ${sizeClasses[props.size]}`
})

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    emit('close')
  }
}
</script> 