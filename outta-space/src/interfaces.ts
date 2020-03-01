export interface CatBreeds {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
  life_span: string;
  wikipedia_url: string;
  country_code: string;
  weight: {
    metric: string;
  };
}
