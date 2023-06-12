"use client"

import Head from 'next/head';
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, deleteDoc, doc, getDocs,onSnapshot } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { auth, db, provider,checkUserAccess, unsubscribe, signInWithGoogle, storage, fetchData, getUserAuthentication  } from '@/app/firebase'; 

import { deleteObject, getDownloadURL, ref } from 'firebase/storage';
 
import SearchBar from '@/components/blog/SearchBar';
import SearchClasses from '@/components/blog/SearchClasses';
import PostPreview from '@/components/blog/PostPreview';
import TagBar from '@/components/blog/TagBar';
import LoginButton from '@/components/blog/LoginButton';
import Nav from '@/components/Nav'; 
import BlogHero from '@/components/blog/BlogHero';

import '../styles/globals.scss';
import { helmetBattle } from 'fontawesome';
 
import { AuthContext, AuthProvider } from '../AuthContext';

const BlogPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdministrator, setIsAdministrator] = useState(false)
  const [profilePic, setProfilePic] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [postLists, setPostList] = useState([] );//[...articles]
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
 
    useEffect(() => {
      const colRef = collection(db, 'BlogPosts');
     
      const unsubscribe = onSnapshot(colRef, (snapshot) => {
       const postsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
         setPostList(postsData);
         console.log(postsData, 'Second console.log');
       });
  
      return () => {
        unsubscribe(); // Unsubscribe from the snapshot listener
      };
    }, []);
 
    // useEffect(() => {
    //   // if (!user && name) {
    //     window.location.reload();
    //   // }
    // }, [user]);

  const handleSearch = (searchText) => {
    setQuery(searchText);
  };

  const handleCategorySelection = (category) => {
    if (selectedCategory === category){
      setSelectedCategory("")
    } else {
       setSelectedCategory(category)
      }
  }
  const handleTagSelection = (tag) => {
      if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
      } else {
        setSelectedTags([...selectedTags, tag]);
      }
  };
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle().then(() => {
        checkUserAccess().then((isAdmin) => {
          if (user.email="hanluk@seznam.cz") {
            setIsAdministrator(true);
          }
        
        });
      });
    } catch (error) {
      setErrorMessage('Error signing in with Google.');
    }
  };

    
  useEffect(() => {
    const checkUserAccessAndSetIsAdmin = async () => {
      try {
        const hasAccess = await checkUserAccess();
        setIsAdministrator(hasAccess);
      } catch (error) {
        console.log('Error occurred:', error);
      }
    };
  
    checkUserAccessAndSetIsAdmin();
  }, [user]);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    const storedProfilePic = localStorage.getItem('profilePic');
  
    if (storedName || storedEmail || storedProfilePic) {
      setName(storedName || '');
      setEmail(storedEmail || '');
      setProfilePic(storedProfilePic || '');
      setIsAuth(true);
    }  
  }, []);


  const handleDelete = async (id) => {
    // Find the post in the post list
    const postToDelete = postLists.find((post) => post.id === id);
     console.log(postToDelete,postToDelete.postId, "XYZ")
    // If the post has an associated image, delete it from Firebase Storage
    if (postToDelete.postId) {
      try {
        const imageRef = ref(storage, `images/${postToDelete.postId}`);
        console.log(imageRef, "img")
        await deleteObject(imageRef);
         
        console.log(`Image ${postToDelete.postId} deleted successfully.`);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  
    // Remove the post from the post list
    setPostList((prevPostList) =>
      prevPostList.filter((post) => post.id !== id)
    );
  
    try {
      // Delete the post from Firestore
      const postRef = doc(db, 'BlogPosts', id);
      await deleteDoc(postRef);
      console.log('Post deleted successfully.');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };


  const filteredPosts = useMemo(() => {
    if (
      selectedTags.length === 0 &&
      query === '' &&
      selectedCategory === ''
    ) {
      return postLists;
    }

    return postLists.filter((post) => {
      const hasSelectedTag =
        selectedTags.length === 0 ||
        post.tags.some((tag) => selectedTags.includes(tag));
      const hasSearchedTerm =
        query === '' ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.postText.toLowerCase().includes(query.toLowerCase());
      const hasSelectedCategory =
        selectedCategory === '' || post.category === selectedCategory;

      return hasSelectedTag && hasSearchedTerm && hasSelectedCategory;
    });
  }, [selectedTags, query, postLists, selectedCategory]);
 
  return (
    <AuthProvider>
 <div>
      <Head>
        <title>Blog Page</title>
 
      </Head>
      <Nav name={name} profilePic={profilePic} />  
      <BlogHero />
      
      <main>
        
        <section className="topSearchBarContainer">
        <SearchBar
            className="searchBar"
            placeholder="search"
            onSearch={handleSearch}
            clearOnSearch={false} // Set to true if you want the input to clear on search
            sendOnEnter={true}
          />
         <SearchClasses handleCategorySelection={handleCategorySelection}
         selectedCategory={selectedCategory} />
          
         <LoginButton user={user} isAdmin={isAdministrator} setIsAdmin={setIsAdministrator}  />
        </section>
        
        <section className="bodycontainer">
       {filteredPosts.length > 0 && <div className="postpreviewcontainer">
        {/* <Image src={imageUrl} alt="Image" width={240} height={240} /> */}
          {filteredPosts.map((post, index) => (
            <PostPreview
              key={index}
              id={post.id}
              heading={post.title}
              text={post.postText}
              image={post.postId}
              tags={post.tags}
              releaseDate={post.Date}
              handleDelete={handleDelete}
              isAdmin={isAdministrator}
              category={post.category}
            />
          ))}
        </div>}
        <TagBar selectedTags={selectedTags} handleTagSelection={handleTagSelection} />
      </section>

        {isAdministrator && (
          <button className="add">
            <Link href="/blog/createPost">Add Post</Link>
          </button>
        )}

        
      </main>
       
      {/* <footer>
        {/* Footer content goes here  }
      </footer> */} 
    </div>  
</AuthProvider>
    
  );
};

export default BlogPage;


// const handleUpdateProfile = () => {
  //   if (user) {
  //     user
  //       .updateProfile({
  //         displayName: 'New Display Name',
  //         photoURL: 'https://example.com/new-profile-pic.jpg',
  //       })
  //       .then(() => {
  //         console.log('Profile updated successfully.');
  //       })
  //       .catch((error) => {
  //         console.error('Error updating profile:', error);
  //       });
  //   }
  // };