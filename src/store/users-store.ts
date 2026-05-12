import { IUser } from '@/interfaces'
import { create } from 'zustand'

const usersGlobalStore = create((set) => ({
  user: null,
  setUser: (payload: IUser) => set(() => ({
    user: payload
  }))
}))

export const useUsersStore = usersGlobalStore

export interface IUsersStore {
  user: IUser | null
  setUser: (payload: IUser) => void
}