import React from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

interface FormAddTeamMemberProps {
    toggleForm: (event: React.MouseEvent) => void;
}

const FormAddTeamMember = ({toggleForm}: FormAddTeamMemberProps) => {

    return (
        <Grid container spacing={3} style={{padding: '15px'}}>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="fname"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="lname"
                />
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="primary">
                    Add
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="secondary" onClick={toggleForm}>
                    Cancel
                </Button>
            </Grid>
        </Grid>
    );
};

export default FormAddTeamMember;
