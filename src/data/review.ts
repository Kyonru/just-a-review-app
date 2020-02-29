import { ReviewType } from 'src/@types/index';
import { capitalize } from 'src/utils/strings';

export const ReviewTypesAsOptions = Object.keys(ReviewType).map(type => ({
  label: capitalize(type),
  value: type,
}));
