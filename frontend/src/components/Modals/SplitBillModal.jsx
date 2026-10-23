import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import {
  X,
  Users,
  Plus,
  Trash2,
  Send,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const SplitBillModal = ({ isOpen, onClose }) => {
  const { addNotification } = useNotifications();

  const [title, setTitle] = useState('Friday Team Dinner');
  const [totalAmount, setTotalAmount] = useState('1200');
  const [participants, setParticipants] = useState([
    { name: 'You (Organizer)', mobile: 'Self', isSelf: true },
    { name: 'Rahul Verma', mobile: '9123456780', isSelf: false },
    { name: 'Pooja Mehta', mobile: '9811223344', isSelf: false },
  ]);
  const [newName, setNewName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const count = participants.length;
  const numTotal = parseFloat(totalAmount) || 0;
  const perPersonShare = count > 0 ? (numTotal / count).toFixed(2) : 0;

  const handleAddParticipant = (e) => {
    e.preventDefault();
    if (!newName.trim() || newMobile.length < 10) return;
    setParticipants([...participants, { name: newName.trim(), mobile: newMobile, isSelf: false }]);
    setNewName('');
    setNewMobile('');
  };

  const handleRemove = (idx) => {
    setParticipants(participants.filter((_, i) => i !== idx));
  };

  const handleSendSplit = () => {
    addNotification({
      title: `Split Bill Created: ${title}`,
      desc: `Total: ₹${numTotal} split among ${count} friends (₹${perPersonShare} each). Requests sent.`,
      type: 'INFO',
    });
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-md bg-[#FAF8F4] rounded-3xl shadow-2xl border border-[#E5DEC9] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ADC178]/25 text-[#DDE5B6] flex items-center justify-center border border-[#ADC178]/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Split Bill with Friends</h3>
              <p className="text-xs text-[#DDE5B6] font-medium">Equal Share Calculation & UPI Requests</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-[#ADC178] text-[#2B221B] flex items-center justify-center mx-auto shadow-xl shadow-[#ADC178]/25 animate-in zoom-in-75">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-[#6C584C]">Split Requests Dispatched!</h4>
            <p className="text-xs text-[#8C7464]">
              Each participant will receive a request for <strong>₹{perPersonShare}</strong>.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {/* Title & Total */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#6C584C] mb-1">Occasion / Bill</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5DEC9] bg-white text-xs text-[#3D3028] focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6C584C] mb-1">Total Bill (₹)</label>
                <input
                  type="number"
                  min="1"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5DEC9] bg-white font-mono font-bold text-[#3D3028] text-xs focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 focus:outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Split Breakdown Pill */}
            <div className="p-3.5 rounded-2xl bg-[#F0EAD2]/50 border border-[#DDE5B6] flex items-center justify-between text-xs">
              <div>
                <span className="text-[#8C7464] font-medium">Per Person Share:</span>
                <p className="text-xl font-black text-[#6C584C] font-mono mt-0.5">
                  ₹{perPersonShare}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-white text-[#6C584C] font-bold border border-[#E5DEC9] shadow-xs">
                {count} People
              </span>
            </div>

            {/* Participant List */}
            <div>
              <label className="block text-xs font-bold text-[#6C584C] uppercase tracking-wider mb-2">
                Participants
              </label>
              <div className="space-y-2 max-h-36 overflow-y-auto">
                {participants.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-[#E5DEC9] bg-white text-xs shadow-xs"
                  >
                    <div>
                      <span className="font-bold text-[#3D3028]">{p.name}</span>
                      <p className="text-[10px] text-[#8C7464] font-mono">{p.mobile}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#6C584C]">₹{perPersonShare}</span>
                      {!p.isSelf && (
                        <button
                          type="button"
                          onClick={() => handleRemove(idx)}
                          className="text-stone-400 hover:text-rose-600 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Person Form */}
            <form onSubmit={handleAddParticipant} className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Friend's Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-[#E5DEC9] bg-white text-xs text-[#3D3028] focus:border-[#ADC178] focus:outline-none"
              />
              <input
                type="tel"
                maxLength={10}
                placeholder="Mobile (10 digits)"
                value={newMobile}
                onChange={(e) => setNewMobile(e.target.value.replace(/\D/g, ''))}
                className="w-32 px-3 py-2 rounded-xl border border-[#E5DEC9] bg-white font-mono text-xs text-[#3D3028] focus:border-[#ADC178] focus:outline-none"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-[#6C584C] text-[#F0EAD2] hover:bg-[#534339] transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSendSplit}
              className="w-full mt-2 py-3.5 rounded-2xl bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] font-black text-xs shadow-md shadow-[#ADC178]/30 flex items-center justify-center gap-2 transition cursor-pointer active:scale-98"
            >
              <Send className="w-4 h-4 text-[#2B221B]" />
              <span>Send Split Requests (₹{perPersonShare} each)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
