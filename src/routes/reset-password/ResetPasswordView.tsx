import React from 'react';
import { styled } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';
import axios from 'axios';
//Date Picker 
import { LocalizationProvider } from '@mui/x-date-pickers';
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import ExpirationTimer from './ExpirationTimer';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { 
  CssBaseline,
  Box,
  TextField,
  Button,
  Avatar,
  Alert,
  Backdrop,
  CircularProgress,
  Snackbar,
  Divider
} from '@mui/material';

const BaseContainer = styled(Box)`
  display: flex;
  flex: 0 1 100%;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 100vh;
  background-color: white;
`;

function ResetPasswordView() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ParallaxProvider>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/reset-password/:token/*" element={<BaseContainer><ResetPassword /></BaseContainer>} />
            </Routes>
          </BrowserRouter>
      </ParallaxProvider>
    </LocalizationProvider>
  );
}

interface IUser {
  name: string;
  avatar: string,
  email: string,
  UID: string,
}
// {
//   name: "Mark Nino Baylon",
//   avatar: "apple.png",
//   UID: "12345",
//   email: "www.markninyo@gmail.com",
// }
const FCForgotPassword:React.FC<{className?: string}> = ({className}) => {
  const [account, setAccount] = React.useState<null | IUser>(null);
  const [formExpired, setFormExpired] = React.useState(false);
  const [expDate, setExpDate] = React.useState<null | string>(null);
  const [loadingAccount, setLoadingAccount] = React.useState(true);
  const [errorLoadingAccount, setErrorLoadingAccount] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordMatch, setPasswordMach] = React.useState("");
  const [resetOngoing, setResetOngoing] = React.useState(false);
  const [resetfailed, setResetFailed] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState<null | string>(null);
  const [passwordValid, setPaswordValid] = React.useState(false);
  const [passwordIsMatch, setPasswordIsMatch] = React.useState(false);

  const [resetDone, setResetDone] = React.useState(false);

  React.useEffect(() => {
    (passwordValid && password == passwordMatch)? setPasswordIsMatch(true) : setPasswordIsMatch(false);
  }, [password, passwordMatch, passwordValid]);

  React.useEffect(() => {
    setLoadingAccount(true);
    axios.post(`${window.location.href.replace(/\/$/, '')}/get-account`)
    .then(res => {
      const account = res.data;
      setAccount(account.account);
      setExpDate(account.expDate);
      setLoadingAccount(false);
      errorLoadingAccount && setErrorLoadingAccount(false);
    })
    .catch(err => {
      setAccount(null);
      setLoadingAccount(false);
      setErrorLoadingAccount(true);
    })
  }, []);
  return (
    <div className={className}>
        <div className="row">
          <img src="/logo.png" alt="Sandiat Centro E-Services System" className="logo" />
      </div>
      <div className="row">
        <h2>Reset Password</h2>
      </div>
      {
        resetDone? <>
          <div className="row">
              <Alert severity="success">Reset password successfully!</Alert>
            </div>
        </> : <>
        {
          !formExpired? <>
          {
            account && <>
            <div className="row">
                <Avatar src={`/assets/images/avatar/${account.avatar}`} alt={account.name} sx={{height: "80px", width: "80px"}} />
                <div className="col-right">
                  <h3 className="name">{account.name}</h3>
                  <h4 className="email">{account.email}</h4>
                </div>
            </div>
            {
              expDate && <div className="row">
                <ExpirationTimer expirationDate={new Date(expDate).getTime()} onExpires={() => setFormExpired(true)} text='This Form Expires within'/>
              </div>
            } 
            <Divider orientation='horizontal' />
            {
              passwordError && <div className="row">
                <Alert severity="error">{passwordError}</Alert>
              </div>
            }

            {
              resetfailed && <div className="row">
                <Alert severity="error">Filed to reset password, try again!</Alert>
              </div>
            }
            <div className="row">
                <TextField
                error={!!passwordError}
                type="password" 
                value={password} 
                onChange={(e) => {
                  const hasError = (function validatePassword(password: string): null | string {
                    const regex = /^(?=.*[A-Z])(?=.*\d).*$/;
                  
                    if (password.length < 8) {
                      return "The password must be at least 8 characters long and have at least 1 numeric character and at least 1 uppercase letter.";
                    }
                  
                    if (!regex.test(password)) {
                      return "The password must be at least 8 characters long and have at least 1 numeric character and at least 1 uppercase letter.";
                    }
                  
                    return null;
                  })(e.target.value);
                  setPasswordError(hasError);
                  setPaswordValid(hasError == null);
                  setPassword(e.target.value);
                } } label="New password" variant="outlined" fullWidth />
            </div>
            <div className="row">
                <TextField disabled={!passwordValid} error={passwordValid && !passwordIsMatch} type="password" value={passwordMatch} onChange={(e) => setPasswordMach(e.target.value)} label="Confirm password" variant="outlined" fullWidth />
            </div>
            <div className="row">
                <Button variant="contained" disabled={!(passwordValid && passwordIsMatch) || resetOngoing } endIcon={ resetOngoing?  <CircularProgress size={50} color="inherit" /> : null} sx={{marginLeft: "auto", width: "100%", height: "50px"}} 
                onClick={() => {
                  setResetOngoing(true);
                  axios.post(`${window.location.href.replace(/\/$/, '')}/reset`, {password: password, account_uid: account.UID})
                  .then(response => {
                    setResetOngoing(false);
                    resetfailed && setResetFailed(false);
                    setResetDone(true);
                  })
                  .catch(error => {
                    setResetOngoing(false);
                    setResetFailed(true);
                  })
                }}>Reset</Button>
            </div>
            </>
          }
          {
            loadingAccount &&  <>
              <div className="row">
                  <CircularProgress size={50} color="inherit" />
              </div>
            </>
          }
          {
            errorLoadingAccount && <div className="row">
              <Alert severity="error">Error loading account info, this is due to the token is invalid or the token is expired. please request another reset link!</Alert>
            </div>
          }
          </> : <>
          <div className="row">
              <Alert severity="error">Form expired! Please request another reset link!</Alert>
            </div>
          </>
        }
        </>
      }
      
    </div>
  )
}

const ResetPassword = styled(FCForgotPassword)`
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 400px;
    height: fit-content;
    padding: 20px 15px;
    gap: 15px;

    .row {
        display: flex;
        flex: 0 1 100%;
        align-items: center;
        justify-content: center;

        .logo {
            width: 130px;
        }

        .col-right {
          display: flex;
          height: fit-content;
          flex-wrap: wrap;
          margin-left: 10px;

          .name, .email, .not-you {
            flex: 0 1 100%;
            margin: 0;
          }

          .not-you .btn {
            cursor: pointer;
            color: #00c4ff;
          }
        }
    }
`

export default ResetPasswordView;
