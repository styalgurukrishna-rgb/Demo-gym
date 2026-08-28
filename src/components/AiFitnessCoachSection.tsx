import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  RefreshCw,
  Zap,
  HelpCircle,
  Volume2
} from 'lucide-react';
import { soundManager } from './common/SoundEffects';
import { GYM_INFO } from '../data/gymData';

interface AiFitnessCoachSectionProps {
  onOpenTrial: () => void;
  onOpenJoin: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    action: 'trial' | 'join' | 'whatsapp';
  };
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-0',
    sender: 'ai',
    text: "Welcome to KSG DEMO GYM! I am Coach AERO, your AI Sports Science & Fitness Assistant. Ask me anything about fat loss, muscle hypertrophy, macro nutrition, our Panatta equipment, or which membership plan fits your goals best!",
    timestamp: 'Just now',
    suggestedAction: {
      label: 'Book 1-on-1 Free Trial',
      action: 'trial',
    },
  },
];

const PRESET_QUESTIONS = [
  "How can I lose 5kg in 6 weeks safely?",
  "Which membership plan is best for me?",
  "What should I eat before and after morning training?",
  "How do Panatta machines protect my joints?",
  "I am a complete beginner. How does KSG start my journey?",
];

const KNOWLEDGE_BASE: Record<string, { answer: string; action?: { label: string; action: 'trial' | 'join' | 'whatsapp' } }> = {
  "How can I lose 5kg in 6 weeks safely?": {
    answer: "To lose 5kg safely in 6 weeks (approx 0.8kg/week):\n\n1. **Caloric Deficit**: Create a 500-600 kcal deficit below your TDEE.\n2. **High Protein**: Consume 2.0g - 2.2g of protein per kg of bodyweight to preserve lean muscle while stripping body fat.\n3. **Resistance Training**: Train 4x weekly on our Panatta isolateral machines with progressive overload.\n4. **Cardio Conditioning**: Add 20-30 mins of zone-2 cardio or HIIT on Woodway curved treadmills.\n5. **Hydration & Sleep**: Drink 3.5L of water and get 7.5+ hours of sleep to manage cortisol.\n\nOur certified coaches can map your exact InBody 770 composition during a free trial session!",
    action: {
      label: 'Book Free Trial Assessment',
      action: 'trial',
    },
  },
  "Which membership plan is best for me?": {
    answer: "Here is our quick membership guide:\n\n• **Standard Monthly (₹2,999/mo)**: Ideal if you want flexible gym floor access, cardio theater & locker rooms with zero lock-in.\n• **Quarterly Pro (₹7,499 / 3 Mos)**: Best for dedicated 90-day transformations. Includes 2 InBody scans, custom macro split & nutrition consultation.\n• **Annual Elite VIP (₹21,999 / Year - Most Popular)**: Complete VIP experience with 24/7 unlimited access, Finnish infrared sauna & cold plunge suite, 4 private 1-on-1 PT sessions, and guest passes.\n\nWould you like to explore our current promotion?",
    action: {
      label: 'Explore Pricing Plans',
      action: 'join',
    },
  },
  "What should I eat before and after morning training?": {
    answer: "Optimal Pre & Post Workout Protocol:\n\n🥣 **Pre-Workout (45-60 mins before)**:\n• Easy-to-digest complex carbs + light protein.\n• Examples: Oatmeal with half a scoop of whey, or a banana with 1 tbsp peanut butter.\n• 300ml water + black coffee / electrolytes.\n\n🍗 **Post-Workout (Within 60 mins)**:\n• 25-35g high-biological-value protein (Whey isolate or grilled chicken/tofu).\n• 40-60g fast-acting carbs (Rice, sweet potato, or our Macro Fuel Bar shake) to replenish muscle glycogen.",
    action: {
      label: 'Visit Fuel & Shake Bar',
      action: 'trial',
    },
  },
  "How do Panatta machines protect my joints?": {
    answer: "Panatta is handcrafted in Italy with patented physiological converging and diverging movement arcs.\n\nUnlike traditional linear machines that force your joints into fixed, unnatural paths, Panatta matches the natural biomechanical axis of human muscles.\n\n**Key Benefits**:\n1. 100% continuous tension at peak contraction.\n2. Zero shear stress on rotator cuffs, knees, and lower back.\n3. Isolateral arms to fix left/right muscular imbalances.",
    action: {
      label: 'Experience Panatta in Person',
      action: 'trial',
    },
  },
  "I am a complete beginner. How does KSG start my journey?": {
    answer: "We love coaching beginners! Here is our 3-Step Orientation:\n\n1. **Day 1 InBody 770 Assessment**: We analyze your body fat, skeletal muscle, and posture symmetry.\n2. **Master Coach Walkthrough**: A CSCS certified trainer guides you through machine adjustments, proper grip, and lifting breathing techniques.\n3. **Custom Starter Split**: You receive a structured 3-day full-body split in your member app.\n\nNo intimidating crowds—our staff is always on the floor to spot you!",
    action: {
      label: 'Claim Day 1 Beginner Pass',
      action: 'trial',
    },
  },
};

export const AiFitnessCoachSection: React.FC<AiFitnessCoachSectionProps> = ({
  onOpenTrial,
  onOpenJoin,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesFeedRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const scrollChatToBottom = () => {
    if (messagesFeedRef.current) {
      messagesFeedRef.current.scrollTop = messagesFeedRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollChatToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    soundManager.playClick();

    // 1. Append User Message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // 2. Simulated AI response delay
    setTimeout(() => {
      let matchedResponse = KNOWLEDGE_BASE[text];

      // Fallback matching
      if (!matchedResponse) {
        const lower = text.toLowerCase();
        if (lower.includes('weight') || lower.includes('fat') || lower.includes('diet')) {
          matchedResponse = KNOWLEDGE_BASE["How can I lose 5kg in 6 weeks safely?"];
        } else if (lower.includes('price') || lower.includes('cost') || lower.includes('plan') || lower.includes('membership')) {
          matchedResponse = KNOWLEDGE_BASE["Which membership plan is best for me?"];
        } else if (lower.includes('equipment') || lower.includes('panatta') || lower.includes('machine')) {
          matchedResponse = KNOWLEDGE_BASE["How do Panatta machines protect my joints?"];
        } else if (lower.includes('beginner') || lower.includes('start') || lower.includes('new')) {
          matchedResponse = KNOWLEDGE_BASE["I am a complete beginner. How does KSG start my journey?"];
        } else {
          matchedResponse = {
            answer: `Great question regarding "${text}"! At KSG DEMO GYM, our certified CSCS coaches create 100% personalized exercise routines and nutrition protocols. We recommend trying our zero-cost InBody 770 assessment during a complimentary trial pass where our head coach can inspect your form and answer all your questions in person!`,
            action: {
              label: 'Book Free Trial Assessment',
              action: 'trial',
            },
          };
        }
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: matchedResponse.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: matchedResponse.action,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (actionType: 'trial' | 'join' | 'whatsapp') => {
    soundManager.playClick();
    if (actionType === 'trial') {
      onOpenTrial();
    } else if (actionType === 'join') {
      onOpenJoin();
    } else if (actionType === 'whatsapp') {
      window.open(`https://wa.me/${GYM_INFO.whatsapp.replace('+', '')}?text=Hi%20Coach%2C%20I%20have%20a%20question%20from%20the%20AI%20Coach%20section`, '_blank');
    }
  };

  return (
    <section id="ai-coach" className="relative py-24 bg-[#0A0A0E] border-t border-white/10 overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-red-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-[#D4AF37]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-[#D4AF37]/10">
            <Bot className="w-3.5 h-3.5" />
            <span>24/7 Smart Sports Science Assistant</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white leading-tight">
            KSG AI <span className="bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#D4AF37] bg-clip-text text-transparent">FITNESS COACH</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light">
            Ask our AI coach about customized workout splits, macro nutrition targets, recovery protocols, or membership recommendations.
          </p>
        </div>

        {/* Chat Window Container */}
        <div className="rounded-3xl bg-[#121218] border border-white/15 shadow-2xl overflow-hidden flex flex-col min-h-[560px] max-h-[700px]">
          {/* Chat Header Bar */}
          <div className="p-4 sm:p-5 bg-[#161620] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#DC2626] to-[#D4AF37] p-[1.5px]">
                  <div className="w-full h-full bg-[#0D0D12] rounded-[14px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#161620]" />
              </div>

              <div>
                <h4 className="text-sm font-black text-white font-['Syne',sans-serif] flex items-center gap-1.5">
                  <span>Coach AERO</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    Online 24/7
                  </span>
                </h4>
                <p className="text-[11px] text-neutral-400 font-light">
                  KSG Master Biomechanics & Nutrition Engine
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                setMessages(INITIAL_MESSAGES);
              }}
              title="Reset conversation"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* Chat Messages Feed Area */}
          <div ref={messagesFeedRef} className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#0E0E14]/80 scroll-smooth">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#D4AF37] p-[1px] shrink-0 mt-0.5">
                    <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center text-[#D4AF37]">
                      <Bot className="w-4 h-4" />
                    </div>
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white rounded-tr-none shadow-lg'
                        : 'bg-[#181822] text-neutral-200 border border-white/10 rounded-tl-none shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Suggested Action CTA Button inside AI Message */}
                  {msg.suggestedAction && (
                    <div className="pt-1">
                      <button
                        onClick={() => handleActionClick(msg.suggestedAction!.action)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-105"
                      >
                        <Sparkles className="w-3 h-3 text-[#FDE047]" />
                        <span>{msg.suggestedAction.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <span className="text-[10px] text-neutral-500 block px-1">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mt-0.5 text-neutral-300">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#D4AF37] p-[1px]">
                  <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center text-[#D4AF37]">
                    <Bot className="w-4 h-4" />
                  </div>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-[#181822] border border-white/10 rounded-tl-none flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.4s]" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Preset Question Pills Bar */}
          <div className="p-3 bg-[#13131C] border-t border-white/5 overflow-x-auto flex items-center gap-2 no-scrollbar">
            <span className="text-[10px] uppercase font-bold text-neutral-400 shrink-0 flex items-center gap-1 pl-1">
              <Zap className="w-3 h-3 text-[#D4AF37]" />
              Quick Prompts:
            </span>
            {PRESET_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/50 text-neutral-300 hover:text-white text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-4 bg-[#161622] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about workouts, diet, macros, equipment..."
              className="flex-1 py-3 px-4 rounded-xl bg-black/50 border border-white/15 text-white text-xs sm:text-sm placeholder-neutral-500 focus:border-[#D4AF37] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-3 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-md shadow-red-600/30 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
