import { supabase } from './supabase';

export interface Model {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnail: string;
  category: string;
  duration?: string;
  source?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Admin {
  email: string;
  password: string;
}

// Model Operations
export const saveModel = async (model: { name: string; description: string; imageUrl: string; category?: string }): Promise<void> => {
  const { error } = await supabase
    .from('models')
    .insert({
      name: model.name,
      description: model.description,
      image_url: model.imageUrl,
      category: model.category || 'Other',
      status: 'pending', // New uploads require approval
    });

  if (error) {
    throw new Error(`Failed to save model: ${error.message}`);
  }
};

export const updateModel = async (id: string, model: { name: string; description: string; imageUrl?: string; category?: string }): Promise<void> => {
  const updateData: Record<string, string> = {
    name: model.name,
    description: model.description,
  };

  if (model.imageUrl) {
    updateData.image_url = model.imageUrl;
  }

  if (model.category) {
    updateData.category = model.category;
  }

  const { error } = await supabase
    .from('models')
    .update(updateData)
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to update model: ${error.message}`);
  }
};

export const getModels = async (): Promise<Model[]> => {
  const { data, error } = await supabase
    .from('models')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch models: ${error.message}`);
  }

  return (data || []).map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    imageUrl: item.image_url,
    category: item.category || 'Other',
    status: item.status || 'approved',
    createdAt: item.created_at,
  }));
};

// Get only approved models (for public gallery)
export const getApprovedModels = async (): Promise<Model[]> => {
  const { data, error } = await supabase
    .from('models')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch approved models: ${error.message}`);
  }

  return (data || []).map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    imageUrl: item.image_url,
    category: item.category || 'Other',
    status: item.status,
    createdAt: item.created_at,
  }));
};

// Get pending models (for admin approval)
export const getPendingModels = async (): Promise<Model[]> => {
  const { data, error } = await supabase
    .from('models')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch pending models: ${error.message}`);
  }

  return (data || []).map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    imageUrl: item.image_url,
    category: item.category || 'Other',
    status: item.status,
    createdAt: item.created_at,
  }));
};

// Update model status (approve/reject)
export const updateModelStatus = async (id: string, status: 'approved' | 'rejected'): Promise<void> => {
  const { error } = await supabase
    .from('models')
    .update({ status })
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to update model status: ${error.message}`);
  }
};

export const deleteModel = async (id: string): Promise<void> => {
  // First, get the model to find the image URL
  const { data: model, error: fetchError } = await supabase
    .from('models')
    .select('image_url')
    .eq('id', id)
    .maybeSingle();

  if (fetchError) {
    throw new Error(`Failed to fetch model: ${fetchError.message}`);
  }

  // Delete the image from storage if it exists
  if (model?.image_url) {
    const imagePath = model.image_url.split('/').pop();
    if (imagePath) {
      await supabase.storage.from('models').remove([imagePath]);
    }
  }

  // Delete the model record
  const { error } = await supabase
    .from('models')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete model: ${error.message}`);
  }
};

// Image Operations
export const uploadImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('models')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Failed to upload image: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from('models').getPublicUrl(fileName);
  return data.publicUrl;
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
  const imagePath = imageUrl.split('/').pop();
  if (!imagePath) return;

  const { error } = await supabase.storage.from('models').remove([imagePath]);

  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

// Admin Operations
export const adminLogin = async (email: string, password: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .eq('password_hash', password)
    .maybeSingle();

  if (error || !data) {
    return false;
  }

  localStorage.setItem('admin_session', email);
  return true;
};

export const getAdminSession = (): string | null => {
  return localStorage.getItem('admin_session');
};

export const clearAdminSession = (): void => {
  localStorage.removeItem('admin_session');
};

// Video Operations
export const saveVideo = async (video: { 
  title: string; 
  description: string; 
  youtubeUrl: string; 
  thumbnail?: string;
  category: string;
  duration?: string;
  source?: string;
}): Promise<void> => {
  const { error } = await supabase
    .from('videos')
    .insert({
      title: video.title,
      description: video.description,
      youtube_url: video.youtubeUrl,
      thumbnail: video.thumbnail || '',
      category: video.category,
      duration: video.duration || '',
      source: video.source || '',
      status: 'pending',
    });

  if (error) {
    throw new Error(`Failed to save video: ${error.message}`);
  }
};

export const getVideos = async (): Promise<Video[]> => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch videos: ${error.message}`);
  }

  return (data || []).map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    youtubeUrl: item.youtube_url,
    thumbnail: item.thumbnail,
    category: item.category,
    duration: item.duration,
    source: item.source,
    status: item.status || 'approved',
    createdAt: item.created_at,
  }));
};

export const getApprovedVideos = async (): Promise<Video[]> => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch approved videos: ${error.message}`);
  }

  return (data || []).map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    youtubeUrl: item.youtube_url,
    thumbnail: item.thumbnail,
    category: item.category,
    duration: item.duration,
    source: item.source,
    status: item.status,
    createdAt: item.created_at,
  }));
};

export const getPendingVideos = async (): Promise<Video[]> => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch pending videos: ${error.message}`);
  }

  return (data || []).map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    youtubeUrl: item.youtube_url,
    thumbnail: item.thumbnail,
    category: item.category,
    duration: item.duration,
    source: item.source,
    status: item.status,
    createdAt: item.created_at,
  }));
};

export const updateVideoStatus = async (id: string, status: 'approved' | 'rejected'): Promise<void> => {
  const { error } = await supabase
    .from('videos')
    .update({ status })
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to update video status: ${error.message}`);
  }
};

export const updateVideo = async (id: string, video: { 
  title: string; 
  description: string; 
  youtubeUrl: string;
  thumbnail?: string;
  category: string;
  duration?: string;
  source?: string;
}): Promise<void> => {
  const updateData: Record<string, string> = {
    title: video.title,
    description: video.description,
    youtube_url: video.youtubeUrl,
    category: video.category,
  };

  if (video.thumbnail) {
    updateData.thumbnail = video.thumbnail;
  }

  if (video.duration) {
    updateData.duration = video.duration;
  }

  if (video.source) {
    updateData.source = video.source;
  }

  const { error } = await supabase
    .from('videos')
    .update(updateData)
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to update video: ${error.message}`);
  }
};

export const deleteVideo = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete video: ${error.message}`);
  }
};
