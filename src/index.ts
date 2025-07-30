import path from "path";
import { readCSV } from "./csv";
import {
  CityEntry,
  Continent,
  ContinentWithCountryArr,
  Country,
} from "./types";
import { appendFile } from "fs";

async function main() {
  const CSV_PATH = path.join(process.cwd(), "csv/CityCountryContinent.csv");
  const csv = await readCSV<CityEntry>(CSV_PATH);

  const continentRecord: Record<string, Continent> = {};
  const countryRecord: Record<string, Country> = {};

  const getOrCreateContinent = (name: string) => {
    if (continentRecord[name]) return continentRecord[name];

    const continent: Continent = {
      name,
      countries: {},
    };

    continentRecord[name] = continent;
    return continent;
  };

  const getOrCreateCountry = (name: string) => {
    if (countryRecord[name]) return countryRecord[name];

    const country: Country = {
      name,
      cities: [],
    };

    countryRecord[name] = country;

    return country;
  };

  for (const city of csv) {
    const continent = getOrCreateContinent(city.Continent);
    const country = getOrCreateCountry(city.Country);

    if (!continent.countries[city.Country]) {
      continent.countries[city.Country] = country;
    }

    country.cities.push(city);
  }

  const result = JSON.stringify(continentRecord, null, 4);
  appendFile("result.json", result, () => {});
}

main();
