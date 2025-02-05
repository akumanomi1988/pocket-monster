import { Pokemon } from "@/types/pokemon";
import TypeBadge from "./TypeBadge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}

const PokemonCard = ({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onClick,
}: PokemonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={cn(
            "p-2 rounded-full transition-colors duration-200",
            isFavorite
              ? "bg-yellow-400 text-white"
              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          )}
        >
          <Star className="h-4 w-4" />
        </button>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-square mb-4">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <h3 className="text-lg font-semibold capitalize">{pokemon.name}</h3>
            <span className="text-sm text-gray-500">#{pokemon.id}</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {pokemon.types.map((type) => (
              <TypeBadge key={type.type.name} type={type.type.name} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PokemonCard;