export interface EyeEvent {
  type: EventType;
}

export enum EventType {
  Custom = "CustomEvent",
  Error = "ErrorEvent",
  PageView = "PageViewEvent",
  Transaction = "TransactionEvent"
}
