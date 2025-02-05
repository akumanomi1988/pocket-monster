import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/30 transition-all duration-200"
      />
    </div>
  );
};

export default SearchBar;