"use client"
 

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signInWithPopup,  signInWithGoogle } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';


import Head from 'next/head';
import SearchBar from '@/components/blog/SearchBar';
import SearchClasses from '@/components/blog/SearchClasses';
import PostPreview from '@/components/blog/PostPreview';
import TagBar from '@/components/blog/TagBar';
import LoginButton from '@/components/blog/LoginButton';
 import articles from '../articles';
import '../styles/globals.scss';

import { getUserAuthentication } from '../firebase';
import { AuthProvider } from '../AuthContext';
import { auth, db, provider,checkUserAccess  } from '@/app/firebase';
import { helmetBattle } from 'fontawesome';

const BlogPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false)
  const [profilePic, setProfilePic] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [postLists, setPostList] = useState([]);
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  // const postsCollectionRef = collection(db, 'BlogPosts');

  // const deletePost = async (id) => {
  //   const postDoc = doc(db, 'BlogPost', id);
  //   await deleteDoc(postDoc);
  // };

  const handleSignInWithGoogle = async () => {
          console.log("hello")
    try {
      await signInWithGoogle().then(() => {
        checkUserAccess().then((isAdmin) => {
          if (isAdmin) {
            setIsAdmin(true);
          }
        });
      });
    } catch (error) {
      setErrorMessage('Error signing in with Google.');
    }
  };

  const handleUpdateProfile = () => {
    if (user) {
      user
        .updateProfile({
          displayName: 'New Display Name',
          photoURL: 'https://example.com/new-profile-pic.jpg',
        })
        .then(() => {
          console.log('Profile updated successfully.');
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
        });
    }
  };

  useEffect(() => {

    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    const storedProfilePic = localStorage.getItem('profilePic');
  
    if (storedName || storedEmail || storedProfilePic) {
      setName(storedName || '');
      setEmail(storedEmail || '');
      setProfilePic(storedProfilePic || '');
      setIsAuth(true);
      alert(`${storedName || ''} ${storedEmail || ''} ${storedProfilePic || ''}`);
    }
    if(checkUserAccess){setIsAdmin(true) }
    console.log(isAdmin, "xyz")
     
  }, []);

  const handleDelete = (index) => {
    const updatedArticles = [...articles];
    updatedArticles.splice(index, 1);
    setArticles(updatedArticles);
  };
  // useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postsCollectionRef);
  //     setPostList(
  //       data.docs.map((doc) => {
  //         const { XX, YY, ZZZZ } = doc.data();
  //         const formattedData = `${XX}:${YY}:${ZZZZ}`;
  //         return { ...formattedData, id: doc.id };
  //       })
  //     );
  //   };

  //   getPosts();
  //   console.log(postLists, 'xyz');
  // }, []);

  return (
    <div>
      <Head>
        <title>Blog Page</title>
      </Head>

      <main>
        <section className="topSearchBarContainer">
          <SearchBar />
          <SearchClasses />
          
         <LoginButton user={user}/>
        </section>
        
        <section className="bodycontainer">
          <div className="postpreviewcontainer">
            {articles.map((post, index) => {
              return (
                <PostPreview
                  key={index}
                  index={index}
                  heading={post.title}
                  text={post.body}
                  image={post.image}
                  tags={post.tags}
                  releaseDate={post.Date}
                  handleDelete={handleDelete}
                />
              );
            })}
          </div>
          <TagBar />
        </section>

        <button className="add">
          <Link href="/blog/createPost">Add Post</Link>
        </button>

        
      </main>
       
      {/* <footer>
        {/* Footer content goes here  }
      </footer> */} 
    </div>  
  );
};

export default BlogPage;

{/* <div className="homePage">
{postLists.map((post) => {
  const title = post.Title || '';
  const postText = post.postText || '';
  const author = post.Author || '';
  const tags = post.tags || [];

  return (
    <div className="post">
      <div className="postHeader">
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="deletePost">{/* Code for deleting a post  </div>
      </div>
      <div className="postTextContainer">{postText}</div>
      <h3>@{author}</h3>
      <div className="tagsContainer">
        {tags.map((tag) => (
          <div key={tag} className="tag">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
})}
</div> */}

// export default function Root() {
//   return (
//     <AuthProvider>
//       <BlogPage />
//     </AuthProvider>
//   );
// }
    /* {!isAuth ? (
            <button>
              <Link href="/logPage">Login</Link>
            </button>
          ) : (
            <button>
              <Link href="/logPage">Logout</Link>
            </button>
          // )} */