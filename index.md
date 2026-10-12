---
layout: homepage
---

<section id="about" class="section">
  <div class="section-header">
    <p class="section-kicker">About</p>
    <h2 class="section-title">Medical imaging AI with a focus on people and practice</h2>
  </div>
  <div class="section-grid">
    <div>
      <p>I am a PhD student in Bioengineering–Medical Physics at the University of Pennsylvania, advised by James Gee, and a Master in Law student at Penn Carey Law, focusing on healthcare and artificial intelligence.</p>
      <p>My research develops and evaluates AI for radiology, radiation oncology, and patient-centered care. I work on medical imaging foundation models, multi-agent systems, and the evaluation methods needed to understand where these tools succeed, where they fail, and how they fit into clinical workflows.</p>
      <p>I have conducted research at Penn since 2021 and am an Innovation Fellow at the Penn Center for Cancer Care Innovation (PC3I). As an AI Scientist with RAD-AID International, I contribute to global radiology initiatives, including work with the Botswana–UPenn Partnership. My law studies complement this work through a focus on the governance and institutional decisions that shape healthcare AI.</p>
    </div>
    <aside class="detail-card" aria-label="Current training and fellowships">
      <h3>Currently</h3>
      <ul>
        <li>PhD student, Bioengineering–Medical Physics, University of Pennsylvania</li>
        <li>Master in Law student, Penn Carey Law</li>
        <li>Innovation Fellow, PC3I, Abramson Cancer Center</li>
        <li>Lipman Family Fellow, The Wharton School, 2026–2027</li>
        <li>AI Scientist, RAD-AID International</li>
      </ul>
    </aside>
  </div>
</section>

<section id="initiatives" class="section">
  <div class="section-header">
    <p class="section-kicker">Research</p>
    <h2 class="section-title">From model capabilities to clinical use</h2>
    <p class="section-subtitle">I study how AI interprets medical information, how its outputs should be evaluated, and what it takes to make these systems useful in practice.</p>
  </div>
  <div class="research-themes">
    <div><h3>Medical imaging foundation models</h3><p>Evaluating spatial and anatomical reasoning in vision-language models, with attention to failure modes across imaging modalities and anatomical regions.</p></div>
    <div><h3>Multi-agent clinical AI</h3><p>Building modular workflows that separate information extraction, reasoning, generation, and evaluation so that intermediate decisions can be inspected.</p></div>
    <div><h3>Patient communication and cancer care</h3><p>Studying radiology report simplification, patient education, and AI applications in oncology and interventional radiology.</p></div>
    <div><h3>Evaluation and governance</h3><p>Developing reporting practices and studying the technical, legal, and organizational conditions needed for responsible use of healthcare AI.</p></div>
  </div>
  <h3 class="subsection-title">Featured projects and open resources</h3>
  <div class="card-grid">
    <article class="card">
      <p class="project-type">Benchmark · 2026 preprint</p>
      <h3>SPARC-Rad</h3>
      <p>A benchmark and evaluation pipeline for spatial and anatomical reasoning in radiology vision-language models. It includes 300 image–question pairs spanning CT, MRI, and radiography, with analyses across modalities and anatomical regions.</p>
      <div class="publication__links"><a href="https://penn-rail.github.io/SPARC-Rad-Benchmark/">Benchmark</a><a href="https://arxiv.org/abs/2608.00100">Preprint</a></div>
    </article>
    <article class="card">
      <p class="project-type">Open-source framework · 2026 preprint</p>
      <h3>MARC v1</h3>
      <p>A configurable framework for Multi-Agent Reasoning and Coordination. Role-specific agents pass information through an explicit sequence, making individual stages easier to inspect. MARC supports API-based and local model backends.</p>
      <div class="publication__links"><a href="https://github.com/Penn-RAIL/MARC-v1">Code</a><a href="https://arxiv.org/abs/2608.13476">Preprint</a></div>
    </article>
    <article class="card">
      <p class="project-type">Research reporting tool · 2026 preprint</p>
      <h3>CheckSupport</h3>
      <p>A locally deployable LLM tool that recommends manuscript reporting checklists and helps complete them using evidence from the manuscript. The workflow supports transparent, auditable research reporting.</p>
      <div class="publication__links"><a href="https://arxiv.org/abs/2605.16377">Preprint</a></div>
    </article>
  </div>
</section>

<section id="global-health" class="section">
  <div class="section-header">
    <p class="section-kicker">Global health and funded research</p>
    <h2 class="section-title">AI for care delivery and clinical education</h2>
    <p class="section-subtitle">Work with clinical and community partners to address practical needs in imaging access, patient communication, and radiology training.</p>
  </div>
  <div class="card-grid card-grid--two">
    <article class="card">
      <h3>Lung disease care in Botswana</h3>
      <p class="project-type">Google.org Health AI funding · $110,000 team grant</p>
      <p>I contribute to a collaboration among Penn Medicine, RAD-AID International, and the Botswana–UPenn Partnership to develop MedGemma-based tools for lung disease care. The planned pilot includes AI-assisted triage, structured reporting, and culturally adapted, multilingual patient summaries, alongside training for local healthcare teams.</p>
      <p>The grant was announced by PC3I in April 2026.</p>
      <a href="https://pc3i.upenn.edu/news/pc3i-faculty-farouk-dako-and-fellow-satvik-tripathi-receive-google-org-health-ai-grant-to-advance-equitable-lung-disease-care/">Read the project announcement</a>
    </article>
    <article class="card">
      <h3>Interactive radiology resident education</h3>
      <p class="project-type">Penn Radiology STIR award · $5,000 · 2025</p>
      <p>This project explores an interactive “must-see cases” platform with LLM-based feedback for radiology residents. Supported by a Penn Radiology research grant and mentored by Tessa S. Cook, the work connects clinical education with the evaluation of AI-assisted learning tools.</p>
    </article>
  </div>
</section>

<section id="atlases" class="section">
  <div class="section-header"><p class="section-kicker">Open learning resources</p><h2 class="section-title">Interactive medical atlases</h2></div>
  <div class="atlas-resource-panel">
    <div><p>A growing collection of free tools for exploring anatomy, circulation and cancer staging, with visual lessons, clinical context and linked references.</p><p class="atlas-resource-scope">Educational resources; each atlas explains its sources and limitations.</p><a class="btn btn--primary" href="{{ '/atlases/' | relative_url }}">Explore the atlas collection ↗</a></div>
    <nav class="atlas-resource-links" aria-label="Individual medical atlases">{% for atlas in site.data.atlases %}{% unless atlas.published == false %}<a href="{{ atlas.id | prepend: '/' | append: '/' | relative_url }}"><strong>{{ atlas.name | escape }}</strong><span>{{ atlas.topic | escape }} ↗</span></a>{% endunless %}{% endfor %}</nav>
  </div>
</section>

{% include publications.md %}

<section id="background" class="section">
  <div class="section-header"><p class="section-kicker">Background</p><h2 class="section-title">Education and research experience</h2></div>
  <div class="card-grid">
    <article class="card"><h3>Doctor of Philosophy</h3><p>University of Pennsylvania<br>Bioengineering–Medical Physics<br>Advisor: James Gee, PhD<br>Expected 2031</p></article>
    <article class="card"><h3>Master in Law</h3><p>University of Pennsylvania Carey Law School<br>Focus: Healthcare and AI<br>Dean’s Scholarship<br>Expected 2030</p></article>
    <article class="card"><h3>Bachelor of Science</h3><p>Drexel University<br>Interdisciplinary Studies<br>Focus: Computer Science, Public Health, and Medicine<br>June 2026</p></article>
  </div>
  <h3 class="subsection-title">Research collaborations and industry experience</h3>
  <div class="card-grid">
    <article class="card"><h3>Penn Medicine</h3><p>Research across Radiology and Radiation Oncology, including the Center for Practice Transformation with Tessa S. Cook, global health work with Farouk Dako, and the McBeth Lab with Rafe McBeth. Innovation Fellow at PC3I since June 2025.</p></article>
    <article class="card"><h3>MGH and Harvard</h3><p>Research experience with Christopher P. Bridge and the Quantitative Translational Imaging in Medicine laboratory at the Martinos Center, and with Dania Daye in vascular and interventional radiology. Earlier work includes the Zitnik Lab and Harvard Health Systems Innovation Lab.</p></article>
    <article class="card"><h3>Subtle Medical and Drexel</h3><p>R&amp;D internships at Subtle Medical in summer 2025 and summer 2026, studying vision-language models for medical imaging. Research at Drexel’s Sparse Coding Lab with Edward Kim focused on biomedical AI and learning in resource-constrained settings.</p></article>
  </div>
</section>

<section id="news" class="section">
  <div class="section-header"><p class="section-kicker">Updates</p><h2 class="section-title">Recent highlights</h2></div>
  <ul class="news-list">
    <li class="news-item"><time datetime="2026">2026–2027</time><p>Selected for the Lipman Family Fellowship at the Wharton School.</p></li>
    <li class="news-item"><time datetime="2026">2026</time><p>Pursuing doctoral training in Bioengineering–Medical Physics and a Master in Law at Penn; awarded a Penn Carey Law Dean’s Scholarship.</p></li>
    <li class="news-item"><time datetime="2026-08">August 2026</time><p>MARC v1 preprint introduces an open-source framework for multi-agent clinical AI reasoning and coordination.</p></li>
    <li class="news-item"><time datetime="2026-07">July 2026</time><p>SPARC-Rad preprint introduces a benchmark for spatial and anatomical reasoning in radiology vision-language models.</p></li>
    <li class="news-item"><time datetime="2026-06">June 2026</time><p>Completed my BS in Interdisciplinary Studies at Drexel University.</p></li>
    <li class="news-item"><time datetime="2026-05">May 2026</time><p>CheckSupport preprint describes a local LLM workflow for manuscript checklist selection and completion.</p></li>
    <li class="news-item"><time datetime="2026-04">April 2026</time><p>PC3I announced our team’s $110,000 Google.org Health AI grant supporting planned work in Botswana.</p></li>
  </ul>
</section>

<section id="speaking" class="section">
  <div class="section-header"><p class="section-kicker">Speaking and education</p><h2 class="section-title">Sharing methods and discussing clinical AI</h2><p class="section-subtitle">Selected lectures, conference sessions, and conversations on imaging informatics, global health, and AI evaluation.</p></div>
  <ul class="speaking-list">
    <li><strong>Applications of Artificial Intelligence in Interventional Radiology</strong><br>Invited lecture, ARRS Categorical Course, 2026.</li>
    <li><strong>Agentic State of Mind and LLM/VLM Prompting</strong><br>Invited teaching sessions, Penn Imaging Informatics Fellowship.</li>
    <li><strong>Towards Global Health AI: Strategy, Planning, and Deployment</strong><br>Invited talk, RAD-AID International Annual Meeting, 2025.</li>
    <li><strong>Hip vs Hype: Critiquing Trending Topics in Large Language Models</strong><br>Invited talk, SIIM Annual Meeting, 2025.</li>
    <li><strong>Penn Science Policy Symposium</strong><br>Co-organizer in 2025 and 2026, covering global health and equity, bioethics, and emerging technology.</li>
    <li><strong>Radiology AI Podcast</strong><br>Associate Editor and lead for the “Hot Takes” series, exploring emerging debates in radiology AI.</li>
  </ul>
</section>

{% include services.md %}

<section id="contact" class="section">
  <div class="section-header"><p class="section-kicker">Contact</p><h2 class="section-title">Get in touch</h2></div>
  <p>I welcome conversations about medical imaging AI, cancer care innovation, global health implementation, and responsible evaluation. For research collaborations, speaking invitations, or questions about the projects here, please email me.</p>
  <p><a href="mailto:satvik.tripathi@pennmedicine.upenn.edu">satvik.tripathi@pennmedicine.upenn.edu</a><br>Philadelphia, Pennsylvania</p>
  <div class="publication__links"><a href="https://scholar.google.com/citations?user=d-8xB2sAAAAJ&amp;hl=en">Google Scholar</a><a href="https://github.com/satviktri">GitHub</a><a href="https://www.linkedin.com/in/satvik-tripathi/">LinkedIn</a><a href="{{ '/assets/files/curriculum_vitae.pdf' | relative_url }}">CV (PDF)</a></div>
</section>
