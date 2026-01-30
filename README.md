# ☕ Cafe Finder
## Overview
Cafe Finder is a web application that helps users discover cafes based on what matters most to them—such as Wi-Fi quality, power outlet access, noise level, seating comfort, and overall rating. It’s designed for students and remote workers who want a reliable place to study or work.

This project includes a detailed cafe page experience with interactive UI elements such as ratings, amenities, distance/location details, and favorites.

## Key Features
- Browse cafes and view detailed information
- Amenities-based experience (Wi-Fi, outlets, seating, noise level, etc.)
- Ratings and tags for quick comparison
- Add cafes to favorites
- Location and navigation support (distance/address + external directions link)
- Clean, component-based UI with reusable design elements

## Tech Stack
- **Frontend:** React + TypeScript
- **UI Components:** Custom components (Card, Button, Badge, Progress)
- **Icons:** lucide-react
- **Styling:** (Add Tailwind / CSS / whatever you’re using)

## Example UI Components
Cafe details view includes:
- **Rating display** (stars)
- **Amenity indicators** (Wi-Fi, outlets, seating, noise)
- **Progress-style scoring** for quick visual comparison
- **Actions:** favorite, share, navigate, external link

## Project Structure (example)
```text
src/
  components/
    CafeDetailsPage.tsx
    ui/
      card.tsx
      button.tsx
      badge.tsx
      progress.tsx
  navigation/
    Page.ts

