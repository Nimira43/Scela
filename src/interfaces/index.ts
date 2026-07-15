export interface IUser {
  id: string
  email: string
  password: string
  name: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
  is_active: boolean
}

export interface IMovie {
  id: string
  name: string
  description: string
  release_date: string
  genre: string[]
  poster_url: string
  duration: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ITheatre {
  id: string
  name: string
  location: string
  capacity: number
  created_at: string
  updated_at: string
  is_active: boolean
}