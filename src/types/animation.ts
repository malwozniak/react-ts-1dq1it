export interface Animation {
  id: number;
  name: string;
  time: number;
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
  animaton_base: string;
}

export interface AnimationTypeItem {
  slot: number;
  type: AnimationType;
}
