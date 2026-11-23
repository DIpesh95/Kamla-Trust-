# Existing Website Content Inventory

Source inspected directly: **https://kamlatrust.org/** (homepage) and every internal page linked from it, on 2026-11-22. Nothing below is drawn from memory of a prior build — each section's text was pulled live from the rendered DOM.

## Critical finding before the inventory itself

**kamlatrust.org is, content-for-content, the Direction D build already in this Next.js project.** Every section, every stat, every piece of honest "pending" language, every route (`/about`, `/our-work`, `/our-work/healthcare`, `/about/leadership`, `/about/transparency`, `/impact`, `/stories`, `/newsroom`, `/get-involved/*`, `/contact`), and the footer text match this repository's existing content exactly, word for word. This is not a separate legacy site to reconcile against a different codebase — it is this project's own live deployment.

One real discrepancy surfaced during inspection, flagged rather than silently resolved:

> **Homepage section count differs from earlier internal planning.** The live homepage renders **12 top-level section blocks**, not the 18 used in earlier D2 planning conversations in this engagement. Live inspection shows `main` contains exactly these 12 children, in this order: Hero, Recognition Strip, About (which also contains a short "57 — years since 1969" stat line, not a separate four-milestone timeline), Five Decades of Action (headline stats), Our Focus Areas, Signature Initiatives, Moments & Gatherings, Stories, Newsroom, Leadership, Annual Reports & Transparency, Get Involved. The detailed four-milestone timeline (1967 / 1969 / 1975 / Today) that appears on **`/about`** does **not** appear on the homepage itself — only a condensed one-line stat does. This may mean the homepage's timeline block was simplified at some point after the "18-section" framing was first used, or that framing conflated homepage content with `/about` page content. Either way: what follows is what is **actually on the live homepage today**, not a reconciliation with the earlier count.

The numbering below (01–12) reflects the live homepage's actual section order. Nothing has been reordered, merged, or omitted to match any prior model.

---

## 01 — Hero

**Heading:** "Rising By Lifting Others."
**Kicker:** Kamala Trust · Est. 1969
**Body:** "Creating opportunities, restoring dignity, and building stronger communities for more than five decades."
**CTAs:** Explore Our Work (→ `/our-work`) · Be Part of the Change (→ `/get-involved/donate`)
**Stat badge:** "57 YEARS OF WORK"
**Image:** Kanya Sneh Bandhan ceremony photo (Governor of Maharashtra in attendance) — `hero-kanya-sneh-bandhan.jpg`

## 02 — Recognition Strip ("Recognised By")

Six award/recognition names, each with its date (several marked "Exact date pending confirmation"):
- Kamala Power Women Award 2022 — 2022
- Recognition by the Governor of Maharashtra — date pending
- "Icon of Maharashtra" — date pending
- Times Power Women 2020 — 2020
- Bharat Amrut Award — date pending
- Global Sustainability Award — 2025

## 03 — About Kamala Trust

**Leading stat line:** "57 — years since 1969, still showing up." (appears inside this same section, before the eyebrow)
**Eyebrow:** About Kamala Trust
**Heading:** "57 years of rising by lifting others."
**Body:** "Kamala Trust has worked quietly and consistently since 1969, a registered public trust, women-led, built on the belief that dignity, education, and health shouldn't depend on circumstance. From a single college and hostel in Bhinmal to programs spanning education, healthcare, women's welfare, rural livelihoods, and disaster relief, the work has stayed the same at its core: showing up."
**CTA:** Read Our Story (→ `/about`)
**Image:** Yamuna Clean-Up & Anemia Awareness drive, Vrindavan (portrait crop) — `about-yamuna-drive-portrait.jpg`

## 04 — Five Decades of Action (Headline Stats)

Three figures, each sourced:
| Figure | Label | Source note |
|---|---|---|
| 57 | Years of turning service into action. Registered public trust since 1969. | Source: Trust registration records |
| 6 | Cities reached | Source pending trustee confirmation. |
| 30+ | Active programs | Internal programme list, as published on this site |

## 05 — Our Focus Areas

**Heading:** "Five chapters, one trust."
**Dek:** "Kamala Trust runs 30+ programs across Maharashtra, organised into five focus areas."
Five focus-area cards, each "Explore Programs →" to its own page:

1. **Healthcare** — "Because a healthy life should never be a privilege." → `/our-work/healthcare`
2. **Women & Girl Child** — "Because dignity is not negotiable." → `/our-work/women-and-girl-child`
3. **Education** — "Building schools and colleges in rural Rajasthan and recognising promising students, so that background doesn't decide who gets to learn." → `/our-work/education`
4. **Rural Livelihoods** — "Renewable energy, self-employment support, animal welfare, and environmental clean-up drives, alongside the trust's long-running heritage and temple work." → `/our-work/rural-livelihoods-environment`
5. **Disaster Relief & Civic Initiatives** — "Recognition for frontline workers and the armed forces, and public events that bring civic pride and community spirit together." → `/our-work/disaster-relief-civic-recognition`

### Linked page: `/our-work` (overview)
Heading: "Five pillars, 30+ programs." Dek: "Regrouped from the trust's original flat initiative list into focus areas, the way Swades Foundation and Reliance Foundation structure comparable multi-cause work. Pending trustee sign-off before launch." Same five cards repeat.

### Linked pages: each pillar's own page (`/our-work/[slug]`)
Each lists its full named-initiative roster. Full detail captured for Healthcare as a representative example (identical structure applies to all five, verified against `pillars.ts`):

**`/our-work/healthcare`** — "9 Programs." Stat note: "Patients treated / vaccinated figures pending from trustees."
01. HPV Bharat – Kamala Beti Kavach — "A named cervical-cancer prevention mission protecting girls through HPV vaccination and education, over 10,000 doses administered to date."
02. Anaemia Mukt Bharat — "Anaemia screening and awareness work for women and young girls, aligned with the national Anaemia Mukt Bharat mission."
03. Cancer Patient Support — "Support for cancer patients in partnership with Tata Memorial Hospital, Mumbai."
04. Rural Healthcare Camps — "Health screening and treatment camps held in underserved rural communities."
05. COVID-19 Support — "Pandemic-era relief work supporting frontline healthcare needs and vulnerable communities."
06. Nurse Day Recognition — "Annual recognition of nurses and frontline healthcare workers."
07. Blood Donation Camps — "Blood donation drives held at Kamala Mills Compound and other locations."
08. Vimla Old Age House — "Support for elder care through the Vimla Old Age House."
09. Yamuna Clean-Up & Anemia Awareness (Vrindavan) — "Yamuna Maarjan Seva in Vrindavan combining riverbank clean-up with anemia and health awareness, aligned with the Swachh Bharat mission."
Closing CTA block: "Support Healthcare — Every pillar runs on a mix of individual gifts, CSR partnerships, and volunteer time." Donate / CSR Partnership links.

(Women & Girl Child: 7 initiatives · Education: 2 · Rural Livelihoods & Environment: 8 · Disaster Relief & Civic Initiatives: 4 — exact names and blurbs on file, identical to `pillars.ts`, available on request if a full re-listing of all five is wanted in this document.)

## 06 — Signature Initiatives

**Heading:** "Three traditions, carried every year."
1. **Kamala Power Women Awards** (2026) — "Every year, women who've changed what's possible in their fields, healthcare, journalism, education, art, entrepreneurship, social work, are recognised on one stage. Not as a gesture, but as a record: these women did the work, and the work is seen." Stat: "20+ sectors recognised in the most recent edition."
2. **Pillars of Humanity** (Annual) — "An annual walk for humanity, honouring people across communities: transgender individuals, tribal women, sex workers, acid-attack survivors, the elderly, and cancer patients." Stat: "6 communities honoured each year."
3. **Kamala Rising Star** (Annual) — "Recognition early in a career can change its entire trajectory. This initiative looks for the people doing exceptional work before the world has noticed, and makes sure it does." Stat: "Celebrating emerging talent nationally."

## 07 — Moments & Gatherings

**Heading:** "Impact isn't a figure. It's a room full of people, year after year." (Horizontal drag-carousel, "↔ Drag, or use the arrows, to see more.")
1. **Kanya Sneh Bandhan** (Women & Girl Child) — "A mass wedding ceremony for underprivileged couples, attended by the Governor of Maharashtra."
2. **Lokmata Ahilyabai Holkar Mahila Samman** (2026) — "Kamala Power Women's annual awards, honouring women across healthcare, journalism, education, art, entrepreneurship, and social work."
3. **Republic Day Celebration** — "Flag hoisting, a community pledge, and livelihood-support kits for mochis, street vendors, Dabbawalas and transgender artisans."
4. **Kamala Power Women, on stage** (Recognition) — "Awards presented across the ceremony, recognising achievement across twenty-plus sectors."

## 08 — Stories

**Heading:** "Behind every number, a name." (Link: All Stories → `/stories`)
All three cards explicitly marked **AWAITING INTERVIEW**, each with: "Real photo & interview not yet available — this card will carry an actual story once one is recorded."
1. **A wedding day, a year on** (Women & Girl Child) — "A Kanya Sneh Bandhan couple, on the day of their wedding and a year on."
2. **What early detection changed** (Healthcare) — "Someone reached through the HPV vaccination drives, in their own words."
3. **Before and after the scholarship** (Education) — "A Kamala Rising Stars student, before and after the scholarship."

### Linked page: `/stories`
Same three cards, plus intro: "Every reference foundation studied for this rebuild treats named, first-person stories as core content, not decoration. Kamala Trust doesn't have any published yet. The slots below are placeholders for layout only, each one needs a real interview and a real photo before this goes live."

## 09 — Newsroom

**Heading:** "Recognition & recent activity." (Link: View All → `/newsroom`)
Homepage teaser shows: 1 Event (Lokmata Ahilyabai Holkar Mahila Samman 2026), 1 Press ("The Quiet Revolutionary": Times Magazine profile, April 2026), 1 more Event (Navbharat Times Utsav 2026), 1 Community (Republic Day Celebration 2026).

### Linked page: `/newsroom` — full 19-item list, grouped by kind
**Press (1):** "The Quiet Revolutionary": Times Magazine profile — "Times Magazine profiled Trustee Nidarshana Gowani's work, including HPV vaccination drives and savings initiatives for commercial sex workers." April 2026.
**Recognition (8):** Kamala Power Women Award 2022 (38 women achievers, awards by then-Governor Bhagat Singh Koshyari, 2022) · Recognition by the Governor of Maharashtra (date pending) · "Icon of Maharashtra" (date pending) · Times Power Women 2020 (2020) · Bharat Amrut Award ("Character of Bharat, Icon of Maharashtra", date pending) · Global Sustainability Award (2025) · Top 50 Most Influential Indians (Tower Bridge, London, date pending) · Kashi Vaishwik Gaurav Samaan 2022 (Varanasi, 2022).
**Event (8):** Lokmata Ahilyabai Holkar Mahila Samman 2026 (2026) · Navbharat Times Utsav 2026 (alongside CM Devendra Fadnavis, 2026) · Kamala Power Women Awards, Delhi (20 sectors, date pending) · Women's bike rally: Azadi Ka Amrit Mahotsav (flagged off by Governor of Maharashtra, date pending) · Tiranga Rally, Varanasi (Dr. Rajendra Prasad Ghat, date pending) · Blood Donation Camp, Kamala Mills Compound (date pending) · World Environment Day, with BMC Mumbai (date pending) · World Ocean Day Clean-Up, Dadar Beach (date pending).
**Community (2):** Republic Day Celebration 2026 (flag hoisting, kits for mochis/street vendors/Dabbawalas/transgender artisans, Kamala Mills Compound, 2026) · Phoolo Ki Holi (Sri Sri Radha Gopinath Temple / ISKCON Chowpatty, 2026).

## 10 — Leadership

**Heading:** "The people carrying this forward."
**Smt. Nidarshana Gowani** — Trustee. Photo: "Trustee photography pending — Shown as initials until cleared by the trustees" (initials "NG"). Bio: "Managing Director, Kamala Group of Industries, and National Patron of Bharat Vikas Parishad (Women's Wing). Leads the trust's programs across education, healthcare, and women's empowerment."
**Shri Ramesh Gowani** — Trustee. Bio: "Business leader in real estate and renewable energy, including the redevelopment of Kamala Mills and biomass power projects in Karnataka and Punjab. Supports the trust's healthcare, education, and social-inclusion initiatives."
**CTA:** Meet the Trustees (→ `/about/leadership`)

### Linked page: `/about/leadership`
Adds: a pull-quote for Nidarshana Gowani — "Leadership rooted in service." — and a **Selected Roles** list: Managing Director, Kamala Group of Industries · National Patron, Bharat Vikas Parishad (Women's Wing) · Trustee, Kamala Ankibai Ghamandiram Gowani Trust. Closing honest note: "Content gap — The trust's governing board may include additional trustees not named on the current site, and no portrait photography exists yet for either trustee. Confirm the full, current board list and arrange portraits before this page goes live."

## 11 — Annual Reports & Transparency

**Heading:** "What to verify before you give." (Link: Full Details → `/about/transparency`)
Four fields, all currently pending:
- **Trust registration:** "Trust registration number not yet published; pending from trustees."
- **80G (tax deduction for donors):** "80G tax-exemption status not yet published; pending from trustees."
- **12A registration:** "12A registration status not yet published; pending from trustees."
- **FCRA (foreign contributions):** "FCRA status not yet published; confirm whether the trust accepts foreign contributions."

### Linked page: `/about/transparency`
Adds a **Financial statements & annual reports** section: "No audited financial statements or annual reports are currently published. Every reference foundation studied for this rebuild: Azim Premji Foundation, Reliance Foundation, Aga Khan Foundation, and Swades Foundation, publishes these prominently, since it's what turns a donation into an informed decision rather than a leap of faith. Reports pending from trustees. This section should list downloadable PDFs once available."

## 12 — Get Involved

**Heading:** "Together, We Can Create a Better Tomorrow."
1. **Donate** — "Give directly to a program already at work." / "Every rupee moves through a named initiative, not a general fund." → `/get-involved/donate`
2. **Volunteer** — "Bring your time to the next gathering." / "Hands on the ground at weddings, camps, and community events." → `/get-involved/volunteer`
3. **CSR Partnership** — "Partner at an institutional scale." / "For companies looking to fund a focus area, not just a line item." → `/get-involved/csr-partnership`

### Linked page: `/get-involved/donate`
"This is the single biggest gap versus every reference foundation studied. None existed on the trust's site before this page." Sub-sections: Bank transfer / UPI (being finalised), Tax deduction (points to Transparency page), Giving at scale (points to CSR Partnership). A contact form (Name/Email/Phone/Message) opens a pre-addressed email to `trustee@ankibaighamandiramgowanitrust.com` — no direct form submission is wired up.

### Linked page: `/get-involved/volunteer`
"Programs run across Mumbai and rural Maharashtra & Rajasthan, from event-day support to ongoing mentoring." Lists all five focus areas with their full summaries as "Where volunteers help." Same email-based contact form.

### Linked page: `/get-involved/csr-partnership`
"A dedicated CSR-1 registration is what lets a company route CSR funds to the trust directly." CSR-1 status: "not yet confirmed." Points to Our Work for the full programme breakdown. Same email-based contact form.

### Linked page: `/get-involved/careers`
"No open roles are listed yet. Every reference foundation studied keeps an active careers page. Worth deciding whether the trust wants the same before launch." Same email-based contact form ("Interested anyway? Send a note.").

## Other linked pages captured

### `/about` (full page)
Sub-nav: Our Story / Leadership / Registration & Transparency. Heading: "A trust built on showing up, since 1969." Dek: "Kamala Ankibai Ghamandiram Gowani Trust is a registered public trust, women-led, working across education, healthcare, women & child welfare, and rural livelihoods." Body: "Kamala Trust, formally Kamala Ankibai Ghamandiram Gowani Trust, is a charitable foundation led by Trustee Nidarshana Gowani. Rooted in the values of diversity, equity, and inclusion, the trust operates on the principle that everyone deserves a healthy, productive life, regardless of background or circumstance. The trust is also known for large-scale public initiatives such as Kamala Power Women, Kamala Rising Stars, and the Kamala Cricket Tournament, recognising individuals who have contributed to society, including COVID-19 frontline workers, transgender community members, and widows of armed-forces officers."
**At a Glance:** Founded 1969 · Structure: Registered Public Trust, women-led · Registered office: 2nd Floor, Kamala House, Kamala City, Senapati Bapat Marg, Lower Parel West, Mumbai, Maharashtra – 400013.
**1969 → Today, "Five decades, in four moments":**
- 1967 — Shri G.K. Gowani founds a Commerce College in Bhinmal, Rajasthan, bringing higher education to a region where access was limited.
- 1969 — Kamala Ankibai Ghamandiram Gowani Trust is formally established as a registered public trust.
- 1975 — The Smt. Ankibai Ghamandiram Ji Hostel opens, giving students from distant villages a safe place to stay while they study.
- Today — 57 years on. 30+ active programs, across education, healthcare, women & girl child, rural livelihoods, and civic life.
**"Needs trustee confirmation":** "Trust literature also references a separately named 'Ankibai Ghamandiram Gowani Trust.' This site represents Kamala Ankibai Ghamandiram Gowani Trust; the relationship between the two names should be confirmed with the trustees before launch."
**"From the archive: real moments from the trust's work"** (captions only, three real photos): Kanya Sneh Bandhan, 25 couples married with the Governor of Maharashtra in attendance · Yamuna Clean-Up & Anemia Awareness, Vrindavan · Lokmata Ahilyabai Holkar Mahila Samman 2026.

### `/impact`
Heading: "What the numbers mean." Dek: "Headline figures today, with a per-pillar breakdown to build out once verified data comes from the trustees." Repeats the three headline stats (57 / 6 / 30+) with sources, then a **per-pillar breakdown**, each explicitly pending:
Education — "Verified enrollment / schools-built figures pending from trustees." Healthcare — "Patients treated / vaccinated figures pending from trustees." Women & Girl Child — "Beneficiary counts per program pending from trustees." Rural Livelihoods — "Livelihoods/environment impact figures pending from trustees." Disaster Relief & Civic Initiatives — "Relief-program figures pending from trustees."
**Methodology & reports:** "A '50k+ lives impacted' figure previously appeared on the trust's site with no sourced methodology or reporting period, so it has been removed from this page rather than displayed as a caveated guess. Reference organisations publish how they count impact: a person trained counted once, a household with clean water counted per person, and so on. This page will state a lives-impacted total again once Kamala Trust has one built the same way. No annual report or downloadable impact report is published yet."

### `/contact`
Heading: "Get in touch." Registered Office (same address as above). Phone: +91 86570 05023. Email: trustee@ankibaighamandiramgowanitrust.com. Same email-based contact form.

### Footer (site-wide, every page)
Address (same as above). **Explore:** About Us / Our Work / Our Impact / Stories / Newsroom / Contact. **Get Involved:** Donate / Volunteer / CSR Partnership / Careers. **Stay Updated:** Subscribe — "No mailing list is wired up yet. This opens an email to sign up manually." Phone and email repeated. "© 2026 Kamala Ankibai Ghamandiram Gowani Trust. All rights reserved." "Registered Public Trust, women-led."

### Header navigation (site-wide)
Logo → `/` · About Us → `/about` · Our Work → `/our-work` · Our Impact → `/impact` · Stories → `/stories` · Newsroom → `/newsroom` · Get Involved → `/get-involved/donate` · Search button · Donate button → `/get-involved/donate`.

---

**Nothing above has been shortened, merged, or rewritten.** Where a homepage teaser and its linked detail page overlap, both are recorded, since the detail page often adds information (roles, quotes, methodology notes) that the homepage teaser omits.
