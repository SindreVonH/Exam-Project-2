// src/types/Venue.ts
export type Venue = {
  id: string;
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  location: {
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
    continent?: string;
    lat?: number;
    lng?: number;
  };
  owner?: {
    name: string;
    email: string;
    bio?: string;
    avatar?: { url: string; alt: string };
    banner?: { url: string; alt: string };
  };
  bookings?: {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    customer: {
      name: string;
      email: string;
      bio?: string;
      avatar?: { url: string; alt: string };
      banner?: { url: string; alt: string };
    };
  }[];
};

export type CreateVenueData = {
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  media: string[];
  meta?: {
    wifi?: boolean;
    parking?: boolean;
    breakfast?: boolean;
    pets?: boolean;
  };
  location?: {
    address?: string;
    city?: string;
    country?: string;
    zip?: string;
    continent?: string;
    lat?: number;
    lng?: number;
  };
};
