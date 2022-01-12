import React from "react";
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface BaseInfo {
  description: string,
  date: string,
  type: string
}

const BaseInfo = ({ description, date, type }: BaseInfo) => {
  return (
    <>
      {date} {type}
      <br/>
      <i>{description}</i>
    </>
  );
};

const Container = ({ children }) => {
  return (
  <div style={{ 
      borderRadius: 5, borderWidth: 50, 
      borderColor: "blue", background: "grey", 
      padding: 5, marginBottom: 10  }}>
    {children}
  </div>
  );
};

const HospitalEntryComponent: React.FC<{ entry: HospitalEntry }> = ( { entry }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Container>
      <BaseInfo description={entry.description} type={entry.type} date={entry.date}/>

      {
        entry.diagnosisCodes?.map((code, index) => {
          return (
            <ul key={index}>
              <li>{code} {diagnosis[code] && diagnosis[code].name}</li>
            </ul>
          );
        })
      }
    </Container>
  );
};

const OccupationalHealthcareComponent: React.FC<{ entry: OccupationalHealthcareEntry }> = ( { entry }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Container>
      <BaseInfo description={entry.description} type={entry.type} date={entry.date}/>

      {
        entry.diagnosisCodes?.map((code, index) => {
          return (
            <ul key={index}>
              <li>{code} {diagnosis[code] && diagnosis[code].name}</li>
            </ul>
          );
        })
      }
    </Container>
  );
};

const HealthCheckComponent: React.FC<{ entry: HealthCheckEntry }> = ( { entry }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Container>
      <BaseInfo description={entry.description} type={entry.type} date={entry.date}/>

      {
        entry.diagnosisCodes?.map((code, index) => {
          return (
            <ul key={index}>
              <li>{code} {diagnosis[code] && diagnosis[code].name}</li>
            </ul>
          );
        })
      }
    </Container>
  );
};




const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

  switch (entry.type) {
  case "Hospital":
    
    return <HospitalEntryComponent entry={entry}/>;
  case "OccupationalHealthcare":
    return <OccupationalHealthcareComponent entry={entry}/>;
  case "HealthCheck":
    return <HealthCheckComponent entry={entry}/>;
  default:
    return assertNever(entry);
  }
};

export default EntryDetails;