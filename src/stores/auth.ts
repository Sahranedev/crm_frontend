import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { apiService } from "../services/api";

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

  const isAuthenticated = computed(() => !!user.value);

  // Initialiser l'utilisateur depuis localStorage au démarrage
  const initAuth = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser);
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  };

  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = "";

    try {
      const userData = (await apiService.login(email, password)) as User;
      user.value = userData;
      localStorage.setItem("user", JSON.stringify(userData));

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
      const userData = (await apiService.register(email, password)) as User;
      user.value = userData;
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (err: any) {
      error.value = err.message || "Une erreur est survenue";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem("user");
  };

  const clearError = () => {
    error.value = "";
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    initAuth,
    login,
    register,
    logout,
    clearError,
  };
});
