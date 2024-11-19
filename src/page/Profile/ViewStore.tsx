import { create } from "zustand";

// View state management
export enum view {
  profileView,
  reviewDetailView,
}

export interface ViewStore {
  currentView: view;
  setCurrentView: (view: view) => void;
}

export const useViewStore = create<ViewStore>((set) => ({
  currentView: view.profileView,
  setCurrentView: (newView) => set({ currentView: newView }),
}));
