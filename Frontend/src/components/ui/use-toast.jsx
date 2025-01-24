import { useState } from 'react';
import { toast } from 'sonner';

export function useToast() {
  const [, setToasts] = useState([]);

  return {
    toast: (options) => {
      const id = Math.random().toString();
      
      toast(options.title, {
        description: options.description,
        className: options.className || '',
        action: options.action,
        cancel: options.cancel,
        duration: options.duration || 3000
      });

      return { id };
    },
    dismiss: (toastId) => {
      // Implement dismiss logic if needed
    }
  };
}