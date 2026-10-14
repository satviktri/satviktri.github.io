import {windowGray,presets,materials,phantomHU,magnification,sequences} from './physics.js';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function select(buttons,key,value){$$(buttons).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[key]===value)));}
function moduleView(id){if(!["xray","ct","mri","ultrasound"].includes(id))return;$$('[data-module]').forEach(p=>p.hidden=p.dataset.module!==id);select('[data-modality]','modality',id);}
$$('[data-modality]').forEach(b=>b.addEventListener('click',()=>moduleView(b.dataset.modality)));
function labView(id){if(!["xray","ct","mri","ultrasound"].includes(id))return;$$('[data-lab-panel]').forEach(p=>p.hidden=p.dataset.labPanel!==id);select('[data-lab]','lab',id);}
$$('[data-lab]').forEach(b=>b.addEventListener('click',()=>labView(b.dataset.lab)));
$$('[data-open-lab]').forEach(a=>a.addEventListener('click',()=>labView(a.dataset.openLab)));
function route(){const h=location.hash.slice(1);if(h.startsWith('learn-'))moduleView(h.slice(6));if(h.startsWith('lab-')){labView(h.slice(4));$('#use').scrollIntoView?.();}}
moduleView('xray');labView('ct');route();addEventListener('hashchange',route);
const canvas=$('#ct-canvas');let ctx;try{ctx=canvas.getContext('2d');}catch{ctx=null;}
function renderCT(){const width=+$('#window').value,level=+$('#level').value,slice=+$('#slice').value;$('#window-value').textContent=`${width} HU`;$('#level-value').textContent=`${level} HU`;$('#slice-value').textContent=`${slice} / 20`;
 if(ctx){const size=canvas.width,img=ctx.createImageData(size,size);for(let y=0;y<size;y++)for(let x=0;x<size;x++){const gray=windowGray(phantomHU(x/size,y/size,slice),level,width),i=(y*size+x)*4;img.data[i]=img.data[i+1]=img.data[i+2]=gray;img.data[i+3]=255;}ctx.putImageData(img,0,0);}
 $('#hu-table').replaceChildren(...materials.map(m=>{const tr=document.createElement('tr'),g=windowGray(m.hu,level,width);tr.innerHTML=`<td>${m.name}</td><td>${m.hu}</td><td><span class="shade" style="background:rgb(${g} ${g} ${g})" aria-hidden="true"></span>${g} / 255</td>`;return tr;}));
 const lo=level-.5-(width-1)/2,hi=level-.5+(width-1)/2;$('#window-summary').textContent=width===1?`Threshold at ${lo} HU: values above it display white; others black.`:`Display transition: ${lo} to ${hi} HU. Values below this interval are black; values above it are white.`;
 $$('[data-preset]').forEach(b=>{const p=presets[b.dataset.preset];b.setAttribute('aria-pressed',String(p.center===level&&p.width===width));});
}
['window','level','slice'].forEach(id=>$(`#${id}`).addEventListener('input',renderCT));
$$('[data-preset]').forEach(b=>b.addEventListener('click',()=>{const p=presets[b.dataset.preset];$('#window').value=p.width;$('#level').value=p.center;renderCT();}));renderCT();
function sequenceView(id){const s=sequences[id];select('[data-sequence]','sequence',id);$('.swatches').hidden=id==='dwi';$('#diffusion').hidden=id!=='dwi';for(const k of ['fluid','white','gray'])$(`#sw-${k}`).style.background=`rgb(${s[k]} ${s[k]} ${s[k]})`;$('#sequence-note').textContent=s.note;}
$$('[data-sequence]').forEach(b=>b.addEventListener('click',()=>sequenceView(b.dataset.sequence)));sequenceView('t1');
function geometry(){const gap=+$('#gap').value,m=magnification(180,gap),x=420-gap/180*380,r=45*m;$('#gap-value').textContent=`${gap} cm`;$('#magnification').textContent=`Apparent size: ${m.toFixed(2)}× the object size. Source-to-object distance: ${180-gap} cm.`;$('#beam').setAttribute('d',`M40 160 420 ${160-r}V${160+r}Z`);$('#object-line').setAttribute('d',`M${x} 115v90`);$('#image-line').setAttribute('d',`M420 ${160-r}v${2*r}`);}
$('#gap').addEventListener('input',geometry);geometry();
$$('[data-plane]').forEach(b=>b.addEventListener('click',()=>{const long=b.dataset.plane==='long';select('[data-plane]','plane',b.dataset.plane);$('#us-vessel').setAttribute('rx',long?'115':'32');$('#us-label').textContent=long?'Long-axis vessel view':'Short-axis vessel view';$('#plane-note').textContent=long?"A plane along a straight vessel's length creates an elongated lumen.":'A perpendicular plane cuts across the same ideal vessel, creating a round lumen. Oblique planes can produce an ellipse.';}));
$$('[data-case-filter]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.caseFilter;select('[data-case-filter]','caseFilter',id);$$('[data-case]').forEach(c=>c.hidden=id!=='all'&&c.dataset.case!==id);$('#case-count').textContent=`${$$('[data-case]').filter(c=>!c.hidden).length} fictional teaching scenarios · independent of the real scan library`;}));
const dialog=$('#image-dialog');let origin;
$$('[data-image]').forEach(b=>b.addEventListener('click',()=>{if(typeof dialog.showModal!=='function'){window.open(b.dataset.image,'_blank','noopener');return;}origin=b;$('#full-image').src=b.dataset.image;$('#full-image').alt=b.querySelector('img').alt;$('#full-caption').textContent=b.dataset.caption;dialog.showModal();}));
dialog.addEventListener('close',()=>origin?.focus());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
