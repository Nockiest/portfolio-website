import Image from 'next/image';
import About from "components/About";
import Portfolio from "components/Portfolio";
import Intro from "components/Intro";
import Services from "components/Services";
import RootLayout from './RootLayout';

export default function Home() {
  return (
    <RootLayout> 
      <main>
        <Intro />
        <Services />
        <About />
        <Portfolio />
      </main>
    </RootLayout>
  )
}
