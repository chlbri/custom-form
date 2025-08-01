import type { Field } from '#service';
import type { types } from '@bemedev/types';

export type CSVData = Record<string, string | number>;
export type SimpleData = types.NOmit<
  types.NotUndefined<Field['data']>,
  'merged'
>;

export type DropzoneProps = {
  data?: SimpleData;
  onDataLoaded?: (props: {
    data: CSVData[];
    headers: string[];
    name: string;
    conditions: Conditions;
  }) => void;
  onError?: (error: string) => void;
  onReset?: () => void;
  update?: (props: {
    data: CSVData[];
    headers: string[];
    name: string;
    conditions: Conditions;
  }) => void;
  class?: string;
  maxFileSize?: number; // en MB
};

export type Conditions = {
  merged: CSVDataDeep;
  warnings: string[];
};

export type ParsedCSV = {
  data: CSVData[];
  headers: string[];
  depth: number;
};

export type CSVDataDeep =
  | string
  | number
  | (string | number)[]
  | CsvDataMap;

interface CsvDataMap {
  [key: types.Keys]: CSVDataDeep;
}

export type Merged = types.SingleOrArray<string> | MergedMap;

interface MergedMap {
  [key: types.Keys]: Merged;
}
