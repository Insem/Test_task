export interface TBalance {
  balance: number;
  userId: string;
}
export interface TBalanceEvent {
  balance: TBalance;
  operation: "subtract" | "add" | "status";
}
