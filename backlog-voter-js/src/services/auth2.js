// only store the token here
export const SESSION_KEY = "token";
export const clearToken = () => localStorage.removeItem(SESSION_KEY);
export const saveToken = session =>
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

export const readToken = () => {
  let textSession = localStorage.getItem(SESSION_KEY);
  let session = null;
  try {
    session = JSON.parse(textSession);
  } catch {
    session = null;
  } finally {
    return session;
  }
};

export const isAuthenticated = () => localStorage.getItem(SESSION_KEY) !== null;

export const reset = event => {
  event.preventDefault();
  clearToken();
  window.location.replace('/login');
};

export const isAdmin = roles =>  roles.filter(role => role.name === "admin").length > 0;
