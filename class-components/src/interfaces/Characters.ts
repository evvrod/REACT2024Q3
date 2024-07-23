export interface IApiCharacters {
  count: number;
  next: string | null;
  previous: string | null;
  results: ICharacter[];
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export interface ICharacter {
  url: string;
  name: string;
  birth_year: string;
  gender: Gender;
  height: number;
  hair_color: string;
  eye_color: string;
  skin_color: string;
  homeworld: string;
  vehicles: string[];
  starships: string[];
}

export interface ICharacterWithId extends ICharacter {
  id: number;
}

export interface ICharacterDetails {
  character: ICharacter;
  homeworld: IHomeworld;
  vehicles: IVehicle[];
  starships: IStarship[];
}

export interface IHomeworld {
  url: string;
  name: string;
}

export interface IVehicle {
  url: string;
  name: string;
}

export interface IStarship {
  url: string;
  name: string;
}
