import { createRouter, createWebHistory } from "vue-router";
import { requireAuth } from "./guards";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Clients from "../views/Clients.vue";
import ClientForm from "../views/ClientForm.vue";
import Opportunities from "../views/Opportunities.vue";
import OpportunityForm from "../views/OpportunityForm.vue";
import Dashboard from "../views/Dashboard.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/clients",
    name: "Clients",
    component: Clients,
  },
  {
    path: "/clients/new",
    name: "NewClient",
    component: ClientForm,
  },
  {
    path: "/clients/edit/:id",
    name: "EditClient",
    component: ClientForm,
    props: true,
  },
  {
    path: "/opportunities",
    name: "Opportunities",
    component: Opportunities,
  },
  {
    path: "/opportunities/new",
    name: "NewOpportunity",
    component: OpportunityForm,
  },
  {
    path: "/opportunities/edit/:id",
    name: "EditOpportunity",
    component: OpportunityForm,
    props: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Appliquer le guard d'authentification à toutes les routes
router.beforeEach(requireAuth);

export default router;
