"use client"
import "../../styles/post.scss"  
import { useRouter } from 'next/navigation';
import TextBody from "@/components/blog/post/Textbody";
import InformationBar from "@/components/blog/post/InformationBar";
import Comment from "@/components/blog/post/comment";
import NextArticlesRow from "@/components/blog/NextArticlesRow";
import RootLayout from "./layout"
import BlogHero from "@/components/blog/BlogHero";

const DynamicPage = () => {
  const router = useRouter();
  // const { dynamicContent } = router.query; // This will get the dynamic content from the URL
  console.log(router,router.query,router.pathname) 
  return (
     
      
      <div className="post-whole">
      <div className="post-contents"> 
        <h1 className="post-title">BLOG POST tITLE</h1>
        <InformationBar />     
        <TextBody />
        </div>
        <Comment />
        
      </div>
     
     
  );
};

export default DynamicPage;