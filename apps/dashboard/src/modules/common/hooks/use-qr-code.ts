import { useToast } from '@gardentify/ui';
import qrcode from 'qrcode';
import { useState } from 'react';

export const useQRCode = (urlToEncode: string, options?: qrcode.QRCodeToDataURLOptions) => {
  const { toast } = useToast();
  const [baseUrl, setBaseUrl] = useState<string>(urlToEncode);
  const [encodedQR, setEncodedQR] = useState<string | null>(null);

  const generateQRCode = () => {
    qrcode
      .toDataURL(baseUrl, options)
      .then((data) => {
        setEncodedQR(data);
      })
      .catch(() => {
        toast({ variant: 'error', content: 'An error ocurred while generating the QR!' });
      });
  };

  return { setBaseUrl, generateQRCode, encodedQR };
};
