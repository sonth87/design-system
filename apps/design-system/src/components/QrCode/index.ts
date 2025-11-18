import {
  Root,
  Canvas,
  Svg,
  Image,
  Overlay,
  Skeleton,
  Download,
  useQRCode,
  type QRCodeProps,
} from "./QrCode";

const QRCode = Object.assign(Root, {
  Canvas,
  Svg,
  Image,
  Overlay,
  Skeleton,
  Download,
});

export { QRCode };

// Export hook và type
export { useQRCode };
export type { QRCodeProps };
