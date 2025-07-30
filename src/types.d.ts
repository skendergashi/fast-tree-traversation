export type Continent = {
  name: string;
  countries: Record<string, Country>;
};

export type ContinentWithCountryArr = Omit<Continent, "countries"> & {
  countries: Country[];
};

export type Country = {
  name: string;
  cities: CityEntry[];
};

export type CityEntry = {
  City: string;
  Country: string;
  Continent: string;
  Latitude: number;
  Longitude: number;
};
