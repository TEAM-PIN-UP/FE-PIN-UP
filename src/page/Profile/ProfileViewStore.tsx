import { create } from "zustand";
import { TransitionDirection } from "../../components/TransitionWrapper";

// View state management
export enum view {
  profileView,
  reviewDetailView,
}

export interface ViewStore {
  currentView: view;
  setCurrentView: (view: view) => void;
  direction: TransitionDirection;
  setTransitionDirection: (direction: TransitionDirection) => void;
  reviewId: number;
  setReviewId: (id: number) => void;
}

export const useViewStore = create<ViewStore>((set) => ({
  currentView: view.profileView,
  setCurrentView: (newView) => set({ currentView: newView }),
  direction: "forward",
  setTransitionDirection: (newDirection) => set({ direction: newDirection }),
  reviewId: 0,
  setReviewId: (newId) => set({ reviewId: newId }),
}));
