export type PlanetCategory =
  | "AI Projects"
  | "Cybersecurity"
  | "Music Technology"
  | "Data Visualization"
  | "Experimental Projects"
  | "Contact / Resume";

export interface PlanetConfig {
  id: string;
  title: PlanetCategory;
  subtitle: string;
  description: string;
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  color: string;
  accent: string;
  atmosphere: string;
}
