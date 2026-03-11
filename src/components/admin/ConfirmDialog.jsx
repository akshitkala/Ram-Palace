'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel,
  variant = 'danger',
  onConfirm,
  onCancel,
  isLoading,
  previewImages = [],
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setShow(false), 200);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen && !show) return null;

  const getIcon = () => {
    if (variant === 'danger') {
      return (
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      );
    }
    return (
      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 sm:mx-0 sm:h-10 sm:w-10">
        <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    );
  };

  const visiblePreviews = previewImages.slice(0, 6);
  const excessCount = previewImages.length - 6;

  return (
    <div className="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={() => !isLoading && onCancel()}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div 
            className={`relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all duration-200 sm:my-8 sm:w-full sm:max-w-md ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {getIcon()}
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 whitespace-pre-line">
                      {message}
                    </p>
                  </div>
                  
                  {/* Thumbnail Previews (Bulk Delete) */}
                  {previewImages.length > 0 && (
                    <div className="mt-4">
                      <div className="grid grid-cols-3 gap-2">
                        {visiblePreviews.map((img) => (
                          <div key={img.public_id} className="relative aspect-square rounded overflow-hidden bg-gray-100">
                            <Image 
                              src={img.secure_url} 
                              alt="thumbnail preview" 
                              fill 
                              quality={70}
                              className="object-cover"
                              sizes="100px"
                            />
                          </div>
                        ))}
                        {excessCount > 0 && (
                          <div className="relative aspect-square rounded bg-gray-100 flex items-center justify-center border border-gray-200">
                            <span className="text-sm font-medium text-gray-500">+{excessCount}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                disabled={isLoading}
                className={`inline-flex w-full justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${variant === 'danger' ? 'bg-red-600 hover:bg-red-500' : 'bg-amber-600 hover:bg-amber-500'}`}
                onClick={onConfirm}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Deleting...
                  </span>
                ) : (
                  confirmLabel
                )}
              </button>
              <button
                type="button"
                disabled={isLoading}
                className="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto disabled:opacity-50"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
