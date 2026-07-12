import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// الـ Context ده زي "القناة" اللي أي component هيقدر يسمعها ويعرف الـ theme الحالي
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // بنقرأ اختيار المستخدم القديم من localStorage (لو موجود)،
  // أو بنستخدم إعداد نظام التشغيل (لو المستخدم مفعّل dark mode في الويندوز مثلاً)
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('quickserve-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // كل مرة الـ theme يتغير، بنحدث attribute على <html> وبنحفظ الاختيار
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('quickserve-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// hook مخصص عشان أي component يقدر يستخدم الـ theme بسطر واحد: useTheme()
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside a ThemeProvider');
  }
  return context;
}