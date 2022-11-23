export interface Animation {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: AnimationSprites;
  species: AnimationSpecies;
  types: AnimationTypeItem[];
}

export interface AnimationType {
  name: string;
  url: string;
}

export interface AnimationSpecies {
  name: string;
  url: string;
}

export interface AnimationSprites {
  front_default: string;
}

export interface AnimationTypeItem {
  slot: number;
  type: AnimationType;
}
