'use server'

import supabase from '@/config/supabase-config'

export const uploadFileAndGetUrl = async (file: File) => {
  try {
    const fileName = `${Date.now()}-${file.name}`
    const uploadResponse = await supabase.storage
      .from('default')
      .upload(fileName, file)

    if (!uploadResponse.data) {
      throw new Error(uploadResponse.error?.message || 'File upload failed.')
    }

    const { data } = supabase.storage
      .from('default')
      .getPublicUrl(fileName)

    return {
      success: true,
      message: 'File uploaded successfully.',
      data: data.publicUrl
    }

  } catch (error: any) {
    return {
      success: false,
      message: error.message
    }
  }
}