import axios from "axios";
export const SECRET_KEY = "@app-token";
export const SESSION_KEY = "@session-token";
export const isAuthenticated = () => localStorage.getItem(SECRET_KEY) !== null;
export const getToken = () => localStorage.getItem(SECRET_KEY);
export const authenticateUser = token =>  localStorage.setItem(SECRET_KEY, token);


export const getToken2 = () => {
  const session = getSession();
  if(!session) return null;
  return session.id;
};

export const destroySession = () => localStorage.removeItem(SESSION_KEY);
export const authSession = session =>  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

export const getSession = () => {
  let session = null;
  try {
    session = JSON.parse(localStorage.getItem(SESSION_KEY));
    console.log(session)
  } catch {
    session = null;
  } finally {
    return session;
  }
};

export const isAlive = async session => {
  if (isAuthenticated() === false) return false;
  const token = getToken();
  await axios.get("/api/users/me");
};


