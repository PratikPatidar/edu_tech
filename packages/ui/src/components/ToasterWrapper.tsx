// packages/ui/src/components/ToasterWrapper.tsx
import { Toaster } from 'react-hot-toast';
import React from 'react';

export interface ToasterWrapperProps {
  /** Position of the toast container. */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

/**
 * Reusable wrapper around `react-hot-toast`'s {@link Toaster}.
 * Centralises toast styling and can be dropped into any layout.
 */
export const ToasterWrapper: React.FC<ToasterWrapperProps> = ({ position = 'top-center' }) => (
  <Toaster
    position={position as any}
    toastOptions={{
      style: {
        borderRadius: '12px',
        fontWeight: 600,
        fontSize: '13px',
      },
    }}
  />
);

export default ToasterWrapper;
