import { Component } from "react";
import Movies from "../Components/Movies";
import Preloader from "../Components/Loading";
import Search from "../Components/Search";

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends Component {
  state = {
    movies: [],
    loading: true,
  };

  componentDidMount() {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=matrix`)
      .then((response) => response.json())
      .then((result) =>
        this.setState({ movies: result.Search, loading: false })
      );
  }

  searchNewMovie = (newMovie, type = "all") => {
    this.setState({ loading: true });
    fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${newMovie}${
        type !== "all" ? `&type=${type}` : ""
      }`
    )
      .then((response) => response.json())
      .then((result) =>
        this.setState({ movies: result.Search, loading: false })
      );
  };

  render() {
    const { movies, loading } = this.state;
    return (
      <main className="container content">
        <Search searchFunc={this.searchNewMovie} />
        {!loading ? <Movies movies={movies} /> : <Preloader />}
      </main>
    );
  }
}

export default Main;
