
    import React, { useState, useEffect, useRef, useCallback } from 'react';
    import { Send, Loader2 } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Textarea } from '@/components/ui/textarea';
    import { useToast } from "@/components/ui/use-toast";
    import { supabase } from '@/lib/supabaseClient';
    import { useAuth } from '@/contexts/AuthContext';
    import ConversationView from '@/components/chat/ConversationView';
    import LoadingSpinner from '@/components/shared/LoadingSpinner';

    const ChatInput = ({ onSendMessage, isLoading }) => {
      const [inputValue, setInputValue] = useState('');
      const inputRef = useRef(null);

      const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() && !isLoading) {
          onSendMessage(inputValue);
          setInputValue('');
        }
      };
      
      const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSubmit(e);
        }
      };

      useEffect(() => {
        if (!isLoading) {
          inputRef.current?.focus();
        }
      }, [isLoading]);

      return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-brand-byzantineBlue/30 dark:border-brand-goldOchre/30 bg-brand-parchmentWhite dark:bg-brand-deepPurple/50 shadow-lg">
          <div className="flex items-end space-x-2">
            <Textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message or ask a clinical question..."
              className="flex-grow resize-none focus:ring-1 focus:ring-brand-emeraldGreen focus:border-brand-emeraldGreen p-3 min-h-[50px] max-h-[150px] bg-white dark:bg-brand-deepPurple/30 dark:text-brand-parchmentWhite dark:placeholder-gray-400 dark:border-brand-byzantineBlue/50"
              rows={1}
              disabled={isLoading}
            />
            <Button type="submit" className="bg-brand-byzantineBlue hover:bg-brand-byzantineBlue/90 text-brand-parchmentWhite h-[50px] px-5 ripple-effect focus:ring-2 focus:ring-brand-goldOchre focus:ring-offset-2" disabled={isLoading || !inputValue.trim()}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </div>
        </form>
      );
    };

    const ChatPage = () => {
      const [messages, setMessages] = useState([]);
      const [isSending, setIsSending] = useState(false);
      const [isLoadingHistory, setIsLoadingHistory] = useState(true);
      const { toast } = useToast();
      const { user } = useAuth();

      const addMessage = (message) => {
        setMessages(prev => [...prev, message]);
      };

      const fetchChatHistory = useCallback(async () => {
        if (!user) return;
        setIsLoadingHistory(true);
        try {
          // Placeholder for API Call:
          // const response = await fetch(`/api/chat/history?userId=${user.id}`);
          // if (!response.ok) throw new Error('Failed to fetch chat history');
          // const historyFromApi = await response.json();
          // setMessages(historyFromApi.map(m => ({ ...m, key: m.id })));
          
          const { data, error } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true })
            .limit(100);

          if (error) throw error;
          setMessages(data.map(m => ({ ...m, key: m.id })));
        } catch (error) {
          console.error('Error fetching chat history:', error);
          toast({ title: "Error", description: "Could not load chat history.", variant: "destructive" });
        } finally {
          setIsLoadingHistory(false);
        }
      }, [user, toast]);

      useEffect(() => {
        if (user) {
          fetchChatHistory();
        }
      }, [user, fetchChatHistory]);
      
      const handleSendMessage = async (content) => {
        if (!user) {
          toast({ title: "Authentication Error", description: "You must be logged in to chat.", variant: "destructive" });
          return;
        }
        setIsSending(true);
        
        const tempUserMessageId = `user-${Date.now()}`;
        const userMessage = {
          key: tempUserMessageId, 
          user_id: user.id,
          sender_id: user.id, 
          content: content,
          sender_type: 'user',
          created_at: new Date().toISOString(),
        };
        addMessage(userMessage);

        const tempAiThinkingMessageId = `ai-thinking-${Date.now()}`;
        const aiThinkingMessage = {
          key: tempAiThinkingMessageId,
          user_id: user.id,
          sender_id: 'ai_noah_rn',
          content: "Noah is thinking...",
          sender_type: 'ai',
          isLoading: true, 
          created_at: new Date(Date.now() + 1).toISOString(),
        };
        addMessage(aiThinkingMessage);

        try {
          // Placeholder API Call for sending message and getting AI response:
          // const workspaceChatResponse = await fetch('/api/chat', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ userId: user.id, message: content })
          // });
          // if (!workspaceChatResponse.ok) throw new Error('Failed to get response from Workspace AI');
          // const aiData = await workspaceChatResponse.json();
          // const aiResponseContent = aiData.reply;


          // Save user message to Supabase
          const { data: savedUserMsg, error: userMsgError } = await supabase
            .from('chat_messages')
            .insert({
              user_id: userMessage.user_id,
              sender_id: userMessage.sender_id,
              content: userMessage.content,
              sender_type: userMessage.sender_type,
            })
            .select()
            .single();

          if (userMsgError) {
            setMessages(prev => prev.filter(msg => msg.key !== tempUserMessageId && msg.key !== tempAiThinkingMessageId)); 
            throw userMsgError;
          }
          
          setMessages(prev => prev.map(msg => msg.key === tempUserMessageId ? { ...savedUserMsg, key: savedUserMsg.id } : msg));

          // Simulate AI processing delay
          await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000)); 

          const aiResponseContent = `NOAH.RN processed: "${content}". This is a simulated AI response. I can assist with summarizing patient data, cross-referencing medications, or providing procedural checklists based on established protocols. What would you like help with today?`;
          
          // Save final AI message to Supabase
          const { data: savedAiMsg, error: aiMsgError } = await supabase
            .from('chat_messages')
            .insert({
              user_id: user.id,
              sender_id: 'ai_noah_rn',
              content: aiResponseContent,
              sender_type: 'ai',
            })
            .select()
            .single();
            
          if (aiMsgError) {
             setMessages(prev => prev.filter(msg => msg.key !== tempAiThinkingMessageId));
            throw aiMsgError;
          }
          
          setMessages(prev => prev.map(msg => msg.key === tempAiThinkingMessageId ? { ...savedAiMsg, key: savedAiMsg.id, isLoading: false } : msg));

        } catch (error) {
          console.error('Error sending message or getting AI response:', error);
          toast({ title: "Error", description: "Could not complete chat interaction. " + error.message, variant: "destructive" });
          setMessages(prev => prev.filter(msg => msg.key !== tempUserMessageId && msg.key !== tempAiThinkingMessageId));
        } finally {
          setIsSending(false);
        }
      };

      return (
        <div className="flex flex-col h-[calc(100vh-var(--header-height,8rem))] bg-brand-parchmentWhite dark:bg-brand-deepPurple"> 
          <div className="flex-grow flex flex-col overflow-hidden">
            <ConversationView messages={messages} isLoadingHistory={isLoadingHistory} />
            <ChatInput onSendMessage={handleSendMessage} isLoading={isSending} />
          </div>
        </div>
      );
    };

    export default ChatPage;
  