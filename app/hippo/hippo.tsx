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
                <div className="w-[800px] max-w-[100vw] p-4 text-center">
                    <h2 className="font-bold">Thank you!</h2>
                    <br />
                    <p>We appreciate the time and effort you're investing in this process</p>
                    <br />
                    <p>We're excited to see what you build</p>
                    <br />
                    <p>Good luck!</p>

                </div>
            </div>
        </main>
    );
}