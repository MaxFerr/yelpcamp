import React from 'react';
import { Link } from "react-router-dom";

const TopNavBar=({onBtnPressAdd,isLoggedIn,user,onClickLogout})=>{
	if(isLoggedIn){
		return (
			<div className='pa4 mb1 shadow-4 bg-white green' style={{paddingBottom:'50px'}} >
			<div>
				<h2 className='fl mt0 mr0'>Yelp Camp</h2>
			</div>
			<div className='fr' style={{marginRight:'-10px'}} >
				<Link to={`/UserInfo`}><button 
				className=' f7  pointer  shadow-4 dim br2 ph3 pv2  dib white bg-green'
				onClick={()=>onBtnPressAdd('userInfo')}
				> Hi, {user.name} </button></Link>
				<Link to={`/Home`}><button 
				className=' f7  pointer  shadow-4 dim br2 ph3 pv2  dib white bg-green'
				onClick={onClickLogout}
				> Logout </button></Link>
				
			</div>
		</div>
			)
	}else {
		return (
		<div className='pa3 mb1 shadow-4 bg-white green' style={{paddingBottom:'50px'}} >
			<div>
				<h2 className='fl mt0 mr0'>Yelp Camp</h2>
			</div>
			<div className='fr' style={{marginRight:'-10px'}} >
				<Link to={`/login`}><button className=' f7  pointer  shadow-4 dim br2 ph3 pv2  dib white bg-green'				
				> Login </button></Link>
				<Link to={`/register`}><button 
				className=' f7  pointer  shadow-4 dim br2 ph3 pv2  dib white bg-green'				
				> Register </button></Link>
			</div>
		</div>
		)
	}
	
}

export default TopNavBar;