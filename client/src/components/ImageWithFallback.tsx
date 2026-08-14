/* Atelier Obsidian image primitive: campaign-led, quiet, and resilient when an asset fails. */
import { useState } from "react";

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
  fallbackLabel?: string;
};

export function ImageWithFallback({ src, fallbackSrc, fallbackLabel = "Campaign image unavailable", alt = "", onError, ...props }: ImageWithFallbackProps) {
  const [source, setSource] = useState(src);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className={`${props.className ?? ""} image-fallback`} role="img" aria-label={alt}>
      <span>{fallbackLabel}</span>
    </div>;
  }

  return <img
    {...props}
    src={source}
    alt={alt}
    onError={(event) => {
      if (fallbackSrc && source !== fallbackSrc) {
        setSource(fallbackSrc);
        return;
      }
      setFailed(true);
      onError?.(event);
    }}
  />;
}

