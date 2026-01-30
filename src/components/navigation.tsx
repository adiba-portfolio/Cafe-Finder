import { Home, Heart, User, Coffee } from "lucide-react";
import { Button } from "./ui/button";

export type Page = "landing" | "login" | "home" | "results" | "details" | "profile";

interface NavigationProps {
  currentPage: Page;
  isLoggedIn: boolean;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, isLoggedIn, onNavigate }: NavigationProps) {
  if (!isLoggedIn) return null;

  const navItems = [
    { id: "home" as Page, label: "Home", icon: Home },
    { id: "results" as Page, label: "Cafés", icon: Coffee },
    { id: "profile" as Page, label: "Favorites", icon: Heart },
    { id: "profile" as Page, label: "Profile", icon: User },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Coffee className="w-8 h-8 text-primary" />
            <span className="text-xl text-primary">CaféMatch</span>
          </button>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate(item.id)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
