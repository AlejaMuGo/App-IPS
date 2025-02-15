<script>
	import { onMount } from 'svelte';
	import { initializeApp } from "firebase/app";
	import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
	import { createClient } from '@supabase/supabase-js';
  
	// Configuración de Firebase
	const firebaseConfig = {
	  apiKey: "AIzaSyDYXo3HqFUjefAmAjmX7SiCqVSLhsOKv4M",
	  authDomain: "afrodita-c4f9f.firebaseapp.com",
	  projectId: "afrodita-c4f9f",
	  storageBucket: "afrodita-c4f9f.appspot.com",
	  messagingSenderId: "318001823965",
	  appId: "1:318001823965:web:07ca8a17351d330849db34",
	  measurementId: "G-22PETLPKHY"
	};
  
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	const provider = new GoogleAuthProvider();
  
	// Configuración de Supabase
	const supabaseUrl = "https://tu-supabase-url.supabase.co";
	const supabaseKey = "tu-supabase-anon-key";
	const supabase = createClient(supabaseUrl, supabaseKey);
  
	let user = { displayName: "", email: "" };
	let errorMessage = "";
  
	async function loginWithGoogle() {
	  try {
		const result = await signInWithPopup(auth, provider);
		user = {
	displayName: result.user.displayName || "Usuario sin nombre",
	email: result.user.email || ""
  };
  
		// Verificar en Supabase si el usuario es profesional o asesora
		const { data, error } = await supabase
		  .from("usuarios")
		  .select("rol")
		  .eq("email", user.email)
		  .single();
  
		if (error || !data || (data.rol !== "profesional" && data.rol !== "asesora")) {
		  errorMessage = "Acceso denegado: No tienes permisos.";
		  user = { displayName: "", email: "" };
		  return;
		}
	  } catch (error) {
		console.error("Error en la autenticación", error);
		errorMessage = "Error al iniciar sesión.";
	  }
	}
  </script>
  
  <main class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
	<div class="bg-white p-6 rounded-lg shadow-md text-center">
	  <h1 class="text-2xl font-bold mb-4">Iniciar sesión en Afrodita</h1>
	  <button on:click={loginWithGoogle} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
		Iniciar sesión con Google
	  </button>
	  {#if errorMessage}
		<p class="text-red-500 mt-2">{errorMessage}</p>
	  {/if}
	  {#if user}
		<p class="mt-4 text-green-600">Bienvenido, {user.displayName}!</p>
	  {/if}
	</div>
  </main>
  