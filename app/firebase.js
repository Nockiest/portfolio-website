import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot , query} from "firebase/firestore";
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
// const storage = getStorage();
// const storageRef = ref(storage, 'images');
const file = "https://www.google.com/search?q=kitten&sxsrf=APwXEdf22kqYg_npswvQ7bBRVc13rapnBQ:1686069215499&tbm=isch&source=iu&ictx=1&vet=1&fir=istYcz98GWn1rM%252Cxx9Is_ftEERpBM%252C%252Fm%252F0hjzp%253B5UKE_ztEeyAg2M%252CdTDdan6TWTOO-M%252C_%253ByCoPFqqDu6fXGM%252Cvo1Ocq-YkePPhM%252C_%253BzA07E1ZMjNAsgM%252CZ54b0Pd9T-jF2M%252C_%253BB-Gl_6-jdKx4EM%252C-uzr7GKcWawrMM%252C_%253BWj-HITS9Udu5eM%252C0ObwAsOsafiLsM%252C_&usg=AI4_-kTmfYAJ7uB8ga_owv_9uZ2xgwzGTg&sa=X&ved=2ahUKEwjq7p-lia__AhWUSvEDHZxbDlkQ_B16BAhEEAE#imgrc=5UKE_ztEeyAg2M // Get the image file";
// const imageRef = ref(storageRef, file.name); 
// const uploadTask = uploadBytes(imageRef, file);
  
export { db, auth, provider };
export const storage = getStorage(app);
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

const colRef = collection(db, 'BlogPosts');
 
let posts = [];

 const unsubscribe = onSnapshot(colRef, (snapshot) => {
  // posts = [];
  snapshot.docs.forEach((doc) => {
    posts.push({ ...doc.data(), id: doc.id });
  });
  console.log(posts, 'Second console.log');
});
console.log(posts, "posts");
export default posts;
 

