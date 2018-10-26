import React, { Component } from 'react';
import './App.css';
import CategoryList from '../components/CategoryList';
import Header from '../components/Header';
import SelectionList from './SelectionList';
import NavBar from '../components/NavBar';

//App container
class App extends Component {
  constructor(props) {
    super(props);
    //default categories and default selected category (none)
    this.state = {
      categories: ["films", "people", "planets", "species", "starships", "vehicles"],
      selectedCategory: '',
    }
    this.onCategoryClickChange = this.onCategoryClickChange.bind(this);
    // this.navBarClick = this.navBarClick.bind(this);
    this.navBarHome = this.navBarHome.bind(this);
    // this.onClick = this.onClick.bind(this);
    // this.loadCards = this.loadCards.bind(this);
  }

  //event handler for category selection
  onCategoryClickChange(event) {
    let newCategory = event.target.alt
    // console.log(newCategory)
    this.setState({selectedCategory: newCategory})
  }

//default values for component mounting 
  componentDidMount() {
    this.setState({
      categories: ["films", "people", "planets", "species", "starships", "vehicles"],
      selectedCategory: ''
    })
  }

  //navbar behaviour
  // navBarClick(event) {
  //   const newCategory = event.target.title;
  //   this.setState({
  //     selectedCategory: newCategory
  //   })
  //   console.log(`${newCategory} NAVBAR BUTTON HAS BEEN CLICKED, CURRENT SELECTED CATEGORY: ${this.state.selectedCategory}`);
  // }

  //navbar home button behaviour
  navBarHome() {
    this.setState({
      categories: ["films", "people", "planets", "species", "starships", "vehicles"],
      selectedCategory: '',
    })
  }

 

  render() {
    //if no category has been selected
    if (this.state.selectedCategory === '') {
      return(
        <div className="tc">
          <Header />
          <NavBar
            onItemClick={this.navBarClick}
            onHomeClick={this.navBarHome}
            />
        {/* Category List shows an item list of the every category */}
          <CategoryList 
            categories={this.state.categories} 
            cards={this.state.cards} 
            clickedFunction={this.onCategoryClickChange}
            selectedCategory={this.state.selectedCategory}
            searchfield={this.state.searchfield}
            />
      </div>
      )
      // If a category has been selected
    } else {
      return(
        <div className="tc">
          <NavBar
            onItemClick={this.navBarClick}
            onHomeClick={this.navBarHome}
           />
           {/* Selection List shows a list of all the items belonging to the selected category */}
          <SelectionList 
            cards={this.state.cards} 
            clickedFunction={this.onCategoryClickChange}
            selectedCategory={this.state.selectedCategory}
            searchfield={this.state.searchfield}
            />
      </div>
      )
    }
  }
}

export default App;
