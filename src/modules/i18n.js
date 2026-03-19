// ── Translation dictionary ──
const TRANSLATIONS = {
  en: {
    'meta.title':       'arifAI Solutions \u2014 Wise AI. Built for Your Business.',
    'meta.description': 'arifAI Solutions builds custom AI applications, automations, and intelligent agents \u2014 tailored to how your business actually works.',
    'meta.og.title':    'arifAI Solutions \u2014 Wise AI. Built for Your Business.',
    'meta.og.desc':     'We build custom AI applications, automations, and intelligent agents tailored to how your business actually works. Practical AI for SMEs in Malaysia.',

    'nav.services':   'Services',
    'nav.howwework':  'How We Work',
    'nav.about':      'About',
    'nav.contact':    'Contact',
    'nav.cta':        "Let's Talk",

    'hero.headline': '<span class="hero-word" style="--wd:0s"><em>Wise</em></span> <span class="hero-word" style="--wd:0.08s"><em>AI.</em></span> <span class="hero-word" style="--wd:0.16s">Built</span> <span class="hero-word" style="--wd:0.24s">for</span><br aria-hidden="true"> <span class="hero-word" style="--wd:0.32s">Your</span> <span class="hero-word" style="--wd:0.40s">Business.</span>',
    'hero.headline.aria': 'Wise AI. Built for Your Business.',
    'hero.sub':        'arifAI Solutions builds custom AI applications, automations, and intelligent agents \u2014 tailored to how your business actually works.',
    'hero.cta.primary':   'Start a Project',
    'hero.cta.secondary': 'See Our Services',
    'hero.scroll':        'Scroll',
    'hero.chip.petronas': 'PETRONAS',
    'hero.chip.exxon':    'ExxonMobil',
    'hero.chip.yrs':      '13 yrs data sci',
    'hero.chip.value':    '$60M+ optimised',

    'services.label':    'What We Do',
    'services.heading':  '<span class="section-word" style="--sw-delay:0s">AI</span> <span class="section-word" style="--sw-delay:0.1s">that</span> <span class="section-word" style="--sw-delay:0.2s">fits</span> <span class="section-word" style="--sw-delay:0.3s">your</span> <span class="section-word" style="--sw-delay:0.4s">world</span> \u2014<br><span class="section-word" style="--sw-delay:0.5s">not</span> <span class="section-word" style="--sw-delay:0.6s">the</span> <span class="section-word" style="--sw-delay:0.7s">other</span> <span class="section-word" style="--sw-delay:0.8s">way</span> <span class="section-word" style="--sw-delay:0.9s">around.</span>',
    'services.card1.name': 'Custom AI Apps',
    'services.card1.desc': 'Bespoke applications built around your workflow \u2014 not generic tools retrofitted to your needs.',
    'services.card2.name': 'AI Consulting',
    'services.card2.desc': 'Strategy and roadmapping for businesses ready to adopt AI purposefully, with a clear path forward.',
    'services.card3.name': 'Automation & Integration',
    'services.card3.desc': 'Connect AI to your existing tools and processes \u2014 seamless, reliable, and built to scale with you.',
    'services.card4.name': 'AI Agents & Chatbots',
    'services.card4.desc': 'Intelligent assistants that handle queries, qualify leads, and work tirelessly \u2014 even while you sleep.',

    'who.tag': 'Who We Help',
    'who.heading': 'Does any of this',
    'who.heading-em': 'sound familiar?',
    'who.pain1': 'Your team spends hours every week manually compiling reports or updating spreadsheets',
    'who.pain2': 'Customers ask the same questions repeatedly — and your staff handles every single one',
    'who.pain3': "Your business tools don't connect — data lives in silos and nothing syncs automatically",
    'who.pain4': "You know AI could help your business — but you don't know where to begin or who to trust",
    'who.res-heading': "You're in the",
    'who.res-heading-gold': 'right place.',
    'who.body1': 'arifAI Solutions works with <strong>Malaysian SMEs</strong> to turn these exact frustrations into working AI solutions — practical, affordable, and built around how your business actually runs.',
    'who.body2': 'No jargon. No enterprise contracts. Just <strong>focused work that solves real problems</strong> — from someone who has spent 13 years doing exactly that at PETRONAS and ExxonMobil.',
    'who.pill1': 'Custom AI Apps',
    'who.pill2': 'Automation',
    'who.pill3': 'AI Chatbots',
    'who.pill4': 'Strategy & Consulting',
    'who.cta': 'See how we work',

    'services.use-label': 'e.g.',
    'services.ai-apps.use1': 'Auto-generated weekly performance reports',
    'services.ai-apps.use2': 'AI-powered invoice processing & approval',
    'services.ai-apps.use3': 'Smart inventory dashboards with alerts',
    'services.chatbots.use1': 'Customer FAQ bot for WhatsApp or website',
    'services.chatbots.use2': 'Internal HR & policy query assistant',
    'services.chatbots.use3': 'Appointment booking & follow-up agent',
    'services.automation.use1': 'Sync CRM, accounting & ops platforms',
    'services.automation.use2': 'Auto-trigger workflows on form submissions',
    'services.automation.use3': 'Cross-system reporting pipelines',
    'services.consulting.use1': 'AI opportunity mapping workshop',
    'services.consulting.use2': 'Build-vs-buy tool evaluation',
    'services.consulting.use3': '12-month AI roadmap for your team',

    'marquee.1': 'Custom AI Apps',
    'marquee.2': 'AI Consulting',
    'marquee.3': 'Automation &amp; Integration',
    'marquee.4': 'AI Agents &amp; Chatbots',
    'marquee.5': 'Workflow Automation',
    'marquee.6': 'Business AI Strategy',
    'marquee.7': 'Tailored Solutions',
    'marquee.8': 'Human-First AI',

    'hww.label':       'Our Process',
    'hww.heading':     'How We Work',
    'hww.step1.title': 'Understand',
    'hww.step1.desc':  'We listen first. Deep dive into your business, your challenges, and the goals that matter most to you.',
    'hww.step2.title': 'Build',
    'hww.step2.desc':  'We design and develop a tailored AI solution, iterating closely with you every step of the way.',
    'hww.step3.title': 'Deploy & Support',
    'hww.step3.desc':  'We launch, measure, and continuously improve your solution \u2014 long after the first day goes live.',

    'about.tag':       'About Us',
    'about.heading':   '<span class="section-word" style="--sw-delay:0s">Enterprise</span> <span class="section-word" style="--sw-delay:0.1s">expertise,</span><br><span class="section-word" style="--sw-delay:0.2s">built</span> <span class="section-word" style="--sw-delay:0.3s">for</span> <span class="section-word" style="--sw-delay:0.4s">everyone.</span>',
    'about.subheading':'Built on wisdom. Delivered with care.',
    'about.photo.alt': 'Qamarul Arifin bin Abd Manan, Founder of arifAI Solutions',
    'about.text':      '<em>arif</em> is personal \u2014 it\'s a piece of my name, Arifin. But it also means <em>wise</em> in Bahasa Malaysia and Arabic. That double meaning captures exactly what I\'m here to build.<br><br>I spent 13 years as a data scientist and optimisation specialist at PETRONAS and ExxonMobil \u2014 building AI-powered systems that global energy companies run on. High-stakes, complex, and genuinely impactful work at scale.<br><br>What I kept seeing was the gap. The same capability optimising billion-dollar operations wasn\'t reaching the business owner down the street \u2014 the F&amp;B entrepreneur, the logistics SME, the independent professional who could transform their business with the right AI, but had no way in.<br><br><strong>arifAI Solutions exists to close that gap.</strong> Enterprise-grade thinking, without the enterprise price tag or complexity \u2014 for businesses in Melaka, across Malaysia, and beyond.',

    'why.label':       'Why arifAI',
    'why.heading':     '<span class="section-word" style="--sw-delay:0s">The</span> <span class="section-word" style="--sw-delay:0.1s">difference</span> <span class="section-word" style="--sw-delay:0.2s">you\'ll</span> <span class="section-word" style="--sw-delay:0.3s">feel</span><br><span class="section-word" style="--sw-delay:0.4s">from</span> <span class="section-word" style="--sw-delay:0.5s">day</span> <span class="section-word" style="--sw-delay:0.6s">one.</span>',
    'why.pillar1.title': 'Wisdom over hype',
    'why.pillar1.desc':  'We ask "should you?" before "how do we?" \u2014 so you only invest in AI that actually fits your business.',
    'why.pillar2.title': 'Your partner, not your vendor',
    'why.pillar2.desc':  'From strategy to launch to long-term support, we measure success by your outcomes \u2014 not just deliverables.',
    'why.pillar3.title': 'Built for SMEs, not enterprises',
    'why.pillar3.desc':  'No bloated playbooks. We understand the constraints of real businesses and build accordingly.',

    'track.label':        'Track Record',
    'track.heading':      'Enterprise-grade results.<br>Now within your reach.',
    'track.stat1.number': '$60M+',
    'track.stat1.desc':   'Annual value captured through advanced data science solutions \u2014 a multivariate forecasting tool that transformed product inventory planning, combined with ML-driven optimisation of refinery sales channels across global operations.',
    'track.stat1.source': 'ExxonMobil \u00a0\u00b7\u00a0 Data Scientist',
    'track.stat2.number': '10+',
    'track.stat2.desc':   'Real-time optimisation applications built and deployed across energy and manufacturing sites in the United States, Europe and Asia-Pacific \u2014 each sustaining measurable, ongoing operational improvements at industrial scale.',
    'track.stat2.source': 'ExxonMobil \u00a0\u00b7\u00a0 Global Operations',
    'track.stat3.number': '13 yrs',
    'track.stat3.desc':   'From Advanced Process Control at the PETRONAS Melaka refinery to enterprise AI systems at ExxonMobil \u2014 solving high-stakes data and optimisation problems for global energy companies. Now applying that same rigour to your business.',
    'track.stat3.source': 'PETRONAS \u00a0\u00b7\u00a0 ExxonMobil \u00a0\u00b7\u00a0 AFED Digital',
    'track.note':         'The same rigour that moved the needle for billion-dollar operations \u2014 now applied to yours.',
    'track.case1': '"Engineered AI optimisation models that directly improved production economics across upstream operations"',
    'track.case2': '"Led data science initiatives across exploration, production, and commercial functions at two of the world\'s largest energy companies"',
    'track.case3': '"From discovery to working solution — built around your business, not a generic template"',

    'faq.tag': 'FAQ',
    'faq.heading': 'Questions we',
    'faq.heading-em': 'always get asked',
    'faq.q1': 'How long does a typical project take?',
    'faq.a1': 'Most projects go from discovery to a working solution in 4–8 weeks. A chatbot or automation can be live in as little as 2 weeks. Complex custom apps may take 2–3 months. We\'ll give you a clear timeline before we start.',
    'faq.q2': 'Do I need technical knowledge to work with you?',
    'faq.a2': 'Not at all. We translate between your business needs and the technology. You describe the problem; we figure out the solution. We keep you informed in plain language throughout.',
    'faq.q3': 'What does it cost?',
    'faq.a3': 'Pricing depends on scope. Simple automations start from a few thousand ringgit. Custom apps and agent deployments are scoped individually. The first call is always free — book it and we\'ll give you an honest estimate.',
    'faq.q4': 'Can you work with the tools we already use?',
    'faq.a4': 'Yes. We integrate with most common business tools — Google Workspace, Microsoft 365, WhatsApp, accounting software, CRMs, and more. We build around your existing stack, not around ours.',

    'contact.heading':      'Ready to bring <em>AI</em> into<br>your business?',
    'contact.sub':          "Let's have a conversation. No jargon, no pressure \u2014 just honest advice about what AI can genuinely do for you.",
    'contact.form.subject': 'New enquiry \u2014 arifAI Solutions',
    'contact.name.label':   'Your name',
    'contact.company.label':'Business / Company',
    'contact.message.label':'How can we help?',
    'contact.email.label':  'Your email',
    'contact.submit':       'Send Message',
    'contact.alt':          'Or email us directly at <a href="mailto:arifin@arifaisolutions.com">arifin@arifaisolutions.com</a>',

    'footer.copy': '&copy; 2026 arifAI Solutions. All rights reserved.',

    'js.sending': 'Sending\u2026',
    'js.success': "Message sent \u2014 we'll be in touch soon.",
    'js.send':    'Send Message',
    'js.error':   'Something went wrong. Please email us directly at arifin@arifaisolutions.com',
  },

  ms: {
    'meta.title':       'arifAI Solutions \u2014 AI Bijak. Dibina untuk Perniagaan Anda.',
    'meta.description': 'arifAI Solutions membina aplikasi AI khas, automasi, dan ejen pintar \u2014 disesuaikan dengan cara perniagaan anda sebenarnya berfungsi.',
    'meta.og.title':    'arifAI Solutions \u2014 AI Bijak. Dibina untuk Perniagaan Anda.',
    'meta.og.desc':     'Aplikasi AI khas, automasi, dan ejen pintar yang disesuaikan untuk pemilik perniagaan PKS.',

    'nav.services':  'Perkhidmatan',
    'nav.howwework': 'Cara Kami Bekerja',
    'nav.about':     'Tentang Kami',
    'nav.contact':   'Hubungi',
    'nav.cta':       'Mari Berbincang',

    'hero.headline': '<span class="hero-word" style="--wd:0s"><em>AI</em></span> <span class="hero-word" style="--wd:0.08s"><em>Bijak.</em></span> <span class="hero-word" style="--wd:0.16s">Dibina</span> <span class="hero-word" style="--wd:0.24s">untuk</span><br aria-hidden="true"> <span class="hero-word" style="--wd:0.32s">Perniagaan</span> <span class="hero-word" style="--wd:0.40s">Anda.</span>',
    'hero.headline.aria': 'AI Bijak. Dibina untuk Perniagaan Anda.',
    'hero.sub':        'arifAI Solutions membina aplikasi AI khas, automasi, dan ejen pintar \u2014 disesuaikan dengan cara perniagaan anda sebenarnya berfungsi.',
    'hero.cta.primary':   'Mulakan Projek',
    'hero.cta.secondary': 'Lihat Perkhidmatan',
    'hero.scroll':        'Tatal',
    'hero.chip.petronas': 'PETRONAS',
    'hero.chip.exxon':    'ExxonMobil',
    'hero.chip.yrs':      '13 thn sains data',
    'hero.chip.value':    '$60J+ dioptimumkan',

    'services.label':    'Apa Yang Kami Buat',
    'services.heading':  '<span class="section-word" style="--sw-delay:0s">AI</span> <span class="section-word" style="--sw-delay:0.1s">yang</span> <span class="section-word" style="--sw-delay:0.2s">sesuai</span> <span class="section-word" style="--sw-delay:0.3s">dengan</span> <span class="section-word" style="--sw-delay:0.4s">dunia</span> <span class="section-word" style="--sw-delay:0.5s">anda</span> \u2014<br><span class="section-word" style="--sw-delay:0.6s">bukan</span> <span class="section-word" style="--sw-delay:0.7s">sebaliknya.</span>',
    'services.card1.name': 'Aplikasi AI Khas',
    'services.card1.desc': 'Aplikasi khas yang dibina mengikut aliran kerja anda \u2014 bukan alat generik yang dipaksa untuk keperluan anda.',
    'services.card2.name': 'Perundingan AI',
    'services.card2.desc': 'Strategi dan peta jalan untuk perniagaan yang bersedia menggunakan AI dengan bertujuan, dengan laluan yang jelas ke hadapan.',
    'services.card3.name': 'Automasi & Integrasi',
    'services.card3.desc': 'Hubungkan AI dengan alat dan proses sedia ada anda \u2014 lancar, boleh dipercayai, dan dibina untuk berkembang bersama anda.',
    'services.card4.name': 'Ejen AI & Chatbot',
    'services.card4.desc': 'Pembantu pintar yang mengendalikan pertanyaan, layak untuk prospek, dan bekerja tanpa henti \u2014 walaupun ketika anda tidur.',

    'who.tag': 'Siapa Yang Kami Bantu',
    'who.heading': 'Adakah ini',
    'who.heading-em': 'kedengaran biasa?',
    'who.pain1': 'Pasukan anda menghabiskan berjam-jam setiap minggu menyusun laporan atau mengemaskini hamparan secara manual',
    'who.pain2': 'Pelanggan bertanya soalan yang sama berulang kali — dan kakitangan anda mengendalikan setiap satu',
    'who.pain3': 'Alatan perniagaan anda tidak bersambung — data tersebar dan tiada yang disegerakkan secara automatik',
    'who.pain4': 'Anda tahu AI boleh membantu perniagaan anda — tetapi tidak tahu dari mana hendak mulakan atau siapa yang boleh dipercayai',
    'who.res-heading': 'Anda berada di',
    'who.res-heading-gold': 'tempat yang betul.',
    'who.body1': 'arifAI Solutions bekerjasama dengan <strong>PKS Malaysia</strong> untuk menukar kekecewaan ini kepada penyelesaian AI yang berfungsi — praktikal, mampu milik, dan dibina mengikut cara perniagaan anda sebenarnya berjalan.',
    'who.body2': 'Tiada jargon. Tiada kontrak enterprise. Hanya <strong>kerja fokus yang menyelesaikan masalah sebenar</strong> — daripada seseorang yang telah melakukan ini selama 13 tahun di PETRONAS dan ExxonMobil.',
    'who.pill1': 'Aplikasi AI Tersuai',
    'who.pill2': 'Automasi',
    'who.pill3': 'Chatbot AI',
    'who.pill4': 'Strategi & Perundingan',
    'who.cta': 'Lihat cara kami bekerja',

    'services.use-label': 'cth.',
    'services.ai-apps.use1': 'Laporan prestasi mingguan yang dijana secara automatik',
    'services.ai-apps.use2': 'Pemprosesan invois berkuasa AI & kelulusan',
    'services.ai-apps.use3': 'Papan pemuka inventori pintar dengan amaran',
    'services.chatbots.use1': 'Bot FAQ pelanggan untuk WhatsApp atau laman web',
    'services.chatbots.use2': 'Pembantu pertanyaan dasar HR & dalaman',
    'services.chatbots.use3': 'Ejen tempahan janji & susulan',
    'services.automation.use1': 'Segerakkan platform CRM, perakaunan & operasi',
    'services.automation.use2': 'Pencetus aliran kerja automatik pada penghantaran borang',
    'services.automation.use3': 'Saluran pelaporan merentas sistem',
    'services.consulting.use1': 'Bengkel pemetaan peluang AI',
    'services.consulting.use2': 'Penilaian bina-vs-beli alatan',
    'services.consulting.use3': 'Peta jalan AI 12 bulan untuk pasukan anda',

    'marquee.1': 'Aplikasi AI Khas',
    'marquee.2': 'Perundingan AI',
    'marquee.3': 'Automasi &amp; Integrasi',
    'marquee.4': 'Ejen AI &amp; Chatbot',
    'marquee.5': 'Automasi Aliran Kerja',
    'marquee.6': 'Strategi AI Perniagaan',
    'marquee.7': 'Penyelesaian Khusus',
    'marquee.8': 'AI Berasaskan Manusia',

    'hww.label':       'Proses Kami',
    'hww.heading':     'Cara Kami Bekerja',
    'hww.step1.title': 'Memahami',
    'hww.step1.desc':  'Kami mendengar dahulu. Menyelami perniagaan anda, cabaran anda, dan matlamat yang paling penting bagi anda.',
    'hww.step2.title': 'Membina',
    'hww.step2.desc':  'Kami mereka bentuk dan membangunkan penyelesaian AI yang disesuaikan, berulang kali bersama anda di setiap langkah.',
    'hww.step3.title': 'Lancar & Sokong',
    'hww.step3.desc':  'Kami melancarkan, mengukur, dan terus memperbaiki penyelesaian anda \u2014 jauh selepas hari pertama bermula.',

    'about.tag':       'Tentang Kami',
    'about.heading':   '<span class="section-word" style="--sw-delay:0s">Kepakaran</span> <span class="section-word" style="--sw-delay:0.1s">perusahaan,</span><br><span class="section-word" style="--sw-delay:0.2s">untuk</span> <span class="section-word" style="--sw-delay:0.3s">semua</span> <span class="section-word" style="--sw-delay:0.4s">orang.</span>',
    'about.subheading':'Dibina dengan hikmah. Disampaikan dengan penuh kasih.',
    'about.photo.alt': 'Qamarul Arifin bin Abd Manan, Pengasas arifAI Solutions',
    'about.text':      '<em>arif</em> itu peribadi \u2014 ia sebahagian daripada nama saya, Arifin. Tetapi ia juga bermaksud <em>bijak</em> dalam Bahasa Malaysia dan Arab. Maksud berganda itulah yang menggambarkan apa yang saya bina di sini.<br><br>Saya menghabiskan 13 tahun sebagai saintis data dan pakar pengoptimuman di PETRONAS dan ExxonMobil \u2014 membina sistem berkuasa AI yang digunakan oleh syarikat tenaga global. Kerja yang berisiko tinggi, kompleks, dan benar-benar memberi impak pada skala yang besar.<br><br>Apa yang saya perhatikan ialah jurang itu. Kemampuan yang sama yang mengoptimumkan operasi bernilai berbilion ringgit tidak sampai kepada pemilik perniagaan di tepi jalan \u2014 usahawan F&amp;B, PKS logistik, profesional bebas yang boleh mengubah perniagaan mereka dengan AI yang tepat, tetapi tiada jalan masuk.<br><br><strong>arifAI Solutions wujud untuk menutup jurang itu.</strong> Pemikiran kelas perusahaan, tanpa harga tag atau kerumitan perusahaan \u2014 untuk perniagaan di Melaka, seluruh Malaysia, dan merentasi sempadan.',

    'why.label':       'Kenapa arifAI',
    'why.heading':     '<span class="section-word" style="--sw-delay:0s">Perbezaan</span> <span class="section-word" style="--sw-delay:0.1s">yang</span> <span class="section-word" style="--sw-delay:0.2s">akan</span> <span class="section-word" style="--sw-delay:0.3s">anda</span> <span class="section-word" style="--sw-delay:0.4s">rasai</span><br><span class="section-word" style="--sw-delay:0.5s">dari</span> <span class="section-word" style="--sw-delay:0.6s">hari</span> <span class="section-word" style="--sw-delay:0.7s">pertama.</span>',
    'why.pillar1.title': 'Hikmah berbanding hype',
    'why.pillar1.desc':  'Kami bertanya "patut ke?" sebelum "macam mana nak?" \u2014 supaya anda hanya melabur dalam AI yang benar-benar sesuai dengan perniagaan anda.',
    'why.pillar2.title': 'Rakan kongsi anda, bukan pembekal',
    'why.pillar2.desc':  'Dari strategi hingga pelancaran hingga sokongan jangka panjang, kami mengukur kejayaan berdasarkan hasil anda \u2014 bukan sekadar penghantaran.',
    'why.pillar3.title': 'Dibina untuk PKS, bukan korporat',
    'why.pillar3.desc':  'Tiada panduan yang membosankan. Kami memahami kekangan perniagaan sebenar dan membina sewajarnya.',

    'track.label':        'Rekod Prestasi',
    'track.heading':      'Keputusan kelas perusahaan.<br>Kini dalam jangkauan anda.',
    'track.stat1.number': '$60J+',
    'track.stat1.desc':   'Nilai tahunan yang diraih melalui penyelesaian sains data termaju \u2014 alat ramalan multivariat yang mengubah perancangan inventori produk, digabungkan dengan pengoptimuman berasaskan ML untuk saluran jualan kilang merentas operasi global.',
    'track.stat1.source': 'ExxonMobil \u00a0\u00b7\u00a0 Saintis Data',
    'track.stat2.number': '10+',
    'track.stat2.desc':   'Aplikasi pengoptimuman masa nyata yang dibina dan digunakan di tapak tenaga dan pembuatan di Amerika Syarikat, Eropah dan Asia-Pasifik \u2014 masing-masing mengekalkan penambahbaikan operasi yang boleh diukur secara berterusan pada skala perindustrian.',
    'track.stat2.source': 'ExxonMobil \u00a0\u00b7\u00a0 Operasi Global',
    'track.stat3.number': '13 thn',
    'track.stat3.desc':   'Dari Kawalan Proses Termaju di kilang PETRONAS Melaka hingga sistem AI perusahaan di ExxonMobil \u2014 menyelesaikan masalah data dan pengoptimuman berisiko tinggi untuk syarikat tenaga global. Kini menerapkan ketegasan yang sama untuk perniagaan anda.',
    'track.stat3.source': 'PETRONAS \u00a0\u00b7\u00a0 ExxonMobil \u00a0\u00b7\u00a0 AFED Digital',
    'track.note':         'Ketegasan yang sama yang mempercepatkan operasi bernilai berbilion ringgit \u2014 kini diterapkan untuk anda.',
    'track.case1': '"Merekabentuk model pengoptimuman AI yang secara langsung meningkatkan ekonomi pengeluaran dalam operasi hulu"',
    'track.case2': '"Memimpin inisiatif sains data merentasi fungsi eksplorasi, pengeluaran, dan komersial di dua syarikat tenaga terbesar di dunia"',
    'track.case3': '"Dari penemuan hingga penyelesaian yang berfungsi — dibina mengikut keperluan perniagaan anda, bukan templat generik"',

    'faq.tag': 'Soalan Lazim',
    'faq.heading': 'Soalan yang',
    'faq.heading-em': 'selalu kami terima',
    'faq.q1': 'Berapa lama sesuatu projek biasanya mengambil masa?',
    'faq.a1': 'Kebanyakan projek selesai dalam masa 4–8 minggu dari perbincangan awal hingga penyelesaian yang berfungsi. Chatbot atau automasi boleh siap dalam masa 2 minggu. Aplikasi tersuai yang lebih kompleks mungkin mengambil masa 2–3 bulan. Kami akan berikan jangka masa yang jelas sebelum memulakan.',
    'faq.q2': 'Adakah saya perlu mempunyai pengetahuan teknikal untuk bekerja dengan anda?',
    'faq.a2': 'Langsung tidak perlu. Kami bertindak sebagai jambatan antara keperluan perniagaan anda dan teknologi. Anda huraikan masalah; kami cari penyelesaiannya. Kami akan sentiasa maklumkan perkembangan dalam bahasa yang mudah difahami.',
    'faq.q3': 'Berapakah kos yang diperlukan?',
    'faq.a3': 'Harga bergantung kepada skop projek. Automasi ringkas bermula dari beberapa ribu ringgit. Aplikasi tersuai dan pelaksanaan ejen ditetapkan secara individu. Panggilan pertama sentiasa percuma — tempah sekarang dan kami akan berikan anggaran yang jujur.',
    'faq.q4': 'Bolehkah anda bekerja dengan alatan yang kami sudah gunakan?',
    'faq.a4': 'Ya. Kami berintegrasi dengan kebanyakan alatan perniagaan biasa — Google Workspace, Microsoft 365, WhatsApp, perisian perakaunan, CRM, dan banyak lagi. Kami bina penyelesaian mengikut sistem sedia ada anda, bukan sistem kami.',

    'contact.heading':      'Bersedia untuk membawa <em>AI</em> ke dalam<br>perniagaan anda?',
    'contact.sub':          'Mari berbincang. Tiada jargon, tiada tekanan \u2014 hanya nasihat jujur tentang apa yang AI benar-benar boleh lakukan untuk anda.',
    'contact.form.subject': 'Pertanyaan baharu \u2014 arifAI Solutions',
    'contact.name.label':   'Nama anda',
    'contact.company.label':'Perniagaan / Syarikat',
    'contact.message.label':'Bagaimana kami boleh membantu?',
    'contact.email.label':  'E-mel anda',
    'contact.submit':       'Hantar Mesej',
    'contact.alt':          'Atau e-mel kami terus di <a href="mailto:arifin@arifaisolutions.com">arifin@arifaisolutions.com</a>',

    'footer.copy': '&copy; 2026 arifAI Solutions. Hak cipta terpelihara.',

    'js.sending': 'Menghantar\u2026',
    'js.success': 'Mesej dihantar \u2014 kami akan menghubungi anda tidak lama lagi.',
    'js.send':    'Hantar Mesej',
    'js.error':   'Sesuatu telah silap. Sila e-mel kami terus di arifin@arifaisolutions.com',
  },
};

let currentLang = 'en';

// ── Apply language ──
export function applyLanguage(lang) {
  document.documentElement.lang = lang === 'ms' ? 'ms' : 'en';
  currentLang = lang;
  const t = TRANSLATIONS[lang];

  document.documentElement.setAttribute('lang', lang === 'ms' ? 'ms' : 'en');

  document.title = t['meta.title'];
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t['meta.description']);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', t['meta.og.title']);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', t['meta.og.desc']);
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', t['meta.og.title']);
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', t['meta.og.desc']);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (t[el.dataset.i18n] !== undefined) el.textContent = t[el.dataset.i18n];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    if (t[el.dataset.i18nHtml] !== undefined) el.innerHTML = t[el.dataset.i18nHtml];
    // Re-reveal section words if element was already visible
    if (el.classList.contains('visible') || el.closest('.visible') || !el.classList.contains('fade-in')) {
      el.querySelectorAll('.section-word').forEach(sw => {
        sw.classList.add('section-word-revealed');
      });
    }
  });

  document.querySelectorAll('[data-i18n-headline]').forEach(el => {
    const val = t[el.dataset.i18nHeadline];
    if (val !== undefined) {
      el.innerHTML = val;
      el.querySelectorAll('.hero-word').forEach(w => w.classList.add('revealed'));
    }
  });

  document.querySelectorAll('[data-i18n-attr-label]').forEach(el => {
    if (t[el.dataset.i18nAttrLabel] !== undefined)
      el.setAttribute('aria-label', t[el.dataset.i18nAttrLabel]);
  });

  document.querySelectorAll('[data-i18n-attr-alt]').forEach(el => {
    if (t[el.dataset.i18nAttrAlt] !== undefined)
      el.setAttribute('alt', t[el.dataset.i18nAttrAlt]);
  });

  document.querySelectorAll('[data-i18n-attr-value]').forEach(el => {
    if (t[el.dataset.i18nAttrValue] !== undefined)
      el.setAttribute('value', t[el.dataset.i18nAttrValue]);
  });

  const track = document.querySelector('.marquee-track');
  if (track) {
    const items = [1,2,3,4,5,6,7,8].map(n =>
      `<span class="marquee-item">${t['marquee.' + n]}<span class="marquee-dot"></span></span>`
    );
    track.innerHTML = [...items, ...items].join('');
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('lang-btn--active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  localStorage.setItem('lang', lang);
}

// ── Toggle click handlers ──
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
});

// ── Init: restore saved preference ──
(function initLang() {
  const saved = localStorage.getItem('lang');
  if (saved === 'ms') applyLanguage('ms');
})();

export { TRANSLATIONS }; // used by contact-form.js
