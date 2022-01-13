import { NewPatient, Gender, HealthCheckEntry, HealthCheckRating, OccupationalHealthcareEntry, SickLeave, BaseEntry, HospitalEntry, Discharge, Entry } from './types';
import { v1 as uuid } from 'uuid';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const isSickLeave = (param: any): param is SickLeave => {
  if (typeof param !== 'object' || param === null) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!param.endDate || !isDate(param.endDate) || !param.startDate || !isDate(param.startDate)) {
    return false;
  }
  return true;
};

const isDischarge = (param: any): param is Discharge => {
  if (typeof param !== 'object' || param === null) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!param.date || !isDate(param.date) || !param.criteria || !isString(param.criteria)) {
    return false;
  }
  return true;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const isStringArray = (param: any): param is string[] => {
  if (!Array.isArray(param)) {
    return false;
  }
  let bool = false;
  param.forEach((el) => {
    if (!isString(el)) {
      bool = true;
    }
  });
  return bool;
};

const parseStringArray = (array: unknown): string[] => {
  if (!array || !isStringArray(array)) {
    throw new Error('Array is not a string array');
  }

  return array;
};

const parseSickLeave = (sickleave: unknown): SickLeave => {
  if (!sickleave || !isSickLeave(sickleave)) {
    throw Error("Sick leave is not in correct form" + sickleave);
  }

  return sickleave;
};

const parseDischarge = (dis: unknown): Discharge => {
  if (!dis || !isDischarge(dis)) {
    throw new Error("Discharge in wrong form" + dis);
  }
  return dis;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if(!rating || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing rating:' + rating);
  }
  return rating;
};


const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing string');
  }

  return text;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

type PatientFields = { name: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, ssn: unknown };

const toNewPatient = ({ name, dateOfBirth, gender, occupation, ssn }: PatientFields): NewPatient => {
  
  const newEntry: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    ssn: parseString(ssn),
    entries: []

  };
  return newEntry;
};

type BaseEntryFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown
};

interface HealthCheckEntryFields extends BaseEntryFields {
  healthCheckRating: unknown;
}

interface OccupationalHealthcareEntryFields extends BaseEntryFields {
  employerName: unknown,
  sickLeave: unknown
}

interface HospitalEntryFields extends BaseEntryFields {
  discharge: unknown,
}

interface EntryCombinedFields extends HealthCheckEntryFields, OccupationalHealthcareEntryFields, HospitalEntryFields {
  type: unknown
}

const toBaseEntry = ({ description, date, specialist, diagnosisCodes } : BaseEntryFields) : BaseEntry => {
  const id = uuid();


  const newEntry: BaseEntry = {
    id,
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
    diagnosisCodes: diagnosisCodes ? parseStringArray(diagnosisCodes) : undefined,
  };
  return newEntry;
};

const toHealthCheckEntry = ({ description, date, specialist, diagnosisCodes, healthCheckRating } : HealthCheckEntryFields) : HealthCheckEntry => {
  
  const baseEntry = toBaseEntry({ description, date, specialist, diagnosisCodes });

  const newEntry: HealthCheckEntry = {
    ...baseEntry,
    type: "HealthCheck",
    healthCheckRating: parseHealthCheckRating(healthCheckRating)
  };

  return newEntry;
};

const toOccupHealthcareEntry = ({ description, date, specialist, diagnosisCodes, sickLeave, employerName } : OccupationalHealthcareEntryFields) : OccupationalHealthcareEntry => {
  
  const baseEntry = toBaseEntry({ description, date, specialist, diagnosisCodes });
 
  const newEntry: OccupationalHealthcareEntry = {
    ...baseEntry,
    type: "OccupationalHealthcare",
    sickLeave: sickLeave ? parseSickLeave(sickLeave) : undefined,
    employerName: parseString(employerName)
  };

  return newEntry;
};

const toHospitalEntry = (variables: HospitalEntryFields) : HospitalEntry => {
  const baseEntry = toBaseEntry(variables);
  const newEntry: HospitalEntry = {
    ...baseEntry,
    type: "Hospital",
    discharge: parseDischarge(variables.discharge)
  };

  return newEntry;
};


const toEntry = (variables: EntryCombinedFields): Entry => {
  const type = variables.type;
  switch (type) {
    case "Hospital":
      return toHospitalEntry(variables);
    case "OccupationalHealthcare":
      return toOccupHealthcareEntry(variables);
    case "HealthCheck":
      return toHealthCheckEntry(variables);
    default:
      throw new Error(`Type ${type} is not a valid entry type`);
    }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export {
  toNewPatient,
  toEntry,
  assertNever

};
