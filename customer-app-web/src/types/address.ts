import type { Coordinates } from '../components/LocationPicker';

export interface Address {
  label: 'Home' | 'Work' | 'Other';
  area: string;
  street: string;
  apartment: string;
  instructions: string;
  coordinates: Coordinates | null;
}