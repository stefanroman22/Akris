
import React from 'react';

interface AlertProps {
  message: string;
  onClose: () => void;
}

export const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md animate-bounce-in">
      <div className="bg-gradient-to-r from-red-600 to-rose-500 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-white/20 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined">error</span>
          <p className="font-medium text-sm">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="hover:bg-white/20 p-1 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>
      <style>{`
        @keyframes bounce-in {
          0% { opacity: 0; transform: translate(-50%, 20px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};
