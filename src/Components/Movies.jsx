import { useQuery } from "@tanstack/react-query";
import { getPopular, makeBgPath, makeImagePath } from "../api";
import {
  Banner,
  Loader,
  Overview,
  Title,
  Wrapper,
  Slider,
  Row,
  Box,
  Info,
  Overlay,
  BigMovie,
  BigTitle,
  BigCover,
  BigOverview,
} from "./MoviesComponent";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
const rowVar = {
  hidden: {
    x: window.outerWidth + 5,
    opacity: 1,
    scale: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 10,
      staggerChildren: 0.2,
    },
  },

  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVar = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};
const infoVar = {
  hover: {
    opacity: 0.5,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};
const offset = 6;

function Movies({ queryObj, pathKey }) {
  const history = useNavigate();
  const { data, isLoading } = useQuery(queryObj.key, queryObj.fn);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const bigMovieMatch = useMatch("/" + pathKey + "/:movieId");
  const { scrollY } = useScroll();
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      //console.log(index);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId) => {
    //history.push(`/movies/${movieId}`);
    history(`/${pathKey}/${movieId}`);
  };
  const onOverlayClick = () => history(-1);
  const clickMovie =
    bigMovieMatch?.params.movieId &&
    data.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);
  console.log(clickMovie);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgImg={makeBgPath(data?.results[0].backdrop_path || "")}
            onClick={incraseIndex}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence
              onExitComplete={toggleLeaving} /* initial={false} */
            >
              <Row
                variants={rowVar}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 0.5 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVar}
                      transition={{ type: "tween" }}
                      bgImg={makeImagePath(movie.backdrop_path || "")}
                      onClick={() => onBoxClicked(movie.id)}
                    >
                      <Info variants={infoVar}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickMovie.backdrop_path
                          )})`,
                        }}
                      />
                      <BigTitle>{clickMovie.title}</BigTitle>
                      <BigOverview>{clickMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Movies;
