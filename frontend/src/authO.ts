import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';

// Tipamos auth0 como Auth0Client
export let auth0: Auth0Client | null = null;

// Función para inicializar Auth0
export const initAuth0 = async (): Promise<void> => {
  try {
    auth0 = await createAuth0Client({
      domain: 'dev-o72k56frd2psobgl.us.auth0.com',
      client_id: 'yFef9pGuzjA0JToQEtXhRn5fLXFsCV0a',
      redirect_uri: window.location.origin, // Asegúrate de que la URL esté registrada en el panel de Auth0
    });
  } catch (error) {
    console.error('Error inicializando Auth0:', error);
  }
};

// Función para iniciar sesión
export const login = async (): Promise<void> => {
  if (!auth0) {
    console.error('Auth0 no está inicializado.');
    return;
  }

  try {
    await auth0.loginWithRedirect();
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};

// Función para manejar la redirección después del login
export const handleRedirect = async (): Promise<void> => {
  if (window.location.search.includes('code=')) {
    if (!auth0) {
      console.error('Auth0 no está inicializado.');
      return;
    }

    try {
      await auth0.handleRedirectCallback(); // Procesa la redirección después del login
      window.history.replaceState({}, document.title, '/sidebar'); // Redirigir a la página /sidebar
    } catch (error) {
      console.error('Error manejando la redirección:', error);
    }
  }
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = async (): Promise<boolean> => {
  if (!auth0) {
    console.error('Auth0 no está inicializado.');
    return false;
  }
  
  try {
    return await auth0.isAuthenticated();
  } catch (error) {
    console.error('Error verificando la autenticación:', error);
    return false;
  }
};

// Función para obtener información del usuario autenticado
export const getUser = async (): Promise<any> => {
  if (!auth0) {
    console.error('Auth0 no está inicializado.');
    return null;
  }

  try {
    return await auth0.getUser(); // Obtener los datos del usuario autenticado
  } catch (error) {
    console.error('Error obteniendo los datos del usuario:', error);
    return null;
  }
};