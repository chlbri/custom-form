import { resolve } from './helpers';

export const FILES = {
  csv: {
    countries_cities_districts: resolve(
      'src/globals/fixtures/csv/countries_cities_districts.csv',
    ),
  },
} as const;
