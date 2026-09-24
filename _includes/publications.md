<section id="publications" class="section">
  <div class="section-header">
    <p class="section-kicker">Publications</p>
    <h2 class="section-title">Selected journal articles and preprints</h2>
    <p class="section-subtitle">Research, methods, and perspectives on medical imaging AI, patient communication, and clinical translation. Preprints are listed separately from journal articles.</p>
  </div>
  <h3 class="subsection-title">Journal articles</h3>
  <div class="publication-list">
    {% for paper in site.data.publications.selected %}
    {% include publication.html paper=paper %}
    {% endfor %}
  </div>
  <details class="publication-archive">
    <summary>More selected journal articles</summary>
    <div class="publication-list">
      {% for paper in site.data.publications.more %}
      {% include publication.html paper=paper %}
      {% endfor %}
    </div>
  </details>
  <h3 class="subsection-title">Preprints and open research</h3>
  <p>Manuscripts shared before peer-reviewed journal publication.</p>
  <div class="publication-list">
    {% for paper in site.data.publications.preprints %}
    {% include publication.html paper=paper %}
    {% endfor %}
  </div>
  <p class="publication-footer"><a href="https://scholar.google.com/citations?user=d-8xB2sAAAAJ&amp;hl=en">View Google Scholar</a> · <a href="{{ '/assets/files/curriculum_vitae.pdf' | relative_url }}">Download the full CV</a></p>
</section>
