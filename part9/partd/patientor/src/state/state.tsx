import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis, Patient } from "../types";

import { Action, setPatients, addPatientToState, setDiagnosis } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnosis: Diagnosis[]
};

const initialState: State = {
  patients: {},
  diagnosis: [],
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const addPatient = addPatientToState;

export const setPatientList = setPatients;

export const setDiagnosisList = setDiagnosis;