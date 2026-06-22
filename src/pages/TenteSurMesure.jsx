import SurMesure from '../components/SurMesure.jsx';
import { useT } from '../lib/i18n.jsx';

/* Custom tent — quote-only personalised request (no dimension inputs, no option
   checkboxes). All layout lives in the shared <SurMesure> component. */
export default function TenteSurMesure() {
  const t = useT();
  return (
    <SurMesure
      product={{
        name: t('Tente Sur Mesure', 'Custom-Made Tent'),
        image: 'images/03_330206aa0_ChatGPTImage17janv202613_32_29.png',
        intro: t(
          'Tentes de 6 à 20 mètres de diamètre. Votre vision, notre expertise — conception et fabrication sur mesure.',
          'Tents from 6 to 20 metres in diameter. Your vision, our expertise — custom design and manufacturing.'
        ),
        specs: [t('Diamètre 6 à 20 m', 'Diameter 6 to 20 m'), t('Délai 8–12 semaines', 'Lead time 8–12 weeks')],
        included: [
          t('Design 100% personnalisé', '100% bespoke design'),
          t('Modélisation & maquette 3D', '3D modelling & mockup'),
          t('Impression haute définition de votre logo', 'High-definition printing of your logo'),
          t('Ventilateur professionnel fourni', 'Professional blower included'),
          t('Kit de fixation & sac de transport', 'Anchoring kit & carry bag'),
          t('Garantie 2 ans structure + 3 ans impression', '2-year structure warranty + 3-year print warranty'),
        ],
      }}
    />
  );
}
