import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
    export interface Theme {
        customTheme: {
            mainBackground: string,
            borderColor: string,
        }
    }
    // allow configuration using `createTheme`
    export interface ThemeOptions {
        customTheme?: {
            mainBackground: string,
            borderColor: string,
        }
    }
}

export const lightTheme = createTheme({
    customTheme: {
        mainBackground: 'white',
        borderColor: '#E2E1E1',
    },
    palette: {
        mode: 'light',
    }
});

export const darkTheme = createTheme({
    customTheme: {
        mainBackground: '#343541',
        borderColor: '#37414b',
    },
    palette: {
        mode: 'dark',
    }
});
