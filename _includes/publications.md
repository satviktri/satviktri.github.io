<section id="publications" class="section">
  <div class="section-header">
    <p class="section-kicker">Publications</p>
    <h2 class="section-title">Selected Publications</h2>
    <p class="section-subtitle">Recent work spanning radiology AI, LLMs, and clinical translation.</p>
  </div>
  {% assign publications = site.data.publications.selected | default: site.data.publications.main | default: [] %}
  {% if publications.size > 0 %}
  <div class="publication-list">
    {% for paper in publications %}
    <article class="publication">
      <h3 class="publication__title">
        {% if paper.pdf %}
        <a href="{{ paper.pdf }}">{{ paper.title }}</a>
        {% else %}
        {{ paper.title }}
        {% endif %}
      </h3>
      {% if paper.authors %}
      <p class="publication__meta">{{ paper.authors }}</p>
      {% endif %}
      {% if paper.conference or paper.conference_short %}
      <p class="publication__meta">
        {% if paper.conference_short %}<strong>{{ paper.conference_short }}</strong>{% endif %}
        {% if paper.conference_short and paper.conference %} · {% endif %}
        {% if paper.conference %}{{ paper.conference }}{% endif %}
      </p>
      {% endif %}
      {% if paper.links or paper.pdf or paper.code or paper.page or paper.bibtex %}
      <div class="publication__links">
        {% if paper.pdf %}<a href="{{ paper.pdf }}">PDF</a>{% endif %}
        {% if paper.code %}<a href="{{ paper.code }}">Code</a>{% endif %}
        {% if paper.page %}<a href="{{ paper.page }}">Project Page</a>{% endif %}
        {% if paper.bibtex %}<a href="{{ paper.bibtex }}">BibTeX</a>{% endif %}
        {% if paper.links %}
          {% for extra in paper.links %}
          <a href="{{ extra.url }}">{{ extra.label }}</a>
          {% endfor %}
        {% endif %}
      </div>
      {% endif %}
      {% if paper.notes %}
      <p class="publication__meta"><em>{{ paper.notes }}</em></p>
      {% endif %}
    </article>
    {% endfor %}
  </div>
</section>
