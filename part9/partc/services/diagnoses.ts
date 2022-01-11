import { DiagnoseEntry } from './../types';
import diagnoseData from '../data/diagnoses.json';

const diagnoses: Array<DiagnoseEntry> = diagnoseData as Array<DiagnoseEntry>;
const getEntries = () : Array<DiagnoseEntry> => {
  return diagnoses;
};


export default {
  getEntries
};