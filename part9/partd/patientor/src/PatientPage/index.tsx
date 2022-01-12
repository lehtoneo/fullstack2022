import React from "react";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";

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

        dispatch({ type: "ADD_PATIENT", payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    if (!patient.ssn) {
      void fetchPatient();
    }
    
  }, [dispatch]);

  return (
    <div className="App">
      <h1>{patient.name} <Icon name={getIconName()}/></h1>
      <p>
        ssn: {patient.ssn}
        <br/>
        occupation: {patient.occupation}
      </p>
    </div>
  );
};

export default PatientPage;