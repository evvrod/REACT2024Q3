export interface IApiCharacters {
  count: number;
  next: string | null;
  previous: string | null;
  results: ICharacter[];
}

export interface ICharacter {
  url: string;
  name: string;
  birth_year: string;
  gender: 'Male' | 'Female';
  height: number;
  hair_color: string;
  eye_color: string;
  skin_color: string;
}

export interface ICharacterWithId extends ICharacter {
  id: number;
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
