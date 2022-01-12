import { Diagnose } from './../types';
import diagnoseData from '../data/diagnoses.json';

const diagnoses: Array<Diagnose> = diagnoseData as Array<Diagnose>;
const getEntries = () : Array<Diagnose> => {
  return diagnoses;
};


export default {
  getEntries
};