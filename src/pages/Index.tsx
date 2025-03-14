import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import PokemonGrid from "@/components/PokemonGrid";
import PokemonDetail from "@/components/PokemonDetail";
import AdvancedFilters from "@/components/AdvancedFilters";
import { Pokemon } from "@/types/pokemon";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Book, Award, Users, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const POKEMON_API_BASE = "https://pokeapi.co/api/v2";
const POKEMON_LIMIT = 300;

const Index = () => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSort, setSelectedSort] = useState("id");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<{ name: string; url: string }[]>([]);
  const [regions, setRegions] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch Pokémon data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Pokémon list
        const pokemonResponse = await fetch(
          `${POKEMON_API_BASE}/pokemon?limit=${POKEMON_LIMIT}`
        );
        const pokemonData = await pokemonResponse.json();
        const pokemonDetails = await Promise.all(
          pokemonData.results.map(async (pokemon: { url: string }) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        setPokemons(pokemonDetails);

        // Fetch types
        const typesResponse = await fetch(`${POKEMON_API_BASE}/type`);
        const typesData = await typesResponse.json();
        setTypes(typesData.results);

        // Fetch regions
        const regionsResponse = await fetch(`${POKEMON_API_BASE}/region`);
        const regionsData = await regionsResponse.json();
        setRegions(regionsData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort Pokémon
  const filterAndSortPokemons = (pokemons: Pokemon[]) => {
    if (!pokemons) return [];

    let filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedType !== "all") {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === selectedType)
      );
    }

    return filtered.sort((a, b) => {
      switch (selectedSort) {
        case "id":
          return a.id - b.id;
        case "id-desc":
          return b.id - a.id;
        case "name":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "weight":
          return a.weight - b.weight;
        case "weight-desc":
          return b.weight - a.weight;
        default:
          return 0;
      }
    });
  };

  // Toggle favorite
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      toast({
        title: prev.includes(id) ? "Removed from favorites" : "Added to favorites",
        description: `Pokémon #${id} has been ${
          prev.includes(id) ? "removed from" : "added to"
        } your favorites.`,
      });

      return newFavorites;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pokedex-bg">
        <div className="animate-pulse text-2xl text-white">Loading Pokédex...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pokedex-bg"
    >
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex items-center gap-4"
          >
            <Book className="h-8 w-8 text-white" />
            <h1 className="text-4xl font-bold text-white">Pokédex</h1>
          </motion.div>

          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-full glass-effect text-white hover:bg-white/20 transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Pokédex Menu</SheetTitle>
                <SheetDescription>
                  Explore additional Pokémon information
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <button className="flex items-center gap-2 w-full p-4 rounded-lg hover:bg-gray-100 transition-colors">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Regions</span>
                </button>
                <button className="flex items-center gap-2 w-full p-4 rounded-lg hover:bg-gray-100 transition-colors">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Types</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <div className="glass-effect rounded-2xl p-6 mb-8">
          <SearchBar value={search} onChange={setSearch} />
          <AdvancedFilters
            selectedType={selectedType}
            selectedSort={selectedSort}
            onTypeChange={setSelectedType}
            onSortChange={setSelectedSort}
          />
        </div>

        <PokemonGrid
          pokemons={filterAndSortPokemons(pokemons)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onPokemonClick={setSelectedPokemon}
        />

        {selectedPokemon && (
          <PokemonDetail
            pokemon={selectedPokemon}
            isOpen={!!selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
            isFavorite={favorites.includes(selectedPokemon.id)}
            onToggleFavorite={() => toggleFavorite(selectedPokemon.id)}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Index;