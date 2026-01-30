import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { GraduationCap, Coffee, UtensilsCrossed, Users } from "lucide-react";
import { Page } from "../navigation";

interface HomePageProps {
  userName: string;
  userLocation: string;
  onNavigate: (page: Page) => void;
}

export function HomePage({ userName, userLocation, onNavigate }: HomePageProps) {
  const [distance, setDistance] = useState("5km");
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);

  const purposes = [
    {
      id: "study",
      label: "Study",
      icon: GraduationCap,
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    {
      id: "coffee",
      label: "Coffee Chat",
      icon: Coffee,
      color: "bg-amber-100 text-amber-700 border-amber-200",
    },
    {
      id: "eat",
      label: "Eat",
      icon: UtensilsCrossed,
      color: "bg-green-100 text-green-700 border-green-200",
    },
    {
      id: "hangout",
      label: "Hangout",
      icon: Users,
      color: "bg-purple-100 text-purple-700 border-purple-200",
    },
  ];

  const handleFindCafes = () => {
    if (!selectedPurpose) {
      alert("Please select a purpose!");
      return;
    }
    onNavigate("results");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-2">
            Welcome, {userName}
            <span className="ml-2">☕</span>
          </h1>
          <p className="text-muted-foreground text-xl">
            Let's find your perfect café in {userLocation || "your area"}
          </p>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg border-2">
          <CardContent className="p-8">
            <h2 className="mb-8 text-center">Find Cafés Near You</h2>

            {/* Distance Range Selector */}
            <div className="mb-8">
              <label className="block mb-3">
                How far are you willing to go?
              </label>
              <Select value={distance} onValueChange={setDistance}>
                <SelectTrigger className="bg-input-background h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1km">Within 1 km</SelectItem>
                  <SelectItem value="5km">Within 5 km</SelectItem>
                  <SelectItem value="10km">Within 10 km</SelectItem>
                  <SelectItem value="20km">Within 20 km</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Purpose Selector */}
            <div className="mb-8">
              <label className="block mb-4">What's your purpose today?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {purposes.map((purpose) => {
                  const Icon = purpose.icon;
                  const isSelected = selectedPurpose === purpose.id;
                  return (
                    <button
                      key={purpose.id}
                      onClick={() => setSelectedPurpose(purpose.id)}
                      className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-lg"
                          : "bg-card hover:bg-secondary border-border"
                      }`}
                    >
                      <Icon className="w-10 h-10 mx-auto mb-3" />
                      <p className="text-center">{purpose.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Find Button */}
            <Button
              onClick={handleFindCafes}
              size="lg"
              className="w-full h-14 text-lg"
            >
              Find Cafés
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <p className="text-3xl mb-1 text-primary">150+</p>
              <p className="text-muted-foreground">Cafés Listed</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <p className="text-3xl mb-1 text-primary">10k+</p>
              <p className="text-muted-foreground">Happy Users</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <p className="text-3xl mb-1 text-primary">4.8★</p>
              <p className="text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}