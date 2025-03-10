import type { Route } from "./+types/home";
import { Hippo } from "../hippo/hippo";
import Map from "../hippo/map";
import Grid from "../hippo/search";
import { useState } from "react";
import { MapIcon, Bars3Icon } from "@heroicons/react/24/outline";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [view, setView] = useState<'map' | 'search'>('map');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-black">Facilities</h1>
        <div className="flex items-center bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setView('map')}
            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
              view === 'map'
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <MapIcon className="w-5 h-5" />
            Map
          </button>
          <button
            onClick={() => setView('search')}
            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
              view === 'search'
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Bars3Icon className="w-5 h-5" />
            Search
          </button>
        </div>
      </div>
      {view === 'map' ? <Map /> : <Grid />}
    </div>
  );
}
