export interface NavItemProps {
  labelEN: string;
  labelJP: string;
  href: string;
  icon: React.ReactNode;
}

export interface TimelineHeader {
  title: string;
  content: string;
}

export interface TimelineEntry {
  year: number;
  title: string;
  content: React.ReactNode;
  emoji: string;
}

export interface WorksProps {
  id: number;
  title: string;
  image: string;
  year: number;
  type: string;
  category: string;
  client?: string;
  description: string;
  link?: string;
  tools: string[];
  detail?: string[];
}

export interface TreeNode {
  name: string;
  children?: TreeNode[];
}