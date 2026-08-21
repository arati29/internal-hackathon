import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Globe } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

interface Language {
  code: string;
  name: string;
  greeting: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', greeting: 'Hello! How can I help you explore Indian heritage?', flag: 'EN' },
  { code: 'hi', name: 'हिंदी', greeting: 'नमस्ते! मैं भारतीय विरासत की यात्रा में आपकी कैसे मदद कर सकता हूं?', flag: 'HI' },
  { code: 'ta', name: 'தமிழ்', greeting: 'வணக்கம்! இந்திய பாரம்பரியத்தை ஆராய உதவலாமா?', flag: 'TA' },
  { code: 'bn', name: 'বাংলা', greeting: 'নমস্কার! ভারতের ঐতিহ্য ঘুরে দেখতে কীভাবে সাহায্য করব?', flag: 'BN' },
  { code: 'te', name: 'తెలుగు', greeting: 'నమస్తే! భారత వారసత్వాన్ని అన్వేషించడంలో సహాయం చేయాలా?', flag: 'TE' },
  { code: 'mr', name: 'मराठी', greeting: 'नमस्कार! भारतीय वारसा एक्सप्लोर करण्यात मी कसा मदत करू?', flag: 'MR' },
  { code: 'ml', name: 'മലയാളം', greeting: 'നമസ്കാരം! ഇന്ത്യൻ പൈതൃകം പര്യവേക്ഷണം ചെയ്യാൻ സഹായിക്കണോ?', flag: 'ML' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', greeting: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਭਾਰਤੀ ਵਿਰਾਸਤ ਨੂੰ ਮੁਕਤ ਕਰਨ ਵਿੱਚ ਮੈਂ ਕਿਵੇਂ ਮਦਦ ਕਰਾਂ?', flag: 'PA' },
];

const quickPrompts = [
  'Best time to visit Taj Mahal?',
  'Plan a 3-day Rajasthan trip',
  'What to buy in Jaipur?',
  'Tell me about Hampi ruins',
];

const aiResponses: Record<string, string> = {
  'best time to visit taj mahal':
    'The best time to visit the Taj Mahal is from October to March when the weather is pleasant (15-25°C). For the most stunning photos, arrive at sunrise — the marble glows pink in the morning light. Entry is ₹1,100 for foreigners and ₹50 for Indian citizens. It is closed on Fridays.',
  'plan a 3-day rajasthan trip':
    'Here is a 3-day Rajasthan itinerary:\n\nDay 1: Jaipur — Visit Hawa Mahal, City Palace, and Amber Fort. Explore the bazaars for handicrafts.\n\nDay 2: Jodhpur — Explore Mehrangarh Fort and the blue city streets.\n\nDay 3: Jaisalmer — Visit the golden fort and enjoy a camel safari at Sam Sand Dunes at sunset.\n\nEstimated cost: ₹15,000-25,000 per person.',
  'what to buy in jaipur':
    'Jaipur is a shopper\'s paradise! Must-buy items include:\n\n• Blue Pottery — Hand-painted ceramic vases and tiles\n• Bandhani & Block-print textiles — Vibrant tie-dye fabrics\n• Kundan & Meenakari jewelry — Traditional gemstone jewelry\n• Mojaris — Handcrafted leather footwear\n• Lac bangles — Colorful traditional bangles\n\nHead to Johari Bazaar and Bapu Bazaar for the best deals!',
  'tell me about hampi ruins':
    'Hampi is a UNESCO World Heritage Site in Karnataka, once the capital of the Vijayanagara Empire (14th-16th century). Key highlights:\n\n• Virupaksha Temple — A living temple with a 50m gopuram\n• Stone Chariot — An iconic stone structure inside the Vittala Temple complex\n• Lotus Mahal — Beautiful Indo-Islamic palace\n• Matanga Hill — Best sunset viewpoint\n\nThe surreal boulder-strewn landscape makes it unlike anywhere else in India. Plan 2-3 days to explore fully.',
};

function getAIResponse(text: string): string {
  const lower = text.toLowerCase();
  for (const [key, response] of Object.entries(aiResponses)) {
    if (lower.includes(key)) return response;
  }
  return 'That is a great question! I can help you with travel planning, heritage site information, local cuisine recommendations, and artisan product details. Try asking about specific destinations like "Agra", "Jaipur", or "Varanasi", or request a trip itinerary. You can also browse the Route Planner and Marketplace tabs above!';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedLang, setSelectedLang] = useState('en');
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const lang = languages.find((l) => l.code === selectedLang)!;

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: '1', role: 'assistant', text: lang.greeting }]);
    }
  }, [isOpen, lang.greeting, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const changeLanguage = (code: string) => {
    setSelectedLang(code);
    setShowLangPicker(false);
    const newLang = languages.find((l) => l.code === code)!;
    setMessages([{ id: Date.now().toString(), role: 'assistant', text: newLang.greeting }]);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(text);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', text: response }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-600 text-white shadow-2xl shadow-saffron-500/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all animate-float"
          aria-label="Open AI Chat"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-teal-400 border-2 border-white flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-teal-900 animate-pulse" />
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up border border-cream-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-saffron-600 to-maroon-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Heritage AI Assistant</h3>
                <div className="flex items-center gap-1 text-xs text-white/70">
                  <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
                  Online · {lang.name}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="relative">
                <button
                  onClick={() => setShowLangPicker(!showLangPicker)}
                  className="w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Globe className="w-5 h-5 text-white" />
                </button>
                {showLangPicker && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-cream-200 overflow-hidden z-10 animate-slide-up">
                    <div className="p-2">
                      <div className="text-xs font-semibold text-ink-700/50 px-2 py-1">Select Language</div>
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => changeLanguage(l.code)}
                          className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-colors ${
                            selectedLang === l.code ? 'bg-saffron-50 text-saffron-700 font-semibold' : 'hover:bg-cream-100 text-ink-900'
                          }`}
                        >
                          <span className="w-7 h-5 rounded bg-cream-200 flex items-center justify-center text-xs font-bold text-ink-700/60">{l.flag}</span>
                          {l.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-saffron-500 text-white rounded-br-md'
                      : 'bg-white text-ink-900 rounded-bl-md border border-cream-200 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white border border-cream-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-ink-700/30 animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-2 h-2 rounded-full bg-ink-700/30 animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <span className="w-2 h-2 rounded-full bg-ink-700/30 animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2 bg-cream-50">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="px-3 py-1.5 rounded-full bg-white border border-cream-200 text-xs text-ink-700 hover:border-saffron-300 hover:text-saffron-600 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-cream-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask about destinations, crafts..."
                className="flex-1 px-4 py-2.5 rounded-full bg-cream-100 text-ink-900 placeholder-ink-700/40 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 transition-all"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-saffron-500 text-white flex items-center justify-center hover:bg-saffron-600 disabled:opacity-40 active:scale-90 transition-all flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
