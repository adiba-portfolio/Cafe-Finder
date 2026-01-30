import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Coffee, MapPin } from "lucide-react";
import { Page } from "../navigation";

interface LandingPageProps {
  onNavigate: (page: Page) => void;
  onSignUp: (name: string, location: string) => void;
}

export function LandingPage({ onNavigate, onSignUp }: LandingPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!formData.location.trim()) {
      alert("Please enter your location!");
      return;
    }
    onSignUp(formData.name, formData.location);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6CC] via-[#E8DCC8] to-[#D4A574] relative overflow-hidden">
      {/* Decorative Coffee Cup Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Section */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <Coffee className="w-16 h-16 text-primary" />
              <h1 className="text-5xl text-primary">CaféMatch</h1>
            </div>
            <h2 className="text-4xl mb-4 text-foreground">
              Find the perfect café to study, eat, or chill.
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Discover cafés tailored to your needs — whether you're looking for a
              quiet study spot, a place to grab a bite, or somewhere to catch up
              with friends.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg shadow-sm">
                <Coffee className="w-5 h-5 text-primary" />
                <span>Study-Friendly</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg shadow-sm">
                <Coffee className="w-5 h-5 text-primary" />
                <span>Dietary Filters</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg shadow-sm">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Location-Based</span>
              </div>
            </div>
          </div>

          {/* Sign-Up Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-center">Create Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-input-background"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-input-background"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="bg-input-background"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    className="bg-input-background"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    className="bg-input-background"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <Input
                      id="location"
                      type="text"
                      placeholder="New York, NY"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      required
                      className="bg-input-background pl-10"
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Sign Up
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => onNavigate("login")}
                    className="text-primary hover:underline"
                  >
                    Log in
                  </button>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}