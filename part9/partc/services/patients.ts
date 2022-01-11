import { NewPatientEntry } from './../types';
import { PatientEntry, NonSensitivePatientEntry } from '../types';
import patientData from '../data/patients.json';
import {v1 as uuid} from 'uuid';


const patients: Array<PatientEntry> = patientData as Array<PatientEntry>;
const getEntries = () : PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = () : NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => {
    
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    };
  });
};

const addPatient = (newPatient: NewPatientEntry) : PatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = String(uuid());


  const patient: PatientEntry = {
    id,
    ...newPatient
  };

  patients.push(patient);
  return patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};