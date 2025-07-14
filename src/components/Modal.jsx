import {
  Button as CloseButton,
  Dialog,
  DialogPanel,
  DialogBackdrop,
  DialogTitle,
} from "@headlessui/react";
import Button from "../components/Button";
import CloseIcon from "../assets/images/icon-close-modal.svg";

export default function Modal({
  children,
  dialogTitle,
  isOpen,
  onClose,
  paragraphText,
  buttonText,
}) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-[400px] min-w-[250px] rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:opacity-0 md:max-w-[560px] lg:max-w-[560px]"
          >
            <div className="flex items-center justify-between">
              <DialogTitle as="h3" className="text-xl font-bold">
                {dialogTitle}
              </DialogTitle>
              <CloseButton
                onClick={onClose}
                aria-label="Close Modal"
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                <img src={CloseIcon} alt="" aria-hidden="true" />
              </CloseButton>
            </div>
            <p className="text-grey-500 my-250 text-sm leading-[1.5]">
              {paragraphText}
            </p>
            <div className="mb-250 flex flex-col gap-200">{children}</div>
            <Button
              buttonText={buttonText}
              buttonStyles="bg-black text-white w-full"
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
