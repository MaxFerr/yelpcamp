import React from 'react';
import Moment from 'react-moment';
import {Redirect} from "react-router-dom";

const UserInfo=({user})=>{
	if(user.id){
		return (
		<div>
		<p> Name: {user.name} </p>
		<p> Email: {user.email} </p>
		<p> Joined : <Moment format="D MMM YYYY" withTitle>{user.joined}</Moment></p>
		</div>
		)
	}else{
		return <Redirect to='/Home' />
	}
}

export default UserInfo;