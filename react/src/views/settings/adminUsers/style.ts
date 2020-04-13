import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyleForm = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    backgroundColor: 'red',
    borderRadius: '10px',
    padding: '10px',
    color: 'white',
    textAlign: 'center',
  },
}));

export const useStyleList = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
