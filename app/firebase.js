import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
 
export { db, auth, provider };

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
// Collection reference
 
  

export const checkUserAccess = async () => {
  try {
    const user = await getUserAuthentication(); // Get the currently signed-in user from Firebase Authentication
    if (user) {
      // User is signed in
      const userEmail = user.email; // Get the email of the signed-in user
    
      // Compare the userEmail with the email used to access the Firebase database
      if (userEmail === 'hanluk@seznam.cz') {
       // The signed-in user has access to the Firebase database
        console.log('User has access to the Firebase database');
        return true 
      } else {
        // The signed-in user does not have access to the Firebase database
        console.log('User does not have access to the Firebase database');
        return false 
      }
    } else {
      // No user is signed in
      console.log('No user is signed in');
      return false 
    }
  } catch (error) {
    // Handle error
    console.log('Error occurred:', error);
  }
};

auth.onAuthStateChanged((user) => {
  if (user) {
    // User is still signed in
    console.log('User is signed in:', user);
  } else {
    // User has signed out
    console.log('User has signed out');
  }
});

const colRef = collection(db, "BlogPosts");

const unsubscribe = onSnapshot(colRef, (snapshot) => {
  let posts = [];
  snapshot.docs.forEach((doc) => {
    posts.push({ ...doc.data(), id: doc.id });
  });
  console.log(posts);
});


// export const signInWithEmail = (signUpEmail, signUpPassword, signUpDisplayName)=>{
//   createUserWithEmailAndPassword(signUpEmail, signUpPassword, signUpDisplayName)
//   .then(cred => {
//     console.log('user created:', cred.user)
//     signupForm.reset()
//   })
//   .catch(err => {
//     console.log(err.message)
//   })
// }

// 1. argument == query listener
 

  // const addPost= document.querySelector('.add')
  // if (addPost) {
  //   addPost.addEventListener('submit', (e) => {
  //     e.preventDefault()
    
  //     addDoc(colRef, {
  //       title: addBookForm.title.value,
  //       author: addBookForm.author.value,
  //       createdAt: serverTimestamp(),
  //     })
  //     .then(() => {
  //       addBookForm.reset()
  //     })
  //   })
  // }
 

// deleting docs
// const deletePost = document.querySelector('.delete')
// if (deletePost) {
//     deletePost.addEventListener('submit', (e) => {
//       e.preventDefault()

//       const docRef = doc(db, 'Hello-World', deletePost.id.value)

//       deleteDoc(docRef)
//         .then(() => {
//           deletePost.reset()
//         })
//     })
// }

// const docRef = doc(db, 'Hello-world', '7UlfhHPkA7MpoyLj1KHO');

// getDoc(docRef)
// .then(doc => {
// console.log(doc.data(), doc.id)
// })


// const unsubDoc =  onSnapshot(docRef, (doc) => {
//   console.log(doc.data(), doc.id)
// })//updates ONLY on the change of the single document

// const updateForm = document.querySelector('.update')
// updateForm.addEventListener('submit', (e) => {
//   e.preventDefault()

//   let docRef = doc(db, 'Hello-World', updateForm.id.value)

//   updateDoc(docRef, {
//     title: 'updated title'
//   })
//   .then(() => {
//     updateForm.reset()
//   })
// })

// const signupForm = document.querySelector('.signup')
// signupForm.addEventListener('submit', (e) => {
//   e.preventDefault()

//   const email = signupForm.email.value
//   const password = signupForm.password.value

//   createUserWithEmailAndPassword(auth, email, password)
//     .then(cred => {
//       console.log('user created:', cred.user)
//       signupForm.reset()
//     })
//     .catch(err => {
//       console.log(err.message)
//     })
// })
// // logging in and out
// const logoutButton = document.querySelector('.logout')
// logoutButton.addEventListener('click', () => {
// signOut(auth)
// .then(() => {
//   console.log('user signed out')
// })
// .catch(err => {
//   console.log(err.message)
// })
// })

// const loginForm = document.querySelector('.login')
// loginForm.addEventListener('submit', (e) => {
// e.preventDefault()

// const email = loginForm.email.value
// const password = loginForm.password.value

// signInWithEmailAndPassword(auth, email, password)
// .then(cred => {
//   console.log('user logged in:', cred.user)
//   loginForm.reset()
// })
// .catch(err => {
//   console.log(err.message)
// })
// })

// // subscribing to auth changes
// const unsubAuth = onAuthStateChanged(auth, (user) => {
// console.log('user status changed:', user)
// })

 

// // unsubscribing from changes (auth & db)
// const unsubButton = document.querySelector('.unsub')
// unsubButton.addEventListener('click', () => {
//   console.log('unsubscribing')
//   unsubCol()
//   unsubDoc()
//   unsubAuth()
// })