import React from 'react';
import './MoreInfo.css';
import NewComment from '../NewComment/NewComment';
import Moment from 'react-moment';
import MapContainer from '../MapContainer/MapContainer';


class MoreInfo extends React.Component{
	constructor(props){
		super(props);
		this.state={
			comment:'',			
			camp_name:this.props.campsData.camps_name,
			updatedComment:[],
			deleteComment:[],
			singleCamp:[],
			name:this.props.campsData.camps_name		
		}
	}

	componentDidMount(){
		fetch(`https://yelpcamp-api.herokuapp.com/singlecamp/${this.props.match.params.id}`)
		.then(response=>{			
			return response.json()
		})
		.then(singleCamp=>{			
			this.setState({singleCamp:singleCamp})
			this.setState({name:singleCamp.camps_name})									
		})
		fetch(`https://yelpcamp-api.herokuapp.com/allComment/${this.props.match.params.id}`)
		.then(response=>{			
			return response.json()
		})
		.then(data=>{			
			this.setState({updatedComment:data})				
		})	

	}

	onCommentChange =(event)=>{
		this.setState({comment:event.target.value})
	}
	
	onSubmitComment=()=>{
		fetch('https://yelpcamp-api.herokuapp.com/newComment',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				comment_text:this.state.comment,
				camp_id:this.props.campsData.id,
				user_id:this.props.user.id,
				comment_added:new Date()
			})
		}).then(response=>{
			return response.json()
		}).then(commentId=>{
			if(commentId.comment_id){
			const resetField=document.getElementsByTagName('textarea')[0];
			resetField.value='';
			fetch(`https://yelpcamp-api.herokuapp.com/allComment/${this.props.match.params.id}`)
			.then(response=>{			
				return response.json()
			})
			.then(data=>{			
				this.setState({updatedComment:data})				
			})

			}else{
				const error=document.getElementById('errorComment');
				error.textContent='Cannot send that comment'				
			}
		})	
		
	}

	onDeleteComment=(id)=>{			
		for (var i = 0; i < this.state.updatedComment.length; i++) {			
			if(this.state.updatedComment[i].comment_id===id){									
				this.setState({deleteComment:this.state.deleteComment.push(this.state.updatedComment[i])})
				fetch('https://yelpcamp-api.herokuapp.com/deleteComment',{
				method:'delete',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify({
					comment_id:this.state.deleteComment[0].comment_id,
					user:this.props.user.id
					})
				})
				this.state.updatedComment.splice(i,1)
				this.setState({deleteComment:[]})
			}
		}
	}

	render(){			
		function displayDIV() {			
			var x = document.getElementById("myDIV");
			var y = document.getElementById("secondDiv");
			if (x.style.display === "none") {
				x.style.display = "block";
				y.style.marginTop = "0";
			} else {
				x.style.display = "none";
				y.style.marginTop = "80px";
			}
		}
		if(this.props.isLoggedIn){
			return (
				<div>
					<div style={{height: '520px', marginTop: '10px'}}
					className= 'tc bg-washed-green shadow-4 br2 pa3 ba dark-gray b--black-10 mv4 w-100 w-100-m w-100-l mw6 center'>
						<img src={this.state.singleCamp.image} alt='camp' style={{width: '100%' ,height: '250px'}} />
						<h1>{this.state.singleCamp.camps_name}</h1>
						<p>Location : {this.state.singleCamp.loacation} </p>
						<p><em>{this.state.singleCamp.description}</em></p>
						<p><em>{this.state.singleCamp.price}$/night</em></p>
						<p>Camp added : <Moment format="D MMM YYYY" withTitle>{this.state.singleCamp.added}</Moment></p>
					</div>
						<div style={{width:'30%',height:'225px'}}>
							<MapContainer  camps_name={this.state.name} />
						</div>						
					<div style={{marginTop: '10px'}}
					className= 'tc bg-washed-green shadow-4 br2 pa3 ba dark-gray b--black-10 mv4 w-100 w-100-m w-100-l mw6 center'>
						<h3 className= 'fl dib ml0'>Comments</h3>
						<button className='fr mt3  f6  pointer  shadow-4 dim br2 ph3 pv2  dib white bg-green' 
						onClick={displayDIV}
						>Add a new comment</button>						
						<div id='myDIV' style={{height:'200px',display:'none'}} >						
							<textarea 
							rows="5" 
							cols="70" 
							style={{height:'80px'}}
							onChange={this.onCommentChange} 
							>
							</textarea>
							<input 
							className='mt2 f6  pointer  shadow-4 dim br2 ph3 pv2  dib white bg-green' 
							type='submit'
							onClick={this.onSubmitComment}
							/><br/>
							<span id='errorComment' className='red'></span>							
							<hr/>
						</div>						
							<div id='secondDiv' style={{marginTop:'80px'}} >
							<div className='tl'>
								<NewComment onDeleteComment={this.onDeleteComment} isAdminIn={this.props.isAdminIn} updatedComment={this.state.updatedComment} />
							</div>
						</div>
					</div>
				</div>
				);
		}else{
			return (
				<div>
					<div style={{height: '520px', marginTop: '10px'}}
						className= 'tc bg-washed-green shadow-4 br2 pa3 ba dark-gray b--black-10 mv4 w-100 w-100-m w-100-l mw6 center'>
						<img src={this.state.singleCamp.image} alt='camp' style={{width: '100%' ,height: '250px'}} />
						<h1>{this.state.singleCamp.camps_name}</h1>
						<p>Location : {this.state.singleCamp.loacation} </p>
						<p><em>{this.state.singleCamp.description}</em></p>
						<p><em>{this.state.singleCamp.price}$/night</em></p>
						<p>Camp added : <Moment format="D MMM YYYY" withTitle>{this.state.singleCamp.added}</Moment></p>
					</div>					
						<div style={{width:'30%',height:'225px'}}>
							<MapContainer  camps_name={this.state.name}/>
						</div>
						
					<div style={{marginTop: '10px'}}
					className= 'tc bg-washed-green shadow-4 br2 pa3 ba dark-gray b--black-10 mv4 w-100 w-100-m w-100-l mw6 center'>
						<h3 className= 'fl dib ml0'>Comments</h3>
						<button className='fr mt3  f6  pointer  shadow-4 dim br2 ph3 pv2  dib white bg-green' 
						onClick={displayDIV}
						>Add a new comment</button>
							<div id='myDIV' style={{height:'200px',display:'none'}} >
							<textarea 
							rows="5" 
							cols="70" 
							style={{height:'80px'}}
							placeholder='You need to be logged in to post a comment !'
							>
							</textarea>
							<input 
							className='mt2 f6  pointer  shadow-4 dim br2 ph3 pv2  dib white bg-green' 
							type='submit'
							disabled
							/>
							<hr/>
						</div>
							<div id='secondDiv' style={{marginTop:'80px'}} >
								<div className='tl'>
									<NewComment  updatedComment={this.state.updatedComment} />
							</div>
						</div>
					</div>
				</div>
				)
		}
	}
}

export default MoreInfo;


