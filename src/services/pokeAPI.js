// services/pokeAPI.js
import axios from 'axios';

export const getAllPokemon = async (limit = 1000) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
  const response = await axios.get(url);
  return response.data.results; // returns array of { name, url }
};

export const getPokemonDetails = async (url) => {
  const response = await axios.get(url);
  return response.data; // contains sprites, types, stats, etc.
};
