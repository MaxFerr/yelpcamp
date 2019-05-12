import React from 'react';
import Moment from 'react-moment';

const CommentCard=({comment,name,date,isAdminIn,onDeleteComment,id})=>{
	if(isAdminIn){
		return(
			<div className='tl'>
				<p><strong>{name}</strong></p>
				<p>{comment}</p>
				<em><Moment fromNow>{date}</Moment></em>
				<div className='mt2'>
				<button 
				className='f6  pointer w4 shadow-4 dim br2 ph3 pv2 mb2 dib white bg-green'
				onClick={()=>onDeleteComment(id)}
				>Delete</button>
				</div>
				<hr/>
			</div>
			)
	}else{
		return(
			<div className='tl'>
				<p><strong>{name}</strong></p>
				<p>{comment}</p>
				<em><Moment fromNow>{date}</Moment></em>
				<hr/>
			</div>
			)
	}	
}

export default CommentCard;