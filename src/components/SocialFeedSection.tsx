import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Instagram, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Sparkles, 
  ExternalLink, 
  Play, 
  CheckCircle2, 
  Flame,
  Volume2
} from 'lucide-react';
import { soundManager } from './common/SoundEffects';
import { handleImageError } from '../utils/imageFallback';

interface SocialPost {
  id: string;
  image: string;
  likes: string;
  comments: string;
  caption: string;
  tag: string;
  isVideo?: boolean;
}

const POSTS: SocialPost[] = [
  {
    id: 'post-1',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80&fm=webp',
    likes: '2,480',
    comments: '142',
    caption: 'Mastering the isolateral chest press on Italian Panatta machines. Zero joint pain, 100% chest recruitment. #KSGGym #PanattaSports',
    tag: '#Biomechanics',
    isVideo: true,
  },
  {
    id: 'post-2',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80&fm=webp',
    likes: '1,920',
    comments: '98',
    caption: '16-week transformation by member @arjun_k. Lost 14kg of visceral fat while packing 5kg of dense muscle mass! #BeforeAfter #Recomp',
    tag: '#Transformation',
  },
  {
    id: 'post-3',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80&fm=webp',
    likes: '3,110',
    comments: '215',
    caption: 'Morning heavy deadlifts on the calibrated Eleiko Olympic platform. The sound of oak wood and cast iron at 6:00 AM! #Eleiko #Deadlift',
    tag: '#Powerlifting',
    isVideo: true,
  },
  {
    id: 'post-4',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=80&fm=webp',
    likes: '1,640',
    comments: '84',
    caption: 'Post-workout recovery protocol in our Finnish Cedar Infrared Sauna & 4°C Cryo plunge. Speed up repair, drop cortisol! #RecoverySpa',
    tag: '#Biohacking',
  },
];

export const SocialFeedSection: React.FC = () => {
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [selectedVideo, setSelectedVideo] = useState<SocialPost | null>(null);

  const toggleLike = (id: string) => {
    soundManager.playClick();
    setLikedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenInstagram = () => {
    soundManager.playClick();
    window.open('https://instagram.com', '_blank');
  };

  return (
    <section className="relative py-24 bg-[#08080A] border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-pink-950/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-14 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-400 text-xs font-black uppercase tracking-widest mb-3">
              <Instagram className="w-3.5 h-3.5" />
              <span>@ksgdemogym_official</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white leading-tight">
              FOLLOW OUR <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-[#D4AF37] bg-clip-text text-transparent">FITNESS JOURNEY</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-light max-w-xl">
              Daily workout tutorials, raw transformation stories, form breakdowns, and behind-the-scenes energy from Bangalore’s top gym.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenInstagram}
              className="px-6 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-widest bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white shadow-xl shadow-pink-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>FOLLOW ON INSTAGRAM</span>
            </button>
          </div>
        </div>

        {/* Instagram Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POSTS.map((post, idx) => {
            const isLiked = !!likedPosts[post.id];
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-3xl bg-[#121217] border border-white/10 overflow-hidden shadow-2xl hover:border-pink-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-2"
              >
                {/* Post Image Container */}
                <div className="relative aspect-square overflow-hidden bg-black">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Tag Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-black uppercase tracking-wider text-[#D4AF37]">
                    {post.tag}
                  </div>

                  {/* Video Reel Badge */}
                  {post.isVideo && (
                    <div className="absolute top-3 right-3 p-1.5 rounded-full bg-pink-600 text-white shadow-md">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </div>
                  )}

                  {/* Hover Overlay with Stats */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white font-bold text-sm">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-1.5 hover:text-pink-400 transition-colors cursor-pointer"
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                      <span>{isLiked ? '2,481' : post.likes}</span>
                    </button>
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Post Footer Information */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-neutral-300 line-clamp-3 font-light leading-relaxed">
                    {post.caption}
                  </p>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-neutral-400 text-xs">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-neutral-400">
                      <CheckCircle2 className="w-3 h-3 text-pink-500" />
                      Verified Member Post
                    </span>

                    <button
                      onClick={handleOpenInstagram}
                      className="text-[#D4AF37] hover:underline flex items-center gap-1 font-bold text-[11px] cursor-pointer"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
