import { Toaster } from 'react-hot-toast';

export const ToasterWrapper = ({ position = "top-center" }: { position?: string }) => (
  <Toaster
    position={position as any}
    toastOptions={{ style: { borderRadius: '12px', fontWeight: 600, fontSize: '13px' } }}
  />
);
