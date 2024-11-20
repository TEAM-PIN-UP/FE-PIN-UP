import { create } from "zustand";

// View state management
export enum view {
  profileView,
  reviewDetailView,
  notificationsView,
}

export interface ViewStore {
  currentView: view;
  setCurrentView: (view: view) => void;

  reviewId: number;
  setReviewId: (id: number) => void;
}

export const useViewStore = create<ViewStore>((set) => ({
  currentView: view.profileView,
  setCurrentView: (newView) => set({ currentView: newView }),

  reviewId: 0,
  setReviewId: (newId) => set({ reviewId: newId }),
}));
