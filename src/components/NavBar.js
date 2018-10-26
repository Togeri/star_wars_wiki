import React from 'react';
import './NavBar.css'

//Navbar displaying Home to go back to the main page. 
// Pending: Add different categories to navigote through them

class NavBar extends React.Component {

  render() {
    return(
      <nav className="pa3 pa4-ns">
        <div className="tc pb3">
        <span 
            className="link dim f6 f5-ns dib mr3 clickable"  
            title="home"
            onClick={this.props.onHomeClick}
          >
            Home
          </span>
          {/* <span 
            className="link dim f6 f5-ns dib mr3 clickable"  
            title="films"
            onClick={this.props.onItemClick}
          >
            Films
          </span>
          <span 
            className="link dim f6 f5-ns dib mr3 clickable"  
            title="people"
            onClick={this.props.onItemClick}
          >
            People
          </span>
          <span 
            className="link dim f6 f5-ns dib mr3 clickable"  
            title="planets"
            onClick={this.props.onItemClick}
          >
            Planets
          </span>
          <span 
            className="link dim f6 f5-ns dib mr3 clickable"  
            title="species"
            onClick={this.props.onItemClick}
          >
            Species
          </span>
          <span 
            className="link dim f6 f5-ns dib mr3 clickable"  
            title="starships"
            onClick={this.props.onItemClick}
          >
            Starships
          </span>
          <span 
            className="link dim f6 f5-ns dib mr3 clickable"  
            title="vehicles"
            onClick={this.props.onItemClick}
          >
            Vehicles
          </span> */}
        </div>
      </nav>
    )
  }


}

export default NavBar;




