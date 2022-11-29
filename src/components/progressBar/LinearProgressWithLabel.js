import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ value, error }) {
 
  return (
    <Box sx={{ width: '100%' }}>
        { (value < 100 && value > 0 ) && <LinearProgressWithLabel value={value} /> }
        { (value >= 100) && 
        <Box> 
            <h2><DoneIcon></DoneIcon></h2>
            <span>Uploaded sucessfully!</span>
        </Box> }
        { error && <p style={{color: "red"}}>Upload failed! Some error occured.  Please try again.</p>}
    </Box>
  );
}
