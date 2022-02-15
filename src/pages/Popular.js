import React from "react";

class Popular extends React.Component {
  constructor() {
    super();

    this.state={
      movies: [],
    }
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9f8016c7182a43a9d6ff4befd6445c3c")
      .then((res)=> res.json())
      .then((res)=>{
        this.setState({movies: res.results});
        console.log(this.state.movies)
      })
  }
  
  render() {
    return (
      <h1>Popular</h1>
    );
  }
}
export default Popular;