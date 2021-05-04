import React, {Component, useEffect} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import {exitGot} from "../../../redux/chat/chatActions"
import  styles from "../styles/styles.scss"


const Change = (props)=>{
    useEffect(()=>{
        props.exitGot()
    })
        return <Redirect to={`${props.location.propsSearch}`}/>

}
const mapStateToProps = state=>{
    return{
        user: state.auth.user
    }
}


export default connect(mapStateToProps, {exitGot})(Change)