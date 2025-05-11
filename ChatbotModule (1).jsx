
    import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { useToast } from "@/components/ui/use-toast";
    import { supabase } from '@/lib/supabaseClient';

    import ChatbotHeader from '@/components/homepage/chatbot/ChatbotHeader';
    import ChatHistoryDisplay from '@/components/homepage/chatbot/ChatHistoryDisplay';
    import SamplePromptsDisplay from '@/components/homepage/chatbot/SamplePromptsDisplay';
    import ChatbotInputForm from '@/components/homepage/chatbot/ChatbotInputForm';

    const ChatbotModule = () => {
      const [message, setMessage] = useState('');
      const [chatHistory, setChatHistory] = useState([]);
      const [isTyping, setIsTyping] = useState(false);
      const [isLoadingHistory, setIsLoadingHistory] = useState(true);
      const [showPrompts, setShowPrompts] = useState(false);
      const { toast } = useToast();

      const samplePrompts = [
        "Generate a shift report for a patient with pneumonia.",
        "What are common side effects of Metformin?",
        "Help me draft a nursing care plan for post-op recovery.",
      ];

      useEffect(() => {
        fetchChatHistory();
      }, []);

      const fetchChatHistory = async () => {
        setIsLoadingHistory(true);
        try {
          const { data, error } = await supabase
            .from('chat_messages')
            .select('*')
            .order('created_at', { ascending: true })
            .limit(50);

          if (error) {
            throw error;
          }
          setChatHistory(data.map(msg => ({
            id: msg.id,
            text: msg.content,
            sender: msg.sender_type, 
            timestamp: msg.created_at,
          })));
        } catch (error) {
          console.error('Error fetching chat history:', error);
          toast({
            title: "Error",
            description: "Could not load chat history. Please try again later.",
            variant: "destructive",
          });
        } finally {
          setIsLoadingHistory(false);
        }
      };
      
      const saveMessageToDb = async (text, senderType, userId = null, senderId = null) => {
        try {
          const messageToSave = { 
            content: text, 
            sender_type: senderType,
            user_id: userId, 
            sender_id: senderId || (senderType === 'user' ? userId : 'homepage_ai_noah_rn')
          };

          const { data, error } = await supabase
            .from('chat_messages')
            .insert([messageToSave])
            .select();
          if (error) throw error;
          return data[0];
        } catch (error) {
          console.error('Error saving message:', error);
          toast({
            title: "Error",
            description: "Could not save message. Please try again.",
            variant: "destructive",
          });
          return null;
        }
      };


      const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMessageText = message;
        setMessage(''); 
        
        const userMessageForDisplay = { text: userMessageText, sender: 'user', id: Date.now() };
        setChatHistory(prev => [...prev, userMessageForDisplay]);
        
        const savedUserMessage = await saveMessageToDb(userMessageText, 'user', null, 'anonymous_homepage_user');
        if (savedUserMessage) {
           setChatHistory(prev => prev.map(msg => msg.id === userMessageForDisplay.id ? {...msg, id: savedUserMessage.id, timestamp: savedUserMessage.created_at} : msg));
        }
        
        setIsTyping(true);

        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
        
        const botResponseText = `I've received your message: "${userMessageText}". This is a placeholder response from the AI.`;
        const botMessageForDisplay = { text: botResponseText, sender: 'bot', id: Date.now() + 1 };
        setChatHistory(prev => [...prev, botMessageForDisplay]);

        const savedBotMessage = await saveMessageToDb(botResponseText, 'ai', null, 'homepage_ai_noah_rn');
         if (savedBotMessage) {
           setChatHistory(prev => prev.map(msg => msg.id === botMessageForDisplay.id ? {...msg, id: savedBotMessage.id, timestamp: savedBotMessage.created_at} : msg));
         }

        setIsTyping(false);
      };

      const handlePromptClick = (prompt) => {
        setMessage(prompt);
        setShowPrompts(false);
      };
      
      const handleUndo = async () => {
        if (chatHistory.length < 2) return;
      
        const userMessageToRemove = chatHistory[chatHistory.length - 2];
        const botMessageToRemove = chatHistory[chatHistory.length - 1];
      
        setChatHistory(prev => prev.slice(0, -2));
      
        try {
          if (userMessageToRemove && userMessageToRemove.id && typeof userMessageToRemove.id !== 'number') {
            const { error: userError } = await supabase.from('chat_messages').delete().match({ id: userMessageToRemove.id });
            if (userError) throw userError;
          }
      
          if (botMessageToRemove && botMessageToRemove.id && typeof botMessageToRemove.id !== 'number') {
            const { error: botError } = await supabase.from('chat_messages').delete().match({ id: botMessageToRemove.id });
            if (botError) throw botError;
          }
        } catch (error) {
          console.error('Error undoing messages:', error);
          toast({
            title: "Error",
            description: "Could not undo messages from database. Chat history might be inconsistent.",
            variant: "destructive",
          });
          fetchChatHistory();
        }
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
              <ChatbotHeader />
              <ChatHistoryDisplay 
                chatHistory={chatHistory}
                isTyping={isTyping}
                isLoadingHistory={isLoadingHistory}
              />
              <div className="p-4 border-t border-border bg-card">
                <SamplePromptsDisplay 
                  samplePrompts={samplePrompts}
                  onPromptClick={handlePromptClick}
                  showPrompts={showPrompts}
                />
                <ChatbotInputForm
                  message={message}
                  setMessage={setMessage}
                  handleSendMessage={handleSendMessage}
                  isTyping={isTyping}
                  isLoadingHistory={isLoadingHistory}
                  showPrompts={showPrompts}
                  setShowPrompts={setShowPrompts}
                  chatHistory={chatHistory}
                  handleUndo={handleUndo}
                />
              </div>
            </motion.div>
          </div>
        </section>
      );
    };

    export default ChatbotModule;
  