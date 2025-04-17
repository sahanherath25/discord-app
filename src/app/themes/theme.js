'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',  // Primary color (Blue)
        },
        secondary: {
            main: '#dc004e',  // Secondary color (Pink/Red)
        },
        background: {
            default: '#fafafa',
            paper:"#F5C45E"// Background color for the app (light grey)
        },
        error: {
            main: '#f44336',  // Error color (Red)
        },
        text: {
            primary: '#000000',  // Text color (Black for normal text)
            secondary: '#757575', // Text color for secondary content
        },
        mode: 'light',  // or 'dark' for dark mode
    },
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    components:{
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: '16px', // or your desired spacing value
                    '&:last-child': {
                        marginBottom: 0 // Remove margin for the last item
                    }
                }
            }
        }
    }

});

export default theme;