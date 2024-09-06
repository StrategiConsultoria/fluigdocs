import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyBe_xXuKV__3kF8vMlS2e642M9U5zD3GPI",
    authDomain: "strategifluig.firebaseapp.com",
    projectId: "strategifluig",
    storageBucket: "strategifluig.appspot.com",
    messagingSenderId: "332007008343",
    appId: "1:332007008343:web:13bae01a86f25647c89b12"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = '/login.html';
    }
});
