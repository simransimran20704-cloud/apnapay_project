import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('apnapay_theme') || 'light';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('apnapay_lang') || 'hinglish';
  });

  const [isDemoMode, setIsDemoMode] = useState(() => {
    return localStorage.getItem('apnapay_demo') === 'true';
  });

  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('apnapay_font') || 'md';
  });

  const [incognitoMode, setIncognitoMode] = useState(false);
  const [offlineDrafts, setOfflineDrafts] = useState(() => {
    try {
      const saved = localStorage.getItem('apnapay_offline_drafts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Apply dark/light class or root styling
  useEffect(() => {
    localStorage.setItem('apnapay_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('apnapay_font', fontSize);
    document.documentElement.setAttribute('data-font', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('apnapay_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('apnapay_demo', String(isDemoMode));
  }, [isDemoMode]);

  useEffect(() => {
    localStorage.setItem('apnapay_offline_drafts', JSON.stringify(offlineDrafts));
  }, [offlineDrafts]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const addOfflineDraft = (draft) => {
    const item = {
      id: 'DRAFT-' + Date.now().toString(36).toUpperCase(),
      createdAt: new Date().toISOString(),
      ...draft,
    };
    setOfflineDrafts((prev) => [item, ...prev]);
    return item;
  };

  const removeOfflineDraft = (id) => {
    setOfflineDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  const clearOfflineDrafts = () => {
    setOfflineDrafts([]);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        language,
        setLanguage,
        isDemoMode,
        setIsDemoMode,
        fontSize,
        setFontSize,
        incognitoMode,
        setIncognitoMode,
        toggleIncognito: () => setIncognitoMode((p) => !p),
        offlineDrafts,
        addOfflineDraft,
        removeOfflineDraft,
        clearOfflineDrafts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
