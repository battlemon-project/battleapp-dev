import { create } from 'zustand'

const unique = (value: string, index: number, self: string[]) => {
  return self.indexOf(value) === index
}

interface ModelsState {
  models: string[]
  putModel: (model: string) => void
  reset: () => void
}

export const useModelsStore = create<ModelsState>()((set) => ({
  models: [],
  putModel: (model) => set((state) => ({ models: [ ...state.models, model ].filter(unique) })),
  reset: () => set(() => ({ models: [] })),
}))