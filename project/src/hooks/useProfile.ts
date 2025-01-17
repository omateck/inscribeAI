import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type UserProfile = Database['public']['Tables']['user_profiles']['Row'];

export function useProfile() {
  const [loading, setLoading] = useState(false);

  const getUserProfile = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (
    userId: string,
    updates: Database['public']['Tables']['user_profiles']['Update']
  ) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  const updateWordCount = async (userId: string, newWords: number) => {
    const profile = await getUserProfile(userId);
    if (!profile) throw new Error('Profile not found');

    const updatedWordsUsed = profile.words_used + newWords;
    if (updatedWordsUsed > profile.words_limit) {
      throw new Error('Word limit exceeded');
    }

    return await updateProfile(userId, {
      words_used: updatedWordsUsed,
    });
  };

  return {
    loading,
    getUserProfile,
    updateProfile,
    updateWordCount,
  };
}