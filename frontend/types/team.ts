export interface Team {
  id: number;
  name: string;
}

export interface TeamWithPlayerCount {
  id: number;
  name: string;
  numberOfPlayers?: number;
}
