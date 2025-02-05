import { Pokemon } from "@/types/pokemon";
import TypeBadge from "./TypeBadge";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface PokemonDetailProps {
  pokemon: Pokemon;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const PokemonDetail = ({
  pokemon,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}: PokemonDetailProps) => {
  const statsData = pokemon.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold capitalize">
              {pokemon.name}
            </DialogTitle>
            <div className="flex items-center gap-4">
              <span className="text-lg text-gray-500">#{pokemon.id}</span>
              <button
                onClick={onToggleFavorite}
                className={cn(
                  "p-2 rounded-full transition-colors duration-200",
                  isFavorite
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                )}
              >
                <Star className="h-5 w-5" />
              </button>
            </div>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square"
          >
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Types</h3>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <TypeBadge key={type.type.name} type={type.type.name} />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Base Stats</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 255]} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={100}
                      tick={{ fontSize: 12 }}
                    />
                    <Bar
                      dataKey="value"
                      fill="hsl(var(--primary))"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Abilities</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm capitalize"
                  >
                    {ability.ability.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Height</span>
                <p className="text-lg font-medium">{pokemon.height / 10}m</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Weight</span>
                <p className="text-lg font-medium">{pokemon.weight / 10}kg</p>
              </div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PokemonDetail;