import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type ContentItem = Database['public']['Tables']['content_items']['Row'];
type ContentType = ContentItem['type'];

export function useContent() {
  const [loading, setLoading] = useState(false);

  const createContent = async (
    title: string,
    content: string,
    type: ContentType,
    userId: string,
    keywords: string[] = []
  ) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('content_items')
        .insert({
          title,
          content,
          type,
          user_id: userId,
          keywords,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  const getUserContent = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (
    id: string,
    updates: Database['public']['Tables']['content_items']['Update']
  ) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('content_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createContent,
    getUserContent,
    updateContent,
  };
}