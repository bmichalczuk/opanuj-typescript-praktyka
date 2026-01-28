import { getProductCatalog } from './product-catalog.js';

export type CatalogProducts = ReturnType<typeof getProductCatalog>['products'];

export function getTotalValue() {
  const catalog = getProductCatalog();
  return catalog.products.reduce(
    (acc: number, product: CatalogProducts[number]) => acc + product.price,
    0,
  );
}
