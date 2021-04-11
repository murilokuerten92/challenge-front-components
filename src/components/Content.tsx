import { MovieCard } from "./MovieCard";

import "../styles/content.scss";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: string;
  Runtime: string;
}

export function Content(props: MovieProps) {
  return (
    <>
      <MovieCard
        key={props.imdbID}
        title={props.Title}
        poster={props.Poster}
        runtime={props.Runtime}
        rating={props.Ratings}
      />
    </>
  );
}
