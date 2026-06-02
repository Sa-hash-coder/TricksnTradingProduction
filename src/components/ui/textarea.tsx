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
          "flex min-h-[80px] w-full rounded-xl border border-[rgba(255,255,255,0.09)] bg-[#101010] px-4 py-3 text-base ring-offset-[#050505] text-[#F5F1E8] placeholder:text-[#7D766B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89B72] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-y",
          error && "border-red-500 focus-visible:ring-red-500",
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
