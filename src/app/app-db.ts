import Dexie, { Table } from 'dexie';

export interface Airline {
  id?: number;
  name: string;
  iata_code: string;
  // Ajoutez d'autres propriétés de l'API ici
}

export class AppDB extends Dexie {
  airlines!: Table<Airline, number>;

  constructor() {
    super('AppDB');
    this.version(1).stores({
      airlines: '++id, name, iata_code',
    });
  }
}

export const db = new AppDB();
