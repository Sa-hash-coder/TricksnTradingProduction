"use client";

import * as React from "react";
import { useLanguage, Locale } from "@/context/LanguageContext";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGES: { code: Locale; name: string; nativeName: string }[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "bn", name: "Bangla", nativeName: "বাংলা" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" }
];

const languageLabels = {
  en: "English · हिंदी",
  hi: "English · हिंदी",
  bn: "বাংলা",
  ta: "தமிழ்",
  ml: "മലയാളം",
};

export function LanguageSwitcher({
  isMobile = false,
  isMobileHeader = false,
  isDropdown = false
}: {
  isMobile?: boolean;
  isMobileHeader?: boolean;
  isDropdown?: boolean;
}) {
  const { locale, setLocale, sessionLocale } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (code: Locale) => {
    setLocale(code);
  };

  const activeLocale = sessionLocale || "en";
  const displayLabel = isMobileHeader 
    ? activeLocale.toUpperCase() 
    : (languageLabels[activeLocale] || "English · हिंदी");

  // Mode 1: Mobile drawer grid switcher (nested inside hamburger menu)
  if (isMobile) {
    return (
      <div className="w-full space-y-2">
        <label className="text-sm font-bold text-[#7C756A] flex items-center gap-2 px-4">
          <Globe className="h-4 w-4 text-[#B8B2A7]" />
          <span>Language / भाषा</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-4">
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === locale;
            return (
              <button
                key={lang.code}
                onClick={() => handleLocaleChange(lang.code)}
                className={cn(
                  "flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm font-medium transition-all active:scale-[0.98] cursor-pointer",
                  isSelected
                    ? "bg-[#B89B72] text-[#050505] border-[#B89B72] shadow-sm"
                    : "bg-[#050505] text-[#B8B2A7] border-white/8 hover:bg-[#111111] hover:text-[#F4F1EA]"
                )}
              >
                <span>{lang.nativeName}</span>
                {isSelected && <Check className="h-4 w-4 text-[#B89B72]" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Mode 2 & 3: Dropdown triggers (Desktop or Mobile Topbar Header)
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={cn(
          "inline-flex items-center justify-center gap-1 sm:gap-2 rounded-xl font-semibold hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B89B72] transition-all cursor-pointer shrink-0 whitespace-nowrap",
          isDropdown
            ? "border border-white/10 bg-[#050505] text-[#F4F1EA] hover:bg-[#111111] hover:border-white/20 w-full justify-between"
            : "border border-white/10 bg-[#111111] text-white hover:bg-white/5 hover:border-white/20",
          isMobileHeader 
            ? "h-9 px-2 text-xs" 
            : "h-11 px-4 text-sm"
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Change language / भाषा बदलें"
      >
        <Globe className={cn("text-[#B8B2A7] shrink-0", isMobileHeader ? "h-3.5 w-3.5" : "h-4 w-4")} />
        <span className="font-sans tracking-wide">
          {displayLabel}
        </span>
        {!isMobileHeader && (
          <ChevronDown className={cn("h-3.5 w-3.5 text-slate-400 transition-transform duration-200 shrink-0", isOpen ? "transform rotate-180" : "")} />
        )}
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-48 rounded-xl bg-[#111111] shadow-xl border border-white/8 ring-1 ring-white/5 z-50 overflow-hidden transform origin-top-right transition-all duration-200",
            isMobileHeader ? "top-full" : ""
          )}
          role="menu"
          aria-orientation="vertical"
        >
          {/* Subtle dropdown helper */}
          <div className="bg-[#0A0A0A] px-4 py-2 border-b border-white/8 text-[10px] font-bold text-[#7C756A] uppercase tracking-wider font-sans">
            Choose Language / भाषा चुनें
          </div>
          <div className="py-1" role="none">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === locale;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLocaleChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-sm transition-colors text-left font-medium cursor-pointer border-b border-white/5 last:border-b-0",
                    isSelected
                      ? "bg-[#0A0A0A] text-[#B89B72] font-semibold"
                      : "text-[#B8B2A7] hover:bg-[#0A0A0A] hover:text-[#F4F1EA]"
                  )}
                  role="menuitem"
                >
                  <div className="flex flex-col">
                    <span className={cn("text-sm", isSelected ? "text-[#B89B72] font-bold" : "text-[#F4F1EA]")}>
                      {lang.nativeName}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-normal font-sans">{lang.name}</span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-[#B89B72]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
