<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <BaseInput
      v-model="form.name"
      label="Nom complet"
      placeholder="Nom et prénom du client"
      required
      :error="errors.name"
    />

    <BaseInput
      v-model="form.email"
      type="email"
      label="Email"
      placeholder="email@exemple.com"
      required
      :error="errors.email"
    />

    <BaseInput
      v-model="form.phone"
      type="tel"
      label="Téléphone"
      placeholder="+33 1 23 45 67 89"
      required
      :error="errors.phone"
    />

    <BaseInput
      v-model="form.company"
      label="Entreprise"
      placeholder="Nom de l'entreprise"
      required
      :error="errors.company"
    />

    <div>
      <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
        Notes
      </label>
      <textarea
        id="notes"
        v-model="form.notes"
        rows="4"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Informations supplémentaires sur le client..."
      ></textarea>
    </div>

    <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
      <BaseButton
        type="button"
        variant="secondary"
        @click="$emit('cancel')"
      >
        Annuler
      </BaseButton>
      <BaseButton
        type="submit"
        :loading="loading"
      >
        {{ isEditing ? 'Mettre à jour' : 'Créer le client' }}
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BaseInput from '../ui/BaseInput.vue'
import BaseButton from '../ui/BaseButton.vue'
import type { Client, CreateClientRequest } from '../../types'

interface Props {
  client?: Client
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  submit: [data: CreateClientRequest]
  cancel: []
}>()

const form = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  notes: ''
})

const errors = ref<Record<string, string>>({})

const isEditing = computed(() => !!props.client)

watch(() => props.client, (client) => {
  if (client) {
    form.value = {
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
      notes: client.notes || ''
    }
  }
}, { immediate: true })

const validateForm = () => {
  errors.value = {}

  if (!form.value.name.trim()) {
    errors.value.name = 'Le nom est requis'
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'L\'email est requis'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Format d\'email invalide'
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = 'Le téléphone est requis'
  }

  if (!form.value.company.trim()) {
    errors.value.company = 'L\'entreprise est requise'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', form.value)
  }
}
</script> 