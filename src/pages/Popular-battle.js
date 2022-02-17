import React from "react";
import Card from "../components/Card";

let twoPopularMovies = [];

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
    if (this.state.currentBattle <= this.state.movies.length -2 ) {
      // Add 1 to currentBattle
      this.setState((prevState)=> {
        return {currentBattle: prevState.currentBattle + 2};
      });
      // Add selected film in LocalStorage
      let addedFilms = localStorage.getItem("favorites");
      if (addedFilms) {
        addedFilms = addedFilms.split(',');
        if (!addedFilms.includes(id)) {
          addedFilms.push(id);
          localStorage.setItem("favorites", addedFilms);
        }
      } else {
        localStorage.setItem("favorites",id);
      }
    }
  }

  // Show the message when user adds a film to the favorites
  renderMessage() {
    switch (this.state.currentBattle) {
      case 0:
        return null;
        break;
      case (this.state.movies.length):
        return (<h2>Vous avez parcouru tous les films !</h2>)
        break;
      default:
        let numOfAddedFilms = localStorage.getItem('favorites');
        numOfAddedFilms = numOfAddedFilms ? numOfAddedFilms.split(',').length : 0;
        return(<h2>{`Vous avez ajoutez ${numOfAddedFilms} films`}</h2>);
      
    }
  }
  
  componentDidMount() {
    fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9f8016c7182a43a9d6ff4befd6445c3c")
      .then((res)=> res.json())
      .then((res)=>{
        this.setState({movies: res.results});
      })
  }
  
  render() {
    twoPopularMovies = this.state.movies.slice(this.state.currentBattle,this.state.currentBattle + 2);
    return (
      <>
        <h1>Popular Battle</h1>
        <div>
          {twoPopularMovies.map((movie)=> {
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