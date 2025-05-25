import type { Venue } from "./Venue";

export type Profile = {
  name: string;
  email: string;
  bio?: string;
  avatar?: {
    url: string;
    alt: string;
  };
  banner?: {
    url: string;
    alt: string;
  };
  venueManager: boolean;

  venues?: Venue[];

  bookings?: {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    venue: Venue;
  }[];

  _count?: {
    venues: number;
    bookings: number;
  };
};
