export interface NavItemProps {
  labelEN: string;
  labelJP: string;
  href: string;
  icon: React.ReactNode;
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
  description: string;
}
