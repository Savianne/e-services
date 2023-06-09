import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import { useAppSelector } from './global-state/hooks';
import { ParallaxProvider } from 'react-scroll-parallax';
import { io } from 'socket.io-client';
//Date Picker 
import { LocalizationProvider } from '@mui/x-date-pickers';
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
  
import { 
  CssBaseline,
  Box 
} from '@mui/material';
import { lightTheme, darkTheme } from './app/theme';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import AppLayout from './app/AppLayout';

//Routes
import Home from './routes/home/home';
import Information from './routes/information/information';
import EServices from './routes/e-services/eServices';
import Residents from './routes/information/residents';
import AddResident from './routes/information/add-resident';
import BrgyOfficals from './routes/information/brgy-officials';
import TermOfService from './routes/information/Terms-of-service';
import ResidentInformation from './routes/information/resident-informationtion';
import AddNewTermsOfService from './routes/information/add-new-term';
import SKTermsOfService from './routes/information/sk-term-of-service';
import SeniorCitizens from './routes/information/senior-citizens';
import PrintDocument from './routes/e-services/print-document';
import DocumentRequest from './routes/e-services/document-request';
import SmsSender from './routes/e-services/sms-sender';
import AdminAccountContext from './context/adminAccountContext';
import MyAccount from './routes/my-account';

const BaseContainer = styled(Box)`
  display: flex;
  flex: 0 1 100%;
  min-width: 0;
  height: 100vh;
  background-color: ${({theme}) => theme.customTheme.mainBackground};
`;

const PublicPageBaseContainer = styled(BaseContainer)`
  background-color: white;
`


function AdminView() {
  const themeMode = useAppSelector(state => state.themeModeToggle.mode);

  function showNotification() {
    const notification = new Notification('Hello Admin', {
      body: 'New Document Request Added!',
      icon: '/logo.png',
    });
  
    notification.addEventListener('click', () => {
      // Handle notification click event
    });
  
    notification.addEventListener('close', () => {
      // Handle notification close event
    });
  }

  useEffect(() => {
    const socket = io('http://localhost:3008');

    socket.on('NEW_DOC_REQUEST', (data) => {
      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          showNotification();
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              showNotification();
            }
          });
        }
      }
    });

    return function() {
        socket.disconnect();
    }
}, []);

useEffect(() => {
  
}, [])
  return (
  <AdminAccountContext>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ParallaxProvider>
        <ThemeProvider theme={themeMode == 'light'? lightTheme : darkTheme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/admin" element={<BaseContainer><AppLayout /></BaseContainer>}>
                <Route path="/admin/my-account" index element={<MyAccount />} />
                <Route path="/admin/home" index element={<Home />} />
                <Route path="/admin/information">
                  <Route index element={<Information />} />
                  <Route path="/admin/information/residents">
                    <Route index element={<Residents />} />
                    <Route path="/admin/information/residents/add-resident" element={<AddResident />}/>
                    <Route path="/admin/information/residents/:action/:residentUID" element={<ResidentInformation />}/>
                  </Route>
                  <Route path="/admin/information/senior-citizens" element={<SeniorCitizens />} />
                  <Route path="/admin/information/brgy-officials" element={<BrgyOfficals />} />
                  <Route path="/admin/information/terms-of-service">
                    <Route index element={<TermOfService />}/>
                    <Route path="/admin/information/terms-of-service/new/:org" element={<AddNewTermsOfService />}/>
                  </Route>
                  <Route path="/admin/information/terms-of-service-sk">
                    <Route index element={<SKTermsOfService />} />
                    <Route path="/admin/information/terms-of-service-sk/new/:org" element={<AddNewTermsOfService />}/>
                  </Route>

                </Route>
                <Route path="/admin/e-services" >
                  <Route index element={<EServices />} />
                  <Route path="/admin/e-services/sms">
                    <Route index element={<SmsSender />} />
                  </Route>
                  <Route path="/admin/e-services/print-document">
                    <Route index element={<PrintDocument />} />
                    <Route path="/admin/e-services/print-document/:residentUID" element={<PrintDocument />} />
                  </Route>
                  <Route path="/admin/e-services/document-request" element={<DocumentRequest />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ParallaxProvider>
    </LocalizationProvider>
    </AdminAccountContext>
  );
}

export default AdminView;
