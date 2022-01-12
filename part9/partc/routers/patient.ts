import express from 'express';
import patientService from '../services/patients';
import { toNewPatientEntry } from '../utils';

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
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (e: unknown) {
    res.send({
      error: 'Error creating new patient'
    });
  }
});


export default router;