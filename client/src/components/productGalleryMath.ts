export const MIN_GALLERY_ZOOM = 1;
export const MAX_GALLERY_ZOOM = 2.25;

export function clampGalleryZoom(value: number) {
  return Math.min(Math.max(value, MIN_GALLERY_ZOOM), MAX_GALLERY_ZOOM);
}

export function getGalleryIndex(current: number, direction: number, length: number) {
  if (length <= 0) return 0;
  return (current + direction + length) % length;
}

export function getPinchZoom(startZoom: number, startDistance: number, nextDistance: number) {
  if (startDistance <= 0) return clampGalleryZoom(startZoom);
  return clampGalleryZoom(startZoom * (nextDistance / startDistance));
}
