import { IconButton } from '@gardentify/ui';
import { useQRCode } from '@modules/common/hooks/use-qr-code';
import React, { useState } from 'react';

import ObjectQrCodeResult from './object-qr-code-result';

type ObjectQrCodeProps = {
  urlToEncode: string;
};

const ObjectQrCode: React.FC<ObjectQrCodeProps> = (props) => {
  const { urlToEncode } = props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const { encodedQR, generateQRCode } = useQRCode(urlToEncode, {
    margin: 1,
    scale: 24,
    type: 'image/webp',
  });

  const handleGenerateQR = () => {
    if (!encodedQR) generateQRCode();
    handleOpenModal();
  };

  return (
    <>
      <IconButton
        aria-label="QR Code"
        className="!p-1.5"
        variant="ghost"
        onClick={handleGenerateQR}
        icon={
          <svg
            className="h-6 w-6 stroke-black dark:stroke-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="4" y="4" width="6" height="6" rx="1" />
            <line x1="7" y1="17" x2="7" y2="17.01" />
            <rect x="14" y="4" width="6" height="6" rx="1" />
            <line x1="7" y1="7" x2="7" y2="7.01" />
            <rect x="4" y="14" width="6" height="6" rx="1" />
            <line x1="17" y1="7" x2="17" y2="7.01" />
            <line x1="14" y1="14" x2="17" y2="14" />
            <line x1="20" y1="14" x2="20" y2="14.01" />
            <line x1="14" y1="14" x2="14" y2="17" />
            <line x1="14" y1="20" x2="17" y2="20" />
            <line x1="17" y1="17" x2="20" y2="17" />
            <line x1="20" y1="17" x2="20" y2="20" />
          </svg>
        }
      />
      <ObjectQrCodeResult result={encodedQR} isModalOpen={modalOpen} onModalClosed={handleCloseModal} />
    </>
  );
};

export default ObjectQrCode;
