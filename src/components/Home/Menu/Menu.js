import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import {getUsers, on, offUsers} from "../../../redux/users/usersActions";

import styles from "../styles/styles.scss"
import Users from "./Users";
import Rooms from "./Rooms";
import AddRoom from "./AddRoom";

export class Menu extends Component {

    render() {
        return (
            <div className={styles.Menu}>
                <div>Logout</div>
                <Users/>
                <Rooms/>
                <AddRoom/>
            </div>
        )
    }
}
// const mapStateToProps =state=>{
//     return{
//         users: state.users.users
//     }
// }

export default connect(null, {getUsers, on, offUsers})(Menu)