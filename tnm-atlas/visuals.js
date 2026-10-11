// Original vector teaching diagrams. Geometry is schematic, never patient data.
const C={organ:'#254657',edge:'#6a96aa',tumor:'#f38b8f',node:'#e5c17a',distant:'#bba6f4',muted:'#8ca6b5'};
const label=(x,y,text,size=12,color=C.muted)=>`<text x="${x}" y="${y}" font-size="${size+2}" fill="${color}">${text}</text>`;
const mass=(x,y,r=16)=>`<circle cx="${x}" cy="${y}" r="${r+5}" fill="${C.tumor}" opacity=".1"/><circle cx="${x}" cy="${y}" r="${r}" fill="${C.tumor}" fill-opacity=".78" stroke="#ffb5b8" stroke-width="1.5"/>`;
const organPath=(d,extra='')=>`<path d="${d}" fill="${C.organ}" stroke="${C.edge}" stroke-width="2" ${extra}/>`;
const node=(x,y,on=false)=>`<ellipse cx="${x}" cy="${y}" rx="8" ry="6" fill="${on?C.node:'#1a3040'}" stroke="${on?'#ffe2a2':'#55727e'}" stroke-width="1.5" transform="rotate(-25 ${x} ${y})"/>`;
export function icon(id){
 const paths={lung:'M12 4v8M12 10L8 14M12 10l4 4M9 6C5 5 3 12 3 18c0 4 7 3 7 0V7M15 6c4-1 6 6 6 12 0 4-7 3-7 0V7',breast:'M5 3v5C1 14 3 21 10 21c7 0 10-8 8-13L17 3M6 12c2-2 6-1 7 2',colon:'M7 20V8c-4-4-2-6 1-5h9c4 0 4 3 2 6v9h-6v4M7 8h12',rectum:'M7 3v10c0 3 3 2 3 5v4h4v-4c0-3 3-2 3-5V3M7 8h10',prostate:'M5 3c-2 6 1 8 7 8s9-2 7-8M12 11v11M5 15c0-7 14-7 14 0s-14 7-14 0',kidney:'M10 4C0 0 0 22 10 20c7-1 4-6 1-8s5-7-1-8M14 12h7',bladder:'M6 3v4M18 3v4M5 7c-5 13 19 13 14 0C15 5 9 5 5 7M12 19v4',pancreas:'M3 16c-5-8 9-9 16-11 8 2-1 8-7 8-6 0-4 8-9 3',liver:'M3 5C0 9 0 21 6 18l14-9c5-7-11-6-17-4M13 5l-2 7',thyroid:'M11 5v15M13 5v15M9 11C0 0 1 21 7 20l4-4M15 11C24 0 23 21 17 20l-4-4'};
 return `<svg viewBox="0 0 24 26" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[id]}"/></svg>`;
}
export function visual(o,s){
 const t=s.t||'',n=s.n||'',m=s.m||'',num=Number(t[1])||0,positive=n&&!['N0','NX'].includes(n),meta=m.startsWith('M1');let main='',caption='',legend='Original anatomical schematic · not to scale';
 const T=t&&t!=='TX',r=s.visualRadius??(num>=4?31:num===3?25:num===2?20:13);
 if(['colon','rectum','bladder'].includes(o.id)){
  const bladder=o.id==='bladder',layers=bladder?['Urothelium','Lamina propria','Muscularis propria','Perivesical tissue']:['Mucosa','Submucosa','Muscularis propria',o.id==='rectum'?'Mesorectal tissue':'Pericolic tissue'];
  const colors=['#58717a','#3c616d','#284c5f','#172f42'];
  main=label(44,57,bladder?'BLADDER WALL':'BOWEL WALL',10)+label(53,91,'Lumen',12);
  layers.forEach((l,i)=>{main+=`<rect x="45" y="${109+i*39}" width="300" height="39" fill="${colors[i]}" stroke="#7fa0a6" stroke-opacity=".25"/>`+label(57,133+i*39,l,11,'#d2e2e8');});
  main+=`<path d="M45 268H345" stroke="#bbac83" stroke-dasharray="5 4"/>`+label(47,287,bladder?'Beyond bladder':'Peritoneal surface where present',10);
  let depth=t==='Tis'?16:t==='Ta'?0:t==='T1'?58:t==='T2a'?91:t.startsWith('T2')?105:t==='T3a'?122:t.startsWith('T3')?142:t.startsWith('T4')?178:0;
  if(T&&t!=='Ta')main+=`<path d="M258 106 C234 122 252 ${110+depth} 270 ${110+depth} C291 ${110+depth} 306 123 278 106Z" fill="${C.tumor}" fill-opacity=".85" stroke="#ffb5b8"/>`;
  if(t==='Ta')main+=`<path d="M255 109V95l-12-8 10-10 14 12 9-15 13 8-9 16v11" fill="${C.tumor}"/>`;
  if(t==='T4b')main+=`<rect x="248" y="282" width="70" height="34" rx="10" fill="#6d4b62" stroke="${C.tumor}"/>`+label(241,337,bladder?'Pelvic / abdominal wall':'Adjacent organ',9);
  caption=bladder?'Depth, not diameter, separates Ta/Tis, T1 and muscle-invasive T2.':'Follow invasion outward from the mucosa. T4a and T4b describe different boundaries.';
 }else if(o.id==='lung'){
  main=`<path d="M192 60V137M192 119l-34 31M192 119l34 31" fill="none" stroke="#698a9a" stroke-width="9" stroke-linecap="round"/>`+organPath('M166 80C119 54 63 169 74 264Q114 287 170 255L174 135Z')+organPath('M216 82C264 56 318 178 310 264Q261 288 212 252L207 138Z');
  main+=`<path d="M82 187L162 221M217 157L303 219" stroke="#7498a8" stroke-opacity=".35" fill="none"/>`+label(91,306,'Patient right',10)+label(243,306,'Patient left',10);
  if(T)main+=mass(122,163,r);
  main+=node(169,170,n==='N1')+node(192,162,['N2a','N2b'].includes(n))+node(192,206,n==='N2b')+node(226,166,n==='N3')+node(242,78,n==='N3');
  if(t==='T3')main+=`<path d="M82 139L77 179" stroke="${C.tumor}" stroke-width="6" opacity=".5"/>`;
  caption='Primary shown in the patient’s right lung. Highlighted stations illustrate the selected N distribution, not every nodal station.';
 }else if(o.id==='kidney'){
  main=organPath('M155 79C69 59 64 261 146 280C208 298 225 231 177 211C144 197 152 164 184 148C217 128 205 88 155 79Z');
  main+=`<path d="M70 66Q32 177 66 289M67 67Q212 25 239 162Q258 312 144 309" fill="none" stroke="#a2af9c" stroke-dasharray="5 5"/><path d="M181 179H288M288 70V291" stroke="#5b9ebd" stroke-width="15" fill="none"/><path d="M248 111H327" stroke="#80949e" stroke-dasharray="4 4"/>`+label(250,99,'Diaphragm',10)+label(188,160,'Renal vein',10)+label(267,316,'Vena cava',10)+label(48,335,'Gerota fascia',10);
  if(T)main+=mass(124,149,r);
  if(t.startsWith('T3'))main+=`<path d="M159 179H${t==='T3a'?'260':t==='T3b'?'288V152':'288V79'}" stroke="${C.tumor}" stroke-width="9" fill="none"/>`;
  if(t==='T4')main+=`<path d="M112 148Q70 149 49 131" stroke="${C.tumor}" stroke-width="21" fill="none"/>`;
  caption='Size determines T1/T2 only when confined. T3 venous extension is illustrated; fat or collecting-system invasion can also be T3a.';
 }else if(o.id==='breast'){
  main=`<rect x="69" y="64" width="30" height="230" rx="4" fill="#4c5666"/><path d="M106 68Q302 125 285 217Q252 299 105 291Z" fill="${C.organ}" stroke="${C.edge}" stroke-width="3"/><path d="M108 72Q308 127 290 218Q254 304 107 294" fill="none" stroke="#cba0b0" stroke-width="5"/>`+label(55,324,'Chest wall',10)+label(241,324,'Skin',10);
  if(T&&t!=='T0')main+=mass(204,170,r);
  if(['T4a','T4c'].includes(t))main+=`<path d="M204 170H84" stroke="${C.tumor}" stroke-width="18" opacity=".8"/>`;
  if(['T4b','T4c','T4d'].includes(t))main+=`<path d="M258 124Q302 177 281 227" stroke="${C.tumor}" stroke-width="11" opacity=".8" fill="none"/>`;
  caption='Invasive size and qualifying skin/chest-wall extension contribute to T. This illustration does not show biomarker-based prognosis.';
 }else if(o.id==='prostate'){
  main=organPath('M139 72Q92 52 102 119Q119 164 192 167Q259 165 274 119Q289 53 243 72Q191 98 139 72Z');
  main+=`<path d="M192 165V318" stroke="#6b96a7" stroke-width="8"/><ellipse cx="192" cy="239" rx="80" ry="50" fill="${C.organ}" stroke="${C.edge}" stroke-width="2"/><path d="M140 184Q114 140 136 154Q164 147 167 187M217 187Q226 143 250 154Q267 142 244 187" stroke="#698899" stroke-width="9" fill="none"/>`+label(165,115,'Bladder',12)+label(264,183,'Seminal',10)+label(264,197,'vesicles',10)+label(171,312,'Prostate',11);
  if(T)main+=mass(165,237,r);
  if(t==='T3b')main+=`<path d="M166 222L149 176" stroke="${C.tumor}" stroke-width="15"/>`;
  if(t==='T3a')main+=`<path d="M150 241L100 253" stroke="${C.tumor}" stroke-width="16"/>`;
  if(t==='T4')main+=`<path d="M167 231L147 147" stroke="${C.tumor}" stroke-width="20" opacity=".7"/>`;
  caption='A schematic local-extent view. PSA and Grade Group can change the group without changing this anatomy.';
 }else if(o.id==='pancreas'){
  main=organPath('M92 201Q61 244 96 274Q137 304 153 243Q179 219 243 215Q294 210 323 170Q324 148 297 161Q237 176 194 175Q132 153 92 201Z');
  main+=`<path d="M80 164C26 127 20 316 87 307" stroke="#586d78" stroke-width="13" fill="none"/><path d="M220 61V160l-17 128M220 113l-54 6M220 113l62 24" stroke="#ae6e78" stroke-width="7" fill="none"/>`+label(225,69,'Aorta',10)+label(227,273,'SMA',10)+label(41,334,'Duodenum',10);
  if(T)main+=mass(140,215,r);
  if(t==='T4')main+=`<path d="M147 211L210 208" stroke="${C.tumor}" stroke-width="20" fill="none"/>`;
  caption='T4 concerns specific major arteries. Venous interfaces and resectability require a separate assessment.';
 }else if(o.id==='liver'){
  main=organPath('M58 119Q155 68 296 119Q359 155 291 198L144 283Q75 317 54 260Q26 184 58 119Z');
  main+=`<path d="M176 114L174 179L271 153M174 179L129 241M174 179L92 161" stroke="#668fa4" stroke-width="8" fill="none"/>`+label(55,333,'Liver and major vascular branches',11);
  if(T)main+=mass(115,179,r);
  if((t==='T2'&&s.visualFeature!=='small-vessel')||t==='T3')main+=mass(241,163,11);
  if(s.visualFeature==='small-vessel')main+=`<path d="M120 181l17 13 9-9" stroke="${C.tumor}" stroke-width="6" fill="none"/>`;
  if(t==='T4')main+=`<path d="M124 181L174 179L212 169" stroke="${C.tumor}" stroke-width="12"/>`;
  caption='Multiplicity and vascular involvement are separate features. T2 can also be a solitary >2 cm tumor with vascular invasion.';
 }else if(o.id==='thyroid'){
  main=`<rect x="174" y="70" width="36" height="236" rx="12" fill="#1a3345" stroke="#5b7c8c"/>`;
  for(let y=90;y<303;y+=21)main+=`<path d="M179 ${y}H205" stroke="#5c7785"/>`;
  main+=organPath('M168 167Q136 91 104 137Q77 184 105 264Q131 292 166 231L214 231Q249 292 277 264Q305 184 279 137Q247 92 214 167Z');
  main+=`<path d="M78 96V307M311 96V307" stroke="#647e91" stroke-width="9"/>`+label(59,331,'Lateral neck vessels',10)+label(220,85,'Trachea',10);
  if(T)main+=mass(130,198,r);
  if(t==='T4a')main+=`<path d="M142 197H192" stroke="${C.tumor}" stroke-width="21"/>`;
  if(t==='T4b')main+=`<ellipse cx="78" cy="197" rx="18" ry="29" fill="none" stroke="${C.tumor}" stroke-width="10"/>`;
  if(t==='T3b')main+=`<path d="M128 182L112 126" stroke="${C.tumor}" stroke-width="17"/>`;
  caption='Gross extension changes T. Age changes the group, not the anatomical extent shown here.';
 }
 const nText=n==='NX'?'Unassessed':n==='N0'?'No regional spread':n==='N1c'?'N1c · deposits':n||'Choose N';
 const mText=m==='unknown'?'Not established':m==='M0'?'No distant spread':meta?'Distant spread':'Choose M';
 let side=`<rect x="378" y="59" width="150" height="115" rx="12" fill="#10232f" stroke="#2a4553"/>`+label(394,81,'REGIONAL NODES',9)+label(394,107,nText,12,'#e5c17a');
 for(let i=0;i<4;i++)side+=node(402+i*29,142,positive&&!['N1c','N1mi'].includes(n)&&(i<(n.startsWith('N1')?1:n.startsWith('N2')?3:4)));
 if(n==='N1c')side+=`<path d="M512 136l6 6-6 6-6-6Z" fill="${C.tumor}"/>`;
 if(n==='N1mi')side+=`<circle cx="402" cy="142" r="2.5" fill="${C.node}"/>`;
 side+=`<rect x="378" y="198" width="150" height="123" rx="12" fill="#10232f" stroke="#2a4553"/>`+label(394,222,'DISTANT SITES',9)+label(394,247,mText,12,'#bba6f4');
 side+=`<circle cx="416" cy="281" r="17" fill="${meta?'#786399':'#1a3040'}" stroke="#796f97"/><circle cx="482" cy="281" r="17" fill="${meta?'#786399':'#1a3040'}" stroke="#796f97"/>`;
 if(meta)side+=`<circle cx="414" cy="281" r="6" fill="${C.distant}"/>`;
 if(o.id==='lung'&&m==='M1c1')side+=`<circle cx="424" cy="289" r="3" fill="${C.distant}"/><circle cx="405" cy="271" r="3" fill="${C.distant}"/>`;
 if((o.id==='lung'&&m==='M1c2')||(['colon','rectum'].includes(o.id)&&m==='M1b'))side+=`<circle cx="480" cy="281" r="6" fill="${C.distant}"/>`;
 // Side-panel circles are symbolic, not a count of involved organs or nodes.
 return {svg:`<svg viewBox="0 0 555 365" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${o.name} schematic illustrating primary extent and symbolic regional and distant spread" font-family="system-ui,sans-serif"><defs><pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#658597" stroke-opacity=".055"/></pattern></defs><rect width="555" height="365" fill="url(#grid)"/>${label(42,30,o.name.toUpperCase()+' · '+(t||'SELECT PRIMARY EXTENT'),10,'#c4d9e4')}${main}${side}</svg>`,caption,legend};
}
