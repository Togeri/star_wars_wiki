import React from 'react';

//SearchBox is a component that displays a search field and, onChange of input, calls
//a function passed by props (searchChange) which is onSearchChange() in SelectionList
// and filters the items of an already chosen category

class SearchBox extends React.Component {
  render() {
    return(
      <div className="pa2">
        <input 
          className="pa3 ba b--green bg-lightest-blue"
          type="search"
          placeholder={`search ${this.props.category}`}
          onChange={this.props.searchChange}
        />
      </div>
    )
  }
}

export default SearchBox;