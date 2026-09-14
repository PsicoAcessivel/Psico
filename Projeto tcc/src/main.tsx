import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/firebase/FirebaseConexao.tsx'
import App from './App.tsx'
import './global.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

const CLIENT_ID ='160474928356-lcp8rkiau29be1hq3bgh69ko9lnnreh7.apps.googleusercontent.com'

const root = document.getElementById('root')

if (root) {

  createRoot(root).render(
    <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
      </GoogleOAuthProvider>
    </StrictMode>,
  )

} else {
  console.error("Elemento 'root' não encontrado no DOM.");
}