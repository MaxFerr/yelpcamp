import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import './MapContainer.css';

export class MapContainer extends Component {
  constructor(props){
      super(props);
      this.state={
        lat:'',     
        lng:'',
      }
    }

  componentDidMount(){    
    fetch('https://yelpcamp-api.herokuapp.com/googleApiK',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          camp_name:this.props.camps_name         
        })
      }).then(response=>{
        return response.json()
      }).then(data=>{
        this.setState({lat:data.results[0].geometry.location.lat});
        this.setState({lng:data.results[0].geometry.location.lng}); 
      })    
  }

  componentDidUpdate(){    
    const testdiv=document.getElementsByTagName("div")[16]    
    testdiv.id='mapStyle1'    
    testdiv.style.height = "200px";
    testdiv.style.display = "block";    
  }
  render() {
    return (
      <div style={{width:'90%',height: '200px'}}>
      <Map google={this.props.google}
          style={{width:'100%',height: '200px'}}
          center={{
            lat: Number(this.state.lat),
            lng: Number(this.state.lng)
          }}          
          zoom={15}
          onClick={this.onMapClicked}>
 
        <Marker title={this.props.camps_name}
          name={this.props.camps_name}
          position={{lat: Number(this.state.lat), lng:Number(this.state.lng)}}/>    
      </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyDnK5KE2R0T2BLQSV2BNI5E5z_EOIWfVVo')
})(MapContainer)
