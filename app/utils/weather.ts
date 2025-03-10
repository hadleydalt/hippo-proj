import type { CurrentWeather } from '../types/weather';
import type { Place } from '../types/places';

export async function fetchWeather(place: Place): Promise<CurrentWeather> {
    const apiKey = import.meta.env.VITE_REACT_APP_OPENWEATHERMAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${place.lat}&lon=${place.lon}&units=metric&appid=${apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export async function fetchAllWeather(places: Place[]): Promise<Place[]> {
    await Promise.all(
        places.map(async (place) => {
            const weather = await fetchWeather(place);
            place.weather = weather;
        })
    );
    return places;
} 