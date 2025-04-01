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
      rsvps: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          attending: boolean
          number_of_guests: number
          dietary_requirements: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          attending?: boolean
          number_of_guests?: number
          dietary_requirements?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          attending?: boolean
          number_of_guests?: number
          dietary_requirements?: string | null
          created_at?: string
        }
      }
      guest_messages: {
        Row: {
          id: string
          user_id: string
          name: string
          message: string
          approved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          message: string
          approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          message?: string
          approved?: boolean
          created_at?: string
        }
      }
      gallery_photos: {
        Row: {
          id: string
          user_id: string
          photo_url: string
          caption: string | null
          approved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          photo_url: string
          caption?: string | null
          approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          photo_url?: string
          caption?: string | null
          approved?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}