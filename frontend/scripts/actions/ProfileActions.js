import alt from '../alt'
import {
    login,
    get_profile,
    get_auth_token,
    set_auth_token,
    remove_auth_token
} from '../api/profile'


class ProfileActions {

    checkApiKey(){
        let api_key = get_auth_token();
        if(api_key){
            get_profile(api_key)
                .then(data => {
                    return this.updateProfile(data);
                })
                .catch(errorMessage => this.fetchProfileFailed(errorMessage))
        }
        return api_key;
    }

    updateProfile(profile){
        set_auth_token(profile.api_key);
        return profile;
    }

    deleteProfile(profile){
        remove_auth_token();
        return profile;
    }

    fetchProfile(username, password){
        remove_auth_token();
        return(
            login(username, password)
                .then(data => {
                    if(
                        data.hasOwnProperty('username') &&
                        data.hasOwnProperty('api_key') &&
                        data.hasOwnProperty('profile')
                    ) {
                        this.updateProfile(data);
                    } else if(data.hasOwnProperty('error')) {
                        this.fetchProfileFailed(data['error']);
                    } else {
                        this.fetchProfileFailed('unknown error. Code 32718')
                    }
                })
                .catch(errorMessage => this.fetchProfileFailed(errorMessage))
        );
    }

    fetchProfileFailed(errorMessage){
        remove_auth_token();
        return errorMessage;
    }
}


export default alt.createActions(ProfileActions)
