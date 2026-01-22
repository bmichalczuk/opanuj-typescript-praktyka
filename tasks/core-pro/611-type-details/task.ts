/* Zmień sposób upewnienia się, że obiekt shapes jest zgodny z typem Record<string, Shape>
  Wykorzytaj technikę, która zachowa szczegółowe informacje o obiektach przy odwoływaniu się do nich.
*/

type Rectangle = { kind: 'rectangle'; width: number; height: number };
type Circle = { kind: 'circle'; radius: number };
type Shape = Rectangle | Circle;

const shapes = {
  shape1: { kind: 'rectangle', width: 10, height: 20 },
  shape2: { kind: 'circle', radius: 15 },
} satisfies Record<string, Shape>;

console.log(shapes.shape1.width);

///////////////////////////////////////////////
type RGB = { r: number; g: number; b: number };
type Color = string | RGB;

/*const palette: Record<string, Color> = {
  primary: { r: 255, g: 0, b: 0 },
  secondary: "blue",
};

const palette = {
  primary: { r: 255, g: 0, b: 0 },
  secondary: "blue",
} satisfies Record<string, Color>;
console.log(palette.primary.r); 
console.log((palette.primary as RGB).r); 

type Settings = {
  theme: string;
  notifications: boolean;
};

const userSettings= {
  theme: "dark",
  notifications: true,
  language: "en", // Błąd: Property 'language' does not exist on type Settings
} satisfies Settings;*/
