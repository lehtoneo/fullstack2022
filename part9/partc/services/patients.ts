import { Patient, NonSensitivePatient, NewPatient, Entry } from '../types';
import patientData from '../data/patients';
import {v1 as uuid} from 'uuid';


const patients: Array<Patient> = patientData.map((patient) => {
  return {
    ...patient
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

  const id = uuid();


  const patient: Patient = {
    id,
    ...newPatient
  };

  patients.push(patient);
  return patient;
};

const addPatientEntry = (patientId: string, newEntry: Entry) : Entry | undefined => {
  const indexOfPatient = patients.findIndex((patient) => patient.id === patientId);
  const found = indexOfPatient !== -1;
  if (!found) {
    return undefined;
  }

  const patient = patients[indexOfPatient];

  patients[indexOfPatient] = {
      ...patient,
      entries: [...patient.entries, newEntry]
  };

  return newEntry;

};

const findById = (id: string) : Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  addPatientEntry,
  findById
};