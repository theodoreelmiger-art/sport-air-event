// Data for the shared <ProductConfigurator>. Prices/specs captured from the live original.
// Model: optional single-select `sizeGroup` (qty on selected) + multi-select `groups`
// (each item gets a qty stepper ONLY when selected).

export const CONFIGURATORS = {
  tente: {
    productName: 'Tente Spider',
    image: 'images/03_330206aa0_ChatGPTImage17janv202613_32_29.png',
    modalGroupLabel: 'Tailles',
    surMesureTo: '/TenteSurMesure',
    sizeGroup: {
      label: 'Taille',
      items: [
        { name: '3x3m', sub: '300x300(H)x300cm', price: 1180 },
        { name: '4x4m', sub: '400x400(H)x400cm', price: 1490, popular: true },
        { name: '5x5m', sub: '500x500(H)x500cm', price: 1790 },
      ],
    },
    groups: [
      { label: 'Parois', items: [
        { name: 'Paroi simple', price: 170 },
        { name: 'Paroi avec porte (zipp central)', price: 190 },
        { name: 'Paroi avec petite fenêtre', price: 180 },
        { name: 'Paroi grande fenêtre', price: 180 },
        { name: 'Paroi double (impression recto - verso doublée)', price: 290 },
      ] },
      { label: 'Options supplémentaires', items: [
        { name: 'Auvent', price: 280 },
        { name: 'Connexion inter-tente', price: 180 },
      ] },
      { label: 'Accessoires', items: [{ name: 'Pompe 220 volts', price: 60 }] },
    ],
    included: [
      'Impression de la partie haute de la tente', 'Structure portante haute pression',
      'Modélisation 3D gratuite', 'Sac de transport sur roulettes',
      'Sacs de lest, cordages et sardines à visser', '5 ans de garantie', 'Envoi gratuit',
    ],
  },

  arches: {
    productName: 'Arche Gonflable',
    image: 'images/02_e1e114d2c_ChatGPTImage16janv202615_18_26.png',
    modalGroupLabel: 'Tailles',
    surMesureTo: '/ArchesSurMesure',
    sizeGroup: {
      label: 'Dimensions',
      items: [
        { name: '5m', sub: '500x320(H)x60cm', price: 1490 },
        { name: '6m', sub: '600x380(H)x60cm', price: 1590, popular: true },
        { name: '7m', sub: '700x430(H)x80cm', price: 1790 },
        { name: '8m', sub: '800x480(H)x90cm', price: 1990 },
        { name: '10m', sub: '1000x580(H)x90cm', price: 2490 },
      ],
    },
    groups: [
      { label: 'Accessoires', items: [{ name: 'Pompe 220 volts', price: 60 }] },
    ],
    included: [
      'Impression haute qualité de votre logo et design', 'Modélisation 3D gratuite',
      'Ventilateur électrique professionnel fourni', 'Kit de fixation et sac de transport inclus',
      'Garantie 2 ans structure + 3 ans impression',
    ],
  },

  colonnes: {
    productName: 'Colonnes Gonflables',
    image: 'images/04_c91d5f27b_ChatGPTImage17janv202613_28_14.png',
    modalGroupLabel: 'Hauteurs',
    surMesureTo: '/ColonnesSurMesure',
    sizeGroup: {
      label: 'Hauteur',
      items: [
        { name: '2.5m', sub: '250x60(diamètre)cm', price: 590 },
        { name: '3m', sub: '300x60(diamètre)cm', price: 670, popular: true },
        { name: '4m', sub: '400x70(diamètre)cm', price: 750 },
      ],
    },
    groups: [
      { label: 'Option éclairage', items: [{ name: 'Éclairage LED RGB intégré', sub: 'Illumination programmable multicolore', price: 95 }] },
      { label: 'Accessoires', items: [{ name: 'Pompe 220 volts', price: 60 }] },
    ],
    included: [
      'Personnalisation complète avec votre logo', 'Modélisation 3D gratuite',
      'Ventilateur électrique silencieux', 'Base lestée pour stabilité maximale',
      'Sac de transport professionnel',
    ],
  },

  mobilier: {
    productName: 'Mobilier Gonflable',
    image: 'images/22_4887239cb_ChatGPTImage16janv202616_52_44.png',
    modalGroupLabel: null,
    // category = filter chip (Assises · Tables · Bars). Accessoire group is shown for all categories.
    groups: [
      { label: 'Assises', category: 'Assises', items: [
        { name: 'Pouf gonflable imprimé', price: 180 },
        { name: 'Chaise basse', price: 280 },
        { name: 'Sofa 1 place', price: 290 },
        { name: 'Sofa 2 places', price: 460 },
      ] },
      { label: 'Tables', category: 'Tables', items: [
        { name: 'Table basse', price: 370 },
        { name: 'Table haute', price: 490 },
      ] },
      { label: 'Bars', category: 'Bars', items: [{ name: 'Bar gonflable droit', price: 600 }] },
    ],
    accessories: { label: 'Accessoires', items: [{ name: 'Pompe 220 volts', price: 60 }] },
    custom: ['Impression HD', 'Matériaux premium', 'Montage rapide', 'Design 3D gratuit'],
    included: [],
  },
};
