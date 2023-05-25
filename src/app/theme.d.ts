import '@mui/material';
declare module '@mui/material/styles' {
    export interface Theme {
        customTheme: {
            borderColor: string,
        }
    }
    // allow configuration using `createTheme`
    export interface ThemeOptions {
        customTheme?: {
            borderColor: string,
        }
    }
}