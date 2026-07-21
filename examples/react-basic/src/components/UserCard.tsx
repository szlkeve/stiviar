import { useEffect, useState } from "react";

export function UserCard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/api/user")
      .then((user) => user.json())
      .then((user) => setUser(user))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);

  return <p>{JSON.stringify({ loading, error, user })}</p>;
}
