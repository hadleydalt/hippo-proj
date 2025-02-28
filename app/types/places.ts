import { type CurrentWeather } from "./weather";

export interface Place {
  city: string;
  lat: number;
  lon: number;
  weather: CurrentWeather | null;
}