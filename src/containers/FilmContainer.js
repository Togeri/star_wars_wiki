import React from 'react';
import ItemParameter from '../components/ItemParameter.js'

//Container that loads an item which category is films

class FilmContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      url: '',
      title: '',
      episode_id: '',
      opening_crawl: '',
      director: '',
      producer: '',
      release_date: '',
      characters: [],
      planets: [],
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
                />
              )
          })
        )
      }
  }

  //update the info fetched from getData()
  updateInfo(item) {
    this.setState({
      title: item.title,
      episode_id: item.episode_id,
      opening_crawl: item.opening_crawl,
      director: item.director,
      producer: item.producer,
      release_date: item.release_date,
      characters: item.characters,
      planets: item.planets,
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
          <h1>This is a film component</h1>
          <div>
            <h1> 
              <span> Title : </span> 
              <span>{this.state.title} </span>
            </h1>
            <h1> 
              <span> Episode : </span> 
              <span>{this.state.episode_id} </span>
            </h1>
            <h1> 
              <span> Opening : </span> 
              <br />
              <span>{this.state.opening_crawl} </span>
            </h1>
            <h1> 
              <span> Director : </span> 
              <span>{this.state.director} </span>
            </h1>
            <h1> 
              <span> Producer : </span> 
              <span>{this.state.producer} </span>
            </h1>
            <h1> 
              <span> Release Date : </span> 
              <span>{this.state.release_date} </span>
            </h1>
            <h1> 
              <span> Characters : </span> 
              <br />
              <span>
              {this.loadParameterInfo(this.state.characters, "people")}
              </span>
            </h1>
            <h1> 
              <span> Planets : </span> 
              <br />
              <span>
              {this.loadParameterInfo(this.state.planets, "planets")}
              </span>
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

export default FilmContainer;