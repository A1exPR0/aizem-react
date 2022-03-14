import React, { Component, useRef } from 'react'
import styled from 'styled-components'



export default class Coord extends Component {
  constructor(){
    super();
    this.Wrapper=React.createRef();
    this.state={
        x:0,
        y:0
    };
  }
  _onMouseMove=(e)=>{

    const width=this.Wrapper.current.clientWidth;
    const height=this.Wrapper.current.clientHeight;  
    const ox=e.nativeEvent.clientX;
    const oy=e.nativeEvent.clientY;
    //console.log(e.nativeEvent);
    this.setState({
        x:ox,
        y:oy
    });
  }
    render() {

           
    return (
    
      <div ref={this.Wrapper} onMouseMove={this._onMouseMove}>
          <p>X is {this.state.x}</p>
          <p>Y is {this.state.y}</p>
      </div>
    )
    
    
  }
  
  
}

