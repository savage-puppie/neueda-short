import Link from 'redux-first-router-link';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

import { shortenUrl, urlFieldChanged } from '../actions/shortener';

const styles = theme => ({
  inputWrapper: {
    padding: '2px 4px',
    margin: '15px 20px 10px 0px',
    width: 500
  },
  input: {
    width: '100%',
    padding: '0 8px',
    fontSize: '14px',
    flex: 1
  },
  button: {
    color: '#039be5',
    backgroundColor: 'white'
  },
  iconButton: {
    padding: 10
  },
  title: {
    fontWeight: '300',
    fontSize: '30px',
    color: '#fff'
  },
  description: {
    fontSize: '14px',
    color: '#fff'
  },
  content: {
    maxWidth: 'fit-content',
    margin: '0 auto'
  },
  jumbotron: {
    backgroundColor: '#366ed1',
    padding: '20px 0px 40px 0px',
  },
  box: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  },
  urlCardPaper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: '20px auto',
    maxWidth: '500px'
  },
  urlCardRow: {
    marginBottom: '20px'
  },
  urlCardLink: {
    color: '#366ed1',
    fontSize: '18px',
    backgroundColor: '#eee',
    padding: '10px',
  },
  urlCardLinkWrapper: {
    margin: '15px 0 50px 0'
  }
});

const Shortener = (props) => {
  const { classes } = props;

  return (
    <div>
      <div className={classes.jumbotron}>
        <div className={classes.content}>
          <div className={classes.box}>
            <Typography className={classes.title}>Simplify your links</Typography>
          </div>
          <div className={classes.box}>
            <FormControl error={!!props.url.error}>
              <Paper className={classes.inputWrapper} elevation={1}>
                <InputBase
                  className={classes.input}
                  disabled={props.loading}
                  placeholder="Your original URL here"
                  onChange={(e) => props.onUrlChange(e.target.value)}
                  value={props.url.value}
                  onKeyPress={(e) => (e.charCode === 13) && props.onSubmitUrl()}
                />
                {props.url.error && <FormHelperText>{props.url.error}</FormHelperText>}
              </Paper>
            </FormControl>
            <Button variant="contained" className={classes.button} onClick={props.onSubmitUrl} disabled={props.loading}>Shorten URL</Button>
          </div>
          <div className={classes.box}>
            <Typography className={classes.description}>All URLs can be accessed by anyone</Typography>
          </div>
        </div>
      </div>

      {props.urlShortened.url &&
      <Paper className={classes.urlCardPaper}  elevation={1}>
        <div className={classes.urlCardRow}>
          <Typography variant="headline">Your short URL</Typography>
          <div className={classes.urlCardLinkWrapper}>
            <Link to={props.urlShortened.short} target="_self" className={classes.urlCardLink}>
              {props.urlShortened.short}
            </Link>
          </div>
        </div>
        <div className={classes.urlCardRow}>
          <Typography variant="caption">Long URL</Typography>
          <Typography>{props.urlShortened.url}</Typography>
        </div>
      </Paper>
      }
    </div>
  );
}

Shortener.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmitUrl: PropTypes.func.isRequired,
  url: PropTypes.shape({
    value: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired
  }).isRequired,
  urlShortened: PropTypes.shape({
    url: PropTypes.string.isRequired,
    short: PropTypes.string.isRequired
  }).isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  url: state.shortener.url,
  urlShortened: state.shortener.urlShortened,
  loading: state.shortener.loading
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitUrl: () => dispatch(shortenUrl()),
  onUrlChange: (newValue) => dispatch(urlFieldChanged(newValue))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Shortener));
