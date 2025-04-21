'use client';

import { useEffect, useState } from 'react';
import CreateOrgForm from './create-org-form';
import { OrgDrawer } from './org-drawer';

interface CreateOrgModalProps {
  onClose: () => void;
}

const CreateOrgModal = ({ onClose }: CreateOrgModalProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      onClose(); 
    }
  }, [open, onClose]);

  return (
    <OrgDrawer open={open} onOpenChange={setOpen}>
      <CreateOrgForm onSuccess={handleClose} onCancel={handleClose} />
    </OrgDrawer>
  );
};

export default CreateOrgModal;
