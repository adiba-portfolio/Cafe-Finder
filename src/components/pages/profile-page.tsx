import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  User,
  Mail,
  MapPin,
  LogOut,
  Settings,
  Heart,
  X,
  Star,
  GraduationCap,
  Volume2,
} from "lucide-react";
import { Page } from "../navigation";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ProfilePageProps {
  userName: string;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  favorites: string[];
  onRemoveFavorite: (cafeId: string) => void;
}

export function ProfilePage({
  userName,
  onNavigate,
  onLogout,
  favorites,
  onRemoveFavorite,
}: ProfilePageProps) {
  // Mock user data
  const user = {
    name: userName,
    email: "user@example.com",
    location: "New York, NY",
    preferences: {
      distance: "5km",
      purposes: ["Study", "Coffee Chat"],
    },
  };

  // Mock favorite cafés
  const favoriteCafes = [
    {
      id: "1",
      name: "The Cozy Corner",
      image: "https://images.unsplash.com/photo-1739723745132-97df9db49db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTI4NDM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      distance: "0.3 mi",
      studyFriendly: 5,
      noiseLevel: "Quiet",
      dietaryOptions: ["Halal", "Vegetarian"],
    },
    {
      id: "3",
      name: "Workspace Café",
      image: "https://images.unsplash.com/photo-1624279885560-e51bb6229243?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MTMzNjA4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      distance: "0.7 mi",
      studyFriendly: 5,
      noiseLevel: "Quiet",
      dietaryOptions: ["Kosher"],
    },
    {
      id: "5",
      name: "Artisan Coffee Co.",
      image: "https://images.unsplash.com/photo-1729825127983-1b38d39ff13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2FmZXxlbnwxfHx8fDE3NjEzMzYwOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      distance: "1.2 mi",
      studyFriendly: 5,
      noiseLevel: "Quiet",
      dietaryOptions: ["Vegetarian"],
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="mb-8">My Profile</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="w-24 h-24 mb-4 bg-primary">
                    <AvatarFallback className="text-2xl text-primary-foreground">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="mb-1">{user.name}</h2>
                  <p className="text-muted-foreground">Coffee Enthusiast</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{user.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full gap-2 justify-start"
                  >
                    <Settings className="w-4 h-4" />
                    Edit Preferences
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2 justify-start text-destructive hover:text-destructive"
                    onClick={onLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preferences Card */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="mb-4">My Preferences</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Search Distance</p>
                    <Badge variant="secondary">{user.preferences.distance}</Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Purposes</p>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences.purposes.map((purpose) => (
                        <Badge key={purpose} variant="secondary">
                          {purpose}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Favorites Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary" />
                <h2>Favorite Cafés</h2>
              </div>
              <Badge variant="secondary" className="text-sm">
                {favoriteCafes.length} saved
              </Badge>
            </div>

            {favoriteCafes.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start exploring and save your favorite cafés
                  </p>
                  <Button onClick={() => onNavigate("results")}>
                    Browse Cafés
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {favoriteCafes.map((cafe) => (
                  <Card
                    key={cafe.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => onNavigate("details", cafe.id)}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <ImageWithFallback
                        src={cafe.image}
                        alt={cafe.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFavorite(cafe.id);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-card/90 hover:bg-card rounded-full flex items-center justify-center shadow-md transition-colors"
                      >
                        <X className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-base">{cafe.name}</h3>
                        <span className="text-sm text-muted-foreground whitespace-nowrap ml-2">
                          {cafe.distance}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-3 flex-wrap text-sm">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4 text-primary" />
                          {[...Array(cafe.studyFriendly)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-primary text-primary"
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Volume2 className="w-4 h-4" />
                          <span>{cafe.noiseLevel}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl text-primary mb-1">{favoriteCafes.length}</p>
                  <p className="text-sm text-muted-foreground">Favorites</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl text-primary mb-1">24</p>
                  <p className="text-sm text-muted-foreground">Visits</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl text-primary mb-1">8</p>
                  <p className="text-sm text-muted-foreground">Reviews</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
