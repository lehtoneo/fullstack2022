import React from "react";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { addPatient, useStateValue } from "../state";

const PatientPage = () => {
  const [{ patients, diagnosis }, dispatch] = useStateValue();
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
          <div key={index}>
            {entry.date} <i>{entry.description}</i>

            {
              entry.diagnosisCodes?.map((code, index) => {
                return (
                  <ul key={index}>
                    <li>{code} {diagnosis[code] && diagnosis[code].name}</li>
                  </ul>
                );
              })
            }
          </div>
        );
      })
      }
    </div>
  );
};

export default PatientPage;
