'use server'

import supabase from '@/config/supabase-config'
import { IUser } from '@/interfaces'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const registerUser = async (payload: Partial<IUser>) => {
  const {
    data: existingUser,
    error: existingUserError
  } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', payload.email)
  
  if (existingUserError) {
    return {
      success: false,
      message: existingUserError.message
    }
  }

  if (existingUser && existingUser.length > 0) {
    return {
      success: false,
      message: 'User already exists with this email account.'
    }
  }

  payload.password = await bcrypt.hash(payload.password!, 10)
  
  const { error, data } = await supabase
    .from('user_profiles')
    .insert([payload])

  if (error) {
    return {
      success: false,
      message: error.message
    }
  }

  return {
    success: true,
    message: 'User registered successfully.',
  }
}

export const loginUser = async (payload: Partial<IUser>) => {
  const {
    data: existingUser,
    error: existingUserError
  } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', payload.email)
  
  if (
    existingUserError ||
    !existingUser ||
    existingUser.length === 0
  ) {
    return {
      success: false,
      message: existingUserError?.message || 'User not found.'
    }
  }

  const user = existingUser?.[0]

  const isPasswordValid = await bcrypt.compare(
    payload.password!,
    user?.password || ''
  )
  
  if (!isPasswordValid) {
    return {
      success: false,
      message: 'Invalid email or password.'
    }
  }

  if (user.role !== payload.role) {
    return {
      success: false,
      message: 'Invalid role.'
    }
  }

  const jwtToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: '1d'}
  )

  return {
    success: true,
    message: 'User logged successfully.',
    data: jwtToken
  }
}

export const getLoggedInUser = async () => {
  try {
    const cookiesStore = await cookies()
    const jwtToken = cookiesStore
      .get('token')?.value
    const decodedData = jwt
      .verify(
        jwtToken || '',
        process.env.JWT_SECRET!
    ) 
  } catch (error) {
    return {
      success: false,
      message: 'Error fetching user data.'
    }
  }
}