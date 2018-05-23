import alt from '../alt'
import ProfileActions from '../actions/ProfileActions'


class ProfileStore {
    username = null;
    display_name = null;
    api_key = null;
    errorMessage = null;
    is_logged_in = false;

    constructor() {
        this.bindListeners({
            _clearProfile: [ProfileActions.FETCH_PROFILE, ProfileActions.DELETE_PROFILE],
            _handleFetchProfileFailed: ProfileActions.FETCH_PROFILE_FAILED,
            _handleUpdateProfile: ProfileActions.UPDATE_PROFILE
        })
    }

    _clearProfile(){
        this.username = null;
        this.api_key = null;
        this.display_name = null;
        this.errorMessage = null;
        this.is_logged_in = false;
    }

    _handleFetchProfileFailed(errorMessage){
        this.username = null;
        this.api_key = null;
        this.display_name = null;
        this.errorMessage = errorMessage;
        this.is_logged_in = false;
    }

    _handleUpdateProfile(data){
        try {
            this.username = data.username;
            this.api_key = data.api_key;
            this.display_name = data.profile.display_name;
            this.is_logged_in = true;
        } catch(e) {
            ProfileActions.fetchProfileFailed("что-то пошло не так")
        }
    }

}


export default alt.createStore(ProfileStore, 'ProfileStore')
