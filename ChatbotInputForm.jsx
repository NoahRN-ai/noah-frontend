
    import React from 'react';
    import { Send, RefreshCcw, ChevronDown, Loader2 } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';

    const ChatbotInputForm = ({
      message,
      setMessage,
      handleSendMessage,
      isTyping,
      isLoadingHistory,
      showPrompts,
      setShowPrompts,
      chatHistory,
      handleUndo
    }) => {
      return (
        <div className="p-4 border-t border-border bg-card">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <div className="relative flex-grow">
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message or ask a question..."
                className="pr-10 focus:ring-2 focus:ring-brand-emeraldGreen focus:border-brand-emeraldGreen chatbot-input-field"
                disabled={isLoadingHistory}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-foreground/60 hover:text-brand-emeraldGreen"
                onClick={() => setShowPrompts(!showPrompts)}
                disabled={isLoadingHistory}
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${showPrompts ? 'rotate-180' : ''}`} />
              </Button>
            </div>
            <Button type="submit" className="bg-brand-emeraldGreen hover:bg-brand-emeraldGreen/90 text-white ripple-effect" disabled={isTyping || isLoadingHistory}>
              {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
            {chatHistory.length > 0 && !isTyping && (
              <Button type="button" variant="outline" size="icon" onClick={handleUndo} title="Undo last query" className="text-foreground/60 hover:text-brand-vermilionRed border-border hover:border-brand-vermilionRed/50" disabled={isLoadingHistory}>
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
      );
    };

    export default ChatbotInputForm;
  