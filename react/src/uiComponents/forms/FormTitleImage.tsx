import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const FormTitleImage = React.memo((props: any) => {
  const classes = useStyles();
  return (
    <Avatar className={classes.avatar}>
      {props.children}
    </Avatar>
  );
});
