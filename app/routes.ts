import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("suggestions", "routes/suggestions.tsx"),
    route("messages", "routes/messages.tsx"),
    route("alerts", "routes/alerts.tsx"),
    route("settings", "routes/settings.tsx"),
    route("add", "routes/add.tsx"),
] satisfies RouteConfig;
