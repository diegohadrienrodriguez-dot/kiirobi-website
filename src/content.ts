// ── i18n content dictionary ────────────────────────────────────────────────
// French is the source of truth (validated by the client). The Arabic copy
// below is a first-pass professional-register translation (Modern Standard
// Arabic, adapted for the Mauritanian context) — it has NOT been reviewed by
// a native speaker or the client yet. Treat it as a solid draft, not final
// sign-off copy, before this goes live in production.

export type Lang = 'fr' | 'ar'

export interface ClientEntry {
  name: string
  logo: string
  desc: string
  tags: string[]
}

interface SectionCopy {
  line1: string
  line2: string
  para: string
}

export interface SiteContent {
  dir: 'ltr' | 'rtl'
  htmlLang: string
  documentTitle: string
  nav: { label: string; href: string }[]
  hero: { line1: string; line2: string; intro: string; cta: string }
  section00: { quote: string; subtitle: string; body: string }
  section01: SectionCopy & { caption1: string; caption2: string }
  section02: SectionCopy & { caption: string }
  section03: SectionCopy & { caption: string }
  section04: SectionCopy & {
    imageCaption: string
    polesTitle: string
    poles: { n: string; title: string; desc: string }[]
  }
  section05: { line1: string; line2: string }
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

const clientsFr: ClientEntry[] = [
  { name: 'UNICEF', logo: 'UNICEF', desc: "Accompagnement médiatique et production de contenus audiovisuels pour les campagnes de sensibilisation en Mauritanie.", tags: ['Audiovisuel', 'Digital', 'Campagne'] },
  { name: 'World Vision', logo: 'WORLD VISION', desc: "Production de reportages de terrain et diffusion via Tawatur pour les programmes humanitaires au Sahel.", tags: ['Reportage', 'Social media'] },
  { name: 'PAM & FAO', logo: 'PAM / FAO', desc: "Couverture médiatique des programmes alimentaires et agricoles, production de films institutionnels.", tags: ['Institutionnel', 'Vidéo'] },
  { name: 'SWEDD', logo: 'SWEDD', desc: "Stratégie de communication digitale et production de contenus pour le programme régional d'autonomisation des femmes.", tags: ['Stratégie', 'Digital', 'Genre'] },
  { name: 'SNIM', logo: 'SNIM', desc: "Communication corporate et couverture événementielle pour la Société Nationale Industrielle et Minière.", tags: ['Corporate', 'Événement'] },
  { name: 'Bankily – BPM', logo: 'BANKILY', desc: "Campagnes digitales de promotion du mobile banking et production de spots publicitaires.", tags: ['Pub', 'Digital', 'Finance'] },
  { name: 'VISA', logo: 'VISA', desc: "Activation de marque et production de contenus promotionnels pour le marché mauritanien.", tags: ['Branding', 'Activation'] },
  { name: 'GIMTEL', logo: 'GIMTEL', desc: "Refonte de communication institutionnelle et gestion des réseaux sociaux de la plateforme monétique.", tags: ['Social media', 'Institutionnel'] },
  { name: 'BPC', logo: 'BPC', desc: "Conseil en stratégie de communication et production de supports print et digitaux.", tags: ['Conseil', 'Print', 'Digital'] },
  { name: 'Grande Muraille Verte', logo: 'GRANDE MURAILLE VERTE', desc: "Couverture de terrain et productions documentaires sur l'initiative africaine de reforestation.", tags: ['Documentaire', 'RSE'] },
  { name: 'PEJ', logo: 'PEJ', desc: "Stratégie digitale et production multimédia pour le Programme Emplois des Jeunes en Mauritanie.", tags: ['Stratégie', 'Digital'] },
  { name: 'UBM', logo: 'UBM', desc: "Communication événementielle et gestion des réseaux sociaux de l'Union des Banques de Mauritanie.", tags: ['Événement', 'Social media'] },
  { name: 'Same Paris', logo: 'SAME PARIS', desc: "Identité visuelle et production de contenus pour le lancement mauritanien de la marque.", tags: ['Identité', 'Lancement'] },
  { name: 'Union Européenne', logo: 'UNION EUROPÉENNE', desc: "Couverture presse et production vidéo pour les programmes de développement financés par l'UE.", tags: ['Presse', 'Vidéo', 'Institutionnel'] },
  { name: 'Tasiast Mauritanie', logo: 'TASIAST', desc: "Communication RSE et reportages terrain pour la mine d'or de Tasiast.", tags: ['RSE', 'Reportage', 'Mine'] },
  { name: 'DipNdip', logo: 'DIPNDIP', desc: "Lancement de marque et stratégie de communication digitale pour l'ouverture sur le marché mauritanien.", tags: ['Branding', 'Digital', 'Food'] },
]

// Brand/organization names (logo wordmarks) stay in Latin script — that's how
// they're branded everywhere, Arabic-language contexts included.
const clientsAr: ClientEntry[] = [
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

export const content: Record<Lang, SiteContent> = {
  fr: {
    dir: 'ltr',
    htmlLang: 'fr',
    documentTitle: 'Kiirobi — Agence de communication et de production audiovisuelle',
    nav: [
      { label: 'À propos', href: '#section00' },
      { label: 'Nos valeurs', href: '#section01' },
      { label: 'Notre expertise', href: '#section04' },
      { label: 'Nos clients', href: '#section05' },
      { label: 'Contact', href: '#contact' },
    ],
    hero: {
      line1: "L'agence de communication",
      line2: 'qui connecte vos idées à vos publics',
      intro: "Kiirobi est une agence de communication spécialisée en Conseil, Création, Évènementiel, Élaboration et mise en place de stratégies web, communication digitale et production de contenus multimédias.",
      cta: "Découvrir l'agence",
    },
    section00: {
      quote: "« L'excellence et le sens du détail »",
      subtitle: 'comme devise fondamentale',
      body: "Basée en Mauritanie, Kiirobi intervient en tant que régie publicitaire et agence de production au niveau national et dans la sous-région. Kiirobi appuie son action de production audiovisuelle par la capitalisation sur l'expertise de son média digital Tawatur, première plateforme mauritanienne en termes de visibilité, de taux de pénétration et d'impact sur l'opinion publique.",
    },
    section01: {
      line1: 'KIIROBI EST',
      line2: 'EXCELLENTE.',
      para: "Un engagement envers l'excellence qui se reflète dans la qualité de nos productions. Plus de 12 000 vidéos produites et diffusées sur les réseaux sociaux via les canaux de notre média digital Tawatur.",
      caption1: 'Voir nos productions audiovisuelles — Studio Kiirobi',
      caption2: 'Accompagnement médiatique et audiovisuel — FAO, PAM, UNICEF',
    },
    section02: {
      line1: 'KIIROBI EST',
      line2: 'CRÉATIVE.',
      para: "Le Studio Kiirobi réunit une équipe multidisciplinaire de graphistes, web designers, développeurs, community managers et chefs de projet, dans un processus continu et interconnecté qui vise à fournir des solutions de communication de haute qualité, efficaces et personnalisées.",
      caption: "Création d'identités visuelles, motion design et contenus sur mesure",
    },
    section03: {
      line1: 'KIIROBI EST',
      line2: 'TRANSPARENTE.',
      para: "Un suivi attentif et un accompagnement étroit à chaque étape, pour maximiser les avantages de nos services. Nous croyons en une relation de long terme avec nos clients, dans le cadre d'une étroite collaboration avec des acteurs du secteur privé et public, des ONG internationales et les agences des Nations Unies.",
      caption: 'Coordination sur le terrain — SWEDD & Banque mondiale',
    },
    section04: {
      line1: 'KIIROBI EST',
      line2: 'TECHNOLOGIQUE.',
      para: "Nos équipements et compétences techniques couvrent l'intégralité de la chaîne de production : tournage multi-caméras, prises de vue par drone, studio professionnel, montage non linéaire et post-production audiovisuelle de haut niveau.",
      imageCaption: 'Studio de production — Kiirobi, Nouakchott',
      polesTitle: "Nous proposons 4 pôles d'expertise",
      poles: [
        { n: '01', title: 'Conseil & Stratégie', desc: 'Conseil éditorial / Stratégie de communication / Planning stratégique digital / Veille et e-réputation' },
        { n: '02', title: 'Digital & Web', desc: 'Web & webdesign / Social media management / Community management / Media planning / Traffic management' },
        { n: '03', title: 'Design & Branding', desc: 'Design graphique / Identité visuelle / Illustration / Branding et rebranding' },
        { n: '04', title: 'Production & Événementiel', desc: 'Production audiovisuelle TV/Web/Radio / Reportages / Motion design / Relations publiques / Événementiel' },
      ],
    },
    section05: { line1: 'ILS NOUS FONT', line2: 'CONFIANCE.' },
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
      { label: 'من نحن', href: '#section00' },
      { label: 'قيمنا', href: '#section01' },
      { label: 'خبراتنا', href: '#section04' },
      { label: 'عملاؤنا', href: '#section05' },
      { label: 'اتصل بنا', href: '#contact' },
    ],
    hero: {
      line1: 'وكالة الاتصال',
      line2: 'التي تربط أفكاركم بجمهوركم',
      intro: 'كيروبي وكالة اتصال متخصصة في الاستشارة والإبداع وتنظيم الفعاليات، وإعداد وتنفيذ استراتيجيات الويب والاتصال الرقمي وإنتاج المحتوى متعدد الوسائط.',
      cta: 'اكتشف الوكالة',
    },
    section00: {
      quote: '«التميّز والاهتمام بالتفاصيل»',
      subtitle: 'شعارنا الأساسي',
      body: 'تعمل كيروبي، ومقرها موريتانيا، كوكالة إعلانات وإنتاج على المستوى الوطني وفي دول الجوار. وتستند كيروبي في نشاطها في الإنتاج السمعي البصري إلى خبرة منصتها الرقمية تواتر، أولى المنصات الموريتانية من حيث الانتشار ونسبة الوصول والتأثير على الرأي العام.',
    },
    section01: {
      line1: 'كيروبي',
      line2: 'متميّزة.',
      para: 'التزام بالتميّز ينعكس في جودة إنتاجاتنا. أكثر من 12000 فيديو تم إنتاجها وبثها عبر شبكات التواصل الاجتماعي من خلال قنوات منصتنا الرقمية تواتر.',
      caption1: 'شاهدوا إنتاجاتنا السمعية البصرية — استوديو كيروبي',
      caption2: 'مواكبة إعلامية وسمعية بصرية — الفاو، برنامج الأغذية العالمي، اليونيسف',
    },
    section02: {
      line1: 'كيروبي',
      line2: 'مبدعة.',
      para: 'يجمع استوديو كيروبي فريقًا متعدد التخصصات من المصممين الجرافيكيين ومصممي المواقع والمطورين ومسؤولي التواصل الاجتماعي ومديري المشاريع، ضمن مسار عمل مستمر ومترابط يهدف إلى تقديم حلول اتصال عالية الجودة وفعالة ومخصصة.',
      caption: 'تصميم الهويات البصرية والموشن غرافيك والمحتوى حسب الطلب',
    },
    section03: {
      line1: 'كيروبي',
      line2: 'شفّافة.',
      para: 'متابعة دقيقة ومواكبة لصيقة في كل مرحلة، لتعظيم فوائد خدماتنا. نؤمن بعلاقة طويلة الأمد مع عملائنا، في إطار تعاون وثيق مع فاعلين من القطاعين الخاص والعام، والمنظمات غير الحكومية الدولية، ووكالات الأمم المتحدة.',
      caption: 'تنسيق ميداني — سويد والبنك الدولي',
    },
    section04: {
      line1: 'كيروبي',
      line2: 'تقنية.',
      para: 'تغطي معداتنا وكفاءاتنا التقنية كامل سلسلة الإنتاج: التصوير متعدد الكاميرات، والتصوير الجوي بالطائرات المسيّرة، والاستوديو الاحترافي، والمونتاج غير الخطي، وما بعد الإنتاج السمعي البصري عالي المستوى.',
      imageCaption: 'استوديو الإنتاج — كيروبي، نواكشوط',
      polesTitle: 'نقترح 4 مجالات خبرة',
      poles: [
        { n: '01', title: 'الاستشارة والاستراتيجية', desc: 'الاستشارة التحريرية / استراتيجية الاتصال / التخطيط الاستراتيجي الرقمي / الرصد والسمعة الإلكترونية' },
        { n: '02', title: 'الرقمنة والويب', desc: 'الويب وتصميم المواقع / إدارة وسائل التواصل الاجتماعي / إدارة المجتمعات الرقمية / التخطيط الإعلامي / إدارة حركة الزوار' },
        { n: '03', title: 'التصميم والهوية', desc: 'التصميم الجرافيكي / الهوية البصرية / الرسم التوضيحي / بناء وإعادة بناء الهوية' },
        { n: '04', title: 'الإنتاج وتنظيم الفعاليات', desc: 'الإنتاج السمعي البصري تلفزيون/ويب/راديو / التقارير الإخبارية / الموشن غرافيك / العلاقات العامة / تنظيم الفعاليات' },
      ],
    },
    section05: { line1: 'عملاؤنا', line2: 'يثقون بنا.' },
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
