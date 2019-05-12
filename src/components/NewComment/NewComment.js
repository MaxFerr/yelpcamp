import React from 'react';
import CommentCard from '../CommentCard/CommentCard';

const NewComment=({updatedComment,isAdminIn,onDeleteComment})=>{
	const commentLoop=updatedComment.map((data,i)=>{
			return (
				<CommentCard 
				key={i}
				comment={data.comment_text}
				name={data.name}
				date={data.comment_added}
				isAdminIn={isAdminIn}
				onDeleteComment={onDeleteComment}
				id={data.comment_id}
				/>
				)
		})
	
	return(
		<div>
		{commentLoop}
		</div>
		)
}

export default NewComment;