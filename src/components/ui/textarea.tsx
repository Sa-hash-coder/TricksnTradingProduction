import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[110px] w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-base text-white outline-none placeholder:text-neutral-500 focus:border-[#B89B72]/60 focus:ring-2 focus:ring-[#B89B72]/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-y",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
