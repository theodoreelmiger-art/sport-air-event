import SurMesure from '../components/SurMesure.jsx';
import { useT } from '../lib/i18n.jsx';

/* Custom arch — quote-only personalised request. Layout shared with the other
   sur-mesure pages via <SurMesure>. */
export default function ArchesSurMesure() {
  const t = useT();
  return (
    <SurMesure
      product={{
        name: t('Arche Sur Mesure', 'Custom-Made Arch'),
        image: 'images/02_e1e114d2c_ChatGPTImage16janv202615_18_26.png',
        intro: t(
          "Arches de 5 à 15 mètres de largeur. Votre vision, notre expertise — conception et fabrication sur mesure pour vos événements d'exception.",
          'Arches from 5 to 15 metres wide. Your vision, our expertise — bespoke design and manufacturing for your standout events.'
        ),
        specs: [t('Largeur 5 à 15 m', 'Width 5 to 15 m'), t('Délai 6–8 semaines', 'Lead time 6–8 weeks')],
        included: [
          t('Design 100% sur mesure', 'Fully bespoke design'),
          t('Modélisation & design 3D gratuits', 'Free 3D modelling & design'),
          t('Impression haute qualité de votre logo', 'High-quality printing of your logo'),
          t('Ventilateur électrique professionnel fourni', 'Professional electric blower supplied'),
          t('Kit de fixation & sac de transport inclus', 'Fixing kit & carry bag included'),
          t('Garantie 2 ans structure + 3 ans impression', '2-year structure warranty + 3-year print warranty'),
        ],
      }}
    />
  );
}
