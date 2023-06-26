import React from 'react';
import { styled } from '@mui/material';
import { useAppSelector } from './global-state/hooks';
import { ParallaxProvider } from 'react-scroll-parallax';

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
import TermOfServiceTable from './routes/information/Terms-of-service';

//Public Page
import PublicPage from './routes/public/PublicPage';

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

function App() {
  const [isLogin, setIsLogin] = React.useState(false);

  const themeMode = useAppSelector(state => state.themeModeToggle.mode);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ParallaxProvider>
          {
            isLogin? <>
            <ThemeProvider theme={themeMode == 'light'? lightTheme : darkTheme}>
              <CssBaseline />
              <BrowserRouter>
                <Routes>
                  <Route path="/">
                    <Route path="/" index element={<PublicPage />} />
                  </Route>
                  <Route path="/admin" element={<BaseContainer><AppLayout /></BaseContainer>}>
                    <Route path="/home" index element={<Home />} />
                    <Route path="/information">
                      <Route index element={<Information />} />
                      <Route path="residents">
                        <Route index element={<Residents />} />
                        <Route path="add-resident" element={<AddResident />}/>
                        <Route path=":action" element={<AddResident />} />
                      </Route>
                      <Route path="brgy-officials" element={<BrgyOfficals />} />
                      <Route path="terms-of-service" element={<TermOfServiceTable />} />
                    </Route>
                    <Route path="/e-services" index element={<EServices />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ThemeProvider>
            </> : <>
            <BrowserRouter>
              <Routes>
                <Route path="/">
                  <Route path="/" index element={<PublicPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
            </>
          }
      </ParallaxProvider>
    </LocalizationProvider>
  );
}

export default App;
