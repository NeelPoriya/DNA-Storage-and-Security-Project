'use client';
import NavBar from '@/components/NavBar'
import './globals.css'
import { Inter, Raleway } from 'next/font/google'
import { ThemeProvider, createTheme } from '@mui/material'
import AuthProvider from '@/context/AuthProvider';

const inter = Inter({ subsets: ['latin'] })
const raleway = Raleway({ subsets: ['latin'] })

const theme = createTheme({
  typography: {
    fontFamily: raleway.style.fontFamily,
  },
});

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <body className={`${inter.className} ${raleway.className}`}>
            <div className={'page'}>
              <NavBar />
              <div className={'content'}>
                {children}
              </div>
            </div>
          </body>
        </html>
      </ThemeProvider>
    </AuthProvider>
  )
}
