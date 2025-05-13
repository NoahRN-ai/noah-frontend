
    import React from 'react';
    import { Loader2, MessageSquare } from 'lucide-react';
    import ChatMessageDisplay from '@/components/homepage/chatbot/ChatMessageDisplay';
    import TypingIndicator from '@/components/homepage/chatbot/TypingIndicator';

    const ChatHistoryDisplay = ({ chatHistory, isTyping, isLoadingHistory }) => {
      return (
        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-brand-parchmentWhite/50 relative">
          {isLoadingHistory && (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-parchmentWhite/80 z-10">
              <Loader2 className="h-12 w-12 text-brand-byzantineBlue animate-spin" />
            </div>
          )}
          {!isLoadingHistory && chatHistory.length === 0 && (
            <div className="text-center text-foreground/60 py-10">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-brand-byzantineBlue/30" />
              <p className="font-semibold">No messages yet.</p>
              <p className="text-sm">Start the conversation by typing below or choosing a prompt.</p>
            </div>
          )}
          {chatHistory.map((chat) => (
            <ChatMessageDisplay key={chat.id} chat={chat} />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      );
    };

    export default ChatHistoryDisplay;
  