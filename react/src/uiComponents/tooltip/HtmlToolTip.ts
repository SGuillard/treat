import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';

export const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'red',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid red',
  },
}))(Tooltip);
