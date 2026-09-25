import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "ghost" | "outline" | "glass";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type NativeButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;
type LinkButtonProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = NativeButtonProps | LinkButtonProps;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-glow-orange hover:bg-accent-strong",
  ghost: "text-ink-soft hover:bg-surface hover:text-ink",
  outline: "border border-edge-strong text-ink hover:border-edge hover:bg-surface",
  glass: "border border-edge bg-surface text-ink backdrop-blur-md hover:bg-surface-strong",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 rounded-md px-3 text-sm",
  md: "h-10 rounded-md px-4 text-sm",
  lg: "h-12 rounded-lg px-6 text-base",
  icon: "h-10 w-10 rounded-lg",
};

const base =
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-[var(--motion-duration-normal)] ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button({ className, variant = "primary", size = "md", ...props }, ref) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && typeof props.href === "string") {
    const { href, ...anchorProps } = props as LinkButtonProps;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...anchorProps}
      />
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...(props as NativeButtonProps)}
    />
  );
});