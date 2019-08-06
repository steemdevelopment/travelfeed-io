import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import accountExists from '../../helpers/accountExists';

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const BeneficiaryInput = props => {
  const [username, setUsername] = useState('');
  const [percentage, setPercentage] = useState(1);

  const newNotification = notification => {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      props.enqueueSnackbar(notification.message, { variant });
    }
  };

  const handleUsernameChange = () => event => {
    setUsername(event.target.value);
  };

  const handlePercentageChange = () => event => {
    setPercentage(event.target.value);
  };

  const handleBeneficiaryAdd = () => {
    const beneficiaries = props.value;
    // Verify username inputLength
    if (beneficiaries.length > 7) {
      newNotification({
        message: 'You cannot enter more than 8 beneficiaries.',
        success: false,
      });
      return;
    }
    // Verify username inputLength
    if (username.length < 1) {
      newNotification({
        message: 'Please enter a username',
        success: false,
      });
      return;
    }
    //   Verify percentage
    if (percentage > 100 || percentage < 1) {
      newNotification({
        message: 'The percentage must be in the range of 1 and 99',
        success: false,
      });
      return;
    }
    // Verify that the total percentage is under 100%
    let percentage_total = Number(percentage);
    beneficiaries.forEach(b => {
      percentage_total += Number(b.percentage);
    });
    if (percentage_total > 100) {
      newNotification({
        message: 'The total beneficiary percentage cannot be over 100%',
        success: false,
      });
      return;
    }
    //  Check if account already exists in list
    let duplicate = false;
    beneficiaries.forEach(b => {
      if (b.username === username) duplicate = true;
    });
    if (duplicate) {
      newNotification({
        message: 'This account already is in your beneficiary list.',
        success: false,
      });
      return;
    }
    // Check if Steem account exists
    accountExists(username).then(res => {
      if (res) {
        beneficiaries.push({ username, percentage });
        props.onChange(beneficiaries);
        setUsername('');
        setPercentage(1);
      } else
        newNotification({
          message: 'Username does not exist',
          success: false,
        });
    });
  };

  const handleBeneficiaryRemove = uname => {
    let beneficiaries = props.value;
    beneficiaries = beneficiaries.filter(item => item.username !== uname);
    props.onChange(beneficiaries);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Username</TableCell>
          <TableCell>Reward</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {props.value.map(b => (
          <TableRow key={b.username}>
            <TableCell>{b.username}</TableCell>
            <TableCell>{b.percentage}%</TableCell>
            <TableCell>
              <MuiThemeProvider theme={theme}>
                <IconButton
                  color="primary"
                  onClick={() => handleBeneficiaryRemove(b.username)}
                >
                  <DeleteIcon />
                </IconButton>
              </MuiThemeProvider>
            </TableCell>
          </TableRow>
        ))}
        <TableRow key="input">
          <TableCell>
            @
            <TextField
              value={username}
              placeholder="username"
              onChange={handleUsernameChange('name')}
            />
          </TableCell>
          <TableCell>
            <TextField
              type="number"
              value={percentage}
              onChange={handlePercentageChange('name')}
            />
            %
          </TableCell>
          <TableCell>
            <IconButton color="primary" onClick={() => handleBeneficiaryAdd()}>
              <AddIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

BeneficiaryInput.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withSnackbar(BeneficiaryInput);
