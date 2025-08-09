<h2 id="publications" style="margin: 2px 0px -15px;">Publications</h2>

<div class="publications">
<ol class="bibliography">

{% for pub in site.data.publications.main %}

<li>
<div class="pub-row">
  <div class="col-sm-3 abbr" style="position: relative;padding-right: 15px;padding-left: 15px;">
    {% if pub.image %}
    <img src="{{ pub.image }}" class="teaser img-fluid z-depth-1" style="width=100;height=40%">
    {% endif %}
    {% if pub.conference_short %}
    <abbr class="badge">{{ pub.conference_short }}</abbr>
    {% endif %}
  </div>
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      <div class="title"><a href="{{ pub.pdf }}">{{ pub.title }}</a></div>
      <div class="author">{{ pub.authors }}</div>
      <div class="periodical"><em>{{ pub.conference }}</em>
      </div>
    <div class="links">
      {% if pub.pdf %}
      <a href="{{ pub.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">PDF</a>
      {% endif %}
      {% if pub.code %}
      <a href="{{ pub.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Code</a>
      {% endif %}
      {% if pub.page %}
      <a href="{{ pub.page }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Project Page</a>
      {% endif %}
      {% if pub.bibtex %}
      <a href="{{ pub.bibtex }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">BibTex</a>
      {% endif %}
      {% if pub.notes %}
      <strong> <i style="color:#e74d3c">{{ pub.notes }}</i></strong>
      {% endif %}
      {% if pub.others %}
      {{ pub.others }}
      {% endif %}
    </div>
  </div>
</div>
</li>

<br>

{% endfor %}

</ol>
</div>
