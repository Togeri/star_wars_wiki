import React from 'react';

// Falta arreglar el behavior al clickar. DE MOMENTO SOLO SE PUEDE CLICKAR EN EL DIV Y LA IMAGEN

class Card extends React.Component { 

  componentWillMount() {
    // console.log(this.props.url);
  }

  render() {
    return(
      <div  
      className="tc bg-light-yellow dib br3 pa3 ma2 grow bw2 shadow-5" 
      alt={this.props.title}
      url={this.props.url} 
      onClick={this.props.clicked}
      >
        <img 

        alt={this.props.title} 
        src={`https://robohash.org/test`}
        url={this.props.url}
        />      
        <div 

        alt={this.props.title}
        url={this.props.url}
        >
          <h2 
  
          alt={this.props.title}
          url={this.props.url}
          >
          {this.props.title} 
          {/* {this.props.url} */}
          </h2>
        </div>
      </div>
    )
  }
}

export default Card;