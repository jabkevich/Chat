import React, {Component} from "react";
import {Link, Redirect, Route, Switch, HashRouter as Router} from "react-router-dom";
import {connect} from "react-redux";

import styles from "./styles/styles.scss"
import Menu from "./Menu/Menu";
import Room from "./MainScreen/Room"
import Change from "./MainScreen/Change";
export class Home extends Component {



    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect push to='/'/>
        }
        return (
            <div className={styles.Home}>
                <Menu/>
                <div>
                    <Switch>
                        <Route path={`/rooms/change`} exact component ={Change}/>
                        <Route path={`/rooms/:room`} exact render={()=>(<Room key={this.props.location}/>)}/>
                    </Switch>
                </div>


            </div>
        )
    }
}
const mapStateToProps =state=>{
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, null)(Home)