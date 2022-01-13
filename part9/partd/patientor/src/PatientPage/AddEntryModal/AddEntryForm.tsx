import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../../components/FormField";
import { HospitalEntry } from "../../types";
import { useStateValue } from "../../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<HospitalEntry, 'id' | 'discharge'>;
export interface HospitalEntryFormValues extends EntryFormValues {
  dischargeDate: string,
  dischargeCriteria: string
}
interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}


export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [ { diagnosis } ] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "Hospital",
        specialist: "",
        dischargeDate: "",
        dischargeCriteria: "",
        date: "",
        description: "",
        diagnosisCodes: []
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.dischargeDate) {
          errors.dischargeDate = requiredError;
        }
        if (!values.dischargeCriteria) {
          errors.dischargeCriteria = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-mm-dd"
              name="dischargeDate"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder=""
              name="dischargeCriteria"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-mm-dd"
              name="date"
              component={TextField}
            />
            
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="diagnosisCodes"
              placeholder=""
              name="diagnosisCodes"
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={diagnosis}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              component={DiagnosisSelection}
            />
          
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
