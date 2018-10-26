import React from 'react';
import ItemParameter from '../components/ItemParameter.js'

//Container that loads an item which category is People

class PeopleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      url: '',
      name: '',
      homeworld: '',
      height: '',
      mass: '',
      gender: '',
      skin_color: '',
      eye_color: '',
      hair_color: '',
      birth_year: '',
      films: [],
      species: [],
      starships: [],
      vehicles: [],
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
  loadParameterInfo(item, itemCategory) {
    if (this.mounted) {
      if (Array.isArray(item)) {
        return (
          item.map((itemURL, index) => {
              return(
                  <ItemParameter 
                  url={itemURL}
                  category={itemCategory}
                  key={index}
                  name={this.props.name}
                  onItemClick = {this.props.onDifferentItemClicked}
                />
              )
          })
        )
      } else {
          return (
            <ItemParameter 
            url={item}
            category={itemCategory}
            key={item}
            name={this.props.name}
            onItemClick = {this.props.onDifferentItemClicked}
          />
          )
      }
    }
      
  }

  //update the info fetched from getData()
  updateInfo(item) {
    this.setState({
      name: item.name,
      homeworld: item.homeworld,
      height: item.height,
      mass: item.mass,
      gender: item.gender,
      skin_color: item.skin_color,
      eye_color: item.eye_color,
      hair_color: item.hair_color,
      birth_year: item.birth_year,
      films: item.films,
      species: item.species,
      starships: item.starships,
      vehicles: item.vehicles,
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
          <h1>This is a People component</h1>
          <div>
            <h1> 
              <span> Name : </span> 
              <span>{this.state.name} </span>
            </h1>
            <h1> 
              <span> Homeworld : </span> 
              <span>{this.loadParameterInfo(this.state.homeworld, "planet")} </span>
            </h1>
            <h1> 
              <span> Height : </span> 
              <span>{this.state.height} </span>
            </h1>
            <h1> 
              <span> Mass : </span> 
              <span>{this.state.mass} </span>
            </h1>
            <h1> 
              <span> Gender : </span> 
              <span>{this.state.gender} </span>
            </h1>
            <h1> 
              <span> Skin Color : </span> 
              <span>{this.state.skin_color} </span>
            </h1>
            <h1> 
              <span> Eye Color : </span> 
              <span>{this.state.eye_color} </span>
            </h1>
            <h1> 
              <span> Hair Color : </span> 
              <span>{this.state.hair_color} </span>
            </h1>
            <h1> 
              <span> Birth Year : </span> 
              <span>{this.state.birth_year} </span>
            </h1>
            <h1>
              <span> Species : </span> 
              <br />
              <span>
              {this.loadParameterInfo(this.state.species, "species")}
              </span>
            </h1>
            <h1> 
              <span> Starships : </span> 
              <br />
              <span>
              {this.loadParameterInfo(this.state.starships, "starships")}
              </span>
            </h1>
            <h1> 
              <span> Vehicles : </span> 
              <br />
              <span>
              {this.loadParameterInfo(this.state.vehicles, "vehicles")}
              </span>
            </h1>
          </div>
        </div>
      )
    }
  }
}

export default PeopleContainer;