import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string | null | undefined;
    description?: string | null | undefined;
    htmlContent?: React.ReactNode;
    confirmText?: string | null | undefined;
    cancelText?: string | null | undefined;
}

export const ConfirmationDialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    description,
    htmlContent,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
}) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog onClose={onClose} className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-base font-medium leading-6 text-gray-900"
                                >
                                    {title}
                                </Dialog.Title>

                                {description && (
                                    <Dialog.Description className="mt-2 text-sm text-gray-500">
                                        {description}
                                    </Dialog.Description>
                                )}

                                {htmlContent && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {htmlContent}
                                        </p>
                                    </div>
                                )}

                                <div className="mt-4 flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="inline-flex rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        {cancelText}
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onConfirm}
                                    >
                                        {confirmText}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>



        // <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        //     <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        //     <div className="fixed inset-0 flex items-center justify-center p-4">
        //         <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
        //             <Dialog.Title className="text-lg font-medium text-gray-900">
        //                 {title}
        //             </Dialog.Title>

        //             {(description || htmlContent) && (
        //                 <Dialog.Description className="mt-2 text-sm text-gray-500">
        //                     {description}
        //                 </Dialog.Description>
        //             )}

        //             {htmlContent}

        //             <div className="mt-4 flex justify-end gap-2">
        //                 <button
        //                     onClick={onClose}
        //                     className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //                 >
        //                     {cancelText}
        //                 </button>
        //                 <button
        //                     onClick={onConfirm}
        //                     className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        //                 >
        //                     {confirmText}
        //                 </button>
        //             </div>
        //         </Dialog.Panel>
        //     </div>
        // </Dialog>
    );
};