"use client"
import "../../styles/post.scss"  
import { useRouter } from 'next/router';
import TextBody from "@/components/blog/post/Textbody";
import InformationBar from "@/components/blog/post/InformationBar";
import Comment from "@/components/blog/post/comment";
import NextArticlesRow from "@/components/blog/NextArticlesRow";
import RootLayout from "./layout"
import BlogHero from "@/components/blog/BlogHero";
import { withRouter } from 'next/router';
// jest.mock('next/router');

const DynamicPage = ({ router }) => {
  // console.log(router )
  // // const router = useRouter();
  // // const { postId } = router.query;
  // // const { dynamicContent } = router.query; // This will get the dynamic content from the URL
  // console.log(router,router?.query,router?.pathname) 
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

export default  DynamicPage ;
 
  // Fetch the blog post data based on the postId

  