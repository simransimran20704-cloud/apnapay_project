import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Camera,
  Flashlight,
  Image as ImageIcon,
  Sparkles,
  AlertCircle,
  Scan,
} from 'lucide-react';

export const QrScannerModal = ({ isOpen, onClose, onScanSuccess }) => {
  const [hasCamera, setHasCamera] = useState(true);
  const [error, setError] = useState('');
  const [torchOn, setTorchOn] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      return;
    }

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setHasCamera(false);
          return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCamera(true);
      } catch (err) {
        console.warn('Camera permission denied or unavailable:', err);
        setHasCamera(false);
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSimulateScan = (recipient = '9123456780', amount = 450) => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    onClose();
    if (onScanSuccess) {
      onScanSuccess({ mobile: recipient, amount });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-sm bg-[#FAF8F4] rounded-3xl shadow-2xl border border-[#E5DEC9] overflow-hidden flex flex-col">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Scan className="w-4 h-4 text-[#DDE5B6]" />
            <h3 className="text-sm font-bold text-[#F0EAD2]">Scan Any UPI / ApnaPay QR</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Viewport / Scanning Area */}
        <div className="relative h-80 bg-stone-900 flex items-center justify-center overflow-hidden">
          {hasCamera ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="p-6 text-center text-stone-400 space-y-2">
              <Camera className="w-12 h-12 mx-auto text-stone-600 mb-2" />
              <p className="text-xs font-medium">Camera preview inactive or permission denied</p>
              <p className="text-[11px] text-stone-500">
                You can use the instant "Simulate Scan" button below for quick testing!
              </p>
            </div>
          )}

          {/* Scanner Overlay Frame */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-56 h-56 border-2 border-[#ADC178]/80 rounded-2xl relative shadow-[0_0_0_9999px_rgba(43,34,27,0.55)]">
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#ADC178] rounded-tl-lg" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#ADC178] rounded-tr-lg" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#ADC178] rounded-bl-lg" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#ADC178] rounded-br-lg" />

              {/* Animated Laser Scanning Line */}
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#ADC178] to-transparent absolute top-0 animate-[scan_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="p-5 bg-[#FAF8F4] border-t border-[#E5DEC9] space-y-3">
          <p className="text-center text-[11px] text-[#8C7464] font-medium">
            Align QR code inside the frame to scan automatically
          </p>

          {/* Quick Simulation Button */}
          <button
            type="button"
            onClick={() => handleSimulateScan('9123456780', 500)}
            className="w-full py-3 px-4 rounded-xl bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-[#ADC178]/30 transition cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#2B221B]" />
            <span>Simulate Scan (Rahul Verma • ₹500)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
