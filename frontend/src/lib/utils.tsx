export function cn(...classes: (string | undefined | false)[]): string {
    // Filter out falsy values
  return classes.filter(Boolean).join(" ");
}
