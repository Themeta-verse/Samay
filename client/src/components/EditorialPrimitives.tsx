// Atelier Obsidian structural system: reusable containers and image plates keep the maison spacious, deliberate, and resilient.
import type { ReactNode } from "react";
import { ImageWithFallback } from "./ImageWithFallback";

type ContentFrameProps = {
  children: ReactNode;
  className?: string;
};

type EditorialSplitProps = ContentFrameProps & {
  tone?: "dark" | "paper";
  reverse?: boolean;
};

type ImageFrameProps = {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  role?: "hero" | "product" | "macro" | "architectural" | "movement" | "editorial";
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

export function ContentFrame({ children, className = "" }: ContentFrameProps) {
  return <div className={`samay-container ${className}`.trim()}>{children}</div>;
}

export function EditorialSplit({ children, className = "", tone = "paper", reverse = false }: EditorialSplitProps) {
  return <section className={`editorial-split editorial-split--${tone} ${reverse ? "editorial-split--reverse" : ""} ${className}`.trim()}>{children}</section>;
}

export function ImageFrame({ src, fallbackSrc, alt, className = "", role = "editorial", loading = "lazy", fetchPriority = "auto" }: ImageFrameProps) {
  return <div className={`image-frame image-frame--${role} ${className}`.trim()} data-image-role={role}>
    <ImageWithFallback className="image-frame__img" src={src} fallbackSrc={fallbackSrc} alt={alt} loading={loading} fetchPriority={fetchPriority} />
  </div>;
}
