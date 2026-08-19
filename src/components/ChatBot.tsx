import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Ghost, Loader2, BookOpen, Pencil, Check } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

interface ChatBotProps {
  books: any[];
  settings: any;
}

export function ChatBot({ books, settings }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Saludos, buscador de sombras. Soy el Bibliotecario Nocturno. ¿Qué misterio o historia buscas entre nuestros estantes hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const getSystemPrompt = () => {
    const bookList = books.map(b => `- ${b.title} de ${b.author} (${b.category}): ${b.price}`).join('\n');
    return `Eres el Bibliotecario Nocturno de '${settings.storeName}', una librería con una estética gótica, oscura y elegante. 
Tu tono es misterioso, culto, un poco melancólico pero siempre servicial. Hablas en español. 
Te refieres a los libros como 'tomos', 'registros' u 'obras'. Los clientes son 'buscadores de sombras' o 'visitantes'. 
Ayudas con recomendaciones de libros y respondes dudas sobre el catálogo y envíos.
Los envíos se coordinan por WhatsApp (${settings.whatsappNumber}) tras confirmar la orden en el sitio.

Catálogo actual de tomos:
${bookList}

Instrucciones:
1. Sé evocador y mantén el personaje.
2. Si preguntan por un libro que no está, ofrece alternativas de géneros similares (gótico, terror, misterio).
3. Mantén las respuestas relativamente breves (menos de 3 párrafos).
4. No menciones que eres una IA. Eres el Bibliotecario.`;
  };

  const processChat = async (updatedHistory: Message[], newMsgContent: string) => {
    setIsLoading(true);
    setMessages([...updatedHistory, { role: 'user', content: newMsgContent }]);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const systemPrompt = getSystemPrompt();

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: `System Instruction: ${systemPrompt}` }] },
          ...updatedHistory.map(m => ({
            role: m.role === 'user' ? 'user' : 'model' as any,
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: newMsgContent }] }
        ],
      });

      const botResponse = response.text || "Las sombras guardan silencio por un momento... (Error de conexión)";
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "Parece que una neblina ha cubierto mis sentidos. Por favor, intenta consultar de nuevo en un instante." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    await processChat(messages, userMessage);
  };

  const handleEditSubmit = async (index: number, newContent: string) => {
    if (!newContent.trim() || isLoading) return;
    setEditingIndex(null);
    setEditingText('');
    
    // Truncate and replace conversation from edited point onwards
    const historyPrior = messages.slice(0, index);
    await processChat(historyPrior, newContent.trim());
  };

  return (
    <div className="fixed bottom-[80px] right-6 md:bottom-6 md:left-6 z-[600]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-14 md:bottom-16 right-0 md:left-0 w-[350px] max-w-[calc(100vw-48px)] h-[460px] md:h-[500px] flex flex-col bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="p-4 bg-crimson flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black/20 rounded-full">
                  <Ghost className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-serif text-white leading-none">Bibliotecario Nocturno</h3>
                  <span className="text-[9px] uppercase tracking-widest text-white/60">En custodia de las sombras</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`flex group relative ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'user' && editingIndex !== i && (
                    <button
                      onClick={() => {
                        setEditingIndex(i);
                        setEditingText(m.content);
                      }}
                      className="absolute right-[calc(85%+8px)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-black/30 hover:bg-black/60 text-gray-400 hover:text-white rounded border border-white/5"
                      title="Editar mensaje"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      m.role === 'user' 
                        ? 'bg-crimson text-white rounded-tr-none' 
                        : 'bg-white/5 border border-white/5 text-gray-300 rounded-tl-none'
                    }`}
                  >
                    {editingIndex === i ? (
                      <div className="flex flex-col gap-2 min-w-[200px]">
                        <textarea
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:border-white outline-none resize-none h-20"
                          placeholder="Edita tu mensaje..."
                        />
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingIndex(null);
                              setEditingText('');
                            }}
                            type="button"
                            className="p-1 px-2.5 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] uppercase font-bold tracking-wider text-gray-300 transition-all"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={() => handleEditSubmit(i, editingText)}
                            type="button"
                            className="p-1 px-2.5 bg-white hover:bg-gray-100 text-black rounded text-[10px] uppercase font-bold tracking-wider transition-all font-semibold"
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="prose prose-invert prose-sm">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-crimson animate-spin" />
                    <span className="text-xs text-gray-500 italic">Consultando los registros...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Susurra tu pregunta..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-crimson outline-none transition-all"
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="p-2 bg-crimson text-white rounded-xl hover:brightness-125 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 bg-crimson text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(139,0,0,0.4)] hover:scale-110 active:scale-95 transition-all group"
      >
        {isOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <MessageCircle className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110" />}
      </button>
    </div>
  );
}
