import { useEffect, useState } from "react";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import { api } from "./services/api";

import "./styles/global.scss";

import "./styles/sidebar.scss";

import "./styles/content.scss";

import { Header } from "./components/Header";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);

    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);

      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId, genres]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div className='containerParentApp'>
      <nav className="sidebar">
        <span>
          Watch<p>Me</p>
        </span>
        <div className="buttons-container">
          {genres.map((genre) => (
            <SideBar
              id={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              handleClickButton={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>

      <div className="container">
        <main>
          <Header title={selectedGenre.title} />
          <div className="movies-list">
            {movies.map((movie) => (
              <Content
                imdbID={movie.imdbID}
                Title={movie.Title}
                Poster={movie.Poster}
                Runtime={movie.Runtime}
                Ratings={movie.Ratings[0].Value}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
