import React from 'react';
import FilmContainer from './FilmContainer.js'
import PeopleContainer from './PeopleContainer.js'
import PlanetsContainer from './PlanetsContainer.js'
import SpeciesContainer from './SpeciesContainer.js'
import StarshipsContainer from './StarshipsContainer.js'
import VehiclesContainer from './VehiclesContainer.js'

//Item container is a container that manages a single item depending on its category,
// which can be one of the 6 default ones: films, people, planets, species, starships or vehicles
// Thing is, url is needed to fetch everything, so that's the reason itemURL state exists

class ItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: this.props.name,
      itemCategory: this.props.category,
      itemURL : this.props.url,
    }
    this.renderSwitch = this.renderSwitch.bind(this);
    this.onDifferentItemClick = this.onDifferentItemClick.bind(this);
  }

  componentDidMount() {
    // console.log(this.state.selectedItem);
  }

  //If already on an item, the user wants to click on another item, OnDifferentItemClick() will
  //handle that, fetching the new item's url taking into consideration the 
  // films/other - .title/.name issue.
  //This function gets called inside of the item parameter, not the item container
  // (see renderSwitch for further info)
    //async function is needed to fetch everything and  wait toreturn it before render() 
    // can process it or there will be an error
  async onDifferentItemClick(itemName, itemCategory, itemURL) {

    async function newItemSelected(url, itemCategory) {
      if (itemCategory === "films") {
          const response = await fetch(url);
          const data = await response.json();
          const itemTitle = data.title;
          return itemTitle;
      } else {
          const response = await fetch(url);
          const data = await response.json();
          const itemName = data.name;
          return itemName;
      }
    }

    itemName = await newItemSelected(itemURL, itemCategory);
    // console.log("FUNCTION VALUES: ",
    // "NAME: ", itemName, "   CATEGORY: ", itemCategory, "   URL:" , itemURL)
    this.setState({
      itemSelected: itemName,
      itemCategory: itemCategory,
      itemURL: itemURL,
      // let url = event.target.attributes.getNamedItem('url').value;
    })
  }

  //Each category has different attributes, so the item should be rendered according to it
  // renderSwitch takes care of that, along with the different category containers
  renderSwitch(category) {
    // let category = this.state.itemCategory
    switch (category) {

      case 'films':
      // console.log("  -- SELECTED CATEGORY: ",this.state.itemCategory)
        return (
          <FilmContainer
            name = {this.state.itemSelected}
            category = {this.state.itemCategory} 
            url = {this.state.itemURL}
            onDifferentItemClicked = {this.onDifferentItemClick}
          />
          )
      case 'people':
        return (
          <PeopleContainer 
            name = {this.state.itemSelected}
            category = {this.state.itemCategory} 
            url = {this.state.itemURL}
            onDifferentItemClicked = {this.onDifferentItemClick}
          />
          )
      case 'planets':
        return (
          <PlanetsContainer
            name = {this.state.itemSelected}
            category = {this.state.itemCategory}  
            url = {this.state.itemURL}
            onDifferentItemClicked = {this.onDifferentItemClick}
          />
          )
      case 'species':
        return (
          <SpeciesContainer 
            name = {this.state.itemSelected}
            category = {this.state.itemCategory} 
            url = {this.state.itemURL}
            onDifferentItemClicked = {this.onDifferentItemClick}
          />
          )
      case 'starships':
        return (
          <StarshipsContainer
            name = {this.state.itemSelected}
            category = {this.state.itemCategory}  
            url = {this.state.itemURL}
            onDifferentItemClicked = {this.onDifferentItemClick}
          />
          )
      case 'vehicles':
        return (
          <VehiclesContainer
            name = {this.state.itemSelected}
            category = {this.state.itemCategory}  
            url = {this.state.itemURL}
            onDifferentItemClicked = {this.onDifferentItemClick}
          />
          )

      default:
        break;
    }
  }



  render() {
    console.log(" ITEM CONTAINER -- SELECTED CATEGORY: ",this.state.itemCategory)
    return(
      //Here goes the Item Component Instead
      <div> 
        <h1>Item Selected:  {this.state.itemSelected}</h1>
        <h1>Item Category:  {this.state.itemCategory}</h1>
        <h1>Item Url:  {this.state.itemURL}</h1>
      
      {this.renderSwitch(this.state.itemCategory)}


      </div>
      
    )
  }
}

export default ItemContainer;