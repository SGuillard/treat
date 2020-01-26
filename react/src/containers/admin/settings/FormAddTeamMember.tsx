import React, {FormEvent, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeRequest, {RequestMethod} from "../../../utils/apiRequest";
import API from "../../../API";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
interface FormAddTeamMemberProps {
    toggleForm: (event?: React.MouseEvent) => void;
    addTeamMember: () => void
};

const FormAddTeamMember = ({toggleForm, addTeamMember}: FormAddTeamMemberProps) => {

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        addTeamMember();
        // if (validateForm()) {
        //     makeRequest(RequestMethod.POST, API.TEAM_CREATE, {firstName, lastName}).then(() => {
        //         toggleForm();
        //     }).catch((e) =>console.log(e));
        // }
    };

    const validateForm = () => {
        return firstName.length > 0 && lastName.length > 0;
    };

    return (
        <form onSubmit={handleSubmit}>
        <Grid container spacing={3} style={{padding: '15px'}}>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="fname"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
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
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="primary" type="submit">
                    Add
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="secondary" onClick={toggleForm}>
                    Cancel
                </Button>
            </Grid>
        </Grid>
        </form>
    );
};

const MapDispatchToProps = (dispatch: any) => bindActionCreators({
        addTeamMember: () => dispatch({type: 'ADD_MEMBER', payload: 'trois test'})
}, dispatch);

export default connect(null, MapDispatchToProps)(FormAddTeamMember);
