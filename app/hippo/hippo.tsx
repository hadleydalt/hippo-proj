import { useEffect, useState } from "react";
import { type Place } from "./../types/places";
import { type CurrentWeather } from "./../types/weather";

const places: Array<Place> = [
    {
        city: "Pescadero, CA",
        lat: 37.2552,
        lon: -122.3839,
        weather: null,
    },
    {
        city: "Portland, ME",
        lat: 43.6591,
        lon: -70.2568,
        weather: null,
    },
    {
        city: "Savannah, GA",
        lat: 32.0809,
        lon: -81.0912,
        weather: null,
    },
    {
        city: "Santa Fe, NM",
        lat: 35.6870,
        lon: -105.9378,
        weather: null,
    },
    {
        city: "Bozeman, MT",
        lat: 45.6770,
        lon: -111.0429,
        weather: null,
    },
    {
        city: "Burlington, VT",
        lat: 44.4759,
        lon: -73.2121,
        weather: null,
    },
    {
        city: "Sedona, AZ",
        lat: 34.8697,
        lon: -111.7610,
        weather: null,
    },
    {
        city: "Charleston, SC",
        lat: 32.7765,
        lon: -79.9311,
        weather: null,
    },
    {
        city: "Asheville, NC",
        lat: 35.5951,
        lon: -82.5515,
        weather: null,
    },
    {
        city: "Moab, UT",
        lat: 38.5733,
        lon: -109.5498,
        weather: null,
    },
    {
        city: "Key West, FL",
        lat: 24.5551,
        lon: -81.7800,
        weather: null,
    },
    {
        city: "Juneau, AK",
        lat: 58.3019,
        lon: -134.4197,
        weather: null,
    },
    {
        city: "Taos, NM",
        lat: 36.4072,
        lon: -105.5734,
        weather: null,
    },
    {
        city: "Bar Harbor, ME",
        lat: 44.3876,
        lon: -68.2039,
        weather: null,
    },
    {
        city: "Telluride, CO",
        lat: 37.9375,
        lon: -107.8123,
        weather: null,
    },
    {
        city: "Carmel, CA",
        lat: 36.5552,
        lon: -121.9233,
        weather: null,
    },
    {
        city: "Jackson, WY",
        lat: 43.4799,
        lon: -110.7624,
        weather: null,
    },
    {
        city: "Kauai, HI",
        lat: 22.0964,
        lon: -159.5261,
        weather: null,
    },
    {
        city: "Nantucket, MA",
        lat: 41.2835,
        lon: -70.0995,
        weather: null,
    },
    {
        city: "Lake Tahoe, NV",
        lat: 39.0968,
        lon: -120.0324,
        weather: null,
    },
];

export function Hippo() {
    const [currentPlaces, setCurrentPlaces] = useState<Array<Place>>(places);

    useEffect(() => {
        const fetchWeather = async (place: Place): Promise<CurrentWeather> => {
            const apiKey = import.meta.env.VITE_REACT_APP_OPENWEATHERMAP_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${place.lat}&lon=${place.lon}&units=metric&appid=${apiKey}`;
            console.log(url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        };

        const fetchAllWeather = async () => {
            const updatedPlaces = await Promise.all(
                currentPlaces.map(async (place) => {
                    const weather = await fetchWeather(place);
                    return { ...place, weather };
                })
            );
            setCurrentPlaces(updatedPlaces);
        };

        fetchAllWeather();
    }, []);

    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <header className="flex flex-col items-center gap-9">
                    <div className="w-[500px] max-w-[100vw] p-4">
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/635abb7ce3040e40049edb8f/2f8cd1c2-69e2-47d9-961d-7f8df305f83e/Hippo-Logo.png?format=1500w"
                            alt="Hippo Frontend Case Study"
                            className="block w-full dark:hidden"
                        />
                    </div>
                </header>
                <div className="max-w-[300px] w-full space-y-6 px-4">
                    <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
                        <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
                            An Example API Call
                        </p>
                        <ul>
                            {currentPlaces.map((place) => (
                                <li key={place.city} className="flex items-center justify-between">
                                    <span>{place.city}</span>
                                    <span>{place.weather ? `${place.weather.main.temp} °C` : "Loading..."}</span>
                                </li>
                            ))}
                        </ul>
                        <a
                            href="https://openweathermap.org/current"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            OpenWeatherMap API Docs
                        </a>

                    </nav>
                </div>
            </div>
        </main>
    );
}