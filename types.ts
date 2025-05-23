
import React from 'react';

export interface Service {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  image?: string; // Optional illustration for service page
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface LocationSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export interface RouteDetails {
  distance: number; // in meters
  duration: number; // in seconds
  polyline: [number, number][]; // array of [lat, lon]
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  author: string;
}

export interface NavItem {
  label: string;
  path: string;
}
