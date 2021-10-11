import create from "zustand";

interface state{
    query: string
}

export const useStore  = create<state>((set) => ({
    query: "",
    setQuery: () => set((state):state => ({ query: state.query })),
  }));
  