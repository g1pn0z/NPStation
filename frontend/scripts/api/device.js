import ProfileStore from '../stores/ProfileStore'


const LIST_URL = "/api_v_1/";


export async function get_devices() {
    let {username, api_key} = ProfileStore.getState();
    return await fetch(
        LIST_URL,
        {
            headers: {
                Authorization: `ApiKey ${username}:${api_key}`
            }
        }
        )
        .then(response => response.json())
    ;
}
