import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Star,
  Plug,
  Wifi,
  Volume2,
  Armchair,
  Heart,
  Share2,
  MapPin,
  Clock,
  GraduationCap,
  UtensilsCrossed,
  Navigation,
  ExternalLink,
} from "lucide-react";
import { Page } from "../navigation";

interface CafeDetailsPageProps {
  cafeId: string;
  userLocation: string;
  onNavigate: (page: Page) => void;
  onAddToFavorites: (cafeId: string) => void;
}

export function CafeDetailsPage({
  cafeId,
  userLocation,
  onNavigate,
  onAddToFavorites,
}: CafeDetailsPageProps) {
  // Mock data - in real app, fetch based on cafeId
  const cafe = {
    id: cafeId,
    name: "The Cozy Corner",
    location: "123 Coffee Street, New York, NY 10001",
    distance: "0.3 mi",
    image: "https://images.unsplash.com/photo-1686757569201-21c37c23eb63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwYmFubmVyJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMzM2MzI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviewCount: 156,
    hours: "Mon-Fri: 7am-9pm, Sat-Sun: 8am-10pm",
    outlets: true,
    wifi: "Free & Fast",
    noiseLevel: "Quiet",
    seating: "Booth & Regular",
    studyFriendliness: 90,
    food: true,
    dietaryOptions: ["Halal Friendly", "Vegetarian Options", "Vegan Options"],
    description:
      "A warm and inviting neighborhood café perfect for studying, working, or catching up with friends. Known for our specialty coffee and comfortable atmosphere.",
    reviews: [
      {
        id: "1",
        name: "Sarah Johnson",
        rating: 5,
        comment: "Perfect spot for studying! Quiet atmosphere and great coffee.",
        timestamp: "2 days ago",
      },
      {
        id: "2",
        name: "Mike Chen",
        rating: 4,
        comment: "Love the cozy vibes. Wifi is reliable and staff is friendly.",
        timestamp: "1 week ago",
      },
      {
        id: "3",
        name: "Emma Davis",
        rating: 5,
        comment: "My go-to café for morning work sessions. Highly recommend!",
        timestamp: "2 weeks ago",
      },
    ],
  };

  const handleGetDirections = () => {
    const destination = encodeURIComponent(cafe.location);
    const origin = encodeURIComponent(userLocation || "");
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`,
      "_blank"
    );
  };

  const handleViewOnMap = () => {
    const query = encodeURIComponent(cafe.location);
    window.open(`https://www.google.com/maps/search/${query}`, "_blank");
  };

  const handleViewGoogleReviews = () => {
    const query = encodeURIComponent(`${cafe.name} ${cafe.location}`);
    window.open(`https://www.google.com/maps/search/${query}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Banner Image */}
      <div className="relative h-80 w-full overflow-hidden">
        <img
          src={cafe.image}
          alt={cafe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-0 right-0 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-white mb-2">{cafe.name}</h1>
            <div className="flex items-center gap-4 text-white/90 flex-wrap">
              <div className="flex items-center gap-1">
                <MapPin className="w-5 h-5" />
                <span>{cafe.location}</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(cafe.rating)
                        ? "fill-[#F59E0B] text-[#F59E0B]"
                        : "fill-none text-white/50"
                    }`}
                  />
                ))}
                <span className="ml-1">
                  {cafe.rating} ({cafe.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-3">About</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {cafe.description}
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4">Amenities & Info</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Plug className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Outlets</p>
                      <p>{cafe.outlets ? "Available" : "Not Available"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Wifi className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">WiFi</p>
                      <p>{cafe.wifi}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Noise Level</p>
                      <p>{cafe.noiseLevel}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Armchair className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Seating</p>
                      <p>{cafe.seating}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <UtensilsCrossed className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Food</p>
                      <p>{cafe.food ? "Available" : "Not Available"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hours</p>
                      <p className="text-sm">{cafe.hours}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Study Friendliness */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  <h2>Study-Friendliness</h2>
                </div>
                <Progress value={cafe.studyFriendliness} className="h-3 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {cafe.studyFriendliness}% of users recommend this café for studying
                </p>
              </CardContent>
            </Card>

            {/* Location - Simple Address with Map Link */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2>Location</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleViewOnMap}
                      className="gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      View on Map
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleGetDirections}
                      className="gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </Button>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="mb-1">{cafe.location}</p>
                    <p className="text-sm text-muted-foreground">
                      {cafe.distance} from your location
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2>Recent Reviews</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleViewGoogleReviews}
                    className="gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Google
                  </Button>
                </div>
                <div className="space-y-4">
                  {cafe.reviews.map((review) => (
                    <div key={review.id} className="pb-4 border-b last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p>{review.name}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < review.rating
                                    ? "fill-[#F59E0B] text-[#F59E0B]"
                                    : "fill-none text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {review.timestamp}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
                <Button
                  variant="link"
                  className="mt-4 p-0"
                  onClick={handleViewGoogleReviews}
                >
                  See all {cafe.reviewCount} reviews on Google →
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <Card>
              <CardContent className="p-6 space-y-3">
                <Button
                  className="w-full gap-2"
                  size="lg"
                  onClick={() => onAddToFavorites(cafe.id)}
                >
                  <Heart className="w-5 h-5" />
                  Add to Favorites
                </Button>
                <Button variant="outline" className="w-full gap-2" size="lg">
                  <Share2 className="w-5 h-5" />
                  Share Café
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  size="lg"
                  onClick={handleGetDirections}
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            {/* Dietary Options */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3">Dietary Options</h3>
                <div className="flex flex-wrap gap-2">
                  {cafe.dietaryOptions.map((option) => (
                    <Badge key={option} variant="secondary" className="text-sm">
                      {option}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3">Quick Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance</span>
                    <span>{cafe.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span>⭐ {cafe.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reviews</span>
                    <span>{cafe.reviewCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Button variant="outline" onClick={() => onNavigate("results")}>
            ← Back to Results
          </Button>
        </div>
      </div>
    </div>
  );
}