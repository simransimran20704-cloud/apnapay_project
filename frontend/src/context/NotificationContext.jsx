import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext(null);
const STORAGE_KEY_NOTIFS = 'apnapay_notifications_v1';

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_NOTIFS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 'notif-1',
        title: 'Welcome to ApnaPay!',
        desc: 'Your digital wallet account is now active. Complete KYC to raise limits.',
        type: 'INFO',
        read: false,
        timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
      },
      {
        id: 'notif-2',
        title: 'Payment Request from Pooja',
        desc: 'Pooja Mehta requested ₹350 for "Team Lunch Pizza"',
        type: 'REQUEST',
        amount: 350,
        fromMobile: '9811223344',
        fromName: 'Pooja Mehta',
        read: false,
        status: 'PENDING',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      },
      {
        id: 'notif-3',
        title: 'New Scratch Card Available!',
        desc: 'You unlocked a festive cashback reward. Tap to scratch!',
        type: 'REWARD',
        read: false,
        timestamp: new Date().toISOString(),
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (item) => {
    const newNotif = {
      id: 'notif-' + Date.now(),
      read: false,
      timestamp: new Date().toISOString(),
      ...item,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const updateNotificationStatus = (id, status) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAllAsRead,
        clearNotification,
        updateNotificationStatus,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};
