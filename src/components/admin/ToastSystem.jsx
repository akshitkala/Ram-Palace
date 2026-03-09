'use client';
import { useState, useEffect, useCallback } from 'react';

// Icon helpers
const SuccessIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ErrorIcon = () => (
  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const WarningIcon = () => (
  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ToastItem = ({ toast, onDismiss }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Progress bar animation
    const startTime = Date.now();
    const duration = 4000;
    
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      
      if (remaining === 0) {
        clearInterval(intervalId);
        handleRemove();
      }
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onDismiss(toast.id), 300); // Wait for slide-out animation
  };

  const icons = {
    success: <SuccessIcon />,
    error: <ErrorIcon />,
    warning: <WarningIcon />,
    info: <InfoIcon />,
  };

  const progressColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500',
  };

  return (
    <div 
      className={`relative flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg shadow-gray-200 border border-gray-100 mb-3 pointer-events-auto transition-all duration-300 ease-in-out transform ${
        isRemoving 
          ? 'translate-x-full opacity-0 scale-95' 
          : 'translate-x-0 opacity-100 scale-100'
      }`}
    >
      <div className="flex w-full items-start p-4">
        <div className="flex-shrink-0">
          {icons[toast.type]}
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium text-gray-900">{toast.message}</p>
          {toast.subMessage && (
            <p className="mt-1 text-sm text-gray-500">{toast.subMessage}</p>
          )}
        </div>
        <div className="ml-4 flex flex-shrink-0">
          <button
            type="button"
            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2"
            onClick={handleRemove}
          >
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-100">
        <div 
          className={`h-full ${progressColors[toast.type]} transition-all duration-75 ease-linear`} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export function ToastContainer({ toasts, removeToast }) {
  if (toasts.length === 0) return null;
  
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-[110] flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
      </div>
    </div>
  );
}

// Hook for using the Toast system
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ message, subMessage, type = 'success' }) => {
    setToasts((prev) => {
      // Remove oldest if we hit the limit of 3
      const updatedToasts = prev.length >= 3 ? prev.slice(1) : prev;
      return [...updatedToasts, {
        id: Math.random().toString(36).substr(2, 9),
        message,
        subMessage,
        type
      }];
    });
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, showToast, removeToast };
}
