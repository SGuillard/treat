import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import axios from "axios";
import API from "../../../API";
import {getToken, redirectToLoginPage} from "../login/api-login";
import {Switch} from "@material-ui/core";

interface TeamMemberInterface {
    id: number,
    first_name: string,
    last_name: string,
    active: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

const SettingsTeam = () => {
    const classes = useStyles();
    const [checked, setChecked] = useState([1]);
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
            const instance = axios.create({
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
            });
                instance.request({
                    url: `${API.API_URL}${API.TEAM_SLUG}`,
                    method: 'get',
                }).then((response) => setMemberList(response.data.data)).catch(e => redirectToLoginPage());
    }, []);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List dense className={classes.root}>
            {memberList.map((value: TeamMemberInterface) => {
                const labelId = `checkbox-list-secondary-label-${value.id}`;
                return (
                    <ListItem key={value.id} button>
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar n°${value.id + 1}`}
                                src={`/static/images/avatar/${value.id + 1}.jpg`}
                            />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={`${value.first_name} ${value.last_name}`} />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                onChange={handleToggle(value.id)}
                                checked={value.active}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}

export default SettingsTeam;

