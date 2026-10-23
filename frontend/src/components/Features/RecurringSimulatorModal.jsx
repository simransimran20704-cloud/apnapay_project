import React, { useState } from 'react';
import {
  X,
  Repeat,
  Calendar,
  Clock,
  Play,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Film,
  Zap,
  Home,
  TrendingUp,
  Pause,
} from 'lucide-react';

export const RecurringSimulatorModal = ({ isOpen, onClose }) => {
  const [schedules, setSchedules] = useState([
    {
      id: 'rec-1',
      title: 'Netflix Premium 4K',
      category: 'Entertainment',
      amount: 649,
      frequency: 'Monthly',
      nextDue: '28 Oct 2026',
      daysLeft: 5,
      active: true,
      icon: Film,
      color: 'bg-[#6C584C]',
    },
    {
      id: 'rec-2',
      title: 'JioFiber 100Mbps Broadband',
      category: 'Utilities',
      amount: 470,
      frequency: 'Monthly',
      nextDue: '02 Nov 2026',
      daysLeft: 10,
      active: true,
      icon: Zap,
      color: 'bg-[#A98467]',
    },
    {
      id: 'rec-3',
      title: 'Apartment Maintenance',
      category: 'Housing',
      amount: 2500,
      frequency: 'Monthly',
      nextDue: '05 Nov 2026',
      daysLeft: 13,
      active: true,
      icon: Home,
      color: 'bg-[#6C584C]',
    },
    {
      id: 'rec-4',
      title: 'Nifty 50 Index Mutual Fund SIP',
      category: 'Investments',
      amount: 5000,
      frequency: 'Monthly',
      nextDue: '10 Nov 2026',
      daysLeft: 18,
      active: true,
      icon: TrendingUp,
      color: 'bg-[#556B2F]',
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Entertainment');
  const [newFrequency, setNewFrequency] = useState('Monthly');
  const [simulationLog, setSimulationLog] = useState(null);

  if (!isOpen) return null;

  const handleToggleSchedule = (id) => {
    setSchedules(
      schedules.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  const handleSimulateExecution = (schedule) => {
    setSimulationLog({
      scheduleTitle: schedule.title,
      amount: schedule.amount,
      simulatedAt: new Date().toLocaleTimeString('en-IN'),
      message: `Virtual autopay of ₹${schedule.amount} for "${schedule.title}" triggered cleanly. Mandate verified with zero money moved.`,
    });
  };

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAmount) return;

    const newObj = {
      id: 'rec-' + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      amount: Number(newAmount),
      frequency: newFrequency,
      nextDue: 'In 30 days',
      daysLeft: 30,
      active: true,
      icon: Repeat,
      color: 'bg-[#6C584C]',
    };

    setSchedules([newObj, ...schedules]);
    setNewTitle('');
    setNewAmount('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] border-b border-[#A98467]/30 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ADC178]/25 border border-[#ADC178]/30 flex items-center justify-center">
              <Repeat className="w-5 h-5 text-[#DDE5B6]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Recurring Payments Simulator</h3>
              <p className="text-xs text-[#DDE5B6] font-medium">Schedule autopays, preview upcoming bills & test virtual executions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="px-6 py-3.5 bg-[#F0EAD2]/50 border-b border-[#E5DEC9] flex items-center justify-between shrink-0">
          <div>
            <h4 className="text-xs font-bold text-[#6C584C]">Active Mandates & Autopay ({schedules.length})</h4>
            <p className="text-[11px] text-[#8C7464]">Test schedules safely with zero real deduction</p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-1.5 rounded-xl bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] font-black text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#2B221B]" />
            <span>{showAddForm ? 'Cancel' : 'Add New Schedule'}</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Add New Schedule Form */}
          {showAddForm && (
            <form onSubmit={handleCreateSchedule} className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-3 animate-in fade-in duration-150 shadow-xs">
              <h5 className="text-xs font-bold text-[#6C584C]">Create New Recurring Schedule</h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Subscription Name (e.g. Spotify, Gym)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-[#E5DEC9] bg-[#FAF8F4] text-xs text-[#3D3028] focus:outline-none focus:border-[#ADC178]"
                  required
                />
                <input
                  type="number"
                  placeholder="Amount (₹)"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-[#E5DEC9] bg-[#FAF8F4] text-xs font-mono text-[#3D3028] focus:outline-none focus:border-[#ADC178]"
                  required
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-[#E5DEC9] bg-[#FAF8F4] text-xs text-[#3D3028]"
                >
                  <option value="Entertainment">Entertainment</option>
                  <option value="Housing">Housing</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Investments">Investments</option>
                </select>

                <select
                  value={newFrequency}
                  onChange={(e) => setNewFrequency(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-[#E5DEC9] bg-[#FAF8F4] text-xs text-[#3D3028]"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] font-bold text-xs transition cursor-pointer shadow-xs"
                >
                  Save Mandate
                </button>
              </div>
            </form>
          )}

          {/* Simulation Output Banner */}
          {simulationLog && (
            <div className="p-4 rounded-2xl bg-[#DDE5B6]/50 border border-[#ADC178] text-xs space-y-1 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#2B221B] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#556B2F]" />
                  <span>Autopay Simulation Run Completed</span>
                </span>
                <span className="font-mono text-[#4D6321] text-[10px]">{simulationLog.simulatedAt}</span>
              </div>
              <p className="text-[#3D3028] leading-relaxed">{simulationLog.message}</p>
            </div>
          )}

          {/* Schedules List */}
          <div className="space-y-3">
            {schedules.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    item.active ? 'bg-white border-[#E5DEC9] shadow-xs' : 'bg-white/60 border-[#E5DEC9] opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl ${item.color} text-white flex items-center justify-center shadow-xs shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-[#3D3028]">{item.title}</h5>
                          <span className="text-[10px] font-bold text-[#6C584C] bg-[#F0EAD2] px-2 py-0.5 rounded-full">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-[#8C7464] mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-[#A98467]" />
                          <span>Next Due: {item.nextDue}</span>
                          <span>•</span>
                          <span className="font-bold text-[#A98467]">{item.daysLeft} days left</span>
                        </div>
                      </div>
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5DEC9]/40">
                      <div className="text-left sm:text-right">
                        <span className="text-sm font-black text-[#3D3028] font-mono">
                          ₹{item.amount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-[#8C7464] block font-medium">/{item.frequency}</span>
                      </div>

                      {/* Simulate Button */}
                      <button
                        onClick={() => handleSimulateExecution(item)}
                        className="px-3 py-1.5 rounded-xl bg-[#DDE5B6]/70 hover:bg-[#DDE5B6] text-[#2B221B] font-bold text-xs flex items-center gap-1.5 transition cursor-pointer border border-[#ADC178]/50 shadow-xs"
                        title="Simulate mandate execution without moving real money"
                      >
                        <Play className="w-3 h-3 fill-[#2B221B]" />
                        <span>Simulate</span>
                      </button>

                      <button
                        onClick={() => handleToggleSchedule(item.id)}
                        className={`p-1.5 rounded-xl border transition cursor-pointer ${
                          item.active ? 'border-[#E5DEC9] text-[#6C584C] hover:bg-[#F0EAD2]/40' : 'border-[#ADC178] bg-[#DDE5B6] text-[#2B221B]'
                        }`}
                        title={item.active ? 'Pause Mandate' : 'Resume Mandate'}
                      >
                        {item.active ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => handleDeleteSchedule(item.id)}
                        className="p-1.5 rounded-xl border border-rose-200 text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                        title="Delete Schedule"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
