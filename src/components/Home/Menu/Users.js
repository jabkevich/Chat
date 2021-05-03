import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import {getUsers, on, offUsers} from "../../../redux/users/usersActions";
import  styles from "../styles/styles.scss"


export class Users extends Component {
    componentDidMount(){
        this.props.on()
        this.props.getUsers()
    }
    componentWillUnmount() {
        this.props.offUsers()
    }

    render() {
            return (
                <div className={styles.Users}>
                    {this.props.users.map((user, i)=>(
                        <div className={styles.User} key={i}>{user.username}</div>
                    ))}
                </div>
            )
        }
}
const mapStateToProps =state=>{
    return{
        users: state.users.users
    }
}

export default connect(mapStateToProps, {getUsers, on, offUsers})(Users)