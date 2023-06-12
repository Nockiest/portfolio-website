import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, updateDoc, collection, onSnapshot , query} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyC-3nh_2zFbSDSAZuG3SAoSz7tMxg3VFZs",
  authDomain: "blogwebsite-a70d3.firebaseapp.com",
  projectId: "blogwebsite-a70d3",
  storageBucket: "blogwebsite-a70d3.appspot.com",
  messagingSenderId: "724332289204",
  appId: "1:724332289204:web:d20b287f6d6a5d46684be1",
  measurementId: "G-NHWJH7PLHK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const colRef = collection(db, 'BlogPosts');
export { db,colRef, auth, provider, storage };

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      console.log(name, email, profilePic);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserAuthentication = async () => {
  const user = await new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });

  return user;
};

export const checkUserAccess = async () => {
  try {
    const user = await getUserAuthentication();
    if (user) {
      const userEmail = user.email;
      if (userEmail === 'hanluk@seznam.cz') {
        console.log('User has access to the Firebase database');
        return true;
      } else {
        console.log('User does not have access to the Firebase database');
        return false;
      }
    } else {
      console.log('No user is signed in');
      return false;
    }
  } catch (error) {
    console.log('Error occurred:', error);
  }
};

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('User is signed in:', user);
  } else {
    console.log('User has signed out');
  }
});

export const fetchPosts = async () => {
  const colRef = collection(db, 'BlogPosts');
  const snapshot = await onSnapshot(colRef);
  const postsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return postsData;
};

const defaultFunction = () => {
  console.log("hello");
};

export default defaultFunction;

// let unsubscribe;

//   const fetchData = async () => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = onSnapshot(collection(db, 'BlogPosts'), (snapshot) => {
//       const databasePosts = [];
//       snapshot.docs.forEach((doc) => {
//         databasePosts.push({ ...doc.data(), id: doc.id });
//       });
//       console.log(databasePosts, 'database contents');
//       unsubscribe(); // Unsubscribe from the snapshot listener
//       resolve(databasePosts);
//     });

//     setTimeout(() => {
//       unsubscribe(); // Unsubscribe if the timeout expires before the snapshot is received
//       reject(new Error('Fetching data timed out'));
//     }, 2000); // Wait for 2 seconds (adjust as needed)
//   });
// };

// // Call the fetchData function
// const DbPosts = await fetchData();
// console.log(DbPosts, "posts");

export const subscribeToBlogPosts = (db, setPostList) => {
  const colRef = collection(db, 'BlogPosts');

  const unsubscribe = onSnapshot(colRef, (snapshot) => {
    const postsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setPostList(postsData);
    console.log(postsData, 'posts');
  });

  return unsubscribe;
};


export const updateDbComments = async (postId, fieldToUpdate, newValue, parameterIsArray = true) => {
  console.log(postId, fieldToUpdate, newValue);

  try {
    const docRef = doc(db, 'BlogPosts', postId);
    console.log(docRef);
    const docSnapshot = await getDoc(docRef);
    console.log(docSnapshot);

    if (docSnapshot.exists()) {
      const existingData = docSnapshot.data();
      let updatedData = { ...existingData }; // Create a copy of existingData

      if (parameterIsArray && Array.isArray(newValue)) {
        // If the field is an array and parameterIsArray is true, set the new value directly
        updatedData[fieldToUpdate] = newValue;
      }

      await updateDoc(docRef, updatedData);
      console.log('Blog post updated successfully!');
    } else {
      console.log('Blog post does not exist.');
    }
  } catch (error) {
    console.error('Error updating blog post:', error);
  }
};

 

// export const updateBlogPost = async (postId, fieldToUpdate, newValue) => {
//   try {
//     const postRef = db.collection('BlogPosts').doc(postId);
//     await postRef.update({
//       [fieldToUpdate]: newValue
//     });
//     console.log('Blog post updated successfully!');
//   } catch (error) {
//     console.error('Error updating blog post:', error);
//   }
// };
// const postId = 'd38b0bed-485a-4d8a-9c5d-63a0346c9b60'; // Replace with the actual ID of the document you want to update
// const fieldToUpdate = 'title'; // Replace with the specific field/key you want to update
// const newValue = 'Updated Title'; // Replace with the new value for the specified field

// updateBlogPost(postId, fieldToUpdate, newValue);


// updateForm.addEventListener('submit', (e) => {
//   e.preventDefault()

//   let docRef = doc(db, 'BlogPosts', postId)

//   updateDoc(docRef, {
//     title: 'updated title'
//   })
//   .then(() => {
//     updateForm.reset()
//   })
// })
 