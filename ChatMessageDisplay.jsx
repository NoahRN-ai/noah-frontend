
    import React from 'react';
    import { motion } from 'framer-motion';

    const ChatMessageDisplay = ({ chat }) => {
      const isUser = chat.sender === 'user';
      return (
        <motion.div
          key={chat.id}
          className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`max-w-[70%] p-3 rounded-lg shadow ${isUser ? 'bg-brand-byzantineBlue text-brand-parchmentWhite' : 'bg-gray-200 text-gray-800'}`}>
            {chat.text}
          </div>
        </motion.div>
      );
    };

    export default ChatMessageDisplay;
  