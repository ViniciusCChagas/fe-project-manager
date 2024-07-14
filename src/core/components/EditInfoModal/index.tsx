import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Button } from '../Button';
import { useEffect, useState } from 'react';
import { Input } from '../Input';

interface IConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: (newValue: string | null) => void;
  typeName: string;
  isLoading?: boolean;
}

export function EditModal({
  isOpen,
  onClose,
  typeName,
  isLoading,
}: IConfirmDeleteDialogProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setValue('');
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        onClose(null);
      }}
      transition
      className='fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-200 ease-out data-[closed]:opacity-0'
    >
      <DialogBackdrop className='fixed inset-0 bg-black/30' />

      <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
        <DialogPanel className='gap-lg flex max-w-lg flex-col items-center rounded-lg bg-white p-6'>
          <p className={'text-center font-bold'}>
            Enter the new value for the {typeName}.
          </p>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={'w-full'}
            placeholder={`New ${typeName}`}
          />
          <div className='gap-md mt-4 flex w-full justify-between'>
            <Button onClick={() => onClose(null)}>Cancel</Button>
            <Button
              onClick={() => onClose(value)}
              className={'w-full bg-green-700 text-white'}
              loading={isLoading}
            >
              Save {typeName}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
