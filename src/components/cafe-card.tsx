import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, Plug, UtensilsCrossed, Armchair, Volume2, GraduationCap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Cafe {
  id: string;
  name: string;
  tagline: string;
  distance: string;
  image: string;
  rating: number;
  outlets: boolean;
  food: boolean;
  seating: string;
  noiseLevel: string;
  studyFriendly: number;
  dietaryOptions: string[];
}

interface CafeCardProps {
  cafe: Cafe;
  onViewDetails?: () => void;
}

export function CafeCard({ cafe, onViewDetails }: CafeCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={cafe.image}
          alt={cafe.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="mb-1">{cafe.name}</h3>
            <p className="text-muted-foreground mb-2">{cafe.tagline}</p>
          </div>
          <div className="text-muted-foreground ml-2 whitespace-nowrap">{cafe.distance}</div>
        </div>

        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <div
            className={`flex items-center gap-1.5 ${
              cafe.outlets ? "text-foreground" : "text-muted-foreground"
            }`}
            title={cafe.outlets ? "Outlets available" : "No outlets"}
          >
            <Plug className="w-4 h-4" />
          </div>
          <div
            className={`flex items-center gap-1.5 ${
              cafe.food ? "text-foreground" : "text-muted-foreground"
            }`}
            title={cafe.food ? "Food available" : "No food"}
          >
            <UtensilsCrossed className="w-4 h-4" />
          </div>
          <div
            className="flex items-center gap-1.5 text-foreground"
            title={`Noise level: ${cafe.noiseLevel}`}
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-sm">{cafe.noiseLevel}</span>
          </div>
          <div
            className="flex items-center gap-1.5 text-foreground"
            title="Study-friendliness"
          >
            <GraduationCap className="w-4 h-4" />
            {[...Array(cafe.studyFriendly)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 fill-primary text-primary"
              />
            ))}
          </div>
        </div>

        {/* Dietary Badges */}
        {cafe.dietaryOptions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cafe.dietaryOptions.map((option) => (
              <Badge
                key={option}
                variant="secondary"
                className="text-xs"
              >
                {option}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(cafe.rating)
                    ? "fill-[#F59E0B] text-[#F59E0B]"
                    : "fill-none text-muted"
                }`}
              />
            ))}
            <span className="ml-1.5 text-muted-foreground">
              {cafe.rating.toFixed(1)}
            </span>
          </div>
          <Button
            variant="default"
            size="sm"
            className="hover:bg-primary/90"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}