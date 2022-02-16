import React from "react";
import Card from "../components/Card";

class PopularBattle extends React.Component {
  constructor() {
    super();

    this.state={
      movies: [],
      currentBattle: 0,
    }
    this.handleCardClick = this.handleCardClick.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
  }

  handleCardClick(id) {
    switch (this.state.currentBattle) {
      case 0:
        localStorage.setItem("favorites", id);
        this.setState((prevState)=>{
          return {currentBattle: prevState.currentBattle + 1}
        });
        break;
      case 1:
        let favFilm = localStorage.getItem("favorites");
        //if user want to add the film that is not already added
        if (favFilm !== id.toString()) {
          let favFilms = new Array(favFilm, id);
          localStorage.setItem("favorites", favFilms);
          // increase currentBattle
          this.setState((prevState)=>{
            return {currentBattle: prevState.currentBattle + 1}
          })
        }
        break;
    }
  }

  // Show the message when user adds a film to the favorites
  renderMessage() {
    switch (this.state.currentBattle) {
      case 0:
        return null;
        break;
      case 1: 
        return (<div>Vous avez ajouté un film!</div>)
        break;
      case 2:
        return (<div>Vous avez parcouru tous les films !</div>)
        break;
    }
  }
  
  componentDidMount() {
    fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9f8016c7182a43a9d6ff4befd6445c3c")
      .then((res)=> res.json())
      .then((res)=>{
        let twoPopularMovies = res.results.splice(0,2);
        this.setState({movies: twoPopularMovies});
        console.log(this.state.movies)
      })
  }
  
  render() {
    return (
      <>
        <h1>Popular Battle</h1>
        <div>
          {this.state.movies.map((movie)=> {
            return (
              <Card 
                onClick={this.handleCardClick}
                image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                title={movie.title}
                id={movie.id}
                key={movie.id}
              />
            );
          })}
        </div>
        {this.renderMessage()}
      
      </>
    );
  }
}
export default PopularBattle;