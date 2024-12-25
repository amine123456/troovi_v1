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
      items: {
        Row: {
          id: string
          owner_name: string
          email: string
          phone: string
          item_name: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          owner_name: string
          email: string
          phone: string
          item_name: string
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          owner_name?: string
          email?: string
          phone?: string
          item_name?: string
          description?: string
          created_at?: string
        }
      }
    }
  }
}