import NavBar from '@/components/NavBar'
import './globals.css'
import { Inter, Raleway } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const raleway = Raleway({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${raleway.className}`}>
        <div className={'page'}>
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  )
}
