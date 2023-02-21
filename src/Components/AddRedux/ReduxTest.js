import React, { useState } from "react";
import { connect } from 'react-redux';
import { setUser } from '../../store/action';

function User(props) {
    let { setUser } = props;
    const [user, setUsers] = useState(props.user)

    setUser(user)

    return (
        <>
            <input value={user.name} onChange={(e) => setUsers({ ...user, name: e.target.value })} />
            <input value={user.age} onChange={(e) => setUsers({ ...user, age: e.target.value })} />
            <input value={user.sex} onChange={(e) => setUsers({ ...user, sex: e.target.value })} />
        </>
    )

}
export default connect(
    function mapStateProps(state) {
        return {
            user: state.user,
        };
    },
    function mapDispatchToProps(dispatch) {
        return {
            setUser: (...args) => {
                dispatch(setUser(...args))
            },
        };
    }
)(User);