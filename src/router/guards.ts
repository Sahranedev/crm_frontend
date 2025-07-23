import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "../stores/auth";

// Routes publiques qui ne nécessitent pas d'authentification
const publicRoutes = ["/login", "/register"];

export function requireAuth(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();

  if(authStore.isAuthenticated && publicRoutes.includes(to.path)) {
    next("/dashboard");
    return;
  }

  // Si l'utilisateur est authentifié, autoriser l'accès
  if (authStore.isAuthenticated && !publicRoutes.includes(to.path)) {
    next();
    return;
  }

  // Si c'est une route publique, autoriser l'accès
  if (publicRoutes.includes(to.path)) {
    next();
    return;
  }

  // Sinon, rediriger vers la page de connexion
  next("/login");
}
