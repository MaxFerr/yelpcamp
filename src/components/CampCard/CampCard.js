import React from 'react';
import Moment from 'react-moment';
import { Link } from "react-router-dom";


const CampCard= ({name,location,joined,image,onBtnPressInfo,id,isAdminIn,onDeleteCamp}) => {
	
		if(isAdminIn){
			return (
			<div style={{width: '400px' ,height: '550px', margin: '10px'}}
		className= 'tc bg-washed-green shadow-4 br2 pa3 ba dark-gray b--black-10 mv4 w-100 w-75-m w-45-l mw6 center'>
			<img src={image} alt='camp' style={{width: '350px' ,height: '250px'}} />
			<h1>{name}</h1>
			<p>Location : {location} </p>
			<p>Camp added : <Moment format="D MMM YYYY" withTitle>{joined}</Moment></p>
			<Link to={`/moreinfo/${id}`}><button 
			className='f6  pointer w4 shadow-4 dim br2 ph3 pv2 mb2 dib white bg-green'
			onClick={()=>onBtnPressInfo('moreinfo',id)}
			> More info	
			</button></Link><br/>
			<Link to={`/UpdateCamp/${id}`}><button className='f6  pointer w4 shadow-4 dim br2 ph3 pv2 mb2 dib white bg-green'
			onClick={()=>onBtnPressInfo('updateCamp',id)}
			>Edit</button></Link>
			<button className='f6  pointer w4 shadow-4 dim br2 ph3 pv2 mb2 dib white bg-green'
			onClick={()=>onDeleteCamp(id)}
			>Delete</button>	
		</div>
		)
			}else{ 
				return (
				<div style={{width: '375px' ,height: '500px', margin: '10px'}}
		className= 'tc bg-washed-green shadow-4 br2 pa3 ba dark-gray b--black-10 mv4 w-100 w-75-m w-45-l mw6 center'>
			<img src={image} alt='camp' style={{width: '350px' ,height: '250px'}} />
			<h1>{name}</h1>
			<p>Location : {location} </p>
			<p>Camp added : <Moment format="D MMM YYYY" withTitle>{joined}</Moment></p>
			<Link to={`/moreinfo/${id}`}><button 
			className='f6  pointer w4 shadow-4 dim br2 ph3 pv2 mb2 dib white bg-green'
			onClick={()=>onBtnPressInfo('moreinfo',id)}
			> More info	
			</button></Link>	
		</div>
		)
			}
			
		
}
export default CampCard;