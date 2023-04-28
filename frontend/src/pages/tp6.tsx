import { useState, useEffect } from 'react';
import { Pokemon } from '../../components/pokemon';

export default function Tp6() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      {/*Appel de l'API*/}
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9999');
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);

  return (
    <div>
      {/* Vérifier si les données ont été récupérées */}
      {data && (
        <ul>
          {/* Utilisation de la fonction map pour afficher chaque Pokémon */}
          {data.results.map(pokemon => {
            const segments = pokemon.url.split('/');
            const pokemonNumber = segments[segments.length - 2];
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;
            
            return (
            /* Utilisation de la donnée reçu de l'API */
              <li key={pokemon.name}>
                <p>{pokemon.name}</p>
                <Pokemon id={pokemonNumber}/>
              </li>
             
            );
          })}
        </ul>
      )}
    </div>
  );
}