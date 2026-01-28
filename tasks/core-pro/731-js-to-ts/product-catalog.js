import { readFileSync } from 'fs';
import ts from 'typescript';

export function getProductCatalog() {
  /** @returns {Array<{ id: number; name: string; price: number }>}
   */
  return JSON.parse(readFileSync(new URL('./catalog.json', import.meta.url), 'utf8'));
}
