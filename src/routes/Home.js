import React, { useEffect, useState } from 'react'
import { querySnapshot, addDoc, getDocs, onSnapshot, orderBy, query, collection } from "firebase/firestore";
import {db} from '../fbase'
import Tweet from '../components/TweetMention';



function Home({ userObj }) {
  console.log(`userObj->`,userObj);
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

//   const getTweets = async () =>{

//   const querySnapshot = await getDocs(collection(db, "tweets"));
// querySnapshot.forEach((doc) => {
//   // console.log(`${doc.id}, " => ", ${doc.data()}`);
//   const tweetObject = {...doc.data(), id:doc.id}
//   setTweets(prev => [tweetObject, ...prev]); //새 트윗을 가장 먼저 보여준다.
// });
// }

  useEffect(() =>{
    // getTweets();
      const q = query(collection(db,"tweets"),
                  orderBy("createdAt","desc"));
      const unsubscribe = onSnapshot(q,(querySnapshot) => {
        const newArray = [];
        querySnapshot.forEach((doc) =>{
          newArray.push({...doc.data(), id:doc.id});
          console.log(newArray);
        });
        setTweets(newArray);
      });
  },[]);

  const onChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setTweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "tweets"), {
        text: tweet,
        createdAt: Date.now(),
        creatorId: userObj.uid, // ID of the logged in user
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTweet("");

  };
  

  
  return (
    <>
    <form onSubmit={onSubmit}>
      <br />
      <input
        type='text'
        value={tweet}
        onChange={onChange}
        placeholder="go tweet~ go tweet~"
      />
      <input type='submit' value={'Tweet'} />
    </form>
    <div>
      {tweets.map(tweet => (
        <Tweet
          key={tweet.id} 
          tweetObj={tweet}
          isOwner={tweet.creatorId === userObj.uid}
          />
      ))}

    </div>
    
  </>
  )
}

export default Home