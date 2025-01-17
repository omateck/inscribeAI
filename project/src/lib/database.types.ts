export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      content_items: {
        Row: {
          id: string
          created_at: string
          title: string
          content: string
          type: 'article' | 'social' | 'email' | 'product'
          user_id: string
          seo_score: number
          status: 'draft' | 'published'
          keywords: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          content: string
          type: 'article' | 'social' | 'email' | 'product'
          user_id: string
          seo_score?: number
          status?: 'draft' | 'published'
          keywords?: string[]
        }
        Update: {
          title?: string
          content?: string
          seo_score?: number
          status?: 'draft' | 'published'
          keywords?: string[]
        }
      }
      user_profiles: {
        Row: {
          id: string
          created_at: string
          full_name: string
          plan: 'free' | 'basic' | 'pro' | 'enterprise'
          words_used: number
          words_limit: number
        }
        Insert: {
          id: string
          full_name: string
          plan?: 'free' | 'basic' | 'pro' | 'enterprise'
          words_used?: number
          words_limit?: number
        }
        Update: {
          full_name?: string
          plan?: 'free' | 'basic' | 'pro' | 'enterprise'
          words_used?: number
          words_limit?: number
        }
      }
    }
  }
}