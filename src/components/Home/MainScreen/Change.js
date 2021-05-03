import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import {addRoom} from "../../../redux/rooms/roomsActions"
import  styles from "../styles/styles.scss"


const Change = (props)=>{


        return <Redirect to={`${props.location.propsSearch}`}/>

}
const mapStateToProps = state=>{
    return{
        user: state.auth.user
    }
}


export default connect(mapStateToProps, null)(Change)