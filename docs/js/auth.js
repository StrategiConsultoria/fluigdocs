import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js';

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

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = 'inicio/'; // Redireciona para a página principal após login
    } catch (error) {
        document.getElementById('error-message').textContent = "Email ou senha inválidos";
    }
});
