import { validateCatalog } from './catalog-validation';
import { catalogDomains } from './catalog-input';

const errors = validateCatalog(catalogDomains);
if (errors.length > 0) {
  console.error('Catalog validation failed');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log('Catalog validation passed');
