import express from 'express';
import patientService from '../services/patients';
import { toEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getNonSensitiveEntries();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.findById(id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404);
  }
});

router.post('/', (req, res) => {

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (e: unknown) {
    res.send({
      error: 'Error creating new patient'
    });
  }
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toEntry(req.body);

    const addedEntry = patientService.addPatientEntry(id, newEntry);
    res.send(addedEntry);
  } catch (e: unknown) {
    console.log(e);
    res.send({
      error: 'Error creating new entry'
    });
  }
});


export default router;