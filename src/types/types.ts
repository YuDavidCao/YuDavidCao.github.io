export interface Blog {
  id: number;
  route: string;
  title: string;
  summary: string;
  tags: string[];
  image: string;
  readMoreUrl: string;
  date: string;
}