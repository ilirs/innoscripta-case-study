import { Category } from 'utils/categories';
import { Source } from './Article';

export interface Params {
  q?: string;
  category?: Category;
  source?: Source;
  author?: string;
  from?: Date | null;
  to?: Date | null;
}
