import { PatientEntry, NonSensitivePatientEntry } from '../types';
import patientData from '../data/patients.json';

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


export default {
  getEntries,
  getNonSensitiveEntries
};