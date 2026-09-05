'use server'

import supabase from '@/config/supabase-config'
import { IShow } from '@/interfaces'

export const addShow = async (show: Partial<IShow>) => {
  const { data, error } = await supabase
    .from('shows')
    .insert([show])
    .select('*')

  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }

  return {
    success: true,
    message: 'Show added successfully',
  }
}

export const updateShow = async (id: string, show: Partial<IShow>) => {
  const { data, error } = await supabase
    .from('shows')
    .update(show)
    .eq('id', id)

  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }

  return {
    success: true,
    message: 'Shows updated successfully.',
  }
}

export const deleteShow = async (id: string) => {
  const { data, error } = await supabase.from('shows').delete().eq('id', id)

  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }

  return {
    success: true,
    message: 'Shows deleted successfully.',
  }
}

export const getAllShows = async () => {
  const { data, error } = await supabase
  .from('shows')
  .select('*, movie: movies(*), theatre: theatres(*)')
  .order('created_at', { ascending: false })
  
  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }

  return {
    success: true,
    message: 'Shows fetched successfully.',
    data: data as IShow[],
  }
}

export const getShowById = async (id: string) => {
  const { data, error } = await supabase
  .from('shows')
  .select('*')
  .eq('id', id)
  
  if (error) {
    return {
      success: false,
      message: error.message
    }
  }
  
  if (data.length === 0) {
    return {
      success: false,
      message: 'Show not found.',
    }
  }
  
  const show = data[0]
  
  return {
    success: true,
    message: 'Show fetched successfully.',
    data: show as IShow
  }
}

export const getShowsByMovieId = async (movieId: string) => {
  try {
    const { data, error } = await supabase
      .from('shows')
      .select('* , theatre:theatres(*)')
      .eq('movie_id', movieId)
    
    if (error) {
      return {
        success: false,
        message: error.message
      }
    }

    const groupedData: any = [] 
    const theatreIdsObject: any = {}

    data.forEach((show) => {
      if (theatreIdsObject[show.theatre.id]) {
        const addedObject = groupedData.find(
          (group: any) => group.theatre.id === show.theatre.id
        )
        addedObject.shows.push(show)
      } else {
        groupedData.push({
          theatre: show.theatre,
          show: [show]
        })
      }
    })

    return {
      success: true,
      message: 'Shows fetched successfully.',
      data: groupedData
    }

  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch shows for the movie.'
    }
  }
}
