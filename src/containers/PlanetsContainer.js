import React from 'react';
import ItemParameter from '../components/ItemParameter.js'

//Container that loads an item which category is Planets

class PlanetsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      url: '',
      name: '',
      rotation_period: '',
      orbital_period: '',
      diameter: '',
      climate: '',
      gravity: '',
      population: '',
      surface_water: '',
      terrain: '',
      films: [],
      residents: [],
    }
    this.updateInfo = this.updateInfo.bind(this);
    this.loadParameterInfo = this.loadParameterInfo.bind(this);
  }
  
  //Avoid more fetching if the user clicks on a different item while the item list is still loading
  // with the 'mounted' value
  componentWillUnmount() {
    this.mounted = false;
  }

  //On mount, fetch all the data of the current item and load it into the item's different states
  async componentDidMount() {

    this.mounted = true;
    //getData fetchs all the data from the item's url
    async function getData(url) {
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data);
      return data;

    }
    const url = this.props.url
    // console.log(url);
    // const item = this.state.url;

    const item = await getData(url)
    //updateInfo sets the item's state to its new values, which are all the data fetched from getData
    this.updateInfo(item);
  }
  

  // load the info (more specifically, the name/title) of an item and 
  // pass it into ItemParameter component, along with the OnDifferentItemClicked() function,
  // passed through props from ItemContainer. 
  // For further information, check ItemContainer and ItemParameter
  loadParameterInfo(itemURL, itemCategory) {
    if (this.mounted) {
      return (
        itemURL.map((itemURL, index) => {
            return(
                <ItemParameter 
                url={itemURL}
                category={itemCategory}
                key={index}
                name={this.props.name}
                onItemClick = {this.props.onDifferentItemClicked}
                //pass function from itemContainer here
              />
            )
        })
      )
    }
}


  //update the info fetched from getData()
  updateInfo(item) {
    this.setState({
      name: item.name,
      rotation_period: item.rotation_period,
      orbital_period: item.orbital_period,
      diameter: item.diameter,
      climate: item.climate,
      gravity: item.gravity,
      population: item.population,
      surface_water: item.surface_water,
      terrain: item.terrain,
      films: item.films,
      residents: item.residents,
      url: item.url,
    })
  }
    
  //Render item according to its category attributes
  render() {
    if (this.state.url === '') {
        return(
          <h1>Loading</h1>
        )
    } else {
      return(
        <div>
          <h1>This is a Planet component</h1>
          <div>
            <h1> 
              <span> Name : </span> 
              <span>{this.state.name} </span>
            </h1>
            <h1> 
              <span> Rotation Period : </span> 
              <span>{this.state.rotation_period} </span>
            </h1>
            <h1> 
              <span> Orbital Period : </span> 
              <span>{this.state.orbital_period} </span>
            </h1>
            <h1> 
              <span> Diameter : </span> 
              <span>{this.state.diameter} </span>
            </h1>
            <h1> 
              <span> Climate : </span> 
              <span>{this.state.climate} </span>
            </h1>
            <h1> 
              <span> Gravity : </span> 
              <span>{this.state.gravity} </span>
            </h1>
            <h1> 
              <span> Population: </span> 
              <span>{this.state.population} </span>
            </h1>
            <h1> 
              <span> Surface Water : </span> 
              <span>{this.state.surface_water} </span>
            </h1>
            <h1> 
              <span> Terrain : </span> 
              <span>{this.state.terrain} </span>
            </h1>
            <h1>
              <span> Films : </span> 
              <br />
              <span>
              {this.loadParameterInfo(this.state.films, "films")}
              </span>
            </h1>
            <h1> 
              <span> Residents : </span> 
              <br />
              <span>
              {this.loadParameterInfo(this.state.residents, "people")}
              </span>
            </h1>
          </div>
        </div>
      )
    }
  }
}

export default PlanetsContainer;


