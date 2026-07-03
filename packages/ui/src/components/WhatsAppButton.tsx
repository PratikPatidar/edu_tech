// packages/ui/src/components/WhatsAppButton.tsx
import React from 'react';

interface WhatsAppButtonProps {
  phone: string;
  message?: string;
  className?: string;
}

/**
 * Reusable floating WhatsApp button used across the public layout.
 * It animates with a subtle bounce and opens a pre‑filled chat.
 */
export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phone,
  message = 'Hello EduMiracle, I want to enquire about admissions.',
  className = '',
}) => {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-200 ${className}`}
      style={{ animation: 'bounce 2s infinite' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="white"
        className="w-8 h-8"
      >
        <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.47 2.027 7.774L0 32l8.469-2.001A15.938 15.938 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.773-1.851l-.486-.289-5.028 1.188 1.23-4.896-.318-.503A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.862c-.398-.199-2.354-1.162-2.719-1.295-.365-.133-.631-.199-.897.2-.266.398-1.029 1.295-1.261 1.561-.232.266-.465.299-.863.1-.398-.199-1.682-.62-3.203-1.977-1.184-1.057-1.983-2.363-2.215-2.761-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.199-.232.266-.398.398-.664.133-.266.067-.498-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.778-.653-.672-.897-.684l-.764-.013c-.266 0-.697.1-1.062.498-.365.398-1.395 1.362-1.395 3.324s1.428 3.855 1.627 4.121c.199.266 2.811 4.291 6.81 6.018.952.41 1.695.656 2.274.84.955.304 1.824.261 2.511.158.766-.114 2.354-.963 2.686-1.893.332-.93.332-1.727.232-1.893-.099-.166-.365-.266-.763-.465z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
