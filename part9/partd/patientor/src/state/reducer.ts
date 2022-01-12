import { State } from "./state";
import { Patient, Diagnosis } from "../types";

interface SetPatientList {
  type: "SET_PATIENT_LIST";
  payload: Patient[];
}

interface AddPatient {
  type: "ADD_PATIENT";
  payload: Patient;
}

interface SetDiagnosis {
  
  type: "SET_DIAGNOSIS_LIST";
  payload: Diagnosis[];
  
}

export type Action = SetDiagnosis | AddPatient | SetPatientList;
  
  

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis
        }
      };
    default:
      return state;
  }
};


export const setPatients = (patients: Patient[]) : Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
};

export const addPatientToState = (patient: Patient) : Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const setDiagnosis = (diagnosis: Diagnosis[]) : Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnosis
  };
};