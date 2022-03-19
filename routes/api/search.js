

import express from "express";
import { getDatabase, ref, child, get, push, update } from "firebase/database";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

var router = express.Router();


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAb40bFUrLG51OHj13gOcSdXkYKvb9AFVM",
    authDomain: "react-demo-project-1be5d.firebaseapp.com",
    projectId: "react-demo-project-1be5d",
    storageBucket: "react-demo-project-1be5d.appspot.com",
    databaseURL: "https://react-demo-project-1be5d-default-rtdb.firebaseio.com/",
    messagingSenderId: "136207241684",
    appId: "1:136207241684:web:c7c5d36ddad4a8e83b0641",
    measurementId: "G-JFR7EJXPYK"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase();

router.post('/submitPosts', function(req, res, next) {
    try {
        console.log('entering!!');
        console.log(req.body);
        const message = req?.body?.message;
        if (!message) {
            return res.status(400).json({
                message: 'Uh oh! Need to provide a message'
            })
        }
        const d = new Date();
        let time = d.getTime(); // get time in ms since 1970
        // A post entry.
        const postData = {
            timestamp: time,
            message,
        };
    
        // Get a key for a new Post.
        const newPostKey = push(child(ref(database), 'posts')).key;
    
        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/posts/' + newPostKey] = postData;
        update(ref(database), updates);
        return res.status(200).json({
            message: 'Post success!'
        });
    } catch (e) {
        return res.status(500).json({
            message: 'Uh oh! Post failed'
        })
    }
});

router.get('/getPosts', function(req, res, next) {
    const dbRef = ref(database);
    let data = undefined;
    get(child(dbRef, `posts`)).then((snapshot) => {
        if (snapshot.exists()) {
            data = snapshot.val();
        } else {
            console.log("No data available");
        }
        return res.json({
            data: data ?? {},
        })
    }).catch((error) => {
        console.error(error);
        return res.status(500).json({
            error,
        })
    });
});

export default router;