import { type CurrentWeather } from "./weather";

export interface Place {
  id: number;
  city: string;
  lat: number;
  lon: number;
  region: string;
  weather: CurrentWeather | null;
  facilityTemperature: number;
}