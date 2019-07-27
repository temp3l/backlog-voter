export const SESSION_KEY = "token";
export const clearToken = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem("user");
};
export const saveToken = (session: any) =>
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
export const readToken = () => {
  // let textSession = localStorage.getItem(SESSION_KEY);
  // let session = null;
  return null;
};

export const isAuthenticated = () => localStorage.getItem(SESSION_KEY) !== null;
export const reset = (event: any) => {
  event.preventDefault();
  clearToken();
  window.location.replace("/login");
};
export const isAdmin = (roles: any) =>
  roles.filter((role: any) => role.name === "admin").length > 0;
export const saveUser = (user: any) =>
  localStorage.setItem("user", JSON.stringify(user));
export const loadUser = () =>
  null; /* JSON.parse(localStorage.getItem('user') */
