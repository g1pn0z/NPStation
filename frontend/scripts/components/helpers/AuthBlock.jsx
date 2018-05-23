import React from 'react'
import classNames from 'classnames'
import ProfileActions from '../../actions/ProfileActions'


export default ({is_logged_in, display_name}) => (
    <div className={classNames(
            "AuthBlock",
            {"AuthBlock--loggedIn": is_logged_in}
            )}>{
        is_logged_in ?
            <div>
                {display_name? <span className="AuthBlock__username">{display_name}</span> : false}
                <button
                    className="AuthBlock__logout btn btn-link"
                    onClick={ProfileActions.deleteProfile}
                >[выход]</button>
            </div>
        : false
    }</div>
);
