// ── i18n content dictionary ────────────────────────────────────────────────
// French is the source of truth (validated by the client). The Arabic copy
// below is a first-pass professional-register translation (Modern Standard
// Arabic, adapted for the Mauritanian context) — it has NOT been reviewed by
// a native speaker or the client yet. Treat it as a solid draft, not final
// sign-off copy, before this goes live in production.
//
// "Galb Ngadi" (section03.subtitle) is a hyper-local Nouakchott place name
// with no standardized Arabic spelling — kept in Latin script inside the
// Arabic sentence, same convention as brand/org names in `clientsAr`.

export type Lang = 'fr' | 'ar'

export interface ClientEntry {
  name: string
  logo: string
  desc: string
  tags: string[]
  /** Generic decorative photo for the masonry tile — not a real project photo. */
  image: string
}

export interface StorySection {
  num: string
  title: string
  subtitle?: string
  kicker?: string
  paragraphs: string[]
  pullQuote?: string
  attribution?: string
  process?: string[]
  disciplines?: string[]
  closing?: string
  media?: { src: string; alt: string; caption: string }
}

export interface SiteContent {
  dir: 'ltr' | 'rtl'
  htmlLang: string
  documentTitle: string
  nav: { label: string; href: string }[]
  hero: { line1: string; line2: string; intro: string; cta: string }
  storyIntro: { kicker: string; title: string }
  story: StorySection[]
  clientsHeading: { line1: string; line2: string }
  clients: ClientEntry[]
  contact: {
    heading: [string, string, string]
    labels: { email: string; phone: string; address: string }
    addressValue: string
    form: {
      name: string
      email: string
      phone: string
      message: string
      rgpd: string
      submit: string
      sentTitle: string
      sentBody: string
    }
  }
  footer: { brand: string; tagline: string; legalLink: string }
  mentions: { title: string; closeLabel: string; sections: { title: string; body: string }[] }
}

// `image` is a generic, non-branded decorative photo — not a real project
// photo (none of these clients have supplied project imagery), so it's
// deliberately a plain stock shot rather than anything claiming authenticity.
const clientsFr: ClientEntry[] = [
  { name: 'UNICEF', logo: 'UNICEF', desc: "Accompagnement médiatique et production de contenus audiovisuels pour les campagnes de sensibilisation en Mauritanie.", tags: ['Audiovisuel', 'Digital', 'Campagne'], image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop&auto=format' },
  { name: 'World Vision', logo: 'WORLD VISION', desc: "Production de reportages de terrain et diffusion via Tawatur pour les programmes humanitaires au Sahel.", tags: ['Reportage', 'Social media'], image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=1000&fit=crop&auto=format' },
  { name: 'PAM & FAO', logo: 'PAM / FAO', desc: "Couverture médiatique des programmes alimentaires et agricoles, production de films institutionnels.", tags: ['Institutionnel', 'Vidéo'], image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=1000&fit=crop&auto=format' },
  { name: 'SWEDD', logo: 'SWEDD', desc: "Stratégie de communication digitale et production de contenus pour le programme régional d'autonomisation des femmes.", tags: ['Stratégie', 'Digital', 'Genre'], image: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=800&h=1000&fit=crop&auto=format' },
  { name: 'SNIM', logo: 'SNIM', desc: "Communication corporate et couverture événementielle pour la Société Nationale Industrielle et Minière.", tags: ['Corporate', 'Événement'], image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1000&fit=crop&auto=format' },
  { name: 'Bankily – BPM', logo: 'BANKILY', desc: "Campagnes digitales de promotion du mobile banking et production de spots publicitaires.", tags: ['Pub', 'Digital', 'Finance'], image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=1000&fit=crop&auto=format' },
  { name: 'VISA', logo: 'VISA', desc: "Activation de marque et production de contenus promotionnels pour le marché mauritanien.", tags: ['Branding', 'Activation'], image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=1000&fit=crop&auto=format' },
  { name: 'GIMTEL', logo: 'GIMTEL', desc: "Refonte de communication institutionnelle et gestion des réseaux sociaux de la plateforme monétique.", tags: ['Social media', 'Institutionnel'], image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1000&fit=crop&auto=format' },
  { name: 'BPC', logo: 'BPC', desc: "Conseil en stratégie de communication et production de supports print et digitaux.", tags: ['Conseil', 'Print', 'Digital'], image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=1000&fit=crop&auto=format' },
  { name: 'Grande Muraille Verte', logo: 'GRANDE MURAILLE VERTE', desc: "Couverture de terrain et productions documentaires sur l'initiative africaine de reforestation.", tags: ['Documentaire', 'RSE'], image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&h=1000&fit=crop&auto=format' },
  { name: 'PEJ', logo: 'PEJ', desc: "Stratégie digitale et production multimédia pour le Programme Emplois des Jeunes en Mauritanie.", tags: ['Stratégie', 'Digital'], image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1000&fit=crop&auto=format' },
  { name: 'UBM', logo: 'UBM', desc: "Communication événementielle et gestion des réseaux sociaux de l'Union des Banques de Mauritanie.", tags: ['Événement', 'Social media'], image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&h=1000&fit=crop&auto=format' },
  { name: 'Same Paris', logo: 'SAME PARIS', desc: "Identité visuelle et production de contenus pour le lancement mauritanien de la marque.", tags: ['Identité', 'Lancement'], image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop&auto=format' },
  { name: 'Union Européenne', logo: 'UNION EUROPÉENNE', desc: "Couverture presse et production vidéo pour les programmes de développement financés par l'UE.", tags: ['Presse', 'Vidéo', 'Institutionnel'], image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=1000&fit=crop&auto=format' },
  { name: 'Tasiast Mauritanie', logo: 'TASIAST', desc: "Communication RSE et reportages terrain pour la mine d'or de Tasiast.", tags: ['RSE', 'Reportage', 'Mine'], image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&h=1000&fit=crop&auto=format' },
  { name: 'DipNdip', logo: 'DIPNDIP', desc: "Lancement de marque et stratégie de communication digitale pour l'ouverture sur le marché mauritanien.", tags: ['Branding', 'Digital', 'Food'], image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=1000&fit=crop&auto=format' },
]

// Brand/organization names (logo wordmarks) stay in Latin script — that's how
// they're branded everywhere, Arabic-language contexts included.
// Same 16 clients, same order as `clientsFr` — reuses its decorative `image`
// per entry below rather than duplicating the URLs.
const clientsArText: Omit<ClientEntry, 'image'>[] = [
  { name: 'UNICEF', logo: 'UNICEF', desc: 'مواكبة إعلامية وإنتاج محتوى سمعي بصري لحملات التوعية في موريتانيا.', tags: ['سمعي بصري', 'رقمي', 'حملة'] },
  { name: 'World Vision', logo: 'WORLD VISION', desc: 'إنتاج تقارير ميدانية وبثها عبر تواتر للبرامج الإنسانية في منطقة الساحل.', tags: ['تقرير ميداني', 'وسائل التواصل'] },
  { name: 'PAM & FAO', logo: 'PAM / FAO', desc: 'تغطية إعلامية للبرامج الغذائية والزراعية، وإنتاج أفلام مؤسسية.', tags: ['مؤسسي', 'فيديو'] },
  { name: 'SWEDD', logo: 'SWEDD', desc: 'استراتيجية اتصال رقمي وإنتاج محتوى للبرنامج الإقليمي لتمكين المرأة.', tags: ['استراتيجية', 'رقمي', 'النوع الاجتماعي'] },
  { name: 'SNIM', logo: 'SNIM', desc: 'اتصال مؤسسي وتغطية للفعاليات لفائدة الشركة الوطنية الصناعية والمنجمية.', tags: ['مؤسسي', 'فعاليات'] },
  { name: 'Bankily – BPM', logo: 'BANKILY', desc: 'حملات رقمية للترويج للخدمات المصرفية عبر الهاتف وإنتاج إعلانات ترويجية.', tags: ['إعلان', 'رقمي', 'مالية'] },
  { name: 'VISA', logo: 'VISA', desc: 'تفعيل العلامة التجارية وإنتاج محتوى ترويجي للسوق الموريتاني.', tags: ['العلامة التجارية', 'تفعيل'] },
  { name: 'GIMTEL', logo: 'GIMTEL', desc: 'إعادة صياغة الاتصال المؤسسي وإدارة شبكات التواصل الاجتماعي لمنصة الدفع الإلكتروني.', tags: ['وسائل التواصل', 'مؤسسي'] },
  { name: 'BPC', logo: 'BPC', desc: 'استشارة في استراتيجية الاتصال وإنتاج وسائل ورقية ورقمية.', tags: ['استشارة', 'مطبوعات', 'رقمي'] },
  { name: 'Grande Muraille Verte', logo: 'GRANDE MURAILLE VERTE', desc: 'تغطية ميدانية وإنتاج أفلام وثائقية حول المبادرة الأفريقية لإعادة التشجير.', tags: ['وثائقي', 'مسؤولية اجتماعية'] },
  { name: 'PEJ', logo: 'PEJ', desc: 'استراتيجية رقمية وإنتاج متعدد الوسائط لبرنامج تشغيل الشباب في موريتانيا.', tags: ['استراتيجية', 'رقمي'] },
  { name: 'UBM', logo: 'UBM', desc: 'اتصال خاص بالفعاليات وإدارة شبكات التواصل الاجتماعي لاتحاد البنوك الموريتانية.', tags: ['فعاليات', 'وسائل التواصل'] },
  { name: 'Same Paris', logo: 'SAME PARIS', desc: 'هوية بصرية وإنتاج محتوى لإطلاق العلامة التجارية في موريتانيا.', tags: ['هوية', 'إطلاق'] },
  { name: 'Union Européenne', logo: 'UNION EUROPÉENNE', desc: 'تغطية صحفية وإنتاج فيديو لبرامج التنمية الممولة من الاتحاد الأوروبي.', tags: ['صحافة', 'فيديو', 'مؤسسي'] },
  { name: 'Tasiast Mauritanie', logo: 'TASIAST', desc: 'اتصال متعلق بالمسؤولية الاجتماعية وتقارير ميدانية لمنجم الذهب تسياست.', tags: ['مسؤولية اجتماعية', 'تقرير ميداني', 'تعدين'] },
  { name: 'DipNdip', logo: 'DIPNDIP', desc: 'إطلاق علامة تجارية واستراتيجية اتصال رقمي لدخول السوق الموريتاني.', tags: ['علامة تجارية', 'رقمي', 'أغذية'] },
]
const clientsAr: ClientEntry[] = clientsArText.map((c, i) => ({ ...c, image: clientsFr[i].image }))

const storyFr: StorySection[] = [
  {
    num: '00',
    title: "Au commencement… le terrain était là",
    paragraphs: [
      "Kiirobi, c'est d'abord l'histoire d'une observation engagée sur plusieurs années, à partir d'un regard immersif promené sur nos environnements publics.",
      "Avant Kiirobi, le terrain était déjà là… avec Tawatur, véritable terrain d'action mais aussi terreau d'évolution.",
      "Des années dans la data, le digital et les médias, au contact de la vie publique des mauritaniens, au contact des entreprises et des institutions mauritaniennes.",
      "Et surtout, des années passées à voir comment les marques communiquaient avec les Mauritaniens. La lecture de cette interaction fut le meilleur guide vers Kiirobi.",
      "À travers Tawatur, nous recevions et diffusions régulièrement des campagnes conçues pour de grandes entreprises.",
      "Ce travail donnait accès à un observatoire privilégié, à partir de campagnes conçues pour de grandes marques, avec des données recueillies, analysées, traitées et relayées. Ces campagnes étaient souvent réussies, techniquement abouties, pensées par de très bonnes agences et produites selon des standards internationaux.",
      "Et pourtant, quelque chose manquait régulièrement.",
      "Elles s'adressaient à la Mauritanie sans toujours parler mauritanien. Une nuance culturelle absente : un mot en Hassaniya qui manquait à l'accroche, une référence qui ne résonnait pas, un mot parfaitement traduit mais qui ne sonnait pas juste, une expression correcte en arabe mais étrangère aux usages locaux, une idée créative pertinente ailleurs qui perdait une partie de sa force — à l'arrivée, ces décalages, répétés, ont fini par former une conviction.",
      "On peut parfaitement mener une action de communication sans jamais réussir à se faire comprendre, sans réussir à atteindre les ressentis, ni ouvrir des brèches. L'impact d'un message clé, le changement d'un comportement ou la visibilité d'une campagne exigent davantage de cohérence.",
      "C'est cette conviction qui allait devenir le point de départ de Kiirobi.",
    ],
    media: { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop&auto=format', alt: 'Équipe data et digital analysant des contenus sur écran', caption: 'Terrain, data et médias — l\'observation comme point de départ' },
  },
  {
    num: '01',
    title: "Penser avec les standards du monde, parler avec les codes d'ici",
    paragraphs: [
      "La Mauritanie est un pays au contexte singulier : plusieurs langues, plusieurs générations, des réalités urbaines et rurales très différentes, une diaspora importante, des codes sociaux profondément ancrés, et une société en pleine transformation. Le français y côtoie l'arabe, l'arabe y rencontre le Hassaniya, les langues nationales, et les standards internationaux s'y heurtent régulièrement à des réalités locales bien spécifiques.",
      "Une campagne conçue à Paris, Casablanca, Tunis ou Dubaï peut être excellente. Mais pour fonctionner en Mauritanie, elle doit d'abord devenir… mauritanienne. C'est ce qui a conduit à penser les messages autrement : chercher le mot juste, le ton juste, la référence juste, le canal juste, et surtout le contexte juste. Kiirobi est née pour apporter cette compréhension locale, tout en conservant la rigueur et l'exigence des grandes organisations internationales — réunir, dans une même démarche, l'exigence internationale et la compréhension locale.",
    ],
    media: { src: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=800&h=600&fit=crop&auto=format', alt: 'Accompagnement médiatique pour des organisations internationales', caption: 'Standards internationaux, compréhension locale' },
  },
  {
    num: '02',
    title: "Le terrain s'est élargi",
    paragraphs: [
      "Au départ, il y avait quelques missions. Puis les projets sont devenus plus ambitieux : la communication est devenue stratégie, la stratégie est devenue campagne, la campagne est devenue activation, l'activation est devenue événement. Et l'événement a conduit sur le terrain, puis au-delà des frontières.",
      "Avec ses clients, l'équipe a accompagné des opérations allant des États-Unis au Canada, de l'Europe à l'Afrique de l'Ouest, jusqu'à l'intérieur de la Mauritanie — des hôtels aux routes, des salles de conférence aux activations de terrain, de la diaspora mauritanienne aux populations des zones rurales. Le pays changeait, le public changeait, le contexte changeait ; le message, lui, devait toujours arriver juste.",
      "Un retour en Mauritanie a suivi, à l'intérieur du pays cette fois, avec plusieurs semaines passées à parcourir de nombreuses régions. À chaque étape, le contexte changeait, les contraintes changeaient, les attentes changeaient, les lieux changeaient — mais la mission restait la même : faire arriver le bon message à la bonne personne, quel que soit le contexte.",
    ],
    media: { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format', alt: 'Vue satellite de la Terre la nuit, connexions mondiales', caption: 'Du terrain mauritanien aux missions à l\'international' },
  },
  {
    num: '03',
    title: "D'un continent à l'autre. D'une rue à l'autre.",
    subtitle: 'De New York à Galb Ngadi. Le principe reste le même.',
    paragraphs: [
      "C'est probablement là que Kiirobi a véritablement compris ce qu'elle était devenue. Notre métier n'était plus simplement de « faire de la communication ». Notre métier était de savoir transformer une vision en une expérience adaptée à ceux auxquels elle s'adresse.",
      "À l'étranger, connaître et comprendre la diaspora, savoir comment lui faire parvenir un message, par quels canaux et à quels tempos. À Nouakchott, comprendre le rythme et les nouveaux usages. À l'intérieur du pays, comprendre d'autres réalités, d'autres habitudes, d'autres attentes.",
      "Et parfois, partir encore beaucoup plus loin pour raconter la Mauritanie au monde. Jusqu'en Argentine, où Tawatur nous a permis de vivre et raconter de l'intérieur une expérience sportive exceptionnelle autour de la sélection mauritanienne.",
    ],
    closing: 'Notre obsession reste la même : comprendre avant d\'agir.',
    media: { src: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=600&fit=crop&auto=format', alt: 'Skyline de New York vu depuis le pont de Brooklyn', caption: 'De New York à Galb Ngadi — un seul principe' },
  },
  {
    num: '04',
    title: "C'est ainsi que nos métiers se sont rencontrés.",
    paragraphs: [
      "Nous n'avons pas décidé un bon matin de devenir une agence « 360° ». Nos expertises sont nées des besoins rencontrés sur le terrain.",
      "Pour construire une stratégie, il fallait comprendre. Pour raconter cette stratégie, il fallait créer. Pour lui donner de la visibilité, il fallait maîtriser le digital et les médias. Pour lui donner vie, il fallait produire. Pour créer la rencontre, il fallait maîtriser l'événementiel. Pour montrer, il nous fallait le média et l'audiovisuel, il fallait Tawatur. Pour mesurer et améliorer, il fallait comprendre la donnée et la technologie.",
      "De la réflexion jusqu'au terrain, nous avons progressivement réuni ces métiers pour en créer un système capable d'accompagner une idée depuis sa naissance jusqu'à sa rencontre avec le public.",
    ],
    disciplines: ['Stratégie', 'Création', 'Digital', 'Média', 'Audiovisuel', 'Événementiel', 'Technologie', 'Data'],
    media: { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format', alt: 'Atelier stratégique en équipe autour de notes collées au mur', caption: 'Là où nos métiers se rencontrent' },
  },
  {
    num: '05',
    title: "De l'idée à la réalité..",
    paragraphs: [
      "C'est peut-être la meilleure façon de résumer ce que nous faisons. Au commencement, il y a une problématique, puis une réflexion, puis une idée. Ensuite seulement viennent les mots, les images, les technologies, les événements et les expériences.",
    ],
    pullQuote: 'La pensée et la réalité. Entre les deux se trouve Kiirobi.',
    process: ['Nous réfléchissons.', 'Nous contextualisons.', 'Nous créons.', 'Nous produisons.', 'Nous déployons.', 'Nous mesurons.', 'Puis nous apprenons.', 'Et nous recommençons.'],
    closing: "Parce qu'une stratégie n'a de valeur que lorsqu'elle rencontre la réalité.",
    media: { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&auto=format', alt: 'Discussion de travail autour d\'un ordinateur portable', caption: 'De la réflexion à l\'exécution' },
  },
  {
    num: '06',
    title: "L'expérience d'hier. Les outils d'aujourd'hui.",
    paragraphs: [
      "Mais Kiirobi ne s'est pas construite uniquement avec une nouvelle génération de créatifs, de designers, de techniciens, de communicants et de spécialistes du digital.",
      "Nous avons fait un autre choix : écouter ceux qui étaient là avant nous.",
      "Experts, docteurs, sociologues, anthropologues, consultants et professionnels expérimentés nous apportent une connaissance que l'on ne trouve dans aucun logiciel et dans aucune tendance marketing. Nous confrontons cette expérience aux usages contemporains, à la créativité, à la data, aux nouvelles technologies et aux nouvelles générations.",
    ],
    pullQuote: 'L\'expérience nous donne de la profondeur. La nouvelle génération nous donne du mouvement. Et entre les deux, Kiirobi construit.',
    media: { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop&auto=format', alt: 'Professionnelle travaillant dans une salle serveurs / data center', caption: 'L\'expérience au service des outils d\'aujourd\'hui' },
  },
  {
    num: '07',
    title: 'Et les projets sont devenus des rencontres',
    kicker: 'Banques. Institution de Paiement. Télécommunications. Mines. Énergie. Institutions internationales…',
    paragraphs: [
      "Au fil des années, des organisations majeures nous ont confié une partie de leur histoire.",
      "Et derrière chaque logo de notre portfolio, il y a une histoire. Un problème qu'il fallait comprendre. Une idée qu'il fallait trouver. Un message qu'il fallait rendre évident. Un événement qu'il fallait réussir. Une population qu'il fallait atteindre.",
      "C'est ainsi que nous avons grandi. Projet après projet. Client après client. Terrain après terrain.",
    ],
    closing: 'Nos clients témoignent de notre évolution.',
    media: { src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&auto=format', alt: 'Poignée de main entre partenaires professionnels', caption: 'Chaque projet, une rencontre' },
  },
  {
    num: '08',
    title: "« L'excellence est un art que l'on n'atteint que par l'exercice constant ».",
    attribution: 'Aristote',
    paragraphs: [
      "Cette croissance nous a également appris à choisir. Il ne s'agit pas d'être l'agence de tout le monde. Parce qu'après toutes ces années, notre conviction reste fidèle à la citation d'Aristote : « L'excellence est un art que l'on n'atteint que par l'exercice constant ; nous sommes ce que nous faisons de manière répétée, et l'excellence n'est donc pas une action mais une habitude ».",
      "Notre ambition n'est donc pas d'être partout mais d'exercer constamment notre compréhension du terrain, notre capacité stratégique, notre créativité et notre capacité d'exécution pour faire réellement la différence en réfléchissant profondément avec nos clients au-delà de la simple exécution de demandes.",
    ],
    closing: "Notre ambition n'est donc pas d'être partout. Elle est d'être là où nous pouvons faire la différence.",
  },
  {
    num: '09',
    title: 'Et maintenant, votre histoire',
    paragraphs: [
      "Tout a commencé par une observation. Puis une idée. Une approche nouvelle. Une compréhension nouvelle. Un premier client. Un projet… un autre, plusieurs autres.",
      "Puis Nouakchott a mené vers les régions ; la Mauritanie a conduit vers le monde ; et le monde a ramené à ce qui avait été perçu, compris dès le départ : pour toucher un public, il faut d'abord le comprendre.",
      "Aller à la connaissance de l'Autre. Pour répondre au plus près.",
      "Tel est le cheminement de Kiirobi. Sa façon de comprendre l'entreprise, le service et l'accompagnement.",
    ],
    closing: "Aujourd'hui, une nouvelle histoire peut commencer. Ce sera la vôtre.",
  },
]

const storyAr: StorySection[] = [
  {
    num: '00',
    title: 'في البداية… كان الميدان حاضرًا',
    paragraphs: [
      'كيروبي هي، قبل كل شيء، قصة ملاحظة استمرت لسنوات عديدة، انطلاقًا من نظرة معايشة لبيئاتنا العامة.',
      'قبل كيروبي، كان الميدان حاضرًا بالفعل… مع تواتر، الميدان الحقيقي للعمل وأيضًا أرض التطور.',
      'سنوات في مجال البيانات والرقمنة والإعلام، على تماس مع الحياة العامة للموريتانيين، وعلى تماس مع الشركات والمؤسسات الموريتانية.',
      'وقبل كل شيء، سنوات قضيناها في مراقبة كيفية تواصل العلامات التجارية مع الموريتانيين. كانت قراءة هذا التفاعل خير مرشد نحو كيروبي.',
      'من خلال تواتر، كنا نستقبل وننشر بانتظام حملات مصمَّمة لشركات كبرى.',
      'أتاح لنا هذا العمل مرصدًا متميزًا، انطلاقًا من حملات مصممة لعلامات تجارية كبرى، ببيانات تم جمعها وتحليلها ومعالجتها ونشرها. كانت هذه الحملات غالبًا ناجحة، محكمة تقنيًا، من تصميم وكالات جيدة جدًا، ومنتَجة وفق معايير دولية.',
      'ومع ذلك، كان هناك دائمًا شيء ما ينقص.',
      'كانت تخاطب موريتانيا دون أن تتحدث دائمًا بلسانها. فارق ثقافي غائب: كلمة بالحسانية كانت تنقص العبارة الافتتاحية، إشارة لم تكن تلقى صدى، كلمة تُرجمت بدقة لكنها لم تكن تبدو طبيعية، تعبير سليم بالعربية لكنه غريب عن الاستخدام المحلي، فكرة إبداعية ملائمة في مكان آخر تفقد جزءًا من قوتها هنا — وفي النهاية، تراكمت هذه الفجوات المتكررة لتشكّل قناعة.',
      'يمكن تمامًا القيام بعمل اتصالي دون النجاح أبدًا في إيصال الفكرة، ودون بلوغ المشاعر أو فتح ثغرات في الوعي. فتأثير رسالة أساسية، أو تغيير سلوك، أو بروز حملة، يتطلب قدرًا أكبر من الانسجام.',
      'هذه القناعة هي التي ستصبح نقطة انطلاق كيروبي.',
    ],
    media: { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop&auto=format', alt: 'فريق يعمل على تحليل البيانات والمحتوى الرقمي', caption: 'الميدان والبيانات والإعلام — الملاحظة كنقطة انطلاق' },
  },
  {
    num: '01',
    title: 'التفكير بمعايير العالم، والتحدث برموز هذه الأرض',
    paragraphs: [
      'موريتانيا بلد ذو سياق فريد: لغات متعددة، أجيال متعددة، واقع حضري وريفي شديد الاختلاف، جالية مهمة في الخارج، أعراف اجتماعية راسخة بعمق، ومجتمع في تحوّل مستمر. تتجاور الفرنسية مع العربية، وتلتقي العربية بالحسانية واللغات الوطنية، وتصطدم المعايير الدولية بانتظام بواقع محلي خاص جدًا.',
      'قد تكون حملة صُمِّمت في باريس أو الدار البيضاء أو تونس أو دبي ممتازة. لكن لكي تنجح في موريتانيا، عليها أولًا أن تصبح… موريتانية. هذا ما قادنا إلى التفكير في الرسائل بطريقة مختلفة: البحث عن الكلمة الصحيحة، والنبرة الصحيحة، والإشارة الصحيحة، والقناة الصحيحة، وقبل كل شيء السياق الصحيح. وُلدت كيروبي لتقديم هذا الفهم المحلي، مع الحفاظ على صرامة ومتطلبات المنظمات الدولية الكبرى — لتجمع، في نهج واحد، بين الصرامة الدولية والفهم المحلي.',
    ],
    media: { src: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=800&h=600&fit=crop&auto=format', alt: 'مواكبة إعلامية لمؤسسات دولية', caption: 'معايير دولية، فهم محلي' },
  },
  {
    num: '02',
    title: 'اتسع الميدان',
    paragraphs: [
      'في البداية، كانت هناك بضع مهام. ثم أصبحت المشاريع أكثر طموحًا: أصبح الاتصال استراتيجية، وأصبحت الاستراتيجية حملة، وأصبحت الحملة تفعيلًا، وأصبح التفعيل فعالية. وقاد الحدث إلى الميدان، ثم إلى ما وراء الحدود.',
      'رافق الفريق عملاءه في عمليات امتدت من الولايات المتحدة إلى كندا، ومن أوروبا إلى غرب أفريقيا، وصولًا إلى داخل موريتانيا — من الفنادق إلى الطرقات، ومن قاعات المؤتمرات إلى التفعيلات الميدانية، ومن الجالية الموريتانية في الخارج إلى سكان المناطق الريفية. كان البلد يتغيّر، وكان الجمهور يتغيّر، وكان السياق يتغيّر؛ أما الرسالة، فكان عليها دائمًا أن تصل بدقة.',
      'تلا ذلك عودة إلى موريتانيا، هذه المرة داخل البلاد، مع أسابيع عديدة قضيناها في التنقل عبر مناطق عديدة. وفي كل مرحلة، كان السياق يتغيّر، والقيود تتغيّر، والتوقعات تتغيّر، والأماكن تتغيّر — لكن المهمة بقيت واحدة: إيصال الرسالة الصحيحة إلى الشخص الصحيح، أيًا كان السياق.',
    ],
    media: { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format', alt: 'صورة بالأقمار الصناعية لكوكب الأرض ليلًا، ترابط عالمي', caption: 'من الميدان الموريتاني إلى المهام الدولية' },
  },
  {
    num: '03',
    title: 'من قارة إلى أخرى. من شارع إلى آخر.',
    subtitle: 'من نيويورك إلى Galb Ngadi. المبدأ يبقى واحدًا.',
    paragraphs: [
      'ربما في تلك اللحظة أدركت كيروبي حقًا ما أصبحت عليه. لم تعد مهنتنا مجرد «صنع اتصال». أصبحت مهنتنا هي معرفة كيفية تحويل رؤية إلى تجربة مُكيَّفة مع من تتوجه إليهم.',
      'في الخارج، معرفة الجالية وفهمها، ومعرفة كيفية إيصال رسالة إليها، وعبر أي قنوات وبأي إيقاع. في نواكشوط، فهم الإيقاع والاستخدامات الجديدة. في داخل البلاد، فهم واقع آخر، وعادات أخرى، وتوقعات أخرى.',
      'وأحيانًا، الذهاب إلى أبعد من ذلك بكثير لسرد قصة موريتانيا للعالم. حتى الأرجنتين، حيث سمحت لنا تواتر بأن نعيش ونروي من الداخل تجربة رياضية استثنائية حول المنتخب الموريتاني.',
    ],
    closing: 'يبقى هاجسنا واحدًا: أن نفهم قبل أن نتصرف.',
    media: { src: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=600&fit=crop&auto=format', alt: 'أفق مدينة نيويورك من جسر بروكلين', caption: 'من نيويورك إلى Galb Ngadi — مبدأ واحد' },
  },
  {
    num: '04',
    title: 'هكذا التقت مهننا.',
    paragraphs: [
      'لم نقرر ذات صباح أن نصبح وكالة «شاملة». بل وُلدت خبراتنا من الاحتياجات التي واجهناها في الميدان.',
      'لبناء استراتيجية، كان لا بد من الفهم. ولسرد هذه الاستراتيجية، كان لا بد من الإبداع. ولمنحها الظهور، كان لا بد من إتقان الرقمنة والإعلام. ولمنحها الحياة، كان لا بد من الإنتاج. ولخلق اللقاء، كان لا بد من إتقان تنظيم الفعاليات. وللعرض، احتجنا إلى الإعلام والسمعي البصري، احتجنا إلى تواتر. وللقياس والتحسين، كان لا بد من فهم البيانات والتكنولوجيا.',
      'ومن التفكير وحتى الميدان، جمعنا تدريجيًا هذه المهن لنخلق منظومة قادرة على مرافقة فكرة منذ ولادتها وحتى لقائها بالجمهور.',
    ],
    disciplines: ['استراتيجية', 'إبداع', 'رقمنة', 'إعلام', 'سمعي بصري', 'فعاليات', 'تكنولوجيا', 'بيانات'],
    media: { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format', alt: 'ورشة استراتيجية جماعية أمام لوحة ملاحظات', caption: 'حيث تلتقي مهننا' },
  },
  {
    num: '05',
    title: 'من الفكرة إلى الواقع..',
    paragraphs: [
      'ربما هذه أفضل طريقة لتلخيص ما نقوم به. في البداية، هناك إشكالية، ثم تفكير، ثم فكرة. وبعد ذلك فقط تأتي الكلمات والصور والتقنيات والفعاليات والتجارب.',
    ],
    pullQuote: 'الفكر والواقع. وبينهما تقع كيروبي.',
    process: ['نُفكّر.', 'نُسيّق مع السياق.', 'نُبدع.', 'نُنتج.', 'نَنشر.', 'نقيس.', 'ثم نتعلّم.', 'ونبدأ من جديد.'],
    closing: 'لأن الاستراتيجية لا قيمة لها إلا حين تلتقي بالواقع.',
    media: { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&auto=format', alt: 'نقاش عمل أمام حاسوب محمول', caption: 'من التفكير إلى التنفيذ' },
  },
  {
    num: '06',
    title: 'خبرة الأمس. أدوات اليوم.',
    paragraphs: [
      'لكن كيروبي لم تُبنَ فقط بجيل جديد من المبدعين والمصممين والتقنيين ومحترفي الاتصال والرقمنة.',
      'بل اخترنا خيارًا آخر: الإصغاء لمن سبقونا.',
      'خبراء، أطباء، علماء اجتماع، أنثروبولوجيون، مستشارون ومهنيون ذوو خبرة، يمنحوننا معرفة لا نجدها في أي برنامج ولا في أي اتجاه تسويقي. ونقابل هذه الخبرة بالاستخدامات المعاصرة والإبداع والبيانات والتقنيات الجديدة والأجيال الجديدة.',
    ],
    pullQuote: 'الخبرة تمنحنا العمق. والجيل الجديد يمنحنا الحركة. وبينهما، تبني كيروبي.',
    media: { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop&auto=format', alt: 'مهنية تعمل داخل غرفة خوادم بيانات', caption: 'الخبرة في خدمة أدوات اليوم' },
  },
  {
    num: '07',
    title: 'وأصبحت المشاريع لقاءات',
    kicker: 'بنوك. مؤسسة دفع. اتصالات. مناجم. طاقة. مؤسسات دولية…',
    paragraphs: [
      'على مر السنين، عهدت إلينا مؤسسات كبرى بجزء من قصتها.',
      'وخلف كل شعار في سجل أعمالنا، هناك قصة. مشكلة كان لا بد من فهمها. فكرة كان لا بد من إيجادها. رسالة كان لا بد من توضيحها. فعالية كان لا بد من إنجاحها. جمهور كان لا بد من الوصول إليه.',
      'هكذا نمَونا. مشروعًا بعد مشروع. عميلًا بعد عميل. ميدانًا بعد ميدان.',
    ],
    closing: 'عملاؤنا يشهدون على تطورنا.',
    media: { src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&auto=format', alt: 'مصافحة بين شريكين محترفين', caption: 'كل مشروع، لقاء' },
  },
  {
    num: '08',
    title: '«التميّز فن لا يُبلغ إلا بالممارسة المستمرة».',
    attribution: 'أرسطو',
    paragraphs: [
      'علّمنا هذا النمو أيضًا كيف نختار. لا يتعلق الأمر بأن نكون وكالة الجميع. لأنه بعد كل هذه السنوات، تبقى قناعتنا وفية لمقولة أرسطو: «التميّز فن لا يُبلغ إلا بالممارسة المستمرة؛ فنحن ما نفعله بشكل متكرر، والتميّز إذن ليس فعلًا بل عادة».',
      'طموحنا إذن ليس أن نكون في كل مكان، بل أن نمارس باستمرار فهمنا للميدان، وقدرتنا الاستراتيجية، وإبداعنا، وقدرتنا على التنفيذ، لنُحدث فرقًا حقيقيًا من خلال التفكير العميق مع عملائنا، بما يتجاوز مجرد تنفيذ الطلبات.',
    ],
    closing: 'طموحنا إذن ليس أن نكون في كل مكان. بل أن نكون حيث يمكننا صنع الفرق.',
  },
  {
    num: '09',
    title: 'والآن، حان دور قصتكم',
    paragraphs: [
      'بدأ كل شيء بملاحظة. ثم فكرة. مقاربة جديدة. فهم جديد. عميل أول. مشروع… ثم آخر، ثم عدة مشاريع أخرى.',
      'ثم قادت نواكشوط نحو الأقاليم؛ وقادت موريتانيا نحو العالم؛ وأعاد العالم ما كان قد أُدرك وفُهم منذ البداية: للوصول إلى جمهور، لا بد أولًا من فهمه.',
      'السعي إلى معرفة الآخر. للاستجابة بأكبر قدر من الدقة.',
      'هذا هو مسار كيروبي. طريقتها في فهم المؤسسة والخدمة والمواكبة.',
    ],
    closing: 'اليوم، يمكن أن تبدأ قصة جديدة. ستكون قصتكم.',
  },
]

export const content: Record<Lang, SiteContent> = {
  fr: {
    dir: 'ltr',
    htmlLang: 'fr',
    documentTitle: 'Kiirobi — Agence de communication et de production audiovisuelle',
    nav: [
      { label: 'Notre histoire', href: '#section00' },
      { label: 'Nos clients', href: '#section-clients' },
      { label: 'Contact', href: '#contact' },
    ],
    hero: {
      line1: "L'agence de communication",
      line2: 'qui connecte vos idées à vos publics',
      intro: "Kiirobi est une agence de communication spécialisée en Conseil, Création, Évènementiel, Élaboration et mise en place de stratégies web, communication digitale et production de contenus multimédias.",
      cta: "Découvrir l'agence",
    },
    storyIntro: {
      kicker: 'Kiirobi..',
      title: "Au commencement était l'observation",
    },
    story: storyFr,
    clientsHeading: { line1: 'ILS NOUS FONT', line2: 'CONFIANCE.' },
    clients: clientsFr,
    contact: {
      heading: ['PARLONS DE', 'VOTRE', 'PROJET'],
      labels: { email: 'Email', phone: 'Téléphone', address: 'Adresse' },
      addressValue: 'Près de Sheraton Hotel, TVZ, Nouakchott, Mauritanie',
      form: {
        name: 'Nom & Prénom',
        email: 'Adresse e-mail',
        phone: 'Téléphone',
        message: 'Votre message',
        rgpd: "J'accepte que mes données soient utilisées par Kiirobi dans le cadre du traitement de ma demande, conformément à notre politique de confidentialité.",
        submit: 'Envoyer',
        sentTitle: 'Message envoyé !',
        sentBody: 'Nous reviendrons vers vous dans les meilleurs délais.',
      },
    },
    footer: {
      brand: 'Kiirobi',
      tagline: 'Agence de Communication & Production',
      legalLink: 'Mentions légales',
    },
    mentions: {
      title: 'Mentions légales',
      closeLabel: 'Fermer les mentions légales',
      sections: [
        { title: 'Éditeur du site', body: 'Kiirobi SARL — Près de Sheraton Hotel, TVZ, Nouakchott, Mauritanie. Directeur de publication : Direction Kiirobi.' },
        { title: 'Hébergeur', body: 'OVH SAS — 2 rue Kellermann, 59100 Roubaix, France.' },
        { title: 'Données personnelles', body: "Les informations recueillies via ce site font l'objet d'un traitement informatique destiné exclusivement à répondre à vos demandes. Conformément aux réglementations en vigueur, vous disposez d'un droit d'accès et de rectification." },
        { title: 'Propriété intellectuelle', body: "L'ensemble des contenus présents sur ce site (textes, visuels, logo, vidéos) sont la propriété exclusive de Kiirobi ou font l'objet d'une autorisation d'utilisation." },
        { title: 'Cookies', body: 'Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire tiers.' },
      ],
    },
  },
  ar: {
    dir: 'rtl',
    htmlLang: 'ar',
    documentTitle: 'كيروبي — وكالة اتصال وإنتاج سمعي بصري',
    nav: [
      { label: 'قصتنا', href: '#section00' },
      { label: 'عملاؤنا', href: '#section-clients' },
      { label: 'اتصل بنا', href: '#contact' },
    ],
    hero: {
      line1: 'وكالة الاتصال',
      line2: 'التي تربط أفكاركم بجمهوركم',
      intro: 'كيروبي وكالة اتصال متخصصة في الاستشارة والإبداع وتنظيم الفعاليات، وإعداد وتنفيذ استراتيجيات الويب والاتصال الرقمي وإنتاج المحتوى متعدد الوسائط.',
      cta: 'اكتشف الوكالة',
    },
    storyIntro: {
      kicker: 'كيروبي..',
      title: 'في البداية كانت الملاحظة',
    },
    story: storyAr,
    clientsHeading: { line1: 'عملاؤنا', line2: 'يثقون بنا.' },
    clients: clientsAr,
    contact: {
      heading: ['لنتحدث', 'عن', 'مشروعكم'],
      labels: { email: 'البريد الإلكتروني', phone: 'الهاتف', address: 'العنوان' },
      addressValue: 'بالقرب من فندق شيراتون، TVZ، نواكشوط، موريتانيا',
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        message: 'رسالتكم',
        rgpd: 'أوافق على استخدام كيروبي لبياناتي في إطار معالجة طلبي، وفقًا لسياسة الخصوصية الخاصة بنا.',
        submit: 'إرسال',
        sentTitle: 'تم إرسال الرسالة!',
        sentBody: 'سنعاود التواصل معكم في أقرب وقت ممكن.',
      },
    },
    footer: {
      brand: 'كيروبي',
      tagline: 'وكالة اتصال وإنتاج',
      legalLink: 'الإشعار القانوني',
    },
    mentions: {
      title: 'الإشعار القانوني',
      closeLabel: 'إغلاق الإشعار القانوني',
      sections: [
        { title: 'الجهة الناشرة للموقع', body: 'كيروبي (ش.م.م) — بالقرب من فندق شيراتون، TVZ، نواكشوط، موريتانيا. مدير النشر: إدارة كيروبي.' },
        { title: 'المستضيف', body: 'OVH SAS — 2 rue Kellermann، 59100 Roubaix، فرنسا.' },
        { title: 'البيانات الشخصية', body: 'تخضع المعلومات التي يتم جمعها عبر هذا الموقع لمعالجة معلوماتية تهدف حصريًا إلى الرد على طلباتكم. ووفقًا للأنظمة المعمول بها، يحق لكم الوصول إلى بياناتكم وتصحيحها.' },
        { title: 'الملكية الفكرية', body: 'جميع المحتويات الموجودة على هذا الموقع (النصوص، الصور، الشعار، الفيديوهات) هي ملك حصري لكيروبي أو تخضع لترخيص استخدام.' },
        { title: 'ملفات تعريف الارتباط', body: 'يستخدم هذا الموقع فقط ملفات تعريف ارتباط تقنية ضرورية لحسن سيره. لا يتم استخدام أي ملفات تعريف ارتباط إعلانية من أطراف ثالثة.' },
      ],
    },
  },
}
