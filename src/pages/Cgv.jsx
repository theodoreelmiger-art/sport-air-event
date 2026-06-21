import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const articles = [
  {
    n: '01',
    title: 'Application des Conditions Générales de Vente',
    body: [
      "Les présentes conditions générales s'appliquent à tous les produits et services fournis par Elmiger Business Development Sàrl, notamment le conseil et la vente de produits publicitaires gonflables et structures événementielles.",
      "Elles s'appliquent intégralement à tout contrat conclu entre Elmiger Business Development Sàrl et ses clients, en Suisse ou à l'étranger, quel que soit le lieu de livraison. Toute dérogation à ces conditions générales n'est possible qu'avec l'accord écrit et préalable d'Elmiger Business Development Sàrl. Toute condition contraire émise par l'acheteur, notamment dans ses propres conditions générales d'achat, sera inopposable à Elmiger Business Development Sàrl.",
      "Toute livraison est soumise à l'acceptation expresse des présentes conditions de vente et à une confirmation écrite de la commande.",
    ],
  },
  {
    n: '02',
    title: 'Commandes et Exécution',
    body: [
      "Toute commande passée est considérée comme ferme et définitive dès réception par Elmiger Business Development Sàrl d'un bon de commande, d'un devis signé portant la mention « Bon pour accord » ou de tout autre support équivalent.",
      "Si un produit est indisponible en raison d'une rupture de stock ou de sa suppression du catalogue, cela ne pourra pas entraîner l'annulation de l'ensemble de la commande ni donner lieu à une quelconque indemnisation.",
      "Nous nous réservons le droit d'apporter sans préavis toutes modifications jugées nécessaires à l'amélioration de la qualité technique ou esthétique de l'ensemble de nos produits, ainsi que leur retrait de la vente si nécessaire.",
    ],
  },
  {
    n: '03',
    title: 'Prix',
    body: [
      "Les produits sont fournis au tarif en vigueur au moment de la commande. Les prix s'entendent hors TVA et autres taxes applicables, qui seront facturées en supplément. Ils sont modifiables sans préavis et peuvent varier selon les remises et ristournes applicables à la date de la commande. Ces conditions peuvent être communiquées au client sur simple demande.",
      "En cas de modification de prix intervenant entre la commande et la livraison, le client en sera informé et une confirmation lui sera demandée avant tout enregistrement définitif de la commande.",
    ],
  },
  {
    n: '04',
    title: 'Modalités de Paiement',
    body: [
      "Les factures sont payables au siège d'Elmiger Business Development Sàrl, de manière à ce que les fonds soient disponibles à la date d'échéance.",
      "Sauf indication contraire et accord spécial, toute confirmation de commande est payable à hauteur de 60 % du montant global à la commande, par virement bancaire. Le solde est dû à l'envoi des structures gonflables / produits.",
      "Les clients disposant d'une ligne de crédit peuvent bénéficier de délais de paiement spécifiques, définis en fonction du montant de leur ligne de crédit et de leur chiffre d'affaires. Elmiger Business Development Sàrl se réserve le droit de modifier ou de supprimer cette facilité sans préavis.",
      "En cas de retard de paiement, des intérêts moratoires au taux légal suisse en vigueur seront exigibles de plein droit, sans mise en demeure préalable. Elmiger Business Development Sàrl se réserve également le droit de suspendre toute livraison en cours en cas de retard de paiement.",
    ],
  },
  {
    n: '05',
    title: 'Conditions de Livraison',
    body: [
      "La livraison s'effectue soit par enlèvement direct par le client, soit par un transporteur. Le client doit récupérer sa commande dans un délai de trois jours à compter de la notification de disponibilité des produits.",
    ],
    sub: [
      {
        title: '5.1 Délais de livraison',
        text: "Les délais de livraison sont donnés à titre indicatif. Sauf convention expresse, aucun dédommagement ne pourra être réclamé en cas de retard, notamment dans les cas suivants : (a) les conditions de paiement n'ont pas été respectées ; (b) force majeure ou événement propre à retarder ou suspendre la livraison (problème de douane, intempéries, grèves, etc.)",
      },
      {
        title: '5.2 Expéditions – Transfert des risques',
        text: "Nos marchandises, même convenues franco, voyagent aux risques et périls du destinataire, à qui il appartient, en cas d'avaries ou de pertes, de faire toutes réserves et d'exercer tout recours auprès des transporteurs, seuls responsables. Les risques liés aux produits sont transférés au client dès leur enlèvement ou leur prise en charge par le transporteur.",
      },
    ],
  },
  {
    n: '06',
    title: 'Réception, Réclamation et Retour',
    body: [
      "Le client a toute faculté de réceptionner les marchandises au moment de la livraison. Il lui appartient à ce moment d'en prendre, après contrôle, l'entière responsabilité. Toute réclamation relative à la conformité de la marchandise devra être formulée par écrit dans les 8 jours à compter de la livraison.",
      "Dans tous les cas, notre responsabilité est limitée au remplacement ou au remboursement de la marchandise. Aucun retour de marchandises ne pourra être effectué sans notre consentement écrit préalable, ce consentement n'impliquant aucune reconnaissance de responsabilité.",
    ],
  },
  {
    n: '07',
    title: 'Conformité du BAT 3D et Rendu de Fabrication',
    body: [
      "Les structures gonflables étant des produits fabriqués sur mesure, le BAT (Bon à Tirer) 3D remis au client constitue une représentation visuelle de l'objet commandé. La réalisation physique est fidèle à ce BAT dans ses formes générales, ses proportions et son habillage graphique.",
      "Toutefois, Elmiger Business Development Sàrl ne saurait garantir une conformité exacte à 100 % entre le rendu 3D et la structure gonflable finale. Des variations mineures peuvent survenir, notamment en raison des contraintes inhérentes à la mise en pression (déformation légère des surfaces), des éléments internes de structure (coutures, soufflets, cloisons de maintien) pouvant induire du capitonnage ou des effets de plis, ainsi que des propriétés physiques des matériaux textiles utilisés.",
      "En tout état de cause, la conformité est considérée comme atteinte dès lors que la structure correspond à 95 % ou plus de l'apparence définie par le BAT approuvé. Le client est invité à formuler toute réserve sur cet aspect avant la validation définitive du BAT.",
    ],
  },
  {
    n: '08',
    title: 'Garantie',
    body: [
      "Les produits sont garantis 1 an contre les vices de fabrication ou les matériaux défectueux, selon les conditions du fabricant, disponibles sur demande. Elmiger Business Development Sàrl ne pourra en aucun cas être tenue responsable des pertes d'exploitation ou dommages indirects liés à un défaut du produit.",
    ],
  },
  {
    n: '09',
    title: 'Propriété Intellectuelle',
    body: [
      "L'achat de logiciels ou de produits ne confère aucun droit de reproduction, diffusion ou exploitation commerciale. Les créations graphiques, maquettes, BAT 3D et fichiers de fabrication réalisés par Elmiger Business Development Sàrl demeurent sa propriété intellectuelle jusqu'au paiement intégral des prestations correspondantes. Toute violation de ces droits pourra entraîner l'annulation de la commande et d'éventuelles poursuites.",
    ],
  },
  {
    n: '10',
    title: 'Réserve de Propriété',
    body: [
      "Les produits restent la propriété d'Elmiger Business Development Sàrl jusqu'au paiement intégral de leur prix. En cas de non-paiement, Elmiger Business Development Sàrl pourra récupérer les produits ou en exiger le paiement direct de la part des sous-acquéreurs. Elmiger Business Development Sàrl pourra également suspendre toute livraison et/ou résilier tout marché ou commande en cas de retard dans le paiement des livraisons précédentes.",
    ],
  },
  {
    n: '11',
    title: 'Attribution de Juridiction et Droit Applicable',
    body: [
      "Tout litige relatif aux présentes conditions sera soumis aux tribunaux compétents de Lausanne, en application du droit suisse.",
    ],
  },
];

export default function Cgv() {
  return (
    <div className="overflow-x-clip bg-paper">
      {/* ░░ HEADER (dark) ░░ */}
      <section className="bg-deep text-white">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 pt-36 md:pt-44 pb-20 md:pb-28">
          <Reveal as="div" y={14} className="flex items-center gap-3 mb-7">
            <span className="h-px w-10 bg-white/30" />
            <span className="kicker" style={{ color: '#7db4f0' }}>Elmiger Business Development Sàrl</span>
          </Reveal>

          <h1 className="font-display text-white font-bold tracking-tightest" style={{ fontSize: 'clamp(2.4rem,6vw,5rem)', lineHeight: 0.98, maxWidth: '14ch' }}>
            Conditions Générales <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}>de Vente</span>
          </h1>

          <Reveal as="p" delay={0.18} y={18} className="lead mt-7 max-w-xl" style={{ color: 'rgba(255,255,255,0.72)' }}>
            Pampigny, Canton de Vaud – Suisse. Le cadre contractuel applicable à la vente de
            nos structures gonflables et produits événementiels.
          </Reveal>

          <Reveal as="div" delay={0.3} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/55">
            <span>11 articles</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span>Droit suisse applicable</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span>For juridique : Lausanne</span>
          </Reveal>
        </div>
      </section>

      {/* ░░ ARTICLES ░░ */}
      <section className="bg-white border-b border-[var(--line)]">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 py-20 md:py-28">
          <div className="space-y-16 md:space-y-24">
            {articles.map((a) => (
              <Reveal key={a.n} y={36} className="grid md:grid-cols-12 gap-6 md:gap-12">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-28">
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-4xl md:text-5xl font-bold text-ink/10 tabular-nums leading-none select-none">{a.n}</span>
                      <span className="h-px w-8 mt-3" style={{ background: 'var(--blue)' }} />
                    </div>
                    <h2 className="font-display font-semibold text-ink tracking-tight mt-4" style={{ fontSize: 'clamp(1.25rem,2vw,1.6rem)', lineHeight: 1.1 }}>
                      {a.title}
                    </h2>
                  </div>
                </div>

                <div className="md:col-span-8">
                  <div className="space-y-4 text-[15px] leading-relaxed text-ink/75">
                    {a.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  {a.sub && (
                    <div className="mt-8 space-y-6">
                      {a.sub.map((s) => (
                        <div
                          key={s.title}
                          className="rounded-[var(--radius-lg)] bg-paper border border-[var(--line)] hover:border-ink/15 transition-colors p-6 md:p-7"
                        >
                          <h3 className="font-display text-sm font-semibold text-ink mb-3 tracking-tight">{s.title}</h3>
                          <p className="text-[15px] leading-relaxed text-ink/75">{s.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ░░ CONTACT / CTA ░░ */}
      <section className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <SectionHeader
              kicker="Une question sur nos conditions"
              index="—"
              title={<>Besoin d'une précision<br /><span className="serif-accent text-ink/50">avant de commander&nbsp;?</span></>}
              lead="Notre équipe répond à toute interrogation sur ces conditions, un devis ou un projet sur mesure."
            />
          </div>
          <Reveal as="div" delay={0.1} className="lg:col-span-5 lg:pb-2">
            <Magnetic>
              <Link to="/Contact" className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
                Nous contacter <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal className="mt-16 pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-[var(--muted)]">© 2026 Elmiger Business Development Sàrl – Tous droits réservés</p>
          <p className="text-sm text-[var(--muted)]">Pampigny, Canton de Vaud – Suisse</p>
        </Reveal>
      </section>
    </div>
  );
}
