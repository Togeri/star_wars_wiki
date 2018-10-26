import React from 'react';
import './ItemParameter.css'

// Item Parameter is a component that renders all the info from a given item and 
// handles an click event in which the user can navigate through different items
class ItemParameter extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      category: this.props.category,
      itemName: '',
    }
    this.updateItemName = this.updateItemName.bind(this);
  }
  
    //getData asyncrhonously to avoid loading errors on render
    async componentDidMount() {

    async function getData(url, category) {
      try {
        const response = await fetch(url)
        const data = await response.json()
        let name = '';
        //manage the film/other - .title/.name attributes issue
        if (category === "films") {
          name = data.title
        } else {
          name = data.name; 
        }
        // console.log(name);
        return name;
      } catch (error) {
        console.log("ERROR:  ", error)
      }
    }
    const url = this.state.url
    // console.log(url);
    // const item = this.state.url;

    // const item = await getData(url)
    const category = this.state.category;
    // console.log(category);
    const name = await getData(url, category)
    // // console.log("hello")
    // this.updateInfo(item);
    this.updateItemName(name);
  }

  //updating itemName on component mount load to display it 
  updateItemName(name) {
    this.setState({
      itemName: name
    })
  }

  
  render() {
      // console.log(this.props.onItemClick)
      // console.log(this.props.url)
      const name  = this.props.name;
      const category = this.props.category;
      const url = this.props.url;
      // console.log("NAME: ", name, "   CATEGORY: ", category, "   URL:" , url);
      return( 
          <div >
            <span 
            id="clickable" 
            //onClick event, change the item info to be displayed.
            //for further info, check item container and selectionlist containers
            onClick={() => this.props.onItemClick(name, category, url)}
            >
            {this.state.itemName}
            </span>
          </div>
      )
  }
}

export default ItemParameter;