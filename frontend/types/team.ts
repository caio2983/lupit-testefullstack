export interface Team {
  id: number;
  name: string;
  image: string;
}

export interface TeamWithPlayerCount {
  id: number;
  name: string;
  numberOfPlayers?: number;
  image: string;
}
