import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdvancedFiltersProps {
  onTypeChange: (type: string) => void;
  onSortChange: (sort: string) => void;
  selectedType: string;
  selectedSort: string;
}

const pokemonTypes = [
  "all", "normal", "fire", "water", "electric", "grass", "ice", "fighting", 
  "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", 
  "dark", "steel", "fairy"
];

const sortOptions = [
  { value: "id", label: "Number (Ascending)" },
  { value: "id-desc", label: "Number (Descending)" },
  { value: "name", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "weight", label: "Weight (Low to High)" },
  { value: "weight-desc", label: "Weight (High to Low)" },
];

const AdvancedFilters = ({
  onTypeChange,
  onSortChange,
  selectedType,
  selectedSort,
}: AdvancedFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Type:</span>
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {pokemonTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Sort by:</span>
        <Select value={selectedSort} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AdvancedFilters;