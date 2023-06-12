"use client";

import React, {useState, useEffect} from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/app/firebase';
import { useRouter } from 'next/navigation';
import { AuthContext, AuthProvider } from '@/app/AuthContext';
import { useContext } from 'react';
const NextArticlesRow = () => {

  const { postList } = useContext(AuthContext);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [chosenArticlesData, setChosenArticlesData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchArticleImages = async () => {
      console.log("fetching",filteredArticles);
      const chosenArticleDataPromises = filteredArticles.map(async (article) => {
        try {
          console.log(article.postId, ref(storage, `images/${article.postId}`))
          const imageRef = ref(storage, `images/${article.postId}`);
          console.log(imageRef);
  
          // Set a timeout to log a message if the fetch takes too long (e.g., 10 seconds)
          const timeoutId = setTimeout(() => {
            console.log('Fetching image URL is taking longer than expected.');
          }, 10000);
  
          const imageUrl = await getDownloadURL(imageRef);
  
          // Clear the timeout as the fetch has resolved successfully
          clearTimeout(timeoutId);
  
          return {
            id: article.id,
            title: article.title,
            imageUrl,
          };
        } catch (error) {
          console.error('Error fetching image URL:', error);
          return null;
        }
      });
  
      const resolvedArticleData = await Promise.all(chosenArticleDataPromises);
      setChosenArticlesData(resolvedArticleData.filter(Boolean));
    };
  
     
    fetchArticleImages();
  }, [filteredArticles]);
  
  useEffect(() => {
    const selectFirstFourArticles = () => {
      const chosenArticles = postList.slice(0, 4);
      setFilteredArticles(chosenArticles);
    };
  
    if (postList && postList.length >= 4) {
      selectFirstFourArticles();
    }
  }, [postList]);

  const handleArticleClick = (title) => {
    const URLFriendlyTitle = title.replace(/\s+/g, '-').toLowerCase(); // Generate the post title for the URL
    router.push(`/blog/${URLFriendlyTitle}`);
  };

  return (
    <AuthProvider>
    <div className="next-articles-gridContainer">
      {chosenArticlesData.map((article) => (
        <div
          key={article.id}
          className="next-articles-rectangle"
          style={{ backgroundImage: `url(${article.imageUrl})` }}
          onClick={() => handleArticleClick(article.title)}
        >
          <span className="next-articles-text">{article.title}</span>
        </div>
      ))}
    </div>
    </AuthProvider>
  );
};
export default NextArticlesRow;