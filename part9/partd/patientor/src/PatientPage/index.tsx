import React, { useState } from "react";
import axios from "axios";
import { Icon, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { HospitalEntry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { addPatient, useStateValue } from "../state";
import EntryDetails from "./EntryDetails";
import AddEntryModal from './AddEntryModal';
import { HospitalEntryFormValues } from "./AddEntryModal/AddEntryForm";


const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [entryModalOpen, setEntryModalOpen] = useState<boolean>(false);
  const { id: patientId } = useParams<{ id: string }>();
  const patient = patients[patientId];

  const getIconName = () => {
    if (patient.gender === "other") {
      return "other gender";
    } else {
      return patient.gender;
    }
  };

  const onEntrySubmit = async (values: HospitalEntryFormValues) => {
    const dataToApi: Omit<HospitalEntry, 'id'> ={
      ...values,
      discharge: {
        date: values.dischargeDate,
        criteria: values.dischargeCriteria
      }

    };
    const { data } = await axios.post<HospitalEntry>(
      `${apiBaseUrl}/patients/${patientId}/entries`,
      dataToApi
    );
    if (data.date) {
      const newEntries = patient.entries ? [...patient.entries, data] : [data];
      const updatedPatient: Patient = {
        ...patient,
        entries: newEntries
      };
      dispatch(addPatient(updatedPatient));
      setEntryModalOpen(false);
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
      <Button onClick={() => setEntryModalOpen(true)} style={{ marginBottom: 10 }}> Add entry </Button>
      { 
      
      
      patient.entries?.map((entry, index) => {
        return (
          <EntryDetails key={index} entry={entry}/>
        );
      })
      }
      <AddEntryModal 
        modalOpen={entryModalOpen}
        onClose={() => setEntryModalOpen(false)} 
        onSubmit={onEntrySubmit}/>
    </div>
  );
};

export default PatientPage;
