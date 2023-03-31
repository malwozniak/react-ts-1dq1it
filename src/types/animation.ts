export interface Animation {
  id: number;
  name: string;
  time: number;
  moves: AnimationMoves[];
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

export interface AnimationMoves {
  name: string;
}
export interface AnimationSprites {
  animation_base: string;
}

export interface AnimationTypeItem {
  slot: number;
  type: AnimationType;
}

export interface Point {
  x: number;
  y: number;
}
