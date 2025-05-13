
    import React from 'react';
    import { MessageSquare } from 'lucide-react';

    const ChatbotHeader = () => {
      return (
        <div className="p-6 bg-primary text-primary-foreground">
          <h2 className="text-2xl font-serif font-semibold flex items-center">
            <MessageSquare className="mr-3 h-7 w-7 orthodox-icon-style" />
            NOAH.RN Assistant
          </h2>
          <p className="text-sm opacity-90">Your AI-powered clinical co-pilot. Ask me anything!</p>
        </div>
      );
    };

    export default ChatbotHeader;
  