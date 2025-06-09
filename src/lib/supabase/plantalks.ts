import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface Post {
  id: string;
  content: string;
  image_url?: string;
  created_at: string;
  user_name: string;
  user_avatar: string;
  likes_count: number;
  comments_count: number;
  reposts_count: number;
}

export const plantalksApi = {
  async getPosts() {
    const { data, error } = await supabase
      .from('plantalks_posts_with_metrics')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Post[];
  },

  async createPost(content: string, image_url?: string) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('plantalks_posts')
      .insert([{ content, image_url, user_id: session.user.id }])
      .select();

    if (error) throw error;
    return data[0];
  },

  async likePost(postId: string) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('plantalks_likes')
      .insert([{ post_id: postId, user_id: session.user.id }]);

    if (error) throw error;
  },

  async repost(postId: string) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('plantalks_reposts')
      .insert([{ post_id: postId, user_id: session.user.id }]);

    if (error) throw error;
  }
};