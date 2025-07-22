import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { apiService } from "../services/api";
import 'pinia-plugin-persistedstate';

interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref("");

  const isAuthenticated = computed(() => {
    return !!user.value;
  });

  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = "";

    try {
      const response = await apiService.login(email, password) as any;
      const userData = response as User;      
      user.value = userData;
      return userData;
    } catch (err: any) {
      error.value = err.message || "Une erreur est survenue";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const register = async (email: string, password: string) => {
    loading.value = true;
    error.value = "";

    try {
      const response = await apiService.register(email, password) as any;
      const userData = response as User;
      user.value = userData;
      return userData;
    } catch (err: any) {
      error.value = err.message || "Une erreur est survenue";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    user.value = null;
    await apiService.logout();
  };

  const clearError = () => {
    error.value = "";
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError,
  };
}, {
  persist: true
});
