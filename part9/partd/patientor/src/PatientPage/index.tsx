import React from "react";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { addPatient, useStateValue } from "../state";
import EntryDetails from "./EntryDetails";



const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id: patientId } = useParams<{ id: string }>();
  const patient = patients[patientId];
  const getIconName = () => {
    if (patient.gender === "other") {
      return "other gender";
    } else {
      return patient.gender;
    }
  };

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );

        dispatch(addPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (!patient?.ssn) {
      void fetchPatient();
    }
    
  }, [dispatch]);

  if (!patient) {
    return <div className="App"></div>;
  }

  return (
    <div className="App">
      <h1>{patient.name} <Icon name={getIconName()}/></h1>
      <p>
        ssn: {patient.ssn}
        <br/>
        occupation: {patient.occupation}
      </p>
      <h2>entries</h2>
      { 
      
      
      patient.entries?.map((entry, index) => {
        return (
          <EntryDetails key={index} entry={entry}/>
        );
      })
      }
    </div>
  );
};

export default PatientPage;
