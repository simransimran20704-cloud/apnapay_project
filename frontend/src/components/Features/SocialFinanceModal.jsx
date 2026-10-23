import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  X,
  Users,
  Target,
  PiggyBank,
  Plus,
  ArrowRight,
  CheckCircle2,
  Share2,
  Calendar,
  Sparkles,
  TrendingUp,
  Receipt,
  UserCheck,
} from 'lucide-react';

export const SocialFinanceModal = ({ isOpen, onClose }) => {
  const { balance, sendMoney } = useWallet();
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState('groups'); // 'groups' | 'shared_goals' | 'goal_tracker'

  // 2. Group Wallet State
  const [groups, setGroups] = useState([
    {
      id: 'grp-1',
      name: 'Flat 402 Roommates',
      members: ['You', 'Rahul', 'Aman'],
      poolBalance: 3200,
      recentExpense: 'Groceries (₹1,500) paid by Rahul',
      youOwe: 500,
    },
    {
      id: 'grp-2',
      name: 'Goa Trip 2026',
      members: ['You', 'Priya', 'Kunal', 'Neha'],
      poolBalance: 12500,
      recentExpense: 'Resort Advance (₹8,000) paid by You',
      youOwe: 0,
    },
  ]);
  const [newGroupName, setNewGroupName] = useState('');
  const [showAddGroup, setShowAddGroup] = useState(false);

  // 8 & 39. Shared Savings Goals
  const [sharedGoals, setSharedGoals] = useState([
    {
      id: 'sg-1',
      title: "Pooja's Wedding Gift Pool",
      target: 20000,
      collected: 14500,
      contributors: ['You (₹4,000)', 'Rahul (₹3,500)', 'Priya (₹4,000)', 'Amit (₹3,000)'],
      deadline: 'Nov 15, 2026',
    },
    {
      id: 'sg-2',
      title: 'Gaming Console PS5 Pool',
      target: 45000,
      collected: 31000,
      contributors: ['You (₹15,000)', 'Rohan (₹16,000)'],
      deadline: 'Dec 31, 2026',
    },
  ]);

  // 40. Personal Financial Goal Tracker
  const [personalGoals, setPersonalGoals] = useState([
    {
      id: 'pg-1',
      title: 'Emergency Rainy Day Fund',
      target: 50000,
      current: 28500,
      monthlyPledge: 5000,
      autoRoundup: true,
    },
    {
      id: 'pg-2',
      title: 'Royal Enfield Downpayment',
      target: 80000,
      current: 45000,
      monthlyPledge: 8000,
      autoRoundup: false,
    },
  ]);

  if (!isOpen) return null;

  const handleSettleGroup = async (groupId, amount) => {
    try {
      await sendMoney({
        toMobile: '919876543210',
        amount,
        remarks: 'Group settlement: Flat 402',
      });
      setGroups((prev) =>
        prev.map((g) => (g.id === groupId ? { ...g, youOwe: 0 } : g))
      );
      addNotification({
        title: 'Settlement Completed',
        message: `₹${amount} settled with group members.`,
        type: 'SUCCESS',
      });
    } catch (err) {
      alert('Settlement failed: ' + err.message);
    }
  };

  const handleContributeSharedGoal = (goalId) => {
    setSharedGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? {
              ...g,
              collected: Math.min(g.target, g.collected + 500),
              contributors: [...g.contributors, 'You (₹500 added)'],
            }
          : g
      )
    );
    addNotification({
      title: 'Contribution Added',
      message: '₹500 contributed to shared pool.',
      type: 'SUCCESS',
    });
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    const newG = {
      id: 'grp-' + Date.now(),
      name: newGroupName.trim(),
      members: ['You', 'Rahul'],
      poolBalance: 0,
      recentExpense: 'Group created',
      youOwe: 0,
    };
    setGroups([newG, ...groups]);
    setNewGroupName('');
    setShowAddGroup(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#ADC178]/25 text-[#DDE5B6] flex items-center justify-center border border-[#ADC178]/40">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Social Finance & Group Wallet</h3>
              <p className="text-xs text-[#DDE5B6]">
                Split Settlement • Shared Goals • Goal Tracker • Auto Round-Ups
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex overflow-x-auto p-2 bg-[#F0EAD2]/50 border-b border-[#E5DEC9] gap-1.5 shrink-0">
          {[
            { id: 'groups', label: '2. Group Wallet & Split', icon: Users },
            { id: 'shared_goals', label: '8 & 39. Shared Goals Pool', icon: PiggyBank },
            { id: 'goal_tracker', label: '40. Financial Goal Tracker', icon: Target },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#ADC178] text-[#2B221B] shadow-xs'
                    : 'text-[#6C584C] hover:bg-[#FAF8F4]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: GROUP WALLET & SPLIT SETTLEMENT */}
          {activeTab === 'groups' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#2B221B]">Active Group Wallets</h4>
                  <p className="text-[11px] text-[#8C7464]">
                    Pooled funds and instant 1-tap settlement.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddGroup(!showAddGroup)}
                  className="px-3 py-1.5 rounded-xl bg-[#ADC178] text-[#2B221B] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Group</span>
                </button>
              </div>

              {showAddGroup && (
                <form
                  onSubmit={handleCreateGroup}
                  className="p-3 rounded-2xl bg-white border border-[#ADC178] flex gap-2 animate-in slide-in-from-top-2"
                >
                  <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="Enter Group Name (e.g. Manali Trip, Dinner Gang)"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-[#E5DEC9] text-xs focus:outline-none focus:border-[#ADC178]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-[#6C584C] text-[#F0EAD2] text-xs font-bold cursor-pointer"
                  >
                    Save
                  </button>
                </form>
              )}

              <div className="space-y-3">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-[#2B221B]">{group.name}</h5>
                        <p className="text-[10px] text-[#8C7464]">
                          {group.members.join(', ')} ({group.members.length} members)
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#8C7464] font-medium block">
                          Group Pool
                        </span>
                        <span className="text-xs font-mono font-bold text-[#4D6321]">
                          ₹{group.poolBalance.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FAF8F4] border border-[#E5DEC9] text-[11px] text-[#6C584C] flex items-center justify-between">
                      <span className="truncate">{group.recentExpense}</span>
                      {group.youOwe > 0 ? (
                        <span className="font-bold text-rose-600 shrink-0">
                          You owe ₹{group.youOwe}
                        </span>
                      ) : (
                        <span className="font-bold text-emerald-600 shrink-0">All Settled Up</span>
                      )}
                    </div>

                    {group.youOwe > 0 && (
                      <button
                        onClick={() => handleSettleGroup(group.id, group.youOwe)}
                        className="w-full py-2 rounded-xl bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] text-xs font-black transition cursor-pointer shadow-xs"
                      >
                        Settle My Share (₹{group.youOwe})
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SHARED GOALS POOL */}
          {activeTab === 'shared_goals' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#2B221B]">Shared Collaborative Goals</h4>
                  <p className="text-[11px] text-[#8C7464]">
                    Contribute together towards weddings, trips, and gifts.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {sharedGoals.map((goal) => {
                  const pct = Math.min(100, Math.round((goal.collected / goal.target) * 100));
                  return (
                    <div
                      key={goal.id}
                      className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-xs font-bold text-[#2B221B]">{goal.title}</h5>
                          <p className="text-[10px] text-[#8C7464]">Target Deadline: {goal.deadline}</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#4D6321]">{pct}% Done</span>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="w-full h-2.5 rounded-full bg-[#E5DEC9]/50 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#ADC178] to-[#4D6321] rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-[#8C7464] mt-1 font-mono">
                          <span>Collected: ₹{goal.collected.toLocaleString('en-IN')}</span>
                          <span>Target: ₹{goal.target.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-[#8C7464]">
                          {goal.contributors.length} active contributors
                        </span>
                        <button
                          onClick={() => handleContributeSharedGoal(goal.id)}
                          className="px-3 py-1.5 rounded-xl bg-[#6C584C] hover:bg-[#534339] text-[#F0EAD2] text-xs font-bold cursor-pointer transition shadow-xs"
                        >
                          + Contribute ₹500
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: PERSONAL FINANCIAL GOAL TRACKER */}
          {activeTab === 'goal_tracker' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#2B221B]">Personal Goal Milestones</h4>
                  <p className="text-[11px] text-[#8C7464]">
                    Automated savings & spare-change roundups.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {personalGoals.map((goal) => {
                  const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
                  return (
                    <div
                      key={goal.id}
                      className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-[#ADC178]" />
                          <h5 className="text-xs font-bold text-[#2B221B]">{goal.title}</h5>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#4D6321]">{pct}% Saved</span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-[#E5DEC9]/50 overflow-hidden">
                        <div
                          className="h-full bg-[#ADC178] rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[10px] pt-1">
                        <span className="text-[#8C7464] font-mono">
                          ₹{goal.current.toLocaleString('en-IN')} of ₹
                          {goal.target.toLocaleString('en-IN')}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-[#DDE5B6] text-[#364216] font-bold">
                            Pledge ₹{goal.monthlyPledge}/mo
                          </span>
                          {goal.autoRoundup && (
                            <span className="px-2 py-0.5 rounded-md bg-[#A98467]/20 text-[#6C584C] font-bold">
                              Spare-Change Roundup ON
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
