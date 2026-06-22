import SurMesure from '../components/SurMesure.jsx';
import { useT } from '../lib/i18n.jsx';

/* Custom column — quote-only personalised request. Layout shared with the other
   sur-mesure pages via <SurMesure>. */
export default function ColonnesSurMesure() {
  const t = useT();
  return (
    <SurMesure
      product={{
        name: t('Colonne Sur Mesure', 'Custom Column'),
        image: 'images/04_c91d5f27b_ChatGPTImage17janv202613_28_14.png',
        intro: t(
          "Colonnes de 2 à 5 mètres de hauteur. Votre vision, notre expertise — conception et fabrication sur mesure pour vos événements d'exception.",
          'Columns from 2 to 5 metres tall. Your vision, our expertise — bespoke design and manufacturing for your standout events.'
        ),
        specs: [t('Hauteur 2 à 5 m', 'Height 2 to 5 m'), t('Délai 6–8 semaines', 'Lead time 6–8 weeks')],
        included: [
          t('Design 100% sur mesure', '100% custom design'),
          t('Modélisation 3D gratuite', 'Free 3D modelling'),
          t('Impression haute qualité de votre logo', 'High-quality printing of your logo'),
          t('Ventilateur électrique silencieux fourni', 'Silent electric blower included'),
          t('Base lestée pour stabilité maximale', 'Weighted base for maximum stability'),
          t('Garantie 2 ans structure + 3 ans impression', '2-year structure warranty + 3-year print warranty'),
        ],
      }}
    />
  );
}
