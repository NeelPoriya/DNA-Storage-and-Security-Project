'use client';
import NavBar from '@/components/NavBar'
import styles from './page.module.css';
import './globals.css'
import { Inter, Raleway } from 'next/font/google'
import { ThemeProvider, createTheme } from '@mui/material'
import { SessionProvider } from 'next-auth/react';

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
            <div className={styles['page']}>
              <NavBar />
              {children}
            </div>
          </body>
        </html>
      </ThemeProvider>
    </SessionProvider>
  )
}
