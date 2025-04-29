import React, { useEffect, useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data))
      .catch(() => setError("Fehler beim Abrufen der Daten."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Lade Daten...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Länderinformationen</h1>
      <input
        type="text"
        placeholder="Suche nach einem Land..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <ul>
        {countries
          .filter((country) =>
            country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((country) => (
            <li key={country.cca3}>
              <strong>{country.name.common}</strong> - Hauptstadt:{" "}
              {country.capital?.[0] || "Keine Hauptstadt"}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;