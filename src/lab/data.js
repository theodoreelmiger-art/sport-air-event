// Shared mock data for the Widget Lab variants.
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

// ── Extended data for the full A-Z widget set ──
export const PRODUCTS = [
  { n: '01', to: '/ArchesGonflables', img: 'images/02_e1e114d2c_ChatGPTImage16janv202615_18_26.png', alt: 'Arches Gonflables', kicker: 'Impact visuel immédiat', title: 'Arches Gonflables', desc: 'De 5m à 10m de large, impression totale incluse. Idéales pour départs de course et événements sportifs.', specs: ['5m à 10m de large', 'Impression totale', 'Installation 15 min'], price: 'Dès 1 490€' },
  { n: '02', to: '/Tente', img: 'images/03_330206aa0_ChatGPTImage17janv202613_32_29.png', alt: 'Tente Spider', kicker: 'Notre produit phare', title: 'Tente Spider', desc: 'Architecture moderne avec pieds courbes. De 3×3m à 5×5m, montage en 2 minutes. Design 100% personnalisable.', specs: ['3×3m à 5×5m', 'Montage 2 min', 'Usage indoor/outdoor'], price: 'Dès 1 180€', popular: true },
  { n: '03', to: '/ColonnesGonflables', img: 'images/04_c91d5f27b_ChatGPTImage17janv202613_28_14.png', alt: 'Colonnes Gonflables', kicker: 'Balisage élégant', title: 'Colonnes Gonflables', desc: 'De 2.5m à 4m de hauteur. Option éclairage LED RGB intégré. Personnalisation 360° de votre marque.', specs: ['2.5m à 4m', 'LED RGB optionnel', 'Installation simple'], price: 'Dès 590€' },
];

export const FEATURES = [
  { icon: 'Clock', title: 'Installation 2 min', desc: 'Montage ultra-rapide par une seule personne' },
  { icon: 'Shield', title: 'Garantie 5 ans', desc: 'Structure + impression garanties 5 ans' },
  { icon: 'Sparkles', title: '100% Personnalisable', desc: 'Impression HD, couleurs et formes sur mesure' },
  { icon: 'Truck', title: 'Livraison Europe', desc: "Livraison rapide en France et toute l'Europe" },
];

export const STATS = [
  { value: 20, suffix: ' ans', label: "D'expérience" },
  { value: 2, suffix: ' min', label: 'Installation' },
  { value: 100, suffix: '%', label: 'Conception Suisse' },
];

export const REVIEWS = [
  { ini: 'LD', grad: 'linear-gradient(135deg,#0066cc,#3b82f6)', name: 'Laurent Dubois', role: 'EventPro France', date: '28 avril 2026', text: 'Structures gonflables de qualité exceptionnelle. Installation en 2 minutes chrono, rendu visuel impressionnant et service client très réactif. Parfait pour nos événements professionnels.' },
  { ini: 'SM', grad: 'linear-gradient(135deg,#0891b2,#06b6d4)', name: 'Sophie Martin', role: 'Marketing & Events', date: '17 juillet 2025', text: 'Tente Spider impeccable pour notre salon. Design moderne, montage ultra-rapide et personnalisation parfaite. Conception suisse, qualité au rendez-vous. Je recommande vivement.' },
  { ini: 'JR', grad: 'linear-gradient(135deg,#7c3aed,#a78bfa)', name: 'Jean-Pierre Rousseau', role: 'Sports & Festivals', date: '15 décembre 2024', text: 'Quatrième commande et toujours aussi satisfait. Produits haut de gamme, délais respectés, équipe professionnelle. Les structures résistent parfaitement aux conditions extérieures.' },
];

export const FAQS = [
  { q: 'Quel est le délai de livraison ?', a: '2 à 3 semaines pour tous nos produits avec livraison suivie.' },
  { q: 'Livrez-vous en dehors de la France ?', a: "Oui, nous livrons dans toute l'Europe avec des partenaires logistiques de confiance." },
  { q: 'Proposez-vous la location de structures ?', a: 'Non, nous nous concentrons sur la vente de structures gonflables de haute qualité pour garantir une expérience client optimale et une personnalisation complète de chaque produit.' },
  { q: 'Quelle est la garantie sur vos produits ?', a: '5 ans de garantie sur toutes nos structures gonflables.' },
  { q: "Comment se déroule l'installation ?", a: 'Installation ultra-rapide en 2 minutes seulement ! Réalisable par une seule personne.' },
  { q: 'Peut-on personnaliser entièrement la structure ?', a: 'Absolument ! Personnalisation complète 360° avec impression HD de votre logo, couleurs corporate et design sur mesure.' },
];

export const SPECS = [
  { label: 'Matériau', value: 'Oxford 600D haute résistance + TPU' },
  { label: 'Pression de gonflage', value: 'Haute pression 0.35 bar' },
  { label: 'Résistance au vent', value: "Jusqu'à 70 km/h" },
  { label: 'Temps de gonflage', value: '60-90 secondes' },
  { label: 'Impression', value: 'Sublimation HD 360° résistante aux UV' },
  { label: 'Certification', value: 'Anti-feu M2, Anti-UV' },
  { label: 'Garantie', value: '5 ans structure + impression' },
  { label: 'Poids (4x4m)', value: '~12 kg' },
];

export const USECASES = [
  { n: '01', title: 'Événements sportifs', desc: 'Marathons, trails, salons sport, zones VIP' },
  { n: '02', title: 'Salons professionnels', desc: 'Stands B2B, expositions, conventions' },
  { n: '03', title: 'Festivals & concerts', desc: 'Zones presse, accueil VIP, backstage' },
  { n: '04', title: 'Points de vente', desc: 'Pop-up stores, démonstrations, promotions' },
];

// Mobilier items (image changes when an item is selected). Images are placeholders from the asset pool.
export const MOBILIER = [
  { name: 'Pouf gonflable imprimé', price: 180, cat: 'Assises', img: 'images/22_4887239cb_ChatGPTImage16janv202616_52_44.png' },
  { name: 'Chaise basse', price: 280, cat: 'Assises', img: 'images/16_be94e4481_Capturedecran2026-01-02a170703.png' },
  { name: 'Sofa 1 place', price: 290, cat: 'Assises', img: 'images/17_0aa557b4e_Capturedecran2026-01-02a170639.png' },
  { name: 'Sofa 2 places', price: 460, cat: 'Assises', img: 'images/19_f5298932f_Capturedecran2026-01-02a170657.png' },
  { name: 'Table basse', price: 370, cat: 'Tables', img: 'images/18_1fc91b287_ChatGPTImage17janv202616_40_27.png' },
  { name: 'Table haute', price: 490, cat: 'Tables', img: 'images/04_c91d5f27b_ChatGPTImage17janv202613_28_14.png' },
  { name: 'Bar gonflable droit', price: 600, cat: 'Bars', img: 'images/02_e1e114d2c_ChatGPTImage16janv202615_18_26.png' },
];

export const LOGOS = [
  { src: 'images/05_8424c8189_689347.jpg', alt: 'Adidas' },
  { src: 'images/06_a14c02a28_Aero41.jpg', alt: 'Aero41' },
  { src: 'images/07_89afe45d9_bmw-logo-1963.webp', alt: 'BMW' },
  { src: 'images/08_5a39ff037_original-0abbbcef53d5e3f30b9b852328ac5bb2.webp', alt: 'Carrefour' },
  { src: 'images/09_02717e765_Coca-Cola-Logo-Design1.jpg', alt: 'Coca-Cola' },
  { src: 'images/10_bf3d38cba_fia-federation-internationale-de-lautomobile.svg', alt: 'FIA' },
  { src: 'images/11_3712d16e9_logo_groupegrisoni_horizontal_positif_rvb-1.jpg', alt: 'Groupe Grisoni' },
  { src: 'images/12_8df77204e_Hyundai-Logo.jpg', alt: 'Hyundai' },
  { src: 'images/13_on-running-logo-vector.png', alt: 'On Running' },
];

export const NAV = [
  { label: 'Accueil' },
  { label: 'Produits', children: ['Tente Spider', 'Tente Sur Mesure', 'Arches Gonflables', 'Arches Sur Mesure', 'Colonnes Gonflables', 'Colonnes Sur Mesure', 'Mobilier Gonflable'] },
  { label: 'À propos' },
  { label: 'Contact' },
];

export const LOGO = 'images/00_385b48bed_WhatsAppImage2026-01-16at132825.png';
export const HERO_IMAGE = 'images/01_352cf8bae_WhatsAppImage2026-01-17at132722.jpg';
export const CONTACT = { email: 'contact@sport-air-event.com', whatsapp: 'https://wa.me/41774835190' };
