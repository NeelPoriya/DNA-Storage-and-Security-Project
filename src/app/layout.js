'use client';
import NavBar from '@/components/NavBar'
import styles from './page.module.css';
import './globals.css'
import { Inter, Raleway } from 'next/font/google'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { SessionProvider } from 'next-auth/react';
import { Box } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })
const raleway = Raleway({ subsets: ['latin'] })

const theme = createTheme({
  typography: {
    fontFamily: raleway.style.fontFamily,
  },
});

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <body className={`${inter.className} ${raleway.className}`}>
            <Box sx={{
              // backgroundColor: '#8EC5FC',
              // backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
              backgroundColor: '#E3EAF5',
              // backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
            }}
              padding={2}>
              <NavBar />
              {children}
            </Box>
          </body>
        </html>
      </ThemeProvider>
    </SessionProvider>
  )
}
