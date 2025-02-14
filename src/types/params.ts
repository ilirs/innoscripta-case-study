import { Source } from './Article';

export interface Params {
  q?: string;
  category?: string;
  source?: Source;
  author?: string;
  date?: string;
}
