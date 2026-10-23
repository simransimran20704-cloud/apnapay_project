import React, { useState, useRef, useEffect } from 'react';
import { useWallet } from '../../context/WalletContext';
import {
  X,
  Bot,
  Send,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  PieChart,
  CheckCircle2,
  DollarSign,
  User,
  Lightbulb,
} from 'lucide-react';

export const AiFinanceAssistantModal = ({ isOpen, onClose }) => {
  const { balance, transactions } = useWallet();
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: `Hello! I'm your ApnaPay AI Financial Genius. 💡\n\nI analyze your live wallet transactions, help optimize your cash flow, and answer any questions about your money. What would you like to explore today?`,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  if (!isOpen) return null;

  const quickPrompts = [
    'How much did I spend this month?',
    'Where did most of my money go?',
    'Can I afford a ₹5,000 purchase right now?',
    'Suggest a smart budget for me',
    'Summarize my spending trends',
  ];

  const handleSendQuery = (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      let aiReply = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('how much') || lower.includes('spend') || lower.includes('expense')) {
        aiReply = `📊 **Monthly Spending Summary:**\n• Total Outflow this month: **₹17,200**\n• Total Inflow / Credits: **₹48,500**\n• Current Wallet Balance: **₹${balance.toFixed(2)}**\n\nYour top expense category is **Shopping & E-Commerce (38%)**, followed by **Food & Dining (22%)**. You are currently spending 8.4% less than last month!`;
      } else if (lower.includes('where') || lower.includes('category') || lower.includes('most')) {
        aiReply = `🛍️ **Top Expense Breakdown:**\n1. **Shopping (Amazon, Flipkart)**: ₹6,450 (38%)\n2. **Dining & Food Delivery**: ₹3,820 (22%)\n3. **Utility Bills**: ₹3,100 (18%)\n4. **UPI Transfers**: ₹2,450 (14%)\n\n💡 **Smart Tip:** You can save up to ₹1,200 by utilizing the active 'Flat ₹50' cashback coupons on utility recharges!`;
      } else if (lower.includes('afford') || lower.includes('5000') || lower.includes('5,000') || lower.includes('buy')) {
        const canAfford = balance >= 5000;
        aiReply = canAfford
          ? `✅ **Yes, you can afford it!**\n\nYour active wallet balance is **₹${balance.toFixed(2)}**. Deducting ₹5,000 will leave you with **₹${(balance - 5000).toFixed(2)}**.\n\n⚠️ However, note that you have **₹949 in upcoming recurring bills** (Netflix & JioFiber) due next week, so keep at least ₹1,000 buffer!`
          : `⚠️ **Caution advised.**\n\nYour current wallet balance is **₹${balance.toFixed(2)}**, which is lower than ₹5,000. Consider adding funds via UPI or Net Banking first before executing this transaction.`;
      } else if (lower.includes('budget') || lower.includes('suggest')) {
        aiReply = `🎯 **Recommended Monthly Budget (50/30/20 Rule):**\n\n• **Needs (50% - ₹24,000)**: Rent (₹15k), Utilities (₹4k), Groceries (₹5k)\n• **Wants (30% - ₹14,500)**: Shopping (₹7k cap), Dining (₹4.5k cap), OTT (₹1k cap)\n• **Savings & Investments (20% - ₹10,000)**: Mutual Funds SIP (₹5k), Emergency Fund (₹5k)\n\nWould you like me to automatically set alerts when you reach 80% of your Shopping budget?`;
      } else {
        aiReply = `✨ **Financial Insight:**\nBased on your recent ${transactions.length || 9} transactions, your cash flow is positive. You have an estimated savings rate of **64%** this month!\n\nFeel free to ask me to analyze specific vendors, estimate tax savings, or simulate future investments.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: aiReply,
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] border-b border-[#A98467]/30 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ADC178]/25 border border-[#ADC178]/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#DDE5B6]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#F0EAD2]">ApnaPay AI Finance Genius</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#ADC178] text-[#2B221B] text-[9px] font-black">
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-[#DDE5B6] font-medium">Live transaction analysis & intelligent budgeting</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-[#F0EAD2]/50 border-b border-[#E5DEC9] flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(p)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#DDE5B6]/50 border border-[#E5DEC9] hover:border-[#ADC178] text-[#6C584C] text-xs font-bold whitespace-nowrap transition cursor-pointer shadow-xs shrink-0"
            >
              💬 {p}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div ref={scrollRef} className="p-5 space-y-4 overflow-y-auto flex-1 bg-[#FAF8F4]">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-[#ADC178] text-[#2B221B] flex items-center justify-center text-xs font-black shrink-0 mt-1 shadow-xs">
                    AI
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? 'bg-[#6C584C] text-[#F0EAD2] rounded-tr-none shadow-sm'
                      : 'bg-white border border-[#E5DEC9] text-[#3D3028] rounded-tl-none shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{m.text}</div>
                  <span
                    className={`block text-[9px] mt-1.5 text-right font-mono ${
                      isUser ? 'text-[#DDE5B6]' : 'text-[#8C7464]'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            );
          })}

          {typing && (
            <div className="flex gap-2.5 items-center text-[#8C7464] text-xs">
              <div className="w-8 h-8 rounded-full bg-[#ADC178] text-[#2B221B] flex items-center justify-center text-xs font-black">
                AI
              </div>
              <div className="p-3 rounded-2xl bg-white border border-[#E5DEC9] flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#ADC178] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#ADC178] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#ADC178] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Query Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuery();
          }}
          className="p-3 bg-white border-t border-[#E5DEC9] flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI anything about your money, bills or savings..."
            className="flex-1 bg-[#FAF8F4] border border-[#E5DEC9] focus:border-[#ADC178] focus:bg-white text-xs text-[#3D3028] rounded-2xl px-4 py-3 focus:outline-none transition placeholder:text-stone-400"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-3 rounded-2xl bg-[#ADC178] hover:bg-[#9CB067] disabled:opacity-40 text-[#2B221B] transition cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4 text-[#2B221B]" />
          </button>
        </form>
      </div>
    </div>
  );
};
