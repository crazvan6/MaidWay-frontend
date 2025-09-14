// Main TypeScript type definitions

/**
 * Navigation types for Expo Router
 */
export type RootStackParamList = {
  '(tabs)': undefined;
  modal: undefined;
  '+not-found': undefined;
};

/**
 * Tab navigation types
 */
export type TabParamList = {
  index: undefined;
  explore: undefined;
};

/**
 * Common API response types
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * User types
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Authentication types
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

/**
 * Form validation types
 */
export interface FormField {
  value: string;
  error: string | null;
  touched: boolean;
}

export interface FormState {
  [key: string]: FormField;
}

/**
 * Common component props
 */
export interface BaseComponentProps {
  children?: React.ReactNode;
  className?: string;
  style?: any;
}

/**
 * Loading states
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Generic error type
 */
export interface AppError {
  message: string;
  code?: string;
  details?: any;
}
