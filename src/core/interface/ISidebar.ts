import { ReactNode } from "react";

export interface ISidebar {
  children: ReactNode;
  width?: number;
  bgColor?: string;
  flexDir?: string;
}
