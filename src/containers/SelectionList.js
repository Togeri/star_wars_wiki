import  React  from "react";
import Card from '../components/Card';
import ItemContainer from './ItemContainer'
import SearchBox from '../components/SearchBox'

//Selection list displays the info (in cards) of every item belonging 
//to the selected category passed through the selectedCategory prop

class SelectionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      searchfield: '',
      selectedCategory: this.props.selectedCategory,
      selectedItem: '',
      itemURL: '',
    }
    this.loadCards = this.loadCards.bind(this);
    // this.selectTitle = this.selectTitle.bind(this);
    this.onItemClickChange = this.onItemClickChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  // selectTitle() {
  //   if (this.selectedCategory === "films") {
  //     return "title"
  //   } else {
  //     return "name"
  //   }
  // }

  //update the cards[] state once fetching promise has been solved
  async loadCards(newCards) {
    this.setState({cards: newCards});
  }

  //Event Handler to catch the item selected whose info is to be displayed
  onItemClickChange(event) {
    let itemClicked = event.target.alt;
    let url = event.target.attributes.getNamedItem('url').value;
    // console.log("URL: ", url);
    this.setState({
      selectedItem: itemClicked,
      itemURL: url,
    })
  }

  //Search field event handler
  onSearchChange(event) {
    this.setState({searchfield: event.target.value})
    console.log(this.state.searchfield);
  }
  
  //On component mount, fetch the selected category section of the Star Wars API
  //and load the data updating the cards[] state
  async componentDidMount(){
    this.setState({
      cards: [],
      searchfield: '',
      selectedCategory: this.props.selectedCategory,
      selectedItem: '',
    })

    let resultsArray = [];
    let category = this.props.selectedCategory;
    let url = `https://swapi.co/api/${category}`;

    //getData fetchs the info from the SWAPI and returns all the data
    const getData = async function() {
      do{
        let temporaryResults = [];
        const response = await fetch(url)
        const data = await response.json()
        temporaryResults = data.results
        url = data.next
        resultsArray = resultsArray.concat(temporaryResults);
      } while (url !== null)
      return resultsArray;
    }
    //call getData and load its results with the loadCards method.    
    let newCards = await getData();
    this.loadCards(newCards);
  }
  
  render() {
    //If the cards haven't been loaded yet, show "Loading" on the screen
    if (this.state.cards.length === 0) {
      return(
        <h1>Loading</h1>
      )
      //If the cards have been loaded and no item has been selected
    } else if(this.state.selectedItem === '') {

      //Handling the Searchfield behavior:
        //filtered cards is a variable that holds all the items that comply with the following:
        //.filter the cards[] array and return every card that includes whatever value is 
        //inside the searchfield (returns all the cards if the value is empty)
      let filteredCards;
      //Same function, but the API returns .title attribute for films name
      if (this.state.selectedCategory === "films") {
         filteredCards = this.state.cards.filter(card => {
          return card.title.toLowerCase().includes(this.state.searchfield.toLowerCase())
        }) 
        // and returns .name attribute for everything else
      } else {
         filteredCards = this.state.cards.filter(card => {
          return card.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        }) 
      }
      
      return(
        <div>
          {/* SearchBox is the Search Field Component */}
          <SearchBox 
            key={"searchbox"}
            searchChange={this.onSearchChange}
            category = {this.state.selectedCategory}
          />
        { 
          // .map through the filteredCards array and return a Card Component 
          // that will display all the filtered items (all of them if searchbox is empty)
          // of the chosen category within a Card component
          filteredCards.map((categoria, index) => {
            //If the chosen category is films, a .title attribute is required
            if (this.state.selectedCategory === "films") {
              return (
                <Card 
                  key={categoria.title}
                  title={categoria.title}
                  clicked={this.onItemClickChange}
                  url={categoria.url}
                  
                />
              )
              // If the chosen category is anything else, a .name is required
            } else {
              return (
                <Card 
                  key={categoria.name}
                  title={categoria.name}
                  clicked={this.onItemClickChange}
                  url={categoria.url}
                  
                />
              )
            }
          })
        }
      </div>
      )
      // If the cards have been loaded and an item has been already chosen, return ItemContainer
    } else {
      return(
        <div>
          {/* Item Container is a Container that manages all the information of a singular selected
          item of a singular selected category*/}
          <ItemContainer 
          name={this.state.selectedItem}
          id={this.state.itemID}
          category={this.state.selectedCategory}
          url={this.state.itemURL}
          />
        </div>
      )
    }
  }
}

export default SelectionList;