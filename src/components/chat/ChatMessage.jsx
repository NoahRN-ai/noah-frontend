
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Copy, User, Bot } from 'lucide-react';
    import { useToast } from "@/components/ui/use-toast";
    import { cn } from '@/lib/utils';
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

    const ChatMessage = ({ message }) => {
      const { toast } = useToast();

      const sender = message.sender_type;
      const text = message.content;
      const timestamp = message.created_at ? new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
      const isLoadingAI = message.isLoading;

      const isUser = sender === 'user';
      const isAI = sender === 'ai';

      const handleCopy = () => {
        if (text) {
          navigator.clipboard.writeText(text);
          toast({
            title: "Copied to clipboard!",
            description: "The AI's response has been copied.",
            variant: "success", 
          });
        }
      };
      
      const getInitials = (name) => {
        if (!name) return "U";
        const parts = name.split(' ');
        if (parts.length > 1) {
          return parts[0][0] + parts[parts.length - 1][0];
        }
        return name.substring(0, 2);
      };

      return (
        <motion.div
          className={cn('flex group relative items-end gap-2', isUser ? 'justify-end' : 'justify-start', 'mb-4')}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isAI && (
            <Avatar className="h-8 w-8 shadow-sm self-start mt-1 flex-shrink-0">
              <AvatarImage src="/noah-logo.svg" alt="Noah AI Avatar" />
              <AvatarFallback className="bg-brand-byzantineBlue text-brand-parchmentWhite text-xs">
                <Bot size={18} />
              </AvatarFallback>
            </Avatar>
          )}
          <div
            className={cn(
              'max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl px-4 py-3 rounded-xl shadow-md break-words',
              isUser
                ? 'bg-brand-emeraldGreen text-brand-parchmentWhite rounded-br-none'
                : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-brand-deepPurple/70 dark:to-brand-deepPurple/90 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-brand-byzantineBlue/30'
            )}
          >
            {isAI && isLoadingAI ? (
              <div className="flex items-center space-x-1.5 py-1">
                <div className="h-2 w-2 bg-brand-byzantineBlue dark:bg-brand-goldOchre rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
                <div className="h-2 w-2 bg-brand-byzantineBlue dark:bg-brand-goldOchre rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="h-2 w-2 bg-brand-byzantineBlue dark:bg-brand-goldOchre rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            ) : (
              <p className="text-sm whitespace-pre-wrap">{text}</p>
            )}

            {timestamp && !(isAI && isLoadingAI) && (
              <p className={cn(
                'text-xs mt-1.5', 
                isUser ? 'text-right text-gray-300/80' : 'text-left text-gray-500/80 dark:text-gray-400/70'
              )}>
                {timestamp}
              </p>
            )}
          </div>

          {isUser && (
            <Avatar className="h-8 w-8 shadow-sm self-start mt-1 flex-shrink-0">
              <AvatarImage src={message.user_avatar_url || undefined} alt="User Avatar" />
              <AvatarFallback className="bg-brand-goldOchre text-brand-deepPurple text-xs">
                 {message.user_full_name ? getInitials(message.user_full_name) : <User size={18}/>}
              </AvatarFallback>
            </Avatar>
          )}

          {isAI && !isLoadingAI && text && (
            <button
              onClick={handleCopy}
              className={cn(
                'absolute p-1.5 rounded-full transition-all duration-200 ease-in-out',
                'text-gray-400 dark:text-gray-500 hover:text-brand-byzantineBlue dark:hover:text-brand-goldOchre hover:bg-gray-200/70 dark:hover:bg-brand-deepPurple/80',
                'opacity-0 group-hover:opacity-100 focus:opacity-100',
                'right-full top-1/2 transform -translate-y-1/2 mr-1' // Adjusted for AI messages to be on the right of the avatar
              )}
              aria-label="Copy message"
              title="Copy message"
            >
              <Copy className="h-4 w-4" />
            </button>
          )}
        </motion.div>
      );
    };

    export default ChatMessage;
  