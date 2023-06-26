import React from 'react';
import { styled } from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';
import axios from 'axios';
//Date Picker 
import { LocalizationProvider } from '@mui/x-date-pickers';
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

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
  Snackbar
} from '@mui/material';

const BaseContainer = styled(Box)`
  display: flex;
  flex: 0 1 100%;
  /* align-items: center; */
  justify-content: center;
  min-width: 0;
  height: 100vh;
  background-color: white;
`;

function LoginView() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ParallaxProvider>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<BaseContainer><Login /></BaseContainer>} />
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

const FCLogin:React.FC<{className?: string}> = ({className}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [view, setView] = React.useState("login");
  const [loginError, setLoginError] = React.useState<null | string>(null);
  const [findAccountEmail, setFindAccountEmail] = React.useState("");
  const [findAccountError, setFindAccountError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [user, setUser] = React.useState<null | IUser>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sendingResetLink, setSendingResetLink] = React.useState(false);
  const [sendResetLinkError, setSendResetLinkError] = React.useState(false);
  const [verifyingLogin, setVerifyingLogin] = React.useState(false);
  const [findingAccount, setFindingAccount] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    setIsLoading(true);
    axios.post(`${window.location.href.replace(/\/$/, '')}/get-pending-user-login`)
    .then(res => {
      const user = res.data;
      setUser(user);
      setIsLoading(false);
    })
    .catch(err => {
      setUser(null);
      setIsLoading(false);
    })
  }, []);

  return (
    <div className={className}>
      <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}><CircularProgress color="inherit" /></Backdrop>
      <div className="row">
          <img src="/logo.png" alt="Sandiat Centro E-Services System" className="logo" />
      </div>
      {
        view == "login"? <>
        {
          user? <>
          <div className="row">
            <Avatar src={`/assets/images/avatar/${user.avatar}`} alt={user.name} sx={{height: "80px", width: "80px"}} />
            <div className="col-right">
              <h3 className="name">{user.name}</h3>
              <h4 className="email">{user.email}</h4>
              <div className="not-you">
                <span className="btn" onClick={() => {
                  setIsLoading(true);
                  axios.delete(`${window.location.href.replace(/\/$/, '')}/remove-pending-user-login`)
                  .then(res => {
                    const flag = res.data.success;
                    if(flag) {
                      setUser(null);
                      setEmail("");
                      setEmailError(false);
                      setPassword("")
                      setPasswordError(false);
                      setLoginError(null);
                    }
                    setIsLoading(false);
                  })
                  .catch(err => {
                    setIsLoading(false);
                  })
                }}>Not you?</span>
              </div>
            </div>
          </div> 
          {
            loginError && <div className="row">
              <Alert severity="error">{loginError}</Alert>
            </div>
          }
          </> : <>
          {
            loginError && <div className="row">
              <Alert severity="error">{loginError}</Alert>
            </div>
          }
          <div className="row">
            <Box sx={{ display: 'flex', alignItems: 'center', flex: "0 1 100%" }}>
                <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField disabled={verifyingLogin} error={emailError} type="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" fullWidth sx={{ m: 1, mr: 0}} />
            </Box>
          </div>
          </>
        }    
        <div className="row">
            <Box sx={{ display: 'flex', alignItems: 'center', flex: "0 1 100%" }}>
                <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                {/* <TextField type='password' size="small" label="Email" variant="outlined" fullWidth /> */}
                <FormControl sx={{ m: 1, mr: 0}} variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      error={passwordError}
                      disabled={verifyingLogin}
                      value={password} onChange={(e) => setPassword(e.target.value)}
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                      <InputAdornment 
                      position="end">
                          <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                      </InputAdornment>
                      }
                      label="Password"
                      fullWidth
                    />
                </FormControl>
            </Box>
        </div>
        <div className="row">
            <Button variant="contained" disabled={verifyingLogin} endIcon={verifyingLogin? <CircularProgress size={20} color="inherit" /> : <LoginIcon />} sx={{marginLeft: "auto", width: "100%", height: "50px"}}
            onClick={() => {
              setVerifyingLogin(true);
              axios.post(`${window.location.href.replace(/\/$/, '')}/verify-login`, {email: user? user.email : email, password: password}) 
              .then(res => {
                const {login, userLoginInfo, error, code} = res.data;
                if(login) return document.location.reload();
                switch(code) {
                  case "NO_ACCOUNT":
                    setEmailError(true);
                    passwordError && setPasswordError(false)
                    break;
                  case "INCORRECT_PASS":
                    setPasswordError(true);
                    emailError && setEmailError(false);
                    setUser(userLoginInfo);
                    break;
                }
                setLoginError(error)
                setVerifyingLogin(false);
              })
              .catch(err => {
                setVerifyingLogin(false);
                setLoginError("Something went wrong!");
              })
            }}>Login</Button>
        </div>
        <div className="row">
          <Button onClick={() => setView("forgot-pass")} size="small">Forgot Password?</Button>
        </div>
        </> : <>
        {
          user? <>
          <div className="row">
            <Avatar src={`/assets/images/avatar/${user.avatar}`} alt={user.name} sx={{height: "80px", width: "80px"}} />
            <div className="col-right">
              <h1 className="name">{user.name}</h1>
              <h4 className="email">{user.email}</h4>
              <div className="not-you">
                <span className="btn" onClick={() => {
                  setUser(null)
                }}>Not you?</span>
              </div>
            </div>
          </div>
          <div className="row">
            <Alert severity="info">Reset password link will be send to your email {user.email}</Alert>
          </div>
          {
            sendResetLinkError && <div className="row">
              <Alert severity="error">Failed to send reset link to email {user.email}. Try again!</Alert>
            </div>
          }
          <div className="row">
            <Button disabled={sendingResetLink} variant="contained" endIcon={sendingResetLink? <CircularProgress size={20} color="inherit" /> : <SendIcon />} sx={{width: "100%"}}
            onClick={(() => {
              setSendingResetLink(true);
              axios.post(`${window.location.href.replace(/\/$/, '')}/send-reset-link`, {email: user.email})
              .then(response => {
                setSendingResetLink(false);
                sendResetLinkError && setSendResetLinkError(false);
                setView("login")
                setOpen(true);
              })
              .catch(err => {
                setSendingResetLink(false);
                setSendResetLinkError(true);
              })
            })}>Send reset link</Button>
          </div>
          <div className="row">
            <Button onClick={() => setView("login")} size="small">Back to login</Button>
          </div>
          </> : <>
          <div className="row">
            <Alert severity="info">Find your account by the email address associated with your account</Alert>
          </div>
          {
            findAccountError && <div className="row">
              <Alert severity="error">No account found associated with the informatio you provided!</Alert>
            </div>
          }
          <div className="row">
              <TextField type="email" value={findAccountEmail} onChange={(e) => setFindAccountEmail(e.target.value)} label="Email" variant="outlined" fullWidth sx={{ m: 1, mr: 0}} />
          </div>
          <div className="row">
            <Button disabled={findingAccount} variant="contained" endIcon={findingAccount? <CircularProgress size={20} color="inherit" /> : <SearchIcon />} sx={{width: "100%"}}
            onClick={() => {
              setFindingAccount(true);
              axios.post(`${window.location.href.replace(/\/$/, '')}/find-account`, {email: findAccountEmail})
              .then(response => {
                setUser(response.data as IUser);
                findAccountError && setFindAccountError(false);
                setFindingAccount(false);
              })
              .catch(err => {
                setFindAccountError(true);
                setFindingAccount(false);
              })
            }}>Find account</Button>
          </div>
          <div className="row">
            <Button onClick={() => setView("login")} size="small">Back to login</Button>
          </div>
          </>
        }
        </>
      }
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Successfully sent a reset password link
        </Alert>
      </Snackbar>
    </div>
  )
}

const Login = styled(FCLogin)`
    display: flex;
    margin-top: 5%;
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

export default LoginView;
