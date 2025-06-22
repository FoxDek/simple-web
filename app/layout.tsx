import Header from './Components/Header';
import './globals.css'
import { Poppins } from 'next/font/google';

export const metadata = {
  title: 'Simple Web',
  description: 'study site on Next.js',
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className='bg-[#ffffff] flex flex-col min-h-screen'>
        <Header />
        <main className="flex-grow container mx-auto pt-5 pb-10">{children}</main>
      </body>
    </html>
  )
}