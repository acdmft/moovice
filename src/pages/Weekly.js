import React from "react";
import moment from "moment";
// Components
import Card from "../components/Card";
import Paginator from "../components/Paginator";

class Popular extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      currentPage: 1,
    };

    this.fetchMovies = this.fetchMovies.bind(this);
    this.handlePaginatorClick = this.handlePaginatorClick.bind(this);
    this.currentPages = this.currentPages.bind(this);
  }
  //shows current pages in paginator
  currentPages() {
    if (parseInt(this.state.currentPage) >= 998) {
      return { p1: "<", p2: "998", p3: "999", p4: "1000" };
    } else if (parseInt(this.state.currentPage) <= 3) {
      return { p1: "1", p2: "2", p3: "3", p4: ">" };
    } else {
      return {
        p1: "<",
        p2: this.state.currentPage,
        p3: parseInt(this.state.currentPage) + 1,
        p4: ">",
      };
    }
    
  }

  handlePaginatorClick(p) {
    if (parseInt(p) !== this.state.currentPage) {
      switch (p) {
        case "<":
          this.setState((prevState) => {
            return { currentPage: parseInt(prevState.currentPage) - 2 };
          });
          break;
        case ">":
          if (parseInt(this.state.currentPage) <= 3) {
            this.setState({currentPage: 4});
          } else {
            this.setState((prevState) => {
              return { currentPage: parseInt(prevState.currentPage) + 2 };
            });
          }
          break;
        default: 
          this.setState({currentPage: p})
      }
      this.fetchMovies(p);
    }
    console.log(this.state.currentPage, p);
  }

  fetchMovies(page) {
    let now = moment();
    let month = now._d.getMonth();
    month = month <= 8 ? "0" + (month + 1) : month + 1;  
    let today = `${now._d.getFullYear()}-${month}-${now._d.getDate()}`;
    now = moment().subtract(7, 'days');
    month = now._d.getMonth();
    month = month <= 8 ? "0" + (month + 1) : month + 1;
    let last_week = `${now._d.getFullYear()}-${month}-${now._d.getDate()}`;
    fetch(
      `http://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${last_week}&primary_release_date.lte=${today}&api_key=9f8016c7182a43a9d6ff4befd6445c3c`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ movies: res.results });
      });
  }

  componentDidMount() {
    this.fetchMovies(this.state.currentPage);
  }

  render() {
    //shows current pages in the paginator (...|4|5|6|... etc)
    const { p1, p2, p3, p4 } = this.currentPages();
    return (
      <div>
        <h1>Weekly</h1>
        {this.state.movies.map((movie) => {
          return (
            <Card
              image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              title={movie.title}
              key={movie.id}
            />
          );
        })}
        <Paginator
          onClick={this.handlePaginatorClick}
          currentPage={this.state.currentPage}
          p1={p1}
          p2={p2}
          p3={p3}
          p4={p4}
        />
      </div>
    );
  }
}
export default Popular;
