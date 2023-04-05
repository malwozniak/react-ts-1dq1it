export interface Animation {
  id: number;
  name: string;
  time: number;
  moves: AnimationMoves[];
  sprites: AnimationSprites;
  types: AnimationTypeItem[];
}

export interface AnimationType {
  name: string;
  url: string;
}

export interface AnimationMoves {
  name: string;
  distance: number;
  accelaration: number;
  speed: number;
  points: Point[];
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

export interface User {
  id: number;
  age: number;
  gender: Gender;
}

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
