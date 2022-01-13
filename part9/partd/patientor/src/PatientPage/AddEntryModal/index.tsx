/* eslint-disable */
import React from 'react';
import { Button, Modal, Segment } from 'semantic-ui-react';
import AddEntryForm, { HospitalEntryFormValues } from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalEntryFormValues) => void;
  error?: string;
}

const AddPatientEntry = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      <AddEntryForm onCancel={onClose} onSubmit={onSubmit}/>
    </Modal.Content>
  </Modal>
);

export default AddPatientEntry;