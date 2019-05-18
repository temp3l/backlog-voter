import api from "./api";
export const SESSION_KEY = "session";
export const removeSession = () => localStorage.removeItem(SESSION_KEY);
export const setSession = session => localStorage.setItem(SESSION_KEY, JSON.stringify(session));
export const getSession = () => {
    let textSession = localStorage.getItem(SESSION_KEY);
    let session = null;
    try {
        session = JSON.parse(textSession);
    }    
    catch {
        session = null;
    }
    finally {
        return session;
    }
}

export const isAuthenticated = () => localStorage.getItem(SESSION_KEY) !== null;

export const isAlive = async () => {
    const session = getSession();
    console.log(session)
    if(!session) return null;
    const res = await api('/users/getRolesById?id='+session.userId);
    const { payload } = res.data;
    if(payload && payload.roles) {
        let ext = Object.assign({}, session, {roles: payload.roles, tokens: payload.tokens} );
        setSession(ext);
        console.log('check alive, ', ext);
        return ext;
    }
    console.log('session is dead')
    return null

}
  
  
  