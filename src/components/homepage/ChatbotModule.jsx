
    import React, { useState } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { MessageSquare, Send, RefreshCcw, ChevronDown } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';

    const ChatbotModule = () => {
      const [message, setMessage] = useState('');
      const [chatHistory, setChatHistory] = useState([]);
      const [isTyping, setIsTyping] = useState(false);
      const [showPrompts, setShowPrompts] = useState(false);
      const samplePrompts = [
        "Generate a shift report for a patient with pneumonia.",
        "What are common side effects of Metformin?",
        "Help me draft a nursing care plan for post-op recovery.",
      ];

      const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage = { text: message, sender: 'user', id: Date.now() };
        setChatHistory(prev => [...prev, newMessage]);
        setMessage('');
        setIsTyping(true);

        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
        
        const botResponse = { text: `I've received your message: "${newMessage.text}". I am processing your request. This is a placeholder response.`, sender: 'bot', id: Date.now() + 1 };
        setChatHistory(prev => [...prev, botResponse]);
        setIsTyping(false);
      };

      const handlePromptClick = (prompt) => {
        setMessage(prompt);
        setShowPrompts(false);
      };
      
      const handleUndo = () => {
        setChatHistory(prev => prev.slice(0, -2));
      };

      return (
        <section id="chatbot" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="max-w-3xl mx-auto bg-card shadow-xl rounded-lg overflow-hidden border border-border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <div className="p-6 bg-primary text-primary-foreground">
                <h2 className="text-2xl font-serif font-semibold flex items-center">
                  <MessageSquare className="mr-3 h-7 w-7 orthodox-icon-style" />
                  NOAH.RN Assistant
                </h2>
                <p className="text-sm opacity-90">Your AI-powered clinical co-pilot. Ask me anything!</p>
              </div>
              
              <div className="h-96 overflow-y-auto p-6 space-y-4 bg-brand-parchmentWhite/50">
                {chatHistory.map((chat) => (
                  <motion.div 
                    key={chat.id} 
                    className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`max-w-[70%] p-3 rounded-lg shadow ${chat.sender === 'user' ? 'bg-brand-byzantineBlue text-brand-parchmentWhite' : 'bg-gray-200 text-gray-800'}`}>
                      {chat.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div 
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="p-3 rounded-lg bg-gray-200 text-gray-800 flex items-center space-x-1.5 shadow">
                      <motion.div className="w-2.5 h-2.5 bg-brand-emeraldGreen rounded-full animate-focus-glow-dots" style={{animationDelay: '0s'}} />
                      <motion.div className="w-2.5 h-2.5 bg-brand-emeraldGreen rounded-full animate-focus-glow-dots" style={{animationDelay: '0.2s'}} />
                      <motion.div className="w-2.5 h-2.5 bg-brand-emeraldGreen rounded-full animate-focus-glow-dots" style={{animationDelay: '0.4s'}} />
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="p-4 border-t border-border bg-card">
                <AnimatePresence>
                  {showPrompts && (
                    <motion.div 
                      className="mb-2 space-y-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {samplePrompts.map((prompt, i) => (
                        <Button key={i} variant="outline" size="sm" className="w-full justify-start text-left text-xs hover:bg-brand-emeraldGreen/10 hover:text-brand-emeraldGreen border-brand-emeraldGreen/30 text-foreground/70" onClick={() => handlePromptClick(prompt)}>
                          {prompt}
                        </Button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <div className="relative flex-grow">
                    <Input 
                      type="text" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message or ask a question..."
                      className="pr-10 focus:ring-2 focus:ring-brand-emeraldGreen focus:border-brand-emeraldGreen chatbot-input-field"
                    />
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-foreground/60 hover:text-brand-emeraldGreen"
                      onClick={() => setShowPrompts(!showPrompts)}
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${showPrompts ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
                  <Button type="submit" className="bg-brand-emeraldGreen hover:bg-brand-emeraldGreen/90 text-white ripple-effect" disabled={isTyping}>
                    <Send className="h-5 w-5" />
                  </Button>
                  {chatHistory.length > 0 && !isTyping && (
                     <Button type="button" variant="outline" size="icon" onClick={handleUndo} title="Undo last query" className="text-foreground/60 hover:text-brand-vermilionRed border-border hover:border-brand-vermilionRed/50">
                       <RefreshCcw className="h-4 w-4" />
                     </Button>
                  )}
                </form>
                 <style jsx>{`
                  .chatbot-input-field:focus {
                    box-shadow: 0 0 8px var(--colors-brand-emeraldGreen);
                  }
                `}</style>
              </div>
            </motion.div>
          </div>
        </section>
      );
    };

    export default ChatbotModule;
  