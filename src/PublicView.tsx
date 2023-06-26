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
import { ThemeProvider } from '@mui/material/styles';

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

function PublicView() {
  const [isLogin, setIsLogin] = React.useState(false);

  const themeMode = useAppSelector(state => state.themeModeToggle.mode);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ParallaxProvider>
        {/* <ThemeProvider theme={themeMode == 'light'? lightTheme : darkTheme}> */}
            <CssBaseline />
            <BrowserRouter>
            <Routes>
                <Route path="/">
                <Route path="/" index element={<PublicPage />} />
                </Route>
            </Routes>
            </BrowserRouter>
      </ParallaxProvider>
    </LocalizationProvider>
  );
}

export default PublicView;
        {/* </ThemeProvider> */}
        {/* </H7UJ</ThemeProvider> */}
