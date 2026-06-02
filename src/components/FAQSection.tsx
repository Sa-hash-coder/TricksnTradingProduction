"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/data/faqs";
import { useTranslations } from "next-intl";

export function FAQSection() {
  const t = useTranslations("faq");
  const [openId, setOpenId] = React.useState<number | null>(1); // First item open by default

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-[#050505] relative overflow-hidden w-full border-t border-white/8">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 -z-10 w-[450px] h-[450px] bg-[#B89B72]/0.01 rounded-full blur-[90px] -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 -z-10 w-[400px] h-[400px] bg-[#B89B72]/0.01 rounded-full blur-[80px] translate-x-1/4 translate-y-1/4" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-bold text-[#B89B72] tracking-widest uppercase">
            {t("sectionLabel")}
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[#F4F1EA]">
            {t("heading")}
          </h2>
          <p className="text-base md:text-lg text-[#B8B2A7] leading-relaxed font-sans">
            {t("subtitle")}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#B89B72]/45 bg-[#111111] shadow-sm"
                    : "border-white/8 bg-[#0A0A0A] hover:border-[#B89B72]/30"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-display font-extrabold text-base md:text-lg text-[#F4F1EA] cursor-pointer focus:outline-none focus:text-[#B89B72] transition-colors"
                >
                  <span className={isOpen ? "text-[#B89B72]" : ""}>
                    {t(item.questionKey)}
                  </span>
                  <span className={`shrink-0 ml-4 p-1.5 rounded-lg transition-colors ${
                    isOpen ? "bg-[#B89B72]/10 text-[#B89B72]" : "bg-[#111111] border border-white/8 text-[#F4F1EA]"
                  }`}>
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>

                {/* Collapsible Answer Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm md:text-base text-[#B8B2A7] leading-relaxed font-sans border-t border-white/8 bg-[#111111]/50">
                        {t(item.answerKey)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
