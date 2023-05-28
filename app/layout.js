 
import { Inter } from 'next/font/google'
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "./styles/globals.css"  
// import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <Nav />
        {children}
        <Footer />
        </body>
    </html>
  )
}
