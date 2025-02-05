import { Pokemon } from "@/types/pokemon";
import PokemonCard from "./PokemonCard";
import { motion } from "framer-motion";

interface PokemonGridProps {
  pokemons: Pokemon[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onPokemonClick: (pokemon: Pokemon) => void;
}

const PokemonGrid = ({
  pokemons,
  favorites,
  onToggleFavorite,
  onPokemonClick,
}: PokemonGridProps) => {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6"
    >
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          isFavorite={favorites.includes(pokemon.id)}
          onToggleFavorite={() => onToggleFavorite(pokemon.id)}
          onClick={() => onPokemonClick(pokemon)}
        />
      ))}
    </motion.div>
  );
};

export default PokemonGrid;