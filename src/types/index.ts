export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  company: string;
  notes?: string;
}

export interface CreateClientRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  notes?: string;
}

export interface UpdateClientRequest extends Partial<CreateClientRequest> {}

export enum OpportunityStatus {
  IN_PROGRESS = "in_progress",
  WON = "won",
  LOST = "lost",
}

export interface Opportunity extends BaseEntity {
  title: string;
  description?: string;
  amount: number;
  status: OpportunityStatus;
  clientId: string;
  expectedCloseDate?: Date;
}

export interface CreateOpportunityRequest {
  title: string;
  description?: string;
  amount: number;
  status: OpportunityStatus;
  clientId: string;
  expectedCloseDate?: Date;
}

export interface UpdateOpportunityRequest
  extends Partial<CreateOpportunityRequest> {}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SortOption {
  field: string;
  direction: "asc" | "desc";
}

export interface FilterOption {
  field: string;
  value: any;
  operator: "eq" | "ne" | "gt" | "lt" | "gte" | "lte" | "contains" | "in";
}

export interface ListQuery {
  page?: number;
  limit?: number;
  sort?: SortOption;
  filters?: FilterOption[];
  search?: string;
}

export interface DashboardStats {
  totalClients: number;
  totalOpportunities: number;
  totalRevenue: number;
  conversionRate: number;
  opportunitiesByStatus: Record<OpportunityStatus, number>;
}

export interface ClientStats {
  clientId: string;
  opportunitiesCount: number;
  totalAmount: number;
  wonOpportunities: number;
  lostOpportunities: number;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: ValidationError[];
}
