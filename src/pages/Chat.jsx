// import React, { useRef, useState } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
// //import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import './Chat.scss';

// const firebaseConfig = {
//   apiKey: "AIzaSyA8sCco43Znz3RPYvLGSa1jcLR37mOk2Hg",
//   authDomain: "aoe-chat-9a467.firebaseapp.com",
//   projectId: "aoe-chat-9a467",
//   storageBucket: "aoe-chat-9a467.appspot.com",
//   messagingSenderId: "563914130064",
//   appId: "1:563914130064:web:e386f2893e0744fa25ce15",
//   measurementId: "G-QTFDPNZPYG"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const firestore = getFirestore(app);

// function Chat() {
//   const [user] = useAuthState(auth); // Get the currently signed-in user

//   return (
//     <div className="chat">
//       <header>

//       </header>

//       <section>
//         {user ? <ChatRoom /> : <SignIn />}
//       </section>
//     </div>
//   );
// }

// function SignIn() {
//   const signInWithGoogle = () => {
//     const provider = new GoogleAuthProvider(); 
//     signInWithPopup(auth, provider); // triggers a popup window when user clicks sign in with google
//   }

//   return (
//     <button onClick={signInWithGoogle}> Sign in with Google</button>
//   );
// }

// function SignOut() {
//   return auth.currentUser && (
//     <button onClick={() => signOut(auth)}>Sign Out</button>
//   );
// }

// function ChatRoom() {
//   const dummy = useRef()
//   const messagesRef = collection(firestore, 'messages'); // fetch messages from firestore
//   const q = query(messagesRef, orderBy('createdAt'), limit(25)); // define query to messagesRef endpoint in firestore 

//   const [messages] = useCollectionData(q, { idField: 'id' }); // useCollectionData hook queries and listens in real time for updates -> returns an array of objects where each object is the chat message in the firestore db -> any time the data changes, react will update

//   const [formValue, setFormValue] = useState('');

//   const sendMessage = async (e) => {
//     e.preventDefault(); // stop page from refreshing

//     const { uid, photoURL } = auth.currentUser;

//     await addDoc(messagesRef, {
//       // write a new document to the firestore db
//       text: formValue,
//       createdAt: serverTimestamp(),
//       uid,
//       photoURL
//     });

//     setFormValue('');
//     dummy.current.scrollIntoView({ behavior: 'smooth'}); //scroll down when client sends message
//   }

//   return (
//     <div className="chat-input">
//       <div>
//         {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

//         <div ref={dummy}></div>
//       </div>

//       <form onSubmit={sendMessage}>
//         <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
//         <button type="submit"></button>
//       </form>
//       </div>
//   );
// }

// function ChatMessage(props) {
//   const { text, uid, photoURL } = props.message;

//   const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'; // if both uid's are equal, we know the user sent the message

//   return (
//     <div className="message-box">
//     <div className={`message ${messageClass}`}>
//       <img src={photoURL} alt="User Avatar" />
//       <p>{text}</p>
//     </div>
//     </div>
//   );
// }

// export default Chat;
