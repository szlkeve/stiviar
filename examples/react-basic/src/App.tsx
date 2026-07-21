import { UserCard } from "./components/UserCard.tsx";
import { MoviesCard } from "./components/MoviesCard.tsx";
import { Settings } from "./components/Settings.tsx";

export function App() {
  return (
    <div>
      <UserCard />
      <Settings />
      <MoviesCard />
    </div>
  );
}
