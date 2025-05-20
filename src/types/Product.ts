export interface RecommendedUseGroup {
  title?: string;
  text?: string;
  specs: string[];
  columns: number;
}

export interface Product {
  slug: string;
  title: string;
  modelPath: string;
  mainImage: string;
  description: string;
  collageImages: string[];
  recommendedUses: {
    title: string;
    text: string;
    groups?: RecommendedUseGroup[];
    specs?: string[];
    columns?: number;
  };
  characteristics?: {
    specs: string[];
    columns: number;
  };
  additionalText: string;
  advantages: string[]; 
  whyChoose: {
    title: string;
    text: string;
  };
}
export type Products = Record<string, Product>;
