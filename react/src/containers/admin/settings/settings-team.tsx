import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {Switch} from "@material-ui/core";
import makeRequest, {RequestMethod} from "../../../utils/apiRequest";
import API from "../../../API";
import {Method} from "axios";
import Container from "@material-ui/core/Container";

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
    const [checked, setChecked] = useState<number[]>([1]);
    const [memberList, setMemberList] = useState<TeamMemberInterface[]>([]);

    useEffect(() => {
        makeRequest(RequestMethod.GET, `${API.TEAM_SLUG}`).then((data: any) => setMemberList(data));
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
        <Container component="main" maxWidth="xs">
        <List dense className={classes.root}>
            {memberList.map((member: TeamMemberInterface) => {
                const labelId = `checkbox-list-secondary-label-${member.id}`;
                return (
                    <ListItem key={member.id} button>
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar n°${member.id + 1}`}
                                src={`/static/images/avatar/${member.id + 1}.jpg`}
                            />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={`${member.first_name} ${member.last_name}`} />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                onChange={handleToggle(member.id, )}
                                checked={member.active}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
        </Container>
    );
}

export default SettingsTeam;

