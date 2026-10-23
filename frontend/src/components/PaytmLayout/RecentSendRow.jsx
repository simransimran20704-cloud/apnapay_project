import React from 'react';
import { Plus, User, ArrowRight } from 'lucide-react';

export const RecentSendRow = ({ onSelectContact, onNewContact }) => {
  const recentRecipients = [
    { name: 'Rahul Verma', mobile: '9123456780', color: 'from-blue-600 to-indigo-600' },
    { name: 'Pooja Mehta', mobile: '9811223344', color: 'from-purple-600 to-pink-600' },
    { name: 'Aakash Singh', mobile: '9876501234', color: 'from-emerald-600 to-teal-600' },
    { name: 'Cafe Coffee', mobile: '9988776655', color: 'from-amber-600 to-orange-600' },
    { name: 'Swiggy Refund', mobile: '9876540000', color: 'from-rose-600 to-red-600' },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Send Again / Recent Contacts
        </span>
        <button
          onClick={onNewContact}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
        >
          <span>Send to New</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-1 pt-1 no-scrollbar">
        {/* + Add New Button */}
        <button
          onClick={onNewContact}
          className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-indigo-300 hover:border-indigo-600 bg-indigo-50/50 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-all">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-slate-700 group-hover:text-indigo-600 truncate max-w-[64px]">
            New
          </span>
        </button>

        {/* Recent Circle Avatars */}
        {recentRecipients.map((rec) => (
          <button
            key={rec.mobile}
            onClick={() => onSelectContact(rec.mobile)}
            className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
          >
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${rec.color} text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform`}
            >
              {rec.name[0]}
            </div>
            <span className="text-[11px] font-medium text-slate-700 group-hover:text-indigo-600 truncate max-w-[68px]">
              {rec.name.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
