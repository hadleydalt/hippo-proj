import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import {
  HomeIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  Cog6ToothIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Hippo Harvest Front Case Study</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-black text-white p-6 flex flex-col">
        <div>
          <h1 className="text-xl font-bold mb-8">Weather Manager</h1>
          <nav className="space-y-4">
            <Link to="/" className="block hover:text-gray-300 flex items-center gap-3">
              <HomeIcon className="w-5 h-5" />
              Home
            </Link>
            <Link to="/suggestions" className="block hover:text-gray-300 flex items-center gap-3">
              <LightBulbIcon className="w-5 h-5" />
              Suggestions
            </Link>
            <Link to="/messages" className="block hover:text-gray-300 flex items-center gap-3">
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              Messages
            </Link>
            <Link to="/alerts" className="block hover:text-gray-300 flex items-center gap-3">
              <BellIcon className="w-5 h-5" />
              Alerts
            </Link>
            <Link to="/settings" className="block hover:text-gray-300 flex items-center gap-3">
              <Cog6ToothIcon className="w-5 h-5" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="mt-auto pt-6">
          <Link to="/add" className="block hover:text-gray-300 font-bold flex items-center gap-3">
            <PlusCircleIcon className="w-5 h-5" />
            Add New Facility
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 min-h-screen overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
