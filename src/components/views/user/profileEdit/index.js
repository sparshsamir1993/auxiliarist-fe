import React from "react";
import { connect } from "react-redux";

const ProfileEdit = (props) => {
    return (
        <div>
            <span>This is profile edit</span>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(ProfileEdit);