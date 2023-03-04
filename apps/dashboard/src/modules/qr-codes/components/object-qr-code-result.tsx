import { Button, Modal, ModalProps, useToast } from '@gardentify/ui';
import { toBlob, toPng } from 'html-to-image';
import { Options } from 'html-to-image/lib/types';
import Image from 'next/image';
import React, { useRef } from 'react';

type ObjectQrCodeResultProps = {
  result: string | null;
  isModalOpen: ModalProps['isModalOpen'];
  onModalClosed: ModalProps['onModalClosed'];
};

const ObjectQrCodeResult: React.FC<ObjectQrCodeResultProps> = (props) => {
  const { result, isModalOpen, onModalClosed } = props;
  const { toast } = useToast();

  const qrCodeRef = useRef<HTMLImageElement>(null);
  const options: Options = {
    pixelRatio: 2.5,
    quality: 1,
    skipFonts: true,
  };

  const handleQRSave = async () => {
    if (!qrCodeRef.current) return;

    try {
      const imageResult = await toPng(qrCodeRef.current, options);
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = imageResult;
      link.click();

      toast({ variant: 'success', content: 'Qr code saved successfully!' });
    } catch (error) {
      toast({ variant: 'error', content: 'An error ocurred while saving qr code!' });
    }
  };

  const handleQrCopy = async () => {
    if (!qrCodeRef.current) return;

    try {
      const blob = await toBlob(qrCodeRef.current, options);
      if (!blob) return;

      await navigator.clipboard.write([
        new window.ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      toast({ variant: 'success', content: 'Qr code copied successfully!' });
    } catch (error) {
      toast({ variant: 'error', content: 'An error ocurred while saving qr code!' });
    }
  };

  return (
    <Modal title="QR Code" isModalOpen={isModalOpen} onModalClosed={onModalClosed}>
      <div className="mt-4 flex flex-col items-center justify-center space-y-2">
        {result ? (
          <Image
            ref={qrCodeRef}
            src={result}
            alt="QR Code"
            width={250}
            height={250}
            className="w-[210px] rounded-md border-2 md:w-[275px]"
          />
        ) : null}
        <p>Scan using your phone the following QR Code to access this page easily or save the image to your device.</p>
        <div className="flex w-full flex-col justify-center space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-2">
          <Button aria-label="Save QR Code" onClick={handleQRSave}>
            Save to Desktop
          </Button>
          <Button aria-label="Copy QR Code" colorScheme="secondary" variant="ghost" onClick={handleQrCopy}>
            Copy to Clipboard
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ObjectQrCodeResult;
