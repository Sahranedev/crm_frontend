<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <router-link
              to="/clients"
              class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mr-4"
            >
              <svg
                class="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Retour
            </router-link>
          </div>
          <h1 class="text-3xl font-bold text-gray-900">
            {{ isEditing ? "Modifier le client" : "Nouveau client" }}
          </h1>
          <p class="text-gray-600 mt-2">
            {{
              isEditing
                ? "Modifiez les informations du client"
                : "Ajoutez un nouveau client à votre base de données"
            }}
          </p>
        </div>

        <!-- Form -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
            <!-- Name Field -->
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Nom complet <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  errors.name ? 'border-red-300' : 'border-gray-300',
                ]"
                placeholder="Nom et prénom du client"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">
                {{ errors.name }}
              </p>
            </div>

            <!-- Email Field -->
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Email <span class="text-red-500">*</span>
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  errors.email ? 'border-red-300' : 'border-gray-300',
                ]"
                placeholder="email@exemple.com"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email }}
              </p>
            </div>

            <!-- Phone Field -->
            <div>
              <label
                for="phone"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Téléphone <span class="text-red-500">*</span>
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  errors.phone ? 'border-red-300' : 'border-gray-300',
                ]"
                placeholder="+33 1 23 45 67 89"
              />
              <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
                {{ errors.phone }}
              </p>
            </div>

            <!-- Company Field -->
            <div>
              <label
                for="company"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Entreprise <span class="text-red-500">*</span>
              </label>
              <input
                id="company"
                v-model="form.company"
                type="text"
                required
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  errors.company ? 'border-red-300' : 'border-gray-300',
                ]"
                placeholder="Nom de l'entreprise"
              />
              <p v-if="errors.company" class="mt-1 text-sm text-red-600">
                {{ errors.company }}
              </p>
            </div>

            <!-- Notes Field -->
            <div>
              <label
                for="notes"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
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

            <!-- Form Actions -->
            <div
              class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200"
            >
              <router-link
                to="/clients"
                class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuler
              </router-link>
              <button
                type="submit"
                :disabled="loading"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <div
                  v-if="loading"
                  class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                ></div>
                <svg
                  v-else
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {{ isEditing ? "Mettre à jour" : "Créer le client" }}
              </button>
            </div>
          </form>
        </div>

        <!-- Error Display -->
        <div
          v-if="error"
          class="mt-6 bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <p class="text-red-600">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useClientsStore, type Client } from "../stores/clients";

const route = useRoute();
const router = useRouter();
const clientsStore = useClientsStore();

// État local
const loading = ref(false);
const error = ref<string | null>(null);
const errors = ref<Record<string, string>>({});

const form = ref({
  name: "",
  email: "",
  phone: "",
  company: "",
  notes: "",
});

// Computed properties
const isEditing = computed(() => !!route.params.id);
const clientId = computed(() => route.params.id as string);

// Méthodes
const validateForm = () => {
  errors.value = {};

  if (!form.value.name.trim()) {
    errors.value.name = "Le nom est requis";
  }

  if (!form.value.email.trim()) {
    errors.value.email = "L'email est requis";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = "Format d'email invalide";
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = "Le téléphone est requis";
  }

  if (!form.value.company.trim()) {
    errors.value.company = "L'entreprise est requise";
  }

  return Object.keys(errors.value).length === 0;
};

const loadClient = async () => {
  if (isEditing.value) {
    loading.value = true;
    try {
      await clientsStore.fetchClients();
      const client = clientsStore.getClientById(clientId.value);
      if (client) {
        form.value = {
          name: client.name,
          email: client.email,
          phone: client.phone,
          company: client.company,
          notes: client.notes || "",
        };
      } else {
        error.value = "Client non trouvé";
      }
    } catch (err) {
      error.value = "Erreur lors du chargement du client";
    } finally {
      loading.value = false;
    }
  }
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  loading.value = true;
  error.value = null;

  try {
    if (isEditing.value) {
      await clientsStore.updateClient(clientId.value, form.value);
    } else {
      await clientsStore.addClient(form.value);
    }
    router.push("/clients");
  } catch (err) {
    error.value = isEditing.value
      ? "Erreur lors de la mise à jour du client"
      : "Erreur lors de la création du client";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadClient();
});
</script>
