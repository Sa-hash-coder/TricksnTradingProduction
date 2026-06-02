"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Building2 } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

export function SplitCTA() {
  const t = useTranslations("split");

  const scrollToForm = (formType: "seeker" | "employer") => {
    const targetId = formType === "seeker" ? "job-seeker" : "employer";
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      window.location.hash = `#${targetId}`;
    }
  };

  return (
    <section id="about" className="py-20 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* For Job Seekers (Dark Premium Card) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-[#111111] border border-white/8 p-8 md:p-12 text-white shadow-xl flex flex-col justify-between"
          >
            {/* Background vector */}
            <div className="absolute top-0 right-0 -z-10 w-[200px] h-[200px] bg-[#B89B72]/5 rounded-full blur-3xl translate-x-10 -translate-y-10" />
            
            <div className="space-y-6">
              <div className="bg-[#B89B72] text-[#050505] p-3 rounded-2xl w-fit">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-[#F4F1EA]">
                {t("seeker_title")}
              </h3>
              <p className="text-sm md:text-base text-[#B8B2A7] leading-relaxed font-sans max-w-md">
                {t("seeker_desc")}
              </p>
            </div>

            <div className="pt-8">
              <Button
                onClick={() => scrollToForm("seeker")}
                variant="accent"
                className="gap-2 cursor-pointer"
              >
                {t("seeker_btn")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* For Employers (Dark Clean Card) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-white/8 bg-[#111111] p-8 md:p-12 shadow-md flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="bg-[#050505] text-[#F4F1EA] border border-white/8 p-3 rounded-2xl w-fit">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-[#F4F1EA]">
                {t("employer_title")}
              </h3>
              <p className="text-sm md:text-base text-[#B8B2A7] leading-relaxed font-sans max-w-md">
                {t("employer_desc")}
              </p>
            </div>

            <div className="pt-8">
              <Button
                onClick={() => scrollToForm("employer")}
                variant="primary"
                className="gap-2 cursor-pointer"
              >
                {t("employer_btn")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

