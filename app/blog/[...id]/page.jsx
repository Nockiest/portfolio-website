"use client"
import "../../styles/post.scss"  
import { useRouter,usePathname  } from 'next/navigation';
// import TextBody from "@/components/blog/post/Textbody"; //tohle možná nebude ani potřeba
import InformationBar from "@/components/blog/post/InformationBar";
import CommentForm from "@/components/blog/post/Comment";
import CommentList from "@/components/blog/post/CommentList";
// import NextArticlesRow from "@/components/blog/NextArticlesRow";
import BlogHero from "@/components/blog/BlogHero";
import {useState, useEffect} from "react" ;
import  { auth, db, provider,checkUserAccess, unsubscribe,subscribeToBlogPosts  } from '@/app/firebase';
import {  collection, deleteDoc, doc, getDocs,onSnapshot } from 'firebase/firestore';
 import { updateDbComments } from "@/app/firebase";
 import { v4 as uuidv4 } from 'uuid';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

 const DynamicPage = () => {
  const [postList, setPostList] = useState([]);
  const [thisPost, setThisPost] = useState(null);
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const pathname = usePathname().replace('/blog/', '');

  const convertToTitleCase = (str) => {
    const words = str.split('-');
    const titleCaseWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return titleCaseWords.join(' ');
  };

  const title = convertToTitleCase(pathname);

  useEffect(() => {
    const unsubscribe = onSnapshotPosts();

    return () => {
      unsubscribe(); // Unsubscribe from the snapshot listener
    };
  }, []);

  const onSnapshotPosts = () => {
    const colRef = collection(db, 'BlogPosts');

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPostList(postsData);
      console.log(postsData, 'posts');
    });

    return unsubscribe;
  };

  useEffect(() => {
    const matchingPost = postList.find((post) => post.title.toLowerCase() === title.toLowerCase());
    console.log(matchingPost);
    if (matchingPost) {
      console.log('Matching Post:', matchingPost);
      setThisPost(matchingPost);
      setComments(matchingPost.comments || []);
    }
  }, [postList, title]);

  const updateCommentsInDatabase = async (updatedComments) => {
    console.log(updatedComments)
    try {
      if (thisPost) {
        const postId = thisPost.id;
        await updateDbComments(postId, 'comments', updatedComments, true); // Pass parameterIsArray as true
        console.log('Comments updated successfully!');
      }
    } catch (error) {
      console.error('Error updating comments:', error);
    }
  };

  const addComment = async (newComment) => {
    console.log('New Comment:', newComment);
    console.log('Current Comments:', comments);
  
    try {
      const commentParts = newComment.split(';'); // Split the comment string by ';'
      const name = commentParts[0].trim();
      const email = commentParts[1].trim();
      const commentText = commentParts[2].trim();
  
      const commentWithId = {
        name: name,
        email: email,
        comment: commentText,
        id: uuidv4(), // Generate a unique ID for each comment
      };
  
      console.log(commentWithId);
  
      await updateCommentsInDatabase([...comments, commentWithId]);
      console.log('Comments updated successfully!');
    } catch (error) {
      console.error('Error updating comments:', error);
    }
  };
  

  const goBackOrForward = (move) => {
    if (!thisPost) return;

    const currentIndex = postList.findIndex((post) => post.id === thisPost.id);
    let newIndex;
    if (move < 0) {
      // Moving backward
      if (currentIndex - move < 0) {
        newIndex = postList.length + move + currentIndex;
      } else {
        newIndex = currentIndex + move;
      }
    } else {
      // Moving forward
      if (currentIndex  + move > postList.length - 1) {
        newIndex = currentIndex + move - postList.length;
      } else {
        newIndex = currentIndex + move;
      }
    }

    const newPost = postList[newIndex];
    if (newPost) {
      const postTitle = newPost.title.replace(/\s+/g, '-').toLowerCase(); // Convert the post title to a valid URL format
      router.push(`/blog/${postTitle}`); // Update the URL to the new post
    }
  };

  const goBackToBlog = () => {
    router.push('/blog');
  };

  return (
    <div className="post-whole">
        <button className="back-button box-shadow-level-1" onClick={goBackToBlog}>
          Move Back to Blog
        </button>
      {thisPost && (
        <div className="navigatng-arrows">
          <button className="back-button box-shadow-level-3" onClick={() => goBackOrForward(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button className="back-button box-shadow-level-3" onClick={() => goBackOrForward(1)}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )} 
      {thisPost ? (
        <div className="post-contents box-shadow-level-2">
          <h1 className="post-title">{title}</h1>
          <InformationBar tags={thisPost.tags} date={thisPost.timeStamp} />
          <div className="post-text" style={{ padding: '16px' }}>
            {thisPost.postText}
          </div>
          <CommentForm addComment={addComment} />
          <CommentList comments={comments} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default DynamicPage;



  