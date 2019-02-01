import { EyeEvent, EventType } from "./eye-event";

export interface CustomProps {
  category: string;
  action: string;
  label?: string;
  property?: string;
  value?: number;
}

export type CustomEvent = CustomProps & EyeEvent;

export const createCustomEvent = ({
  category,
  action,
  label,
  property,
  value
}: CustomProps): CustomEvent => ({
  type: EventType.Custom,
  category,
  action,
  label,
  property,
  value
});
