// Shared mock data for the Widget Lab variants (based on the Tente Spider configurator).
export const SIZES = [
  { name: '3x3m', sub: '300x300(H)x300cm', price: 1180 },
  { name: '4x4m', sub: '400x400(H)x400cm', price: 1490, popular: true },
  { name: '5x5m', sub: '500x500(H)x500cm', price: 1790 },
];

export const OPTIONS = [
  { name: 'Paroi simple', price: 170 },
  { name: 'Paroi avec porte (zipp central)', price: 190 },
  { name: 'Paroi avec petite fenêtre', price: 180 },
  { name: 'Paroi grande fenêtre', price: 180 },
  { name: 'Paroi double (impression recto - verso doublée)', price: 290 },
];

export const INCLUDED = [
  'Impression de la partie haute de la tente',
  'Structure portante haute pression',
  'Modélisation 3D gratuite',
  'Sac de transport sur roulettes',
  '5 ans de garantie',
  'Envoi gratuit',
];

export const PRODUCT_IMAGE = 'images/03_330206aa0_ChatGPTImage17janv202613_32_29.png';
export const PRODUCT_NAME = 'Tente Spider';
export const EXAMPLE_TOTAL = 1490;
export const fmt = (n) => '€ ' + n.toLocaleString('fr-FR');
