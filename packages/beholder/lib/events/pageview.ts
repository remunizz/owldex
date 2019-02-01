import { EyeEvent, EventType } from "./eye-event";

export interface PageViewProps {
  title: string;
  path: string;
  location: string;
}

export type PageViewEvent = PageViewProps & EyeEvent;

export const createPageViewEvent = ({
  title,
  path,
  location
}: PageViewProps): PageViewEvent => ({
  type: EventType.PageView,
  title,
  path,
  location
});
