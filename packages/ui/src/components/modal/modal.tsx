import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import { ModalCloseButton } from './modal-close-button';

export type ModalProps = {
  /** Title of the modal */
  title: string;
  /** Children to render inside the modal content */
  children: React.ReactNode;
  /** Optional: Classnames to style the modal */
  className?: string;
  /** Wether the modal should be open or not */
  isModalOpen: boolean;
  /** Callback function called when the modal is closed */
  onModalClosed: () => void;
};

export const Modal: React.FC<ModalProps> = (props) => {
  const { title, children, isModalOpen, onModalClosed, className = '' } = props;

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onModalClosed}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-50 p-4 align-middle shadow-lg transition-all dark:bg-neutral-800',
                  className
                )}
              >
                {/* Header */}
                <div className="flex justify-between items-center">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                  <ModalCloseButton onClick={onModalClosed} />
                </div>
                {/* Children */}
                <div className="mt-2">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
