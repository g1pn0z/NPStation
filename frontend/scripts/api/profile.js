import ProfileStore from '../stores/ProfileStore'


const LOGIN_URL = "/api_v_1/login/";
const PROFILE_URL = "/api_v_1/profile/";


export async function login(username, password) {
    return await fetch(
        LOGIN_URL,
        {
            method: 'post',
            body: JSON.stringify({username, password})
        }
        )
        .then(response => response.json())
    ;
}

export async function get_profile(token) {
    return await fetch(
        PROFILE_URL,
        {
            headers: {
                Authorization: `Token ${token}`
            }
        }
        )
        .then(response => response.json())
    ;
}

export function get_auth_token(){
    return localStorage.getItem("authToken");
}

export function set_auth_token(token){
    localStorage.setItem("authToken", token);
}

export function remove_auth_token(){
    localStorage.removeItem("authToken");
}
