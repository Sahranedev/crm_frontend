<template>
  <BaseCard>
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <BaseInput
          v-model="searchQuery"
          label="Rechercher"
          :placeholder="searchPlaceholder"
          icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </div>
      
      <div v-if="filters.length > 0" class="sm:w-48">
        <BaseSelect
          v-model="selectedFilter"
          label="Filtrer par"
          :options="filterOptions"
        />
      </div>
      
      <div v-if="sortOptions.length > 0" class="sm:w-48">
        <BaseSelect
          v-model="selectedSort"
          label="Trier par"
          :options="sortOptions"
        />
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import BaseCard from './BaseCard.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'

interface FilterOption {
  value: string
  label: string
}

interface Props {
  searchPlaceholder?: string
  filters?: FilterOption[]
  sortOptions?: FilterOption[]
}

const props = withDefaults(defineProps<Props>(), {
  searchPlaceholder: 'Rechercher...',
  filters: () => [],
  sortOptions: () => []
})

const emit = defineEmits<{
  'update:search': [value: string]
  'update:filter': [value: string]
  'update:sort': [value: string]
}>()

const searchQuery = ref('')
const selectedFilter = ref('')
const selectedSort = ref('')

const filterOptions = computed(() => [
  { value: '', label: 'Tous' },
  ...props.filters
])

const sortOptions = computed(() => [
  { value: '', label: 'Par défaut' },
  ...props.sortOptions
])

watch(searchQuery, (value) => {
  emit('update:search', value)
})

watch(selectedFilter, (value) => {
  emit('update:filter', value)
})

watch(selectedSort, (value) => {
  emit('update:sort', value)
})
</script> 