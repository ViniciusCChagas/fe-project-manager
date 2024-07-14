import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Button } from '../Button';

interface IConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: (accepted: boolean) => void;
  typeName: string;
  isLoading?: boolean;
}

export function ConfirmDeleteDialog({
  isOpen,
  onClose,
  typeName,
  isLoading,
}: IConfirmDeleteDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        onClose(false);
      }}
      transition
      className='fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-200 ease-out data-[closed]:opacity-0'
    >
      <DialogBackdrop className='fixed inset-0 bg-black/30' />

      <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
        <DialogPanel className='max-w-lg rounded-lg bg-white p-6'>
          <p>
            Are you sure you want to <b>DELETE</b> this {typeName}?
          </p>
          <div className='gap-md mt-8 flex justify-between'>
            <Button onClick={() => onClose(false)}>Cancel</Button>
            <Button
              onClick={() => onClose(true)}
              className={'bg-red-600 text-white'}
              loading={isLoading}
            >
              Delete {typeName}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
