import React, { useEffect, useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        setLoading(false);
      } catch (err) {
        setError("Fehler beim Abrufen der Daten.");
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
      />
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.cca3}>
            <strong>{country.name.common}</strong> - Hauptstadt:{" "}
            {country.capital ? country.capital[0] : "Keine Hauptstadt"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;