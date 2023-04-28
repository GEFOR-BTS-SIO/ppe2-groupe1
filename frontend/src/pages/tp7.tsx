import { useQuery } from "@tanstack/react-query";
import { Pokemon } from "../../components/pokemon";

const fetchPokemons = async () => {
  return await fetch('https://pokeapi.co/api/v2/pokemon?limit=1500').then(res => res.json());
};

// Définir un type ou une interface pour l'objet data
type PokemonData = {
  results: Array<{
    id: string,
    name: string,
    // Autres propriétés attendues de l'API
  }>
};

// Utiliser le type PokemonData comme annotation de type pour data
const Tp7 = () => {
  const { data, isLoading } = useQuery<PokemonData>({
    queryKey: ["pokemons"],
    queryFn: () => fetchPokemons()
    
  });

  if (isLoading) return <div>Loading</div>;

  return (
    <section>
      <ul>
        {data?.results.map((pokemon: any, index: number) => {
          // Extraire l'ID du Pokémon à partir de l'URL
          const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];
          return (
            <li key={pokemon.name}>
              <div>
                <span>{index + 1}. </span>
                <Pokemon id={pokemonId} />
                {pokemon.name}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Tp7;  