import React from "react";

class Card extends React.Component {
  render() {
   
    return (
      <div>
        <img className="film-poster" src={this.props.image} alt="poster"></img>
        <h2>{this.props.title}</h2>
        <p>{this.props.year}</p>
        <p>{this.props.description}</p>
      </div>
    );
  }
}
export default Card;