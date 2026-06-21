import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const types = [
  {
    n: '01', title: 'La tente Spider gonflable',
    body: "La tente Spider est la structure phare de notre gamme. Disponible en 3×3 m, 4×4 m et 5×5 m, elle se caractérise par son architecture moderne aux lignes épurées, ses pieds tubulaires gonflables et son toit imprimé en haute définition. Son installation ne demande qu'une seule personne et se réalise en moins de 2 minutes. Idéale pour les salons professionnels, les marchés, les animations de rue, les événements sportifs ou les points de vente éphémères, la tente Spider est disponible avec des parois latérales interchangeables (pleine, avec porte, avec fenêtre) pour s'adapter à chaque configuration.",
  },
  {
    n: '02', title: 'Les arches gonflables publicitaires',
    body: "Les arches gonflables sont utilisées principalement comme portiques de départ et d'arrivée pour les courses à pied, les triathlons, les cyclosportives ou tout autre événement sportif. Elles servent également de portails d'entrée sur les festivals, les foires et les salons. Leur surface entièrement imprimable offre une visibilité maximale pour les sponsors et les organisateurs. Nos arches standard mesurent de 5 à 10 mètres de largeur, avec des hauteurs personnalisables. Une version sur mesure est disponible pour les projets spécifiques.",
  },
  {
    n: '03', title: 'Les colonnes gonflables',
    body: "Les colonnes gonflables permettent de délimiter et de baliser élégamment un espace événementiel. Disponibles en plusieurs hauteurs, elles peuvent être équipées d'un éclairage LED RGB intégré pour un rendu spectaculaire en soirée. Leur impression totale en quadrichromie garantit une identité visuelle forte et cohérente.",
  },
  {
    n: '04', title: 'Le mobilier gonflable personnalisé',
    body: 'Poufs, chaises basses, sofas, tables basses ou hautes, bars droits ou courbés : notre gamme de mobilier gonflable permet de créer des espaces de réception branded et confortables, sans les contraintes logistiques du mobilier classique. Chaque pièce est entièrement imprimée aux couleurs de votre marque.',
  },
];

const advantages = [
  { t: 'Installation ultra-rapide', d: 'Montage en 2 minutes par une seule personne, sans outils.' },
  { t: 'Personnalisation totale', d: "Impression HD de votre logo, couleurs et visuels sur l'ensemble de la surface." },
  { t: 'Légèreté et transport facilité', d: 'Toutes nos structures se replient dans un sac de transport compact inclus.' },
  { t: 'Durabilité', d: 'Matériaux premium résistants aux UV et certifiés non-feu, garantie 5 ans sur les tentes.' },
  { t: 'Conception suisse', d: 'Chaque structure est conçue et fabriquée selon les standards de qualité suisses.' },
  { t: 'Maquette 3D gratuite', d: 'Visualisez votre projet avant production grâce à notre service de modélisation 3D inclus.' },
];

export default function GuideStructuresGonflables() {
  return (
    <div className="overflow-x-hidden bg-paper">
      {/* ░░ HERO ░░ */}
      <section className="border-b border-[var(--line)]">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <Reveal as="div" y={14} className="flex items-center gap-3 mb-7">
                <span className="text-xs font-semibold tabular-nums text-ink/30">—</span>
                <span className="h-px w-8" style={{ background: 'var(--blue)' }} />
                <span className="kicker">Le guide complet</span>
              </Reveal>
              <Reveal as="h1" y={26} delay={0.05} className="font-display font-bold text-ink tracking-tightest" style={{ fontSize: 'clamp(2.2rem,5.2vw,4.4rem)', lineHeight: 1.0 }}>
                Structures gonflables événementielles :{' '}
                <span className="serif-accent text-ink/45">guide complet pour les professionnels</span>
              </Reveal>
            </div>
            <Reveal as="p" y={20} delay={0.12} className="lead lg:col-span-4">
              Les structures gonflables événementielles sont devenues des incontournables pour les entreprises, les organisateurs d'événements sportifs, les marques en activation marketing et les collectivités souhaitant marquer leur présence lors de manifestations publiques. Légères, rapides à installer et entièrement personnalisables, elles offrent un rapport qualité-prix imbattable par rapport aux structures rigides traditionnelles.
            </Reveal>
          </div>
        </div>
      </section>

      {/* ░░ DÉFINITION ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader kicker="Les fondamentaux" index="01"
              title={<>Qu'est-ce qu'une structure<br />gonflable événementielle ?</>} />
          </div>
          <Reveal as="div" delay={0.1} className="lg:col-span-7 space-y-5">
            <p className="text-ink/75 leading-relaxed text-[16px]">Une structure gonflable événementielle est un équipement promotionnel ou fonctionnel fabriqué à partir de matériaux textiles haute résistance (polyester enduit, Oxford, etc.), maintenu en forme par une mise en pression d'air continue ou à chambre fermée. Contrairement aux constructions en dur, ces structures s'installent en quelques minutes, se transportent dans un sac de voyage compact et s'adaptent à n'importe quel terrain intérieur ou extérieur.</p>
            <p className="text-ink/75 leading-relaxed text-[16px]">Chez SPORT AIR EVENT, toutes nos structures sont conçues en Suisse avec des matériaux certifiés non-feu et anti-UV, garantissant une durabilité maximale et une conformité aux normes de sécurité européennes les plus strictes.</p>
          </Reveal>
        </div>
      </section>

      {/* ░░ TYPES — alternating editorial rows ░░ */}
      <section className="bg-white border-y border-[var(--line)] py-20 md:py-28">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <SectionHeader kicker="La gamme" index="02"
            title={<>Les différents types de<br />structures gonflables</>}
            lead="Quatre familles de produits, une même exigence de finition et de personnalisation." />
          <div className="mt-16 md:mt-20 border-t border-[var(--line)]">
            {types.map((t) => (
              <Reveal key={t.n} y={28} className="grid md:grid-cols-12 gap-5 md:gap-10 py-10 md:py-12 border-b border-[var(--line)]">
                <div className="md:col-span-4 flex items-start gap-4">
                  <span className="font-display text-[2.4rem] md:text-[3rem] font-bold leading-none text-ink/[0.12] select-none tabular-nums">{t.n}</span>
                  <h3 className="font-display font-bold text-ink tracking-tight mt-1" style={{ fontSize: 'clamp(1.3rem,2.2vw,1.65rem)', lineHeight: 1.1 }}>{t.title}</h3>
                </div>
                <p className="md:col-span-8 text-ink/75 leading-relaxed text-[16px]">{t.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ░░ AVANTAGES — dark manifesto ░░ */}
      <section className="bg-ink text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16 md:mb-20">
            <div className="lg:col-span-7">
              <SectionHeader light kicker="Les avantages" index="03"
                title={<>Pourquoi choisir des structures<br /><span className="serif-accent text-white/55">gonflables pour vos événements ?</span></>} />
            </div>
            <Reveal as="p" delay={0.1} className="lg:col-span-5 text-white/65 leading-relaxed">
              Du montage en deux minutes à la garantie cinq ans, chaque atout répond à une contrainte concrète des organisateurs et des marques exigeantes.
            </Reveal>
          </div>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[var(--radius-lg)] overflow-hidden">
            {advantages.map((a, i) => (
              <motion.div variants={staggerChild} key={a.t} className="bg-ink p-7 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <span className="w-6 h-px bg-[#5aa2f0]" />
                  <span className="text-xs font-semibold text-white/25 tabular-nums">0{i + 1}</span>
                </div>
                <div className="font-display font-semibold text-[15px] mb-2">{a.t}</div>
                <div className="text-[13px] text-white/50 leading-relaxed">{a.d}</div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ░░ ÉVÉNEMENTS ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader kicker="Cas d'usage" index="04"
              title={<>Pour quels<br />événements ?</>} />
          </div>
          <Reveal as="div" delay={0.1} className="lg:col-span-7 space-y-5">
            <p className="text-ink/75 leading-relaxed text-[16px]">Nos structures s'adaptent à une très grande variété de contextes professionnels : salons et expositions, événements sportifs (marathons, triathlon, cyclosportives, événements d'entreprise), activations de marque, marchés de Noël et marchés éphémères, concerts et festivals, inaugurations, événements corporate, journées portes ouvertes, foires agricoles et beaucoup d'autres occasions.</p>
            <p className="text-ink/75 leading-relaxed text-[16px]">Qu'il s'agisse d'un usage ponctuel ou répété sur plusieurs saisons, nos produits sont conçus pour résister à une utilisation intensive tout en conservant leur éclat visuel. Leur entretien est minimal : un simple nettoyage à l'eau suffit pour maintenir l'impression en parfait état.</p>
          </Reveal>
        </div>
      </section>

      {/* ░░ CTA ░░ */}
      <section className="px-5 sm:px-8 pb-20 md:pb-28">
        <Reveal className="max-w-content mx-auto rounded-[var(--radius-lg)] bg-white border border-[var(--line)] px-7 py-10 md:px-14 md:py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-7">
          <div className="max-w-md">
            <div className="kicker mb-4">Prêt à démarrer</div>
            <p className="font-display text-2xl md:text-3xl font-bold text-ink tracking-tight mb-2">Prêt à lancer votre projet ?</p>
            <p className="text-[15px] text-[var(--muted)] leading-relaxed">Obtenez un devis personnalisé et une maquette 3D gratuite sous 24h.</p>
          </div>
          <Magnetic>
            <Link to="/Contact" className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold flex-shrink-0">
              Demander un devis <ArrowRight className="w-4 h-4" />
            </Link>
          </Magnetic>
        </Reveal>
      </section>
    </div>
  );
}
