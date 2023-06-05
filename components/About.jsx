import Image from 'next/image';

const About = () => {
   return (
     <section className="about-me" id="about">
       <h2 className="section__title section__title--about">Who I am</h2>
       <p className="section__subtitle section__subtitle--about">Student, coder and a runner</p>
 
       <div className="about-me__body">
         <p>Besides coding, I also have a passion for food styling. I love to create beautiful dishes and share them with others. In my free time, you can often find me in the kitchen experimenting with new recipes or taking pictures of my creations.</p>
         <p>In addition to my hobbies, I also love cats, big breakfasts, books, strategy videogames, and learning foreign languages. I believe that learning languages is not only useful but also a great way to connect with people from different cultures.</p>
         <p>I'm excited to see where my interests in coding and food styling take me in the future, and I hope to continue learning and exploring new things along the way.</p>
       </div>
 
       <Image src="/img/dev-jane-02.jpg" alt="Andrew in his coding hideout" className="about-me__img" width={400} height={300} />
     </section>
   );
 };
  export default About