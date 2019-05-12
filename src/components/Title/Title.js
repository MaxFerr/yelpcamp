import React from 'react';
import './Title.css';
import { Link } from "react-router-dom";

const Title=({onBtnPressAdd})=>{
	return (
		  <div className='pv6 bckGrnd' style={{marginTop:'-3px'}}>
			  <div className='pa2 w-100' style={{backgroundColor:'rgba(0,255,0,0.2)'}} >
			      <h1 className='f1 white ' >Yelp Camp</h1>
				  <p className='f3 white' >lorem ipsum</p>
				  <Link to={`/NewCamp`}><button 
				  className='mb3 f5 pointer br2 ph3 pv2 mb2 white bg-green' 
				  onClick={()=>{onBtnPressAdd('newcamp')}}
				  >Add New Campground</button></Link>
			  </div>
		  </div>
		)
}

export default Title;



