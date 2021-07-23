export interface WindowSize {
  width: number;
  height: number;
}

export interface TokenDecode {
  authorities: string[];
  client_id: string;
  credentialId: number;
  exp: number;
  userId: number;
}