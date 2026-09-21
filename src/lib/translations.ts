export type Language = "en" | "pid" | "fr" | "de" | "zh" | "ar";

export const translations = {
  // Hero Section
  hero_badge: { en: "Global Leader in Secure Recovery", pid: "The Number One Place for Secure Recovery", fr: "Leader mondial en récupération sécurisée", de: "Globale Führungskraft in sicherer Wiederherstellung", zh: "安全恢复的全球领导者", ar: "الرائد العالمي في الاسترداد الآمن" },
  hero_title_1: { en: "Recover What's", pid: "Recover Wetin", fr: "Récupérez ce qui est", de: "Finden Sie was", zh: "找回您的", ar: "استعد ما" },
  hero_title_2: { en: "Lost.", pid: "You Don Lose.", fr: "perdu.", de: "verloren ist.", zh: "丢失物品。", ar: "فقدته." },
  hero_subtitle: { en: "The secure, verified, and fastest way to recover your lost property and resolve disputes in Nigeria and across the globe.", pid: "The most secure, verified, and fastest way to recover your lost property and solve any wahala for Nigeria and across the globe.", fr: "Le moyen le plus sûr, vérifié et rapide de récupérer vos biens perdus et de résoudre les litiges au Nigeria et dans le monde.", de: "Der sicherste, verifizierte und schnellste Weg, um Ihr verlorenes Eigentum wiederzuerlangen und Streitigkeiten in Nigeria und weltweit zu lösen.", zh: "在尼日利亚及全球范围内，安全、可靠、最快地找回丢失财产并解决纠纷的方式。", ar: "الطريقة الأكثر أماناً وموثوقية وسرعة لاسترداد ممتلكاتك المفقودة وحل النزاعات في نيجيريا وحول العالم." },
  hero_search_placeholder: { en: "Enter your HLRS Tracking ID (e.g., HLRS-2026-001)", pid: "Enter your HLRS Tracking ID (e.g., HLRS-2026-001)", fr: "Entrez votre ID de suivi HLRS (ex: HLRS-2026-001)", de: "Geben Sie Ihre HLRS-Tracking-ID ein (z.B. HLRS-2026-001)", zh: "输入您的 HLRS 追踪 ID（例如：HLRS-2026-001）", ar: "أدخل معرف التتبع الخاص بك HLRS (مثال: HLRS-2026-001)" },
  hero_search_button: { en: "Track Now", pid: "Track Am Now", fr: "Suivre maintenant", de: "Jetzt verfolgen", zh: "立即追踪", ar: "تتبع الآن" },
  hero_search_note: { en: "Already have a Tracking ID? Enter it above to check your case status instantly.", pid: "You get Tracking ID? Enter am above to check your case status sharp sharp.", fr: "Vous avez déjà un ID de suivi ? Entrez-le ci-dessus pour vérifier l'état de votre dossier instantanément.", de: "Haben Sie bereits eine Tracking-ID? Geben Sie sie oben ein, um den Status Ihres Falls sofort zu überprüfen.", zh: "已有追踪 ID？在上方输入以立即检查您的案件状态。", ar: "هل لديك معرف تتبع بالفعل؟ أدخله أعلاه للتحقق من حالة قضيتك فوراً." },
  
  // Core Services (Hero Section)
  core_services_title: { en: "Our Core Services", pid: "Our Core Services", fr: "Nos Services Principaux", de: "Unsere Kernleistungen", zh: "我们的核心服务", ar: "خدماتنا الأساسية" },
  core_service_lost_found: { en: "Lost & Found Recovery", pid: "Lost & Found Recovery", fr: "Récupération d'objets perdus et trouvés", de: "Wiederherstellung verlorener und gefundener Gegenstände", zh: "失物招领恢复", ar: "استرداد المفقودات والموجودات" },
  core_service_litigation: { en: "Litigation Services", pid: "Litigation Services", fr: "Services de litige", de: "Prozessführungsdienste", zh: "诉讼服务", ar: "خدمات التقاضي" },
  core_service_arbitration: { en: "Arbitration", pid: "Arbitration", fr: "Arbitrage", de: "Schiedsverfahren", zh: "仲裁", ar: "التحكيم" },
  core_service_adr: { en: "Alternative Dispute Resolution (ADR)", pid: "Alternative Dispute Resolution (ADR)", fr: "Modes alternatifs de règlement des différends (MARD)", de: "Alternative Streitbeilegung (ADR)", zh: "替代性争议解决 (ADR)", ar: "طرق بديلة لحل النزاعات (ADR)" },
  core_service_odr: { en: "Online Dispute Resolution (ODR)", pid: "Online Dispute Resolution (ODR)", fr: "Règlement des différends en ligne (RDL)", de: "Online-Streitbeilegung (ODR)", zh: "在线争议解决 (ODR)", ar: "تسوية المنازعات عبر الإنترنت (ODR)" },

  // Quick Actions
  action_track: { en: "Reference ID", pid: "Reference ID", fr: "ID de Référence", de: "Referenz-ID", zh: "参考 ID", ar: "معرف المرجع" },
  action_report: { en: "Found/Report", pid: "Find/Report", fr: "Trouvé/Signaler", de: "Gefunden/Melden", zh: "找到/报告", ar: "موجود/إبلاغ" },
  action_complaint: { en: "Lost/Complaint", pid: "Lost/Complain", fr: "Perdu/Plainte", de: "Verloren/Beschwerde", zh: "丢失/投诉", ar: "مفقود/شكوى" },
  
  // ✅ UPDATED: Changed from "Flagged Items" to "Claim Your Item"
  action_flagged: { en: "Claim Your Item", pid: "Claim Your Item", fr: "Réclamer votre article", de: "Ihren Artikel beanspruchen", zh: "认领您的物品", ar: "اطلب عنصر الخاص بك" },
  
  // ✅ NEW: Added for the button inside the Claim page
  claim_an_item_btn: { en: "Claim an Item", pid: "Claim an Item", fr: "Réclamer un article", de: "Einen Artikel beanspruchen", zh: "认领物品", ar: "اطلب عنصراً" },
  
  action_legal: { en: "Legal Services", pid: "Legal Services", fr: "Services juridiques", de: "Rechtsdienstleistungen", zh: "法律服务", ar: "الخدمات القانونية" },
  action_contact: { en: "Contact", pid: "Contact Us", fr: "Contact", de: "Kontakt", zh: "联系我们", ar: "اتصل بنا" },
  
  // Trust Badges
  badge_cac: { en: "CAC Registered: RC 9578175", pid: "CAC Registered: RC 9578175", fr: "Enregistré CAC: RC 9578175", de: "CAC Registriert: RC 9578175", zh: "CAC 注册: RC 9578175", ar: "مسجل في CAC: RC 9578175" },
  badge_ndpr: { en: "NDPR Data Compliant", pid: "NDPR Data Compliant", fr: "Conforme aux données NDPR", de: "NDPR-Datenkonform", zh: "符合 NDPR 数据标准", ar: "متوافق مع بيانات NDPR" },
  badge_ssl: { en: "256-Bit Secure Encryption", pid: "256-Bit Secure Encryption", fr: "Chiffrement sécurisé 256 bits", de: "256-Bit sichere Verschlüsselung", zh: "256位安全加密", ar: "تشفير آمن 256 بت" },
  badge_support: { en: "24/7 Verified Support", pid: "24/7 Verified Support", fr: "Support vérifié 24/7", de: "24/7 verifizierter Support", zh: "24/7 验证支持", ar: "دعم موثوق على مدار الساعة" },

  // Footer
  footer_newsletter_title: { en: "Stay Updated", pid: "Stay Updated", fr: "Restez informé", de: "Bleiben Sie auf dem Laufenden", zh: "保持更新", ar: "ابق على اطلاع" },
  footer_newsletter_desc: { en: "Get the latest recovery tips and company news.", pid: "Get the latest recovery tips and company news.", fr: "Obtenez les derniers conseils de récupération et les nouvelles de l'entreprise.", de: "Erhalten Sie die neuesten Wiederherstellungstipps und Unternehmensnachrichten.", zh: "获取最新的恢复提示和公司新闻。", ar: "احصل على أحدث نصائح الاسترداد وأخبار الشركة." },
  footer_newsletter_input: { en: "Enter your email", pid: "Enter your email", fr: "Entrez votre email", de: "Geben Sie Ihre E-Mail ein", zh: "输入您的电子邮件", ar: "أدخل بريدك الإلكتروني" },
  footer_newsletter_button: { en: "Subscribe", pid: "Subscribe", fr: "S'abonner", de: "Abonnieren", zh: "订阅", ar: "اشترك" },
  footer_newsletter_error: { en: "Please enter a valid email address", pid: "Please enter a valid email address", fr: "Veuillez entrer une adresse e-mail valide", de: "Bitte geben Sie eine gültige E-Mail-Adresse ein", zh: "请输入有效的电子邮件地址", ar: "يرجى إدخال عنوان بريد إلكتروني صالح" },
  
  footer_col_company: { en: "Company", pid: "Company", fr: "Entreprise", de: "Unternehmen", zh: "公司", ar: "الشركة" },
  footer_col_services: { en: "Services", pid: "Services", fr: "Services", de: "Dienstleistungen", zh: "服务", ar: "الخدمات" },
  footer_col_legal: { en: "Legal", pid: "Legal", fr: "Juridique", de: "Rechtliches", zh: "法律", ar: "قانوني" },
  footer_col_contact: { en: "Contact", pid: "Contact Us", fr: "Contact", de: "Kontakt", zh: "联系我们", ar: "اتصل بنا" },

  footer_link_about: { en: "About Us", pid: "About Us", fr: "À propos", de: "Über uns", zh: "关于我们", ar: "من نحن" },
  footer_link_careers: { en: "Careers", pid: "Careers", fr: "Carrières", de: "Karriere", zh: "职业", ar: "وظائف" },
  footer_link_press: { en: "Press", pid: "Press", fr: "Presse", de: "Presse", zh: "新闻", ar: "صحافة" },
  footer_link_contact: { en: "Contact", pid: "Contact Us", fr: "Contact", de: "Kontakt", zh: "联系我们", ar: "اتصل بنا" },
  footer_link_lost: { en: "Lost/Complaint", pid: "Lost/Complain", fr: "Perdu/Plainte", de: "Verloren/Beschwerde", zh: "丢失/投诉", ar: "مفقود/شكوى" },
  footer_link_found: { en: "Found/Report", pid: "Find/Report", fr: "Trouvé/Signaler", de: "Gefunden/Melden", zh: "找到/报告", ar: "موجود/إبلاغ" },
  footer_link_legal: { en: "Legal Services", pid: "Legal Services", fr: "Services juridiques", de: "Rechtsdienstleistungen", zh: "法律服务", ar: "الخدمات القانونية" },
  footer_link_track: { en: "Track ID", pid: "Track ID", fr: "ID de suivi", de: "Tracking-ID", zh: "追踪 ID", ar: "معرف التتبع" },
  footer_link_privacy: { en: "Privacy Policy", pid: "Privacy Policy", fr: "Politique de confidentialité", de: "Datenschutzrichtlinie", zh: "隐私政策", ar: "سياسة الخصوصية" },
  footer_link_terms: { en: "Terms of Service", pid: "Terms of Service", fr: "Conditions d'utilisation", de: "Nutzungsbedingungen", zh: "服务条款", ar: "شروط الخدمة" },
  footer_link_cookies: { en: "Cookie Policy", pid: "Cookie Policy", fr: "Politique des cookies", de: "Cookie-Richtlinie", zh: "Cookie 政策", ar: "سياسة ملفات تعريف الارتباط" },

  footer_badge_ssl: { en: "256-Bit SSL Encrypted", pid: "256-Bit SSL Encrypted", fr: "Chiffré SSL 256 bits", de: "256-Bit SSL-verschlüsselt", zh: "256位 SSL 加密", ar: "مشفر SSL 256 بت" },
  footer_badge_ssl_sub: { en: "Secure Connection", pid: "Secure Connection", fr: "Connexion sécurisée", de: "Sichere Verbindung", zh: "安全连接", ar: "اتصال آمن" },
  footer_badge_cac: { en: "CAC Registered: RC 9578175", pid: "CAC Registered: RC 9578175", fr: "Enregistré CAC: RC 9578175", de: "CAC Registriert: RC 9578175", zh: "CAC 注册: RC 9578175", ar: "مسجل في CAC: RC 9578175" },
  footer_badge_cac_sub: { en: "Officially Mandated", pid: "Officially Mandated", fr: "Officiellement mandaté", de: "Offiziell beauftragt", zh: "官方授权", ar: "مفوض رسمياً" },
  footer_badge_ndpr: { en: "NDPR Compliant", pid: "NDPR Compliant", fr: "Conforme au NDPR", de: "NDPR-konform", zh: "符合 NDPR", ar: "متوافق مع NDPR" },
  footer_badge_ndpr_sub: { en: "Data Protection", pid: "Data Protection", fr: "Protection des données", de: "Datenschutz", zh: "数据保护", ar: "حماية البيانات" },
  footer_badge_paystack: { en: "Paystack Verified", pid: "Paystack Verified", fr: "Vérifié par Paystack", de: "Von Paystack verifiziert", zh: "Paystack 验证", ar: "تم التحقق من Paystack" },
  footer_badge_paystack_sub: { en: "Secure Payments", pid: "Secure Payments", fr: "Paiements sécurisés", de: "Sichere Zahlungen", zh: "安全支付", ar: "مدفوعات آمنة" },

  footer_about_text: { en: "Global leader in secure recovery. We provide the fastest, most verified way to recover lost property and resolve legal disputes.", pid: "The number one place for secure recovery. We dey provide the fastest and most verified way to recover lost property and settle legal wahala.", fr: "Leader mondial de la récupération sécurisée. Nous offrons le moyen le plus rapide et le plus vérifié de récupérer les biens perdus et de résoudre les litiges juridiques.", de: "Weltweiter Marktführer in der sicheren Wiederherstellung. Wir bieten den schnellsten und verifiziertesten Weg, um verlorenes Eigentum wiederzuerlangen und Rechtsstreitigkeiten beizulegen.", zh: "安全恢复的全球领导者。我们提供最快速、最可靠的找回丢失财产和解决法律纠纷的方式。", ar: "الرائد العالمي في الاسترداد الآمن. نحن نوفر أسرع وأكثر الطرق موثوقية لاسترداد الممتلكات المفقودة وحل النزاعات القانونية." },
  footer_rights: { en: "All rights reserved.", pid: "All rights reserved.", fr: "Tous droits réservés.", de: "Alle Rechte vorbehalten.", zh: "版权所有。", ar: "جميع الحقوق محفوظة." },
  footer_privacy: { en: "Privacy", pid: "Privacy", fr: "Confidentialité", de: "Datenschutz", zh: "隐私", ar: "الخصوصية" },
  footer_terms: { en: "Terms", pid: "Terms", fr: "Conditions", de: "Bedingungen", zh: "条款", ar: "الشروط" },
  footer_cookies: { en: "Cookies", pid: "Cookies", fr: "Cookies", de: "Cookies", zh: "Cookie", ar: "ملفات تعريف الارتباط" },

  // About Page
  about_badge: { en: "About Us", pid: "About Us", fr: "À propos", de: "Über uns", zh: "关于我们", ar: "من نحن" },
  about_hero_text: { en: "Global leader in secure recovery. We provide the fastest, most verified way to recover lost property and resolve legal disputes in Nigeria and across the globe.", pid: "The number one place for secure recovery. We dey provide the fastest and most verified way to recover lost property and settle legal wahala for Nigeria and across the globe.", fr: "Leader mondial de la récupération sécurisée. Nous offrons le moyen le plus rapide et le plus vérifié de récupérer les biens perdus et de résoudre les litiges juridiques au Nigeria et dans le monde.", de: "Weltweiter Marktführer in der sicheren Wiederherstellung. Wir bieten den schnellsten und verifiziertesten Weg, um verlorenes Eigentum wiederzuerlangen und Rechtsstreitigkeiten in Nigeria und weltweit beizulegen.", zh: "安全恢复的全球领导者。我们提供最快速、最可靠的在尼日利亚及全球范围内找回丢失财产和解决法律纠纷的方式。", ar: "الرائد العالمي في الاسترداد الآمن. نحن نوفر أسرع وأكثر الطرق موثوقية لاسترداد الممتلكات المفقودة وحل النزاعات القانونية في نيجيريا وحول العالم." },
  about_rc_label: { en: "RC Number", pid: "RC Number", fr: "Numéro RC", de: "RC-Nummer", zh: "RC 编号", ar: "رقم RC" },
  about_hq_label: { en: "Headquarters", pid: "Headquarters", fr: "Siège social", de: "Hauptsitz", zh: "总部", ar: "المقر الرئيسي" },
  
  about_mission_title: { en: "Our Mission", pid: "Our Mission", fr: "Notre Mission", de: "Unsere Mission", zh: "我们的使命", ar: "مهمتنا" },
  about_mission_desc: { en: "To provide a secure, transparent, and highly efficient platform for the recovery of lost property and the resolution of legal disputes. We are committed to restoring peace of mind to individuals and businesses through verified, professional, and compassionate service.", pid: "To provide a secure, transparent, and highly efficient platform for the recovery of lost property and the resolution of legal disputes. We dey commit to restoring peace of mind to individuals and businesses through verified, professional, and compassionate service.", fr: "Fournir une plateforme sécurisée, transparente et très efficace pour la récupération des biens perdus et la résolution des litiges juridiques. Nous nous engageons à redonner la tranquillité d'esprit aux particuliers et aux entreprises grâce à un service vérifié, professionnel et compatissant.", de: "Bereitstellung einer sicheren, transparenten und hocheffizienten Plattform für die Wiedererlangung von verlorenem Eigentum und die Beilegung von Rechtsstreitigkeiten. Wir sind bestrebt, Einzelpersonen und Unternehmen durch verifizierten, professionellen und mitfühlenden Service wieder Ruhe zu verschaffen.", zh: "提供一个安全、透明、高效的平台，用于找回丢失财产和解决法律纠纷。我们致力于通过经过验证的、专业的和富有同情心的服务，为个人和企业恢复安心。", ar: "توفير منصة آمنة وشفافة وفعالة للغاية لاسترداد الممتلكات المفقودة وحل النزاعات القانونية. نحن ملتزمون بإعادة راحة البال للأفراد والشركات من خلال خدمة موثقة ومهنية ومتعاطفة." },
  
  about_vision_title: { en: "Our Vision", pid: "Our Vision", fr: "Notre Vision", de: "Unsere Vision", zh: "我们的愿景", ar: "رؤيتنا" },
  about_vision_desc: { en: "To be the most trusted and recognized recovery and legal services provider in Africa, setting the global standard for integrity, speed, and technological innovation in asset recovery and dispute resolution.", pid: "To be the most trusted and recognized recovery and legal services provider in Africa, setting the global standard for integrity, speed, and technological innovation in asset recovery and dispute resolution.", fr: "Être le fournisseur de services de récupération et juridiques le plus fiable et reconnu en Afrique, établissant la norme mondiale en matière d'intégrité, de rapidité et d'innovation technologique dans la récupération d'actifs et la résolution des litiges.", de: "Der vertrauenswürdigste und anerkannteste Anbieter von Wiederherstellungs- und Rechtsdienstleistungen in Afrika zu sein und den globalen Standard für Integrität, Geschwindigkeit und technologische Innovation bei der Vermögenswiedererlangung und Streitbeilegung zu setzen.", zh: "成为非洲最受信任和认可的法律和恢复服务提供商，在资产追回和纠纷解决方面树立诚信、速度和技术创新的全球标准。", ar: "أن نكون مزود خدمات الاسترداد والخدمات القانونية الأكثر موثوقية واعترافاً في أفريقيا، ونضع المعيار العالمي للنزاهة والسرعة والابتكار التكنولوجي في استرداد الأصول وحل النزاعات." },

  about_values_title: { en: "Our Core Values", pid: "Our Core Values", fr: "Nos Valeurs Fondamentales", de: "Unsere Kernwerte", zh: "我们的核心价值观", ar: "قيمنا الأساسية" },
  about_values_desc: { en: "The principles that guide every action we take and every case we handle at Homeland Recovery Services Ltd.", pid: "The principles that guide every action we take and every case we handle at Homeland Recovery Services Ltd.", fr: "Les principes qui guident chaque action que nous entreprenons et chaque dossier que nous traitons chez Homeland Recovery Services Ltd.", de: "Die Prinzipien, die jede Handlung leiten, die wir unternehmen, und jeden Fall, den wir bei Homeland Recovery Services Ltd. bearbeiten.", zh: "指导我们在 Homeland Recovery Services Ltd 采取的每一项行动和处理的每一个案件的原则。", ar: "المبادئ التي توجه كل إجراء نتخذه وكل قضية نتعامل معها في شركة هوملاند ريكفري سيرفيسز المحدودة." },

  about_val_integrity: { en: "Integrity", pid: "Integrity", fr: "Intégrité", de: "Integrität", zh: "诚信", ar: "النزاهة" },
  about_val_integrity_desc: { en: "We operate with absolute honesty and transparency in every transaction and interaction.", pid: "We operate with absolute honesty and transparency in every transaction and interaction.", fr: "Nous opérons avec une honnêteté et une transparence absolues dans chaque transaction et interaction.", de: "Wir arbeiten mit absoluter Ehrlichkeit und Transparenz in jeder Transaktion und Interaktion.", zh: "我们在每一次交易和互动中都保持绝对的诚实和透明。", ar: "نحن نعمل بصدق وشفافية مطلقة في كل معاملة وتفاعل." },
  
  about_val_client: { en: "Client-Centric", pid: "Client-Centric", fr: "Centré sur le client", de: "Kundenorientiert", zh: "以客户为中心", ar: "التركيز على العميل" },
  about_val_client_desc: { en: "Your peace of mind is our priority. We tailor our approach to meet your unique needs.", pid: "Your peace of mind is our priority. We tailor our approach to meet your unique needs.", fr: "Votre tranquillité d'esprit est notre priorité. Nous adaptons notre approche pour répondre à vos besoins uniques.", de: "Ihre Ruhe ist unsere Priorität. Wir passen unseren Ansatz an, um Ihre einzigartigen Bedürfnisse zu erfüllen.", zh: "您的安心是我们的首要任务。我们量身定制方法以满足您的独特需求。", ar: "راحة بالك هي أولويتنا. نحن نخصص نهجنا لتلبية احتياجاتك الفريدة." },
  
  about_val_excellence: { en: "Excellence", pid: "Excellence", fr: "Excellence", de: "Exzellenz", zh: "卓越", ar: "التميز" },
  about_val_excellence_desc: { en: "We maintain the highest professional standards in recovery and legal services.", pid: "We maintain the highest professional standards in recovery and legal services.", fr: "Nous maintenons les plus hauts standards professionnels dans les services de récupération et juridiques.", de: "Wir halten die höchsten professionellen Standards in Wiederherstellungs- und Rechtsdienstleistungen aufrecht.", zh: "我们在恢复和法律服务中保持最高的专业标准。", ar: "نحن نحافظ على أعلى المعايير المهنية في خدمات الاسترداد والخدمات القانونية." },
  
  about_val_efficiency: { en: "Efficiency", pid: "Efficiency", fr: "Efficacité", de: "Effizienz", zh: "效率", ar: "الكفاءة" },
  about_val_efficiency_desc: { en: "Time is critical. Our streamlined processes ensure rapid, effective results.", pid: "Time is critical. Our streamlined processes ensure rapid, effective results.", fr: "Le temps est crucial. Nos processus rationalisés garantissent des résultats rapides et efficaces.", de: "Zeit ist kritisch. Unsere optimierten Prozesse gewährleisten schnelle, effektive Ergebnisse.", zh: "时间至关重要。我们简化的流程确保快速、有效的结果。", ar: "الوقت حاسم. تضمن عملياتنا المبسطة نتائج سريعة وفعالة." },
  
  about_val_confidentiality: { en: "Confidentiality", pid: "Confidentiality", fr: "Confidentialité", de: "Vertraulichkeit", zh: "保密性", ar: "السرية" },
  about_val_confidentiality_desc: { en: "Your data and case details are protected with enterprise-grade security.", pid: "Your data and case details are protected with enterprise-grade security.", fr: "Vos données et les détails de votre dossier sont protégés par une sécurité de niveau entreprise.", de: "Ihre Daten und Falldetails werden mit Sicherheit auf Unternehmensniveau geschützt.", zh: "您的数据和案件详情受到企业级安全保护。", ar: "بياناتك وتفاصيل قضيتك محمية بأمان على مستوى المؤسسات." },
  
  about_val_accountability: { en: "Accountability", pid: "Accountability", fr: "Responsabilité", de: "Verantwortlichkeit", zh: "问责制", ar: "المساءلة" },
  about_val_accountability_desc: { en: "We take full responsibility for our actions and deliver on our promises.", pid: "We take full responsibility for our actions and deliver on our promises.", fr: "Nous assumons l'entière responsabilité de nos actions et tenons nos promesses.", de: "Wir übernehmen die volle Verantwortung für unsere Handlungen und halten unsere Versprechen ein.", zh: "我们对我们的行为承担全部责任并兑现我们的承诺。", ar: "نحن نتحمل المسؤولية الكاملة عن أفعالنا ونفي بوعودنا." },

  about_cta_title: { en: "Ready to Work With Homeland Recovery Services Ltd?", pid: "Ready to Work With Homeland Recovery Services Ltd?", fr: "Prêt à travailler avec Homeland Recovery Services Ltd ?", de: "Bereit, mit Homeland Recovery Services Ltd. zusammenzuarbeiten?", zh: "准备好与 Homeland Recovery Services Ltd 合作了吗？", ar: "هل أنت مستعد للعمل مع شركة هوملاند ريكفري سيرفيسز المحدودة؟" },
  about_cta_desc: { en: "Reach out to our team today for a confidential consultation. We are here to help you recover what matters most.", pid: "Reach out to our team today for a confidential consultation. We are here to help you recover what matters most.", fr: "Contactez notre équipe dès aujourd'hui pour une consultation confidentielle. Nous sommes là pour vous aider à récupérer ce qui compte le plus.", de: "Wenden Sie sich noch heute an unser Team für eine vertrauliche Beratung. Wir sind hier, um Ihnen zu helfen, das zurückzugewinnen, was am wichtigsten ist.", zh: "立即联系我们的团队进行保密咨询。我们在这里帮助您找回最重要的东西。", ar: "تواصل مع فريقنا اليوم للحصول على استشارة سرية. نحن هنا لمساعدتك في استرداد ما يهمك أكثر." },
  about_cta_whatsapp: { en: "WhatsApp Us", pid: "WhatsApp Us", fr: "WhatsApp", de: "WhatsApp", zh: "WhatsApp", ar: "واتساب" },
  about_cta_email: { en: "Email Us", pid: "Email Us", fr: "Envoyez-nous un e-mail", de: "E-Mail senden", zh: "给我们发电子邮件", ar: "راسلنا عبر البريد الإلكتروني" }
} as const;