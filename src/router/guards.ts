import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "../stores/auth";

const publicRoutes = ["/login", "/register"];

export function requireAuth(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated && publicRoutes.includes(to.path)) {
    next("/dashboard");
    return;
  }

  if (authStore.isAuthenticated && !publicRoutes.includes(to.path)) {
    next();
    return;
  }

  if (publicRoutes.includes(to.path)) {
    next();
    return;
  }

  next("/login");
}
