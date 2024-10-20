import React from 'react'
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import PropTypes from "prop-types";


import Pagination from "../components/ui/Pagination";
import BackgroundImage from "../components/ui/BackgroundImage";
import Loader from "../components/ui/Loader";

import CardsContainer from "../components/ui/CardComponents/CardsContainer";
import SmallCard from "../components/ui/CardComponents/SmallCard";

import ErrorComponent from "./errors/Error";

const Home = ({ searchTerm, openBigCard }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const Limit = 100;
  const {
    data: pokemonData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["pokemon", searchTerm || "", currentPage],
    queryFn: () => {
      if (searchTerm) {
        return Axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
          .then((res) => res.data);
      } else {
        return Axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * Limit}&limit=${Limit}`)
          .then((res) => {
            const { results } = res.data;
            const requests = results.map((result) => Axios.get(result.url));
            return Promise.all(requests).then((pokemonResponses) => {
              return pokemonResponses.map((pokemonRes) => pokemonRes.data);  // Make sure data is returned here
            });
          });
      }
    },
    keepPreviousData: false,
  });

  function hasHomeSprite(data) {
    if (data?.id >= 906 && data?.id <= 1008) {
      return false;
    } else {
      return true;
    }
  }

  function isPokemonAvailable(data) {
    if (data?.id >= 1009) {
      return false;
    } else {
      return true;
    }
  }

  const getHomeSprite = useMemo(
    () => (data) => data.sprites.other.home.front_default,
    []
  );

  const getArtworkSprite = useMemo(
    () => (data) => data.sprites.other["official-artwork"]["front_default"],
    []
  );

  function handlePrevClick() {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function handleNextClick() {
    setCurrentPage((prevPage) => prevPage + 1);
  }



  if (isLoading) {
    return (
      <BackgroundImage>
        <Loader />
      </BackgroundImage>
    );
  }

  if (isError) {

    return (
      <BackgroundImage>
        <ErrorComponent />
      </BackgroundImage>
    );
  } else if (searchTerm) {

    let ImageValue;
    if (!isPokemonAvailable(pokemonData)) {
      return (
        <BackgroundImage>
          <ErrorComponent />
        </BackgroundImage>
      );
    }


    if (hasHomeSprite(pokemonData)) {
      ImageValue = getHomeSprite(pokemonData);
    } else {
      ImageValue = getArtworkSprite(pokemonData);
    }


    return (
      <BackgroundImage>
        <CardsContainer>
          <SmallCard
            height={pokemonData.height}
            id={pokemonData.id}
            image={ImageValue}
            key={pokemonData.id}
            name={pokemonData.species.name}
            weight={pokemonData.weight}
            openBigCard={openBigCard}
          />
        </CardsContainer>
      </BackgroundImage>
    );
  } else {
    return (
      <BackgroundImage>
        <Pagination
          page={currentPage}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
        />
        <CardsContainer>
          {Array.isArray(pokemonData) &&
            pokemonData.map((pokemon) => {
              let imageValue;

              if (!isPokemonAvailable(pokemon)) {
                return null;
              }

              if (hasHomeSprite(pokemon)) {
                imageValue = getHomeSprite(pokemon);
              } else {
                imageValue = getArtworkSprite(pokemon);
              }

              return (
                <SmallCard
                  height={pokemon.height}
                  id={pokemon.id}
                  image={imageValue}
                  key={pokemon.id}
                  name={pokemon.species.name}
                  weight={pokemon.weight}
                  openBigCard={openBigCard}
                />
              );
            })}
        </CardsContainer>
        <Pagination
          page={currentPage}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
        />

        <footer className='mt-10 text-center font-sans font-medium text-gray-800'>
            Assignment Completed by Yaman
        </footer>
      </BackgroundImage>
    );
  }
}

Home.propTypes = {
  searchTerm: PropTypes.string,
  openBigCard: PropTypes.func,
};

export default Home;