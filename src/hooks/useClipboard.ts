import { useState, useCallback } from 'react';

export const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      return false;
    }
  }, []);

  return { copied, copyToClipboard };
};