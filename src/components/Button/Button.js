import React from 'react';
import './Button.css';
import { Link } from "react-router-dom";


const Button=({name,onBtnPress,index})=>{
	
	return (
		<Link to={`/${name}`}><button 
		style={{marginTop:'12px',marginBottom:'10px'}} 
		className="f6  unstyled-button pointer w4 dim pv1   mb2 dib white bg-green mainnavbtn underline-hover"
		onClick={()=>onBtnPress(name,index)}
		>
		{name}
		</button></Link>
		)
};

export default Button;