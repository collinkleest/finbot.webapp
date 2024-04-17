
import { create } from 'zustand'

export interface IUser {
    firstName: string
    lastName: string
    email: string
    threads: string[]
    _id: string
}

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user: IUser) => set({ user }),
}))