import React from "react";
import Card from "./Card";

//CategoryList displays a list of all 6 default categories inside a Card component
class CategoryList extends React.Component { 
  render() {
    return(
      <div>
      {
        this.props.categories.map((categoria, index) => {
          return (
            //Card Component displaying the info of each item 
                //in this case, the categories
            <Card 
              key={this.props.categories[index]}
              title={categoria}
              clicked={this.props.clickedFunction}
            />
          )
        })
      }
    </div>
    )
  }
}

export default CategoryList;