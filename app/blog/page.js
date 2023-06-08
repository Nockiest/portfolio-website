"use client"
 

import React, { useState, useEffect, useMemo } from 'react';
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
import Nav from '@/components/Nav'; 
import BlogHero from '@/components/blog/BlogHero';

import '../styles/globals.scss';
import { deleteObject, ref } from 'firebase/storage';
import { getUserAuthentication } from '../firebase';
import { AuthProvider } from '../AuthContext';
import { auth, db, provider,checkUserAccess  } from '@/app/firebase';
import { helmetBattle } from 'fontawesome';

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
  // useEffect(() => {
  //   const fetchImageUrl = async () => {
  //     try {
  //     // const imageRef = ref(storage, `images/d5858e7b-e50a-4ad4-ad90-2b5ba6241f42`);
  //     const imageRef = ref(storage, `test.png`);  
  //     const url = await getDownloadURL(imageRef);
  //       console.log(url, "url")
  //       setImageUrl(url);
  //     } catch (error) {
  //       console.error('Error fetching image URL:', error);
  //     }
  //   };

  //   fetchImageUrl();
  // }, []);
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
    if (!isAdministrator) {
      return;
    }
 
    setPostList((prevPostList) =>
      prevPostList.filter((post) => {
        return post.id !== id})
    );

    try {
      const postRef = doc(db, 'BlogPosts', id);
      await deleteDoc(postRef);
      setPostList((prevPostList) =>
        prevPostList.filter((post) => post.id !== id)
      );
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
        post.body.toLowerCase().includes(query.toLowerCase());
      const hasSelectedCategory =
        selectedCategory === '' || post.category === selectedCategory;

      return hasSelectedTag && hasSearchedTerm && hasSelectedCategory;
    });
  }, [selectedTags, query, postLists, selectedCategory]);
 
  return (
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
        <div className="postpreviewcontainer">
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
        </div>
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