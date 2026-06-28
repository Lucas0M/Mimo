import QRCode from "react-qr-code";

interface CapsuleQrCodeProps {
  url: string;
}

/**
 * QR Code do link público da cápsula — facilita abrir o site direto pelo
 * celular (ex: escaneando de um cartão físico impresso, ou de outra tela).
 */
export default function CapsuleQrCode({ url }: CapsuleQrCodeProps) {
  return (
    <div className="inline-block rounded-xl bg-white p-3">
      <QRCode value={url} size={140} />
    </div>
  );
}
