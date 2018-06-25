import React from 'react';

class App extends React.Component {
	
	constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.textField = React.createRef();
    this.state = {
    	data: null,
    };
  }

	componentDidMount(){

		const ws = new WebSocket('ws://localhost:8080/');

    ws.onmessage = (event) => {

      this.setState({data: event.data});
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");
      const imgData=ctx.createImageData(800,100);
      let data = this.state.data;
      let binaryData = [];

      for(let i=0; i < data.length; i++) {
        if(i===data.length-1 && binaryData.length < 80000){
          i=0; 
        }
        binaryData.push(...data[i].charCodeAt(0).toString(2)); 
      }

      let j = 0;
      for (let i = 0; i < imgData.data.length; i+=4){
        if(j > binaryData.length){ 
          break;
        }
        imgData.data[i+0] = imgData.data[i+1] = imgData.data[i+2] = +binaryData[j] ? 0 : 255;
        imgData.data[i+3] = 255;
        j++;
      }

      ctx.putImageData(imgData,10,10);
    }
	}

	render() {
		return (
			<div>
				<canvas ref="canvas" width={800} height={100}/>
			</div>
		);
	}
}

export default App;