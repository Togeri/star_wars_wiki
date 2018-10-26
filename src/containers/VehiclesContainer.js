import React from 'react';
import ItemParameter from '../components/ItemParameter.js'

//Container that loads an item which category is Vehicles

class VehiclesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      url: '',
      name: '',
      model: '',
      manufacturer: '',
      cost_in_credits: '',
      length: '',
      cargo_capacity: '',
      passengers: '',
      crew: '',
      max_atmosphering_speed: '',
      vehicle_class: '',
      consumables: '',
      films: [],
      pilots: [],
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
      model: item.model,
      manufacturer: item.manufacturer,
      cost_in_credits: item.cost_in_credits,
      length: item.length,
      cargo_capacity: item.cargo_capacity,
      passengers: item.passengers,
      crew: item.crew,
      max_atmosphering_speed: item.max_atmosphering_speed,
      vehicle_class: item.starship_class,
      consumables: item.consumables,
      films: item.films,
      pilots: item.pilots,
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
          <h1>This is a Vehicle component</h1>
          <div>
            <h1> 
              <span> Name : </span> 
              <span>{this.state.name} </span>
            </h1>
            <h1> 
              <span> Model : </span> 
              <span>{this.state.model} </span>
            </h1>
            <h1> 
              <span> Manufacturer : </span> 
              <span>{this.state.manufacturer} </span>
            </h1>
            <h1> 
              <span> Cost in Credits : </span> 
              <span>{this.state.cost_in_credits} </span>
            </h1>
            <h1> 
              <span> Length : </span> 
              <span>{this.state.length} </span>
            </h1>
            <h1> 
              <span> Cargo Capacity : </span> 
              <span>{this.state.cargo_capacity} </span>
            </h1>
            <h1> 
              <span> Passengers: </span> 
              <span>{this.state.passengers} </span>
            </h1>
            <h1> 
              <span> Crew : </span> 
              <span>{this.state.crew} </span>
            </h1>
            <h1> 
              <span> Max Atmosphering Speed : </span> 
              <span>{this.state.max_atmosphering_speed} </span>
            </h1>
            <h1> 
              <span> Vehicle Class : </span> 
              <span>{this.state.vehicle_class} </span>
            </h1>
            <h1> 
              <span> Consumables : </span> 
              <span>{this.state.consumables} </span>
            </h1>
            <h1>
              <span> Films : </span> 
              <br />
              <span>
              {this.loadParameterInfo(this.state.films, "films")}
              </span>
            </h1>
            <h1> 
              <span> Pilots : </span> 
              <br />
              <span>
              {this.loadParameterInfo(this.state.pilots, "people")}
              </span>
            </h1>
          </div>
        </div>
      )
    }
  }
}

export default VehiclesContainer;


