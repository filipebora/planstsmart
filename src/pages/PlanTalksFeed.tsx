import React, { useState, useEffect } from 'react';
import { Home, Search, Heart, User, PenSquare, MoreHorizontal, MessageCircle, Repeat2, Send, Image as ImageIcon } from 'lucide-react';
import { plantalksApi, type Post } from '../lib/supabase/plantalks';
import toast from 'react-hot-toast';

const PlanTalksFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState('for-you');
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await plantalksApi.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!newPostContent.trim()) {
      toast.error('Please write something to post');
      return;
    }

    setIsPublishing(true);
    try {
      await plantalksApi.createPost(newPostContent);
      toast.success('Post published successfully!');
      setNewPostContent('');
      await loadPosts();
    } catch (error) {
      console.error('Error publishing post:', error);
      toast.error('Failed to publish post');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      await plantalksApi.likePost(postId);
      await loadPosts();
      toast.success('Post liked!');
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error('Failed to like post');
    }
  };

  const handleRepost = async (postId: string) => {
    try {
      await plantalksApi.repost(postId);
      await loadPosts();
      toast.success('Post reposted!');
    } catch (error) {
      console.error('Error reposting:', error);
      toast.error('Failed to repost');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Carregando posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <img
              src="https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg"
              alt="Logo"
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('for-you')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'for-you'
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Para você
              </button>
              <button
                onClick={() => setActiveTab('following')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'following'
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Seguindo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto pb-16">
        {/* New Post Form */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-start space-x-4">
            <img
              src="https://agenciainfra.com/blog/wp-content/uploads/2021/09/bolsonaro-foto-fabio-rodrigues-pozzebom-agencia-brasil.jpg"
              alt="Your avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="O que está acontecendo?"
                className="w-full resize-none border-0 bg-transparent text-gray-900 placeholder-gray-500 focus:ring-0 text-lg"
                rows={3}
              />
              <div className="flex justify-between items-center mt-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <ImageIcon className="h-5 w-5" />
                </button>
                <button
                  className="px-4 py-1.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
                  onClick={handlePublish}
                  disabled={isPublishing || !newPostContent.trim()}
                >
                  {isPublishing ? 'Publicando...' : 'Publicar'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="divide-y divide-gray-100">
          {posts.map(post => (
            <article key={post.id} className="p-4">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={post.user_avatar || 'https://via.placeholder.com/40'}
                    alt={post.user_name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-sm font-medium text-gray-900">{post.user_name}</h2>
                    <span className="text-sm text-gray-500">· {formatDate(post.created_at)}</span>
                    <button className="ml-auto text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <p className="mt-1 text-gray-900 whitespace-pre-line">{post.content}</p>
                  
                  {post.image_url && (
                    <div className="mt-3 rounded-xl overflow-hidden">
                      <img
                        src={post.image_url}
                        alt="Post image"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}

                  <div className="mt-3 flex items-center space-x-6">
                    <button 
                      className="text-gray-500 hover:text-red-500 flex items-center group transition-colors"
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span className="ml-2">{post.likes_count || 0}</span>
                    </button>
                    <button className="text-gray-500 hover:text-gray-900 flex items-center group transition-colors">
                      <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span className="ml-2">{post.comments_count || 0}</span>
                    </button>
                    <button 
                      className="text-gray-500 hover:text-green-500 flex items-center group transition-colors"
                      onClick={() => handleRepost(post.id)}
                    >
                      <Repeat2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span className="ml-2">{post.reposts_count || 0}</span>
                    </button>
                    <button className="text-gray-500 hover:text-blue-500 group transition-colors">
                      <Send className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {posts.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Nenhum post encontrado. Seja o primeiro a publicar!
            </div>
          )}
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between py-3">
            <button className="text-gray-900">
              <Home className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-gray-900 transition-colors">
              <Search className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-gray-900 transition-colors">
              <PenSquare className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-gray-900 transition-colors">
              <Heart className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-gray-900 transition-colors">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default PlanTalksFeed;