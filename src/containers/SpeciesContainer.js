import React from 'react';
import ItemParameter from '../components/ItemParameter.js'

//Container that loads an item which category is Species
class SpeciesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      url: '',
      name: '',
      classification: '',
      designation: '',
      homeworld: '',
      language: '',
      average_height: '',
      skin_colors: '',
      eye_colors: '',
      hair_colors: '',
      average_lifespan: '',
      films: [],
      people: [],
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
      classification: item.classification,
      designation: item.designation,
      homeworld: item.homeworld,
      language: item.language,
      average_height: item.average_height,
      skin_colors: item.skin_colors,
      eye_colors: item.eye_colors,
      hair_colors: item.hair_colors,
      average_lifespan: item.average_lifespan,
      films: item.films,
      people: item.people,
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
      return (
        <div>
          <h1>This is a Species component</h1>
          <div>
          <h1> 
              <span> Name : </span> 
              <span>{this.state.name} </span>
            </h1>
            <h1> 
              <span> Classification : </span> 
              <span>{this.state.classification} </span>
            </h1>
            <h1> 
              <span> Designation : </span> 
              <span>{this.state.designation} </span>
            </h1>
            <h1> 
              <span> Homeworld : </span> 
              <span>{this.loadParameterInfo(this.state.homeworld, "planet")} </span>
            </h1>
            <h1> 
              <span> Language : </span> 
              <span>{this.state.language} </span>
            </h1>
            <h1> 
              <span> Average Height : </span> 
              <span>{this.state.average_height} </span>
            </h1>
            <h1> 
              <span> Skin Colors: </span> 
              <span>{this.state.skin_colors} </span>
            </h1>
            <h1> 
              <span> Eye Colors : </span> 
              <span>{this.state.eye_colors} </span>
            </h1>
            <h1> 
              <span> Hair Colors : </span> 
              <span>{this.state.hair_colors} </span>
            </h1>
            <h1> 
              <span> Average Lifespan : </span> 
              <span>{this.state.average_lifespan} </span>
            </h1>
            <h1>
              <span> Films : </span> 
              <br />
              <span>
              {this.loadParameterInfo(this.state.films, "films")}
              </span>
            </h1>
            <h1> 
              <span> People : </span> 
              <br />
              <span>
              {this.loadParameterInfo(this.state.people, "people")}
              </span>
            </h1>
          </div>
        </div>
      )
    }
  }
}

export default SpeciesContainer;
