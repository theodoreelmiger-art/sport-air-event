import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal, RevealStagger, Magnetic, staggerChild } from '../lib/motion.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useT } from '../lib/i18n.jsx';

const makeArticles = (t) => [
  {
    n: '01',
    title: t('Application des Conditions Générales de Vente', 'Scope of the General Terms and Conditions of Sale'),
    body: [
      t("Les présentes conditions générales s'appliquent à tous les produits et services fournis par Elmiger Business Development Sàrl, notamment le conseil et la vente de produits publicitaires gonflables et structures événementielles.", 'These general terms and conditions apply to all products and services provided by Elmiger Business Development Sàrl, in particular advisory services and the sale of inflatable advertising products and event structures.'),
      t("Elles s'appliquent intégralement à tout contrat conclu entre Elmiger Business Development Sàrl et ses clients, en Suisse ou à l'étranger, quel que soit le lieu de livraison. Toute dérogation à ces conditions générales n'est possible qu'avec l'accord écrit et préalable d'Elmiger Business Development Sàrl. Toute condition contraire émise par l'acheteur, notamment dans ses propres conditions générales d'achat, sera inopposable à Elmiger Business Development Sàrl.", 'They apply in full to any contract concluded between Elmiger Business Development Sàrl and its clients, whether in Switzerland or abroad, regardless of the place of delivery. Any departure from these general terms is valid only with the prior written agreement of Elmiger Business Development Sàrl. Any conflicting condition issued by the buyer, in particular within their own general purchasing terms, shall not be enforceable against Elmiger Business Development Sàrl.'),
      t("Toute livraison est soumise à l'acceptation expresse des présentes conditions de vente et à une confirmation écrite de la commande.", 'Every delivery is subject to express acceptance of these terms of sale and to written confirmation of the order.'),
    ],
  },
  {
    n: '02',
    title: t('Commandes et Exécution', 'Orders and Fulfilment'),
    body: [
      t("Toute commande passée est considérée comme ferme et définitive dès réception par Elmiger Business Development Sàrl d'un bon de commande, d'un devis signé portant la mention « Bon pour accord » ou de tout autre support équivalent.", "Any order placed is deemed firm and final once Elmiger Business Development Sàrl receives a purchase order, a signed quote bearing the words « Bon pour accord » (approved for execution), or any other equivalent document."),
      t("Si un produit est indisponible en raison d'une rupture de stock ou de sa suppression du catalogue, cela ne pourra pas entraîner l'annulation de l'ensemble de la commande ni donner lieu à une quelconque indemnisation.", 'If a product is unavailable due to a stock shortage or its removal from the catalogue, this may not lead to the cancellation of the entire order, nor give rise to any compensation.'),
      t("Nous nous réservons le droit d'apporter sans préavis toutes modifications jugées nécessaires à l'amélioration de la qualité technique ou esthétique de l'ensemble de nos produits, ainsi que leur retrait de la vente si nécessaire.", 'We reserve the right to make, without prior notice, any changes deemed necessary to improve the technical or aesthetic quality of any of our products, as well as to withdraw them from sale where required.'),
    ],
  },
  {
    n: '03',
    title: t('Prix', 'Pricing'),
    body: [
      t("Les produits sont fournis au tarif en vigueur au moment de la commande. Les prix s'entendent hors TVA et autres taxes applicables, qui seront facturées en supplément. Ils sont modifiables sans préavis et peuvent varier selon les remises et ristournes applicables à la date de la commande. Ces conditions peuvent être communiquées au client sur simple demande.", 'Products are supplied at the rate in effect at the time of the order. Prices are exclusive of VAT and other applicable taxes, which will be invoiced in addition. They may change without notice and may vary according to the discounts and rebates applicable on the order date. These terms can be provided to the client on request.'),
      t("En cas de modification de prix intervenant entre la commande et la livraison, le client en sera informé et une confirmation lui sera demandée avant tout enregistrement définitif de la commande.", 'Should a price change occur between the order and the delivery, the client will be informed and asked to confirm before the order is definitively recorded.'),
    ],
  },
  {
    n: '04',
    title: t('Modalités de Paiement', 'Payment Terms'),
    body: [
      t("Les factures sont payables au siège d'Elmiger Business Development Sàrl, de manière à ce que les fonds soient disponibles à la date d'échéance.", 'Invoices are payable at the registered office of Elmiger Business Development Sàrl, with funds to be available by the due date.'),
      t("Sauf indication contraire et accord spécial, toute confirmation de commande est payable à hauteur de 60 % du montant global à la commande, par virement bancaire. Le solde est dû à l'envoi des structures gonflables / produits.", 'Unless otherwise stated and specially agreed, every order confirmation requires a payment of 60% of the total amount at the time of order, by bank transfer. The balance is due upon dispatch of the inflatable structures / products.'),
      t("Les clients disposant d'une ligne de crédit peuvent bénéficier de délais de paiement spécifiques, définis en fonction du montant de leur ligne de crédit et de leur chiffre d'affaires. Elmiger Business Development Sàrl se réserve le droit de modifier ou de supprimer cette facilité sans préavis.", 'Clients holding a credit line may benefit from specific payment terms, set according to the size of their credit line and their turnover. Elmiger Business Development Sàrl reserves the right to amend or withdraw this facility without notice.'),
      t("En cas de retard de paiement, des intérêts moratoires au taux légal suisse en vigueur seront exigibles de plein droit, sans mise en demeure préalable. Elmiger Business Development Sàrl se réserve également le droit de suspendre toute livraison en cours en cas de retard de paiement.", 'In the event of late payment, default interest at the applicable Swiss statutory rate shall be due automatically, without prior formal notice. Elmiger Business Development Sàrl also reserves the right to suspend any ongoing delivery in the event of late payment.'),
    ],
  },
  {
    n: '05',
    title: t('Conditions de Livraison', 'Delivery Terms'),
    body: [
      t("La livraison s'effectue soit par enlèvement direct par le client, soit par un transporteur. Le client doit récupérer sa commande dans un délai de trois jours à compter de la notification de disponibilité des produits.", 'Delivery is carried out either by direct collection by the client or via a carrier. The client must collect their order within three days of being notified that the products are available.'),
    ],
    sub: [
      {
        title: t('5.1 Délais de livraison', '5.1 Delivery times'),
        text: t("Les délais de livraison sont donnés à titre indicatif. Sauf convention expresse, aucun dédommagement ne pourra être réclamé en cas de retard, notamment dans les cas suivants : (a) les conditions de paiement n'ont pas été respectées ; (b) force majeure ou événement propre à retarder ou suspendre la livraison (problème de douane, intempéries, grèves, etc.)", 'Delivery times are given for guidance only. Unless expressly agreed otherwise, no compensation may be claimed in the event of delay, in particular in the following cases: (a) the payment terms have not been met; (b) force majeure or any event liable to delay or suspend delivery (customs issues, adverse weather, strikes, etc.).'),
      },
      {
        title: t('5.2 Expéditions – Transfert des risques', '5.2 Shipments – Transfer of risk'),
        text: t("Nos marchandises, même convenues franco, voyagent aux risques et périls du destinataire, à qui il appartient, en cas d'avaries ou de pertes, de faire toutes réserves et d'exercer tout recours auprès des transporteurs, seuls responsables. Les risques liés aux produits sont transférés au client dès leur enlèvement ou leur prise en charge par le transporteur.", 'Our goods, even when agreed carriage-paid, travel at the risk of the recipient, who is responsible, in the event of damage or loss, for registering all reservations and pursuing any claim against the carriers, who are solely liable. Risk relating to the products passes to the client as soon as they are collected or taken into the carrier’s charge.'),
      },
    ],
  },
  {
    n: '06',
    title: t('Réception, Réclamation et Retour', 'Receipt, Claims and Returns'),
    body: [
      t("Le client a toute faculté de réceptionner les marchandises au moment de la livraison. Il lui appartient à ce moment d'en prendre, après contrôle, l'entière responsabilité. Toute réclamation relative à la conformité de la marchandise devra être formulée par écrit dans les 8 jours à compter de la livraison.", 'The client is free to inspect the goods upon delivery. At that point, after checking them, the client assumes full responsibility for them. Any claim regarding the conformity of the goods must be submitted in writing within 8 days of delivery.'),
      t("Dans tous les cas, notre responsabilité est limitée au remplacement ou au remboursement de la marchandise. Aucun retour de marchandises ne pourra être effectué sans notre consentement écrit préalable, ce consentement n'impliquant aucune reconnaissance de responsabilité.", 'In all cases, our liability is limited to the replacement or refund of the goods. No goods may be returned without our prior written consent, and such consent implies no acknowledgement of liability.'),
    ],
  },
  {
    n: '07',
    title: t('Conformité du BAT 3D et Rendu de Fabrication', '3D Proof Conformity and Manufactured Result'),
    body: [
      t("Les structures gonflables étant des produits fabriqués sur mesure, le BAT (Bon à Tirer) 3D remis au client constitue une représentation visuelle de l'objet commandé. La réalisation physique est fidèle à ce BAT dans ses formes générales, ses proportions et son habillage graphique.", 'As inflatable structures are custom-made products, the 3D BAT (final proof for approval) provided to the client is a visual representation of the item ordered. The physical product matches this proof in its overall shapes, proportions and graphic design.'),
      t("Toutefois, Elmiger Business Development Sàrl ne saurait garantir une conformité exacte à 100 % entre le rendu 3D et la structure gonflable finale. Des variations mineures peuvent survenir, notamment en raison des contraintes inhérentes à la mise en pression (déformation légère des surfaces), des éléments internes de structure (coutures, soufflets, cloisons de maintien) pouvant induire du capitonnage ou des effets de plis, ainsi que des propriétés physiques des matériaux textiles utilisés.", 'However, Elmiger Business Development Sàrl cannot guarantee an exact 100% match between the 3D rendering and the final inflatable structure. Minor variations may occur, notably due to the constraints inherent in inflation (slight deformation of surfaces), internal structural elements (seams, baffles, retaining walls) that can cause quilting or creasing, as well as the physical properties of the textile materials used.'),
      t("En tout état de cause, la conformité est considérée comme atteinte dès lors que la structure correspond à 95 % ou plus de l'apparence définie par le BAT approuvé. Le client est invité à formuler toute réserve sur cet aspect avant la validation définitive du BAT.", 'In any event, conformity is deemed achieved once the structure matches 95% or more of the appearance defined by the approved proof. The client is invited to raise any reservation on this point before final approval of the proof.'),
    ],
  },
  {
    n: '08',
    title: t('Garantie', 'Warranty'),
    body: [
      t("Les produits sont garantis 1 an contre les vices de fabrication ou les matériaux défectueux, selon les conditions du fabricant, disponibles sur demande. Elmiger Business Development Sàrl ne pourra en aucun cas être tenue responsable des pertes d'exploitation ou dommages indirects liés à un défaut du produit.", 'Products carry a 1-year warranty against manufacturing defects or faulty materials, subject to the manufacturer’s conditions, available on request. Elmiger Business Development Sàrl may in no event be held liable for loss of business or indirect damages arising from a product defect.'),
    ],
  },
  {
    n: '09',
    title: t('Propriété Intellectuelle', 'Intellectual Property'),
    body: [
      t("L'achat de logiciels ou de produits ne confère aucun droit de reproduction, diffusion ou exploitation commerciale. Les créations graphiques, maquettes, BAT 3D et fichiers de fabrication réalisés par Elmiger Business Development Sàrl demeurent sa propriété intellectuelle jusqu'au paiement intégral des prestations correspondantes. Toute violation de ces droits pourra entraîner l'annulation de la commande et d'éventuelles poursuites.", 'The purchase of software or products grants no right of reproduction, distribution or commercial exploitation. The graphic designs, mock-ups, 3D proofs and manufacturing files produced by Elmiger Business Development Sàrl remain its intellectual property until the corresponding services have been paid for in full. Any infringement of these rights may result in cancellation of the order and possible legal proceedings.'),
    ],
  },
  {
    n: '10',
    title: t('Réserve de Propriété', 'Retention of Title'),
    body: [
      t("Les produits restent la propriété d'Elmiger Business Development Sàrl jusqu'au paiement intégral de leur prix. En cas de non-paiement, Elmiger Business Development Sàrl pourra récupérer les produits ou en exiger le paiement direct de la part des sous-acquéreurs. Elmiger Business Development Sàrl pourra également suspendre toute livraison et/ou résilier tout marché ou commande en cas de retard dans le paiement des livraisons précédentes.", 'The products remain the property of Elmiger Business Development Sàrl until their price has been paid in full. In the event of non-payment, Elmiger Business Development Sàrl may recover the products or require direct payment from sub-purchasers. Elmiger Business Development Sàrl may also suspend any delivery and/or terminate any contract or order in the event of late payment for previous deliveries.'),
    ],
  },
  {
    n: '11',
    title: t('Attribution de Juridiction et Droit Applicable', 'Jurisdiction and Governing Law'),
    body: [
      t("Tout litige relatif aux présentes conditions sera soumis aux tribunaux compétents de Lausanne, en application du droit suisse.", 'Any dispute relating to these terms shall be submitted to the competent courts of Lausanne, under Swiss law.'),
    ],
  },
];

export default function Cgv() {
  const t = useT();
  const articles = makeArticles(t);
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
            {t('Conditions Générales', 'General Terms')} <span className="serif-accent text-white/55" style={{ fontWeight: 500 }}>{t('de Vente', 'of Sale')}</span>
          </h1>

          <Reveal as="p" delay={0.18} y={18} className="lead mt-7 max-w-xl" style={{ color: 'rgba(255,255,255,0.72)' }}>
            {t(
              'Pampigny, Canton de Vaud – Suisse. Le cadre contractuel applicable à la vente de nos structures gonflables et produits événementiels.',
              'Pampigny, Canton of Vaud – Switzerland. The contractual framework governing the sale of our inflatable structures and event products.'
            )}
          </Reveal>

          <Reveal as="div" delay={0.3} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/55">
            <span>{t('11 articles', '11 articles')}</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span>{t('Droit suisse applicable', 'Governed by Swiss law')}</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span>{t('For juridique : Lausanne', 'Jurisdiction: Lausanne')}</span>
          </Reveal>
        </div>
      </section>

      {/* ░░ ARTICLES ░░ */}
      <section className="bg-white border-b border-[var(--line)]">
        <div className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 py-12 md:py-16">
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
      <section className="max-w-content mx-auto px-5 sm:px-8 lg:px-16 py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <SectionHeader
              kicker={t('Une question sur nos conditions', 'A question about our terms')}
              index="—"
              title={<>{t('Besoin d\'une précision', 'Need a detail clarified')}<br /><span className="serif-accent text-ink/50">{t('avant de commander ?', 'before you order?')}</span></>}
              lead={t('Notre équipe répond à toute interrogation sur ces conditions, un devis ou un projet sur mesure.', 'Our team answers any question about these terms, a quote or a custom project.')}
            />
          </div>
          <Reveal as="div" delay={0.1} className="lg:col-span-5 lg:pb-2">
            <Magnetic>
              <Link to="/Contact" className="cta-iridescent inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold">
                {t('Nous contacter', 'Contact us')} <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal className="mt-16 pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-[var(--muted)]">{t('© 2026 Elmiger Business Development Sàrl – Tous droits réservés', '© 2026 Elmiger Business Development Sàrl – All rights reserved')}</p>
          <p className="text-sm text-[var(--muted)]">{t('Pampigny, Canton de Vaud – Suisse', 'Pampigny, Canton of Vaud – Switzerland')}</p>
        </Reveal>
      </section>
    </div>
  );
}
