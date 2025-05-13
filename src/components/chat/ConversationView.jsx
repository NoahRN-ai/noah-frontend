
    import React, { useEffect, useRef } from 'react';
    import { Loader2, MessageSquareDashed } from 'lucide-react';
    import ChatMessage from '@/components/chat/ChatMessage';
    import LoadingSpinner from '@/components/shared/LoadingSpinner';

    const ConversationView = ({ messages, isLoadingHistory }) => {
      const messagesEndRef = useRef(null);
      const chatContainerRef = useRef(null);

      useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [messages]);

      if (isLoadingHistory) {
        return (
          <div className="flex-grow flex items-center justify-center p-6 bg-brand-parchmentWhite/30 dark:bg-brand-deepPurple/20">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <LoadingSpinner size="lg" color="text-brand-byzantineBlue dark:text-brand-goldOchre"/>
              <p className="text-lg font-medium mt-3">Loading chat history...</p>
            </div>
          </div>
        );
      }

      if (!messages || messages.length === 0) {
        return (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6 text-gray-500 dark:text-gray-400 bg-brand-parchmentWhite/30 dark:bg-brand-deepPurple/20">
            <MessageSquareDashed className="h-20 w-20 text-brand-byzantineBlue/30 dark:text-brand-goldOchre/30 mb-4" />
            <p className="font-semibold text-lg text-brand-deepPurple dark:text-brand-parchmentWhite">Chat with NOAH.RN</p>
            <p className="text-sm">Ask clinical questions, request summaries, or get procedural help. Start by typing your message below.</p>
          </div>
        );
      }

      return (
        <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 space-y-2 bg-brand-parchmentWhite/30 dark:bg-brand-deepPurple/20">
          {messages.map((msg) => (
            <ChatMessage key={msg.key || msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      );
    };

    export default ConversationView;
  