import { useState } from "react";
import { Navigation, Page } from "./components/navigation";
import { LandingPage } from "./components/pages/landing-page";
import { LoginPage } from "./components/pages/login-page";
import { HomePage } from "./components/pages/home-page";
import { ResultsPage } from "./components/pages/results-page";
import { CafeDetailsPage } from "./components/pages/cafe-details-page";
import { ProfilePage } from "./components/pages/profile-page";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [selectedCafeId, setSelectedCafeId] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleNavigate = (page: Page, cafeId?: string) => {
    setCurrentPage(page);
    if (cafeId) {
      setSelectedCafeId(cafeId);
    }
  };

  const handleSignUp = (name: string, location: string) => {
    setUserName(name);
    setUserLocation(location);
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  const handleLogin = () => {
    setUserName("Alex");
    setUserLocation("New York, NY");
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setUserLocation("");
    setCurrentPage("landing");
    setFavorites([]);
  };

  const handleAddToFavorites = (cafeId: string) => {
    if (!favorites.includes(cafeId)) {
      setFavorites([...favorites, cafeId]);
      alert("Added to favorites!");
    } else {
      alert("Already in favorites!");
    }
  };

  const handleRemoveFavorite = (cafeId: string) => {
    setFavorites(favorites.filter((id) => id !== cafeId));
  };

  return (
    <div className="min-h-screen">
      <Navigation
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        onNavigate={handleNavigate}
      />

      {currentPage === "landing" && (
        <LandingPage onNavigate={handleNavigate} onSignUp={handleSignUp} />
      )}

      {currentPage === "login" && (
        <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />
      )}

      {currentPage === "home" && isLoggedIn && (
        <HomePage userName={userName} userLocation={userLocation} onNavigate={handleNavigate} />
      )}

      {currentPage === "results" && isLoggedIn && (
        <ResultsPage userLocation={userLocation} onNavigate={handleNavigate} />
      )}

      {currentPage === "details" && isLoggedIn && (
        <CafeDetailsPage
          cafeId={selectedCafeId}
          userLocation={userLocation}
          onNavigate={handleNavigate}
          onAddToFavorites={handleAddToFavorites}
        />
      )}

      {currentPage === "profile" && isLoggedIn && (
        <ProfilePage
          userName={userName}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          favorites={favorites}
          onRemoveFavorite={handleRemoveFavorite}
        />
      )}
    </div>
  );
}