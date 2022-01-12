import { Patient, NonSensitivePatient, NewPatient } from '../types';
import patientData from '../data/patients.json';
import {v1 as uuid} from 'uuid';


const patients: Array<Patient> = patientData.map((patient) => {
  return {
    ...patient,
    entries: []
  };
}) as Array<Patient>;
const getEntries = () : Patient[] => {
  return patients;
};

const getNonSensitiveEntries = () : NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    };
  });
};

const addPatient = (newPatient: NewPatient) : Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = String(uuid());


  const patient: Patient = {
    id,
    ...newPatient
  };

  patients.push(patient);
  return patient;
};

const findById = (id: string) : Patient | undefined => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const patient = patients.find((p) => p.id === id);
  return patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById
};