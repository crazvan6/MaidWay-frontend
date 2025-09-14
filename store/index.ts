// State management setup (using Zustand - lightweight alternative to Redux)

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * Global app state interface
 */
interface AppState {
  // Theme state
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  
  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Error handling
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // User preferences
  preferences: {
    notifications: boolean;
    language: string;
  };
  updatePreferences: (preferences: Partial<AppState['preferences']>) => void;
}

/**
 * Main app store
 */
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Theme
        theme: 'system',
        setTheme: (theme) => set({ theme }),
        
        // Loading
        isLoading: false,
        setLoading: (isLoading) => set({ isLoading }),
        
        // Error handling
        error: null,
        setError: (error) => set({ error }),
        clearError: () => set({ error: null }),
        
        // Preferences
        preferences: {
          notifications: true,
          language: 'en',
        },
        updatePreferences: (newPreferences) =>
          set((state) => ({
            preferences: { ...state.preferences, ...newPreferences },
          })),
      }),
      {
        name: 'app-storage', // unique name for localStorage
        partialize: (state) => ({
          theme: state.theme,
          preferences: state.preferences,
        }),
      }
    ),
    {
      name: 'app-store', // name for devtools
    }
  )
);

/**
 * Selectors for common state access
 */
export const useTheme = () => useAppStore((state) => state.theme);
export const useIsLoading = () => useAppStore((state) => state.isLoading);
export const useError = () => useAppStore((state) => state.error);
export const usePreferences = () => useAppStore((state) => state.preferences);
