"use client";

import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { useState, type SyntheticEvent } from "react";

import { shimmerDataUrl } from "@/lib/image";
import { cn } from "@/lib/utils";

export interface AppImageProps extends Omit<NextImageProps, "src"> {
  src: NextImageProps["src"] | string | null | undefined;
  fallbackSrc?: string;
}

export function AppImage({
  src,
  alt = "",
  fallbackSrc = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  placeholder,
  blurDataURL,
  className,
  onError,
  ...props
}: AppImageProps) {
  const [hasError, setHasError] = useState(false);

  // Safe fallback if src is missing or failed
  const imageSrc = !src || hasError ? fallbackSrc : src;

  // Resolve blur placeholder
  const resolvedBlur =
    placeholder === "blur" ? (blurDataURL ?? shimmerDataUrl()) : blurDataURL;

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    onError?.(e);
  };

  return (
    <NextImage
      src={imageSrc}
      alt={alt}
      placeholder={placeholder}
      blurDataURL={resolvedBlur}
      onError={handleError}
      className={cn("transition-opacity duration-300", className)}
      {...props}
    />
  );
}

export { AppImage as Image };
export default AppImage;
