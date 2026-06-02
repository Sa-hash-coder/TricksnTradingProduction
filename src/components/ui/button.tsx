import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "accent-emerald" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          // Variants
          {
            "bg-[#B89B72] text-[#050505] hover:bg-[#C8AD85] shadow-sm focus-visible:ring-[#B89B72]":
              variant === "primary" || variant === "accent",
            "border border-[rgba(184,155,114,0.28)] bg-transparent text-[#F5F1E8] hover:bg-[rgba(184,155,114,0.10)] focus-visible:ring-[#B89B72]":
              variant === "secondary",
            "bg-[#10B981] text-white hover:bg-[#059669] shadow-sm focus-visible:ring-[#10B981]":
              variant === "accent-emerald",
            "border border-white/10 bg-transparent text-[#F5F1E8] hover:bg-white/5 hover:border-white/20 focus-visible:ring-[#B89B72]":
              variant === "outline",
            "bg-transparent text-[#F5F1E8] hover:bg-white/5 focus-visible:ring-[#B89B72]":
              variant === "ghost",
            "bg-transparent text-[#B89B72] underline-offset-4 hover:text-[#C8AD85] p-0 h-auto":
              variant === "link",
          },
          // Sizes
          {
            "h-9 px-4 text-sm": size === "sm",
            "h-11 px-6 text-base": size === "md",
            "h-13 px-8 text-lg rounded-2xl": size === "lg",
            "h-11 w-11 p-0": size === "icon",
          },
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
