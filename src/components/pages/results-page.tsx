import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { CafeCard, Cafe } from "../cafe-card";
import { Moon, Star as StarIcon, Leaf, Wheat, Armchair, Sofa, Wine, Plug } from "lucide-react";
import { Page } from "../navigation";

const cafes: Cafe[] = [
  {
    id: "1",
    name: "The Cozy Corner",
    tagline: "Your neighborhood coffee haven",
    distance: "0.3 mi",
    image: "https://images.unsplash.com/photo-1739723745132-97df9db49db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTI4NDM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    outlets: true,
    food: true,
    seating: "Booths",
    noiseLevel: "Quiet",
    studyFriendly: 5,
    dietaryOptions: ["Halal", "Vegetarian"],
  },
  {
    id: "2",
    name: "Urban Brew House",
    tagline: "Modern space for work & coffee",
    distance: "0.5 mi",
    image: "https://images.unsplash.com/photo-1573840357491-06851c72e0d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc2MTMxMjQxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.5,
    outlets: true,
    food: true,
    seating: "Open Tables",
    noiseLevel: "Moderate",
    studyFriendly: 4,
    dietaryOptions: ["Vegetarian", "Gluten-Free"],
  },
  {
    id: "3",
    name: "Workspace Café",
    tagline: "Perfect for remote workers",
    distance: "0.7 mi",
    image: "https://images.unsplash.com/photo-1624279885560-e51bb6229243?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MTMzNjA4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    outlets: true,
    food: false,
    seating: "Open Tables",
    noiseLevel: "Quiet",
    studyFriendly: 5,
    dietaryOptions: ["Kosher"],
  },
  {
    id: "4",
    name: "Sunny Side Café",
    tagline: "Bright vibes and great coffee",
    distance: "0.9 mi",
    image: "https://images.unsplash.com/photo-1620260714969-60878ca7a389?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwc2VhdGluZ3xlbnwxfHx8fDE3NjEzMzYwODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.6,
    outlets: false,
    food: true,
    seating: "Couches",
    noiseLevel: "Moderate",
    studyFriendly: 3,
    dietaryOptions: ["Halal", "Gluten-Free"],
  },
  {
    id: "5",
    name: "Artisan Coffee Co.",
    tagline: "Handcrafted specialty drinks",
    distance: "1.2 mi",
    image: "https://images.unsplash.com/photo-1729825127983-1b38d39ff13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2FmZXxlbnwxfHx8fDE3NjEzMzYwOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    outlets: true,
    food: true,
    seating: "Bar Seating",
    noiseLevel: "Quiet",
    studyFriendly: 5,
    dietaryOptions: ["Vegetarian"],
  },
  {
    id: "6",
    name: "The Daily Grind",
    tagline: "Community coffee culture",
    distance: "1.4 mi",
    image: "https://images.unsplash.com/photo-1540330596464-c4b4bd5e0699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXBzdGVyJTIwY29mZmVlJTIwc2hvcHxlbnwxfHx8fDE3NjEzMzYwOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.4,
    outlets: false,
    food: true,
    seating: "Couches",
    noiseLevel: "Lively",
    studyFriendly: 2,
    dietaryOptions: ["Kosher", "Vegetarian", "Gluten-Free"],
  },
];

type DietaryFilter = "Halal" | "Kosher" | "Vegetarian" | "Gluten-Free";
type SeatingFilter = "Booths" | "Open Tables" | "Couches" | "Bar Seating";

interface ResultsPageProps {
  userLocation: string;
  onNavigate: (page: Page, cafeId?: string) => void;
}

export function ResultsPage({ userLocation, onNavigate }: ResultsPageProps) {
  const [sortBy, setSortBy] = useState("distance");
  const [dietaryFilters, setDietaryFilters] = useState<Set<DietaryFilter>>(
    new Set()
  );
  const [seatingFilters, setSeatingFilters] = useState<Set<SeatingFilter>>(
    new Set()
  );
  const [outletsOnly, setOutletsOnly] = useState(false);

  const toggleDietaryFilter = (filter: DietaryFilter) => {
    const newFilters = new Set(dietaryFilters);
    if (newFilters.has(filter)) {
      newFilters.delete(filter);
    } else {
      newFilters.add(filter);
    }
    setDietaryFilters(newFilters);
  };

  const toggleSeatingFilter = (filter: SeatingFilter) => {
    const newFilters = new Set(seatingFilters);
    if (newFilters.has(filter)) {
      newFilters.delete(filter);
    } else {
      newFilters.add(filter);
    }
    setSeatingFilters(newFilters);
  };

  const dietaryOptions = [
    { id: "Halal" as DietaryFilter, label: "Halal", icon: Moon },
    { id: "Kosher" as DietaryFilter, label: "Kosher", icon: StarIcon },
    { id: "Vegetarian" as DietaryFilter, label: "Vegetarian", icon: Leaf },
    { id: "Gluten-Free" as DietaryFilter, label: "Gluten-Free", icon: Wheat },
  ];

  const seatingOptions = [
    { id: "Booths" as SeatingFilter, label: "Booths", icon: Armchair },
    { id: "Open Tables" as SeatingFilter, label: "Open Tables", icon: Armchair },
    { id: "Couches" as SeatingFilter, label: "Couches", icon: Sofa },
    { id: "Bar Seating" as SeatingFilter, label: "Bar Seating", icon: Wine },
  ];

  // Filter cafes based on all selected filters
  const filteredCafes = cafes.filter((cafe) => {
    // Dietary filter
    if (dietaryFilters.size > 0) {
      const hasDietaryMatch = Array.from(dietaryFilters).some((filter) =>
        cafe.dietaryOptions.includes(filter)
      );
      if (!hasDietaryMatch) return false;
    }

    // Seating filter
    if (seatingFilters.size > 0) {
      const hasSeatingMatch = seatingFilters.has(cafe.seating as SeatingFilter);
      if (!hasSeatingMatch) return false;
    }

    // Outlets filter
    if (outletsOnly && !cafe.outlets) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2">Cafés near {userLocation || "you"}</h1>
          <p className="text-muted-foreground">
            Find the perfect spot for your needs
          </p>
        </div>

        {/* Main Filter Bar */}
        <div className="bg-card rounded-xl p-5 shadow-md mb-4 border border-border">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 min-w-[220px]">
              <label className="text-muted-foreground whitespace-nowrap">
                Sort by:
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-input-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="noise">Noise Level</SelectItem>
                  <SelectItem value="study">Study-Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dietary Filters */}
            <div className="flex items-center gap-2 flex-wrap flex-1">
              {dietaryOptions.map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={dietaryFilters.has(id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleDietaryFilter(id)}
                  className="gap-2 hover:scale-105 transition-transform"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Filters: Seating & Outlets */}
        <div className="bg-card rounded-xl p-5 shadow-md mb-6 border border-border">
          <div className="space-y-4">
            {/* Seating Filters */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Seating Type:
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {seatingOptions.map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    variant={seatingFilters.has(id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSeatingFilter(id)}
                    className="gap-2 hover:scale-105 transition-transform"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Outlet Filter */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Amenities:
              </label>
              <Button
                variant={outletsOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setOutletsOnly(!outletsOnly)}
                className="gap-2 hover:scale-105 transition-transform"
              >
                <Plug className="w-4 h-4" />
                Has Outlets
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Showing {filteredCafes.length} café{filteredCafes.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Café Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCafes.map((cafe) => (
            <CafeCard
              key={cafe.id}
              cafe={cafe}
              onViewDetails={() => onNavigate("details", cafe.id)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredCafes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No cafés found with the selected filters.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              {(dietaryFilters.size > 0 || seatingFilters.size > 0 || outletsOnly) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setDietaryFilters(new Set());
                    setSeatingFilters(new Set());
                    setOutletsOnly(false);
                  }}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}