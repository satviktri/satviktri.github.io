import {BY_ID,categories} from './data.js';
const validNumber=x=>x!==''&&x!==null&&x!==undefined&&Number.isFinite(Number(x));
const ready=(stage,rule)=>({status:'ready',stage,rule});
const blocked=(status,rule)=>({status,stage:null,rule});
const starts=(s,p)=>s.startsWith(p);
export function classify(input){
 const {organ,mode='c',context='initial',t='',n='',m=''}=input,o=BY_ID[organ];
 if(!o)return blocked('unsupported','Choose a supported primary site and histology.');
 if(!['c','p'].includes(mode))return blocked('unsupported','Only initial clinical and pathological classifications are implemented.');
 if(context!=='initial')return blocked('unsupported','Post-neoadjuvant and recurrent stage grouping is outside this calculator. Preserve the pretreatment stage and use the appropriate yc/yp/r classification with the source.');
 if(!t||!n||!m)return blocked('incomplete','Select T, N and M explicitly. Unknown or unassessed disease must not be entered as negative.');
 for(const [axis,value,extra] of [['t',t,'TX'],['n',n,'NX'],['m',m,'unknown']]){
  if(value!==extra&&!categories(o,axis,mode).some(x=>x.code===value))return blocked('review',`${value} is not supported for this site and classification. Recheck the selected categories.`);
 }
 if(m==='unknown')return blocked('incomplete','Distant metastatic status is not established. A definitive group is not returned.');
 const metastatic=m.startsWith('M1'),nodePositive=n!=='N0'&&n!=='NX';
 if(['Tis','Ta','T1mi'].includes(t)&&((t!=='T1mi'||organ==='lung')&&(nodePositive||metastatic)))return blocked('review','An in situ/noninvasive or minimally invasive lung category with nodal/distant spread needs reconciliation. Review occult invasion, histology and attribution of metastases.');
 if(organ==='thyroid'){
  if(!validNumber(input.age)||Number(input.age)<0||Number(input.age)>120||!Number.isInteger(Number(input.age)))return blocked('incomplete','Enter a valid whole-number age at diagnosis (0–120 years).');
  if(Number(input.age)<55)return ready(metastatic?'II':'I',`Differentiated thyroid cancer, age <55: any T / any N with ${metastatic?'M1 → II':'M0 → I'}.`);
  if(metastatic)return ready('IVB','Differentiated thyroid cancer, age ≥55, M1 → IVB regardless of T/N.');
  if(t==='T4b')return ready('IVA','Age ≥55, T4b with any N and M0 → IVA.');
  if(t==='T4a')return ready('III','Age ≥55, T4a with any N and M0 → III.');
  if(starts(t,'T3'))return ready('II','Age ≥55, T3 with any N and M0 → II.');
  if(starts(t,'T1')||t==='T2')return ready(nodePositive?'II':'I',`Age ≥55, T1/T2 with ${nodePositive?'N1 → II':'N0 or NX → I'} at M0.${n==='NX'?' NX is explicitly permitted in this grouping.':''}`);
 }
 if(metastatic){
  const stage=organ==='lung'?(m.startsWith('M1c')?'IVB':'IVA'):['colon','rectum'].includes(organ)?({M1a:'IVA',M1b:'IVB',M1c:'IVC'}[m]):organ==='prostate'?'IVB':organ==='bladder'?(m==='M1a'?'IVA':'IVB'):organ==='liver'?'IVB':'IV';
  return ready(stage,`${m} determines ${stage} for this disease site, regardless of the T/N category.`);
 }
 if(organ==='prostate'){
  if(n==='N1')return ready('IVA','Regional nodal metastasis (N1) with M0 → IVA, regardless of PSA, Grade Group or T.');
  if(n==='NX')return blocked('incomplete','A nonmetastatic prostate group requires established regional nodal status.');
  if(!validNumber(input.grade)||![1,2,3,4,5].includes(Number(input.grade)))return blocked('incomplete','Select the pathological Grade Group (1–5). It is not interchangeable with the Gleason score.');
  const gg=Number(input.grade);
  if(gg===5)return ready('IIIC','Grade Group 5 with N0 M0 → IIIC, at any T and PSA.');
  if(starts(t,'T3')||t==='T4')return ready('IIIB','T3/T4, Grade Group 1–4 and N0 M0 → IIIB, at any PSA.');
  if(t==='TX')return blocked('incomplete','Primary extent is needed for this combination.');
  if(!validNumber(input.psa)||Number(input.psa)<0)return blocked('incomplete','Enter a valid pretreatment PSA in ng/mL; a blank is not zero.');
  const psa=Number(input.psa);
  if(psa>=20)return ready('IIIA','T1/T2, Grade Group 1–4, PSA ≥20 ng/mL and N0 M0 → IIIA.');
  if(gg>=3)return ready('IIC','T1/T2, Grade Group 3–4, PSA <20 and N0 M0 → IIC.');
  if(gg===2)return ready('IIB','T1/T2, Grade Group 2, PSA <20 and N0 M0 → IIB.');
  if(psa>=10||['T2b','T2c'].includes(t))return ready('IIA','Grade Group 1: PSA 10–<20 or clinical T2b/T2c, with PSA <20 and N0 M0 → IIA.');
  return ready('I','Grade Group 1, PSA <10, cT1/cT2a or pT2, and N0 M0 → I.');
 }
 // Rules explicitly allowing any N are applied before NX is rejected.
 if(organ==='kidney'&&t==='T4')return ready('IV','T4 with any N and M0 → IV. Distant metastasis is not required.');
 if(organ==='pancreas'&&t==='T4')return ready('III','Specified major arterial involvement (T4), any N, M0 → III.');
 if(organ==='bladder'&&t==='T4b')return ready('IVA','Pelvic/abdominal wall invasion (T4b), any N, M0 → IVA.');
 if(organ==='liver'&&n==='N1')return ready('IVA','HCC with regional nodal metastasis (N1) and M0 → IVA.');
 if(organ==='breast'&&n==='N3'&&t!=='TX')return ready('IIIC','N3 regional nodal disease and M0 → anatomic IIIC.');
 if(t==='TX'||n==='NX')return blocked('incomplete','The entered unknown T/N category prevents a definitive group for this combination. Consult the disease-specific rules.');
 let stage=null,rule='';
 if(organ==='lung'){
  if(t==='Tis')return ready('0','Tis N0 M0 → stage 0.');
  if(t==='T1mi')return ready('IA1','T1mi N0 M0 → IA1.');
  const matrix={T1a:['IA1','IIA','IIB','IIIA','IIIB'],T1b:['IA2','IIA','IIB','IIIA','IIIB'],T1c:['IA3','IIA','IIB','IIIA','IIIB'],T2a:['IB','IIB','IIIA','IIIB','IIIB'],T2b:['IIA','IIB','IIIA','IIIB','IIIB'],T3:['IIB','IIIA','IIIA','IIIB','IIIC'],T4:['IIIA','IIIA','IIIB','IIIB','IIIC']};
  stage=matrix[t]?.[['N0','N1','N2a','N2b','N3'].indexOf(n)];rule=`AJCC Version 9 lung group: ${t} + ${n} + M0 → ${stage}.`;
 }else if(organ==='breast'){
  if(t==='Tis')return ready('0','Tis N0 M0 → anatomic stage 0.');
  const T=t.startsWith('T1')?'T1':t.startsWith('T4')?'T4':t;
  if(n==='N1mi'&&['T0','T1'].includes(T))return ready('IB','T0/T1 with N1mi and M0 → anatomic IB.');
  const N=n==='N1mi'?'N1':n;
  const matrix={T0:[null,'IIA','IIIA','IIIC'],T1:['IA','IIA','IIIA','IIIC'],T2:['IIA','IIB','IIIA','IIIC'],T3:['IIB','IIIA','IIIA','IIIC'],T4:['IIIB','IIIB','IIIB','IIIC']};
  stage=matrix[T]?.[['N0','N1','N2','N3'].indexOf(N)];rule=`Anatomic grouping: ${T} + ${N} + M0 → ${stage}.${n==='N1mi'?' For T2–T4, N1mi is grouped as N1.':''} Biomarker-based prognostic stage is not calculated.`;
 }else if(['colon','rectum'].includes(organ)){
  if(t==='Tis')return ready('0','Tis N0 M0 → stage 0.');
  const N=n.startsWith('N1')?'N1':n;
  const matrix={T1:['I','IIIA','IIIA','IIIB'],T2:['I','IIIA','IIIB','IIIB'],T3:['IIA','IIIB','IIIB','IIIC'],T4a:['IIB','IIIB','IIIC','IIIC'],T4b:['IIC','IIIC','IIIC','IIIC']};
  stage=matrix[t]?.[['N0','N1','N2a','N2b'].indexOf(N)];rule=`Colorectal group: ${t} + ${n} + M0 → ${stage}.${n==='N1c'?' Deposits without positive nodes still constitute regional stage III disease.':''}`;
 }else if(organ==='kidney'){
  stage=n==='N1'||t.startsWith('T3')?'III':t.startsWith('T2')?'II':'I';rule=`Renal cell carcinoma: ${t} + ${n} + M0 → ${stage}.`;
 }else if(organ==='bladder'){
  if(t==='Ta')return ready('0a','Noninvasive papillary Ta N0 M0 → 0a.');
  if(t==='Tis')return ready('0is','Flat in situ Tis N0 M0 → 0is.');
  stage=['N2','N3'].includes(n)?'IIIB':n==='N1'||t.startsWith('T3')||t==='T4a'?'IIIA':t.startsWith('T2')?'II':'I';rule=`Bladder group: ${t} + ${n} + M0 → ${stage}.`;
 }else if(organ==='pancreas'){
  if(t==='Tis')return ready('0','Tis N0 M0 → stage 0.');
  stage=n==='N2'?'III':n==='N1'?'IIB':t==='T3'?'IIA':t==='T2'?'IB':'IA';rule=`Exocrine pancreas group: ${t} + ${n} + M0 → ${stage}.`;
 }else if(organ==='liver'){
  stage={T1a:'IA',T1b:'IB',T2:'II',T3:'IIIA',T4:'IIIB'}[t];rule=`HCC with N0 M0: ${t} → ${stage}. Hepatic reserve is not part of this TNM group.`;
 }
 return stage?ready(stage,rule):blocked('review','No group is assigned for this combination in the implemented table. Check primary attribution, categories and the official source.');
}
export function formatTNM({mode='c',t='',n='',m='',metPath=false}){
 const prefix=mode==='p'?'p':'c';
 return [t?prefix+t:'T?',n?prefix+n:'N?',m&&m!=='unknown'?((mode==='p'&&metPath&&m.startsWith('M1'))?'p':'c')+m:'M?'].join(' · ');
}
export function deriveT(organ,{size='',extent='none',multiple=false,vascular=false}={}){
 const o=BY_ID[organ];if(!o)return null;
 const ext=o.extent||[];
 if(o.helper==='depth')return ext.some(x=>x.code===extent)?extent:null;
 if(!validNumber(size)||Number(size)<=0)return null;
 const x=Number(size);let t;
 if(organ==='lung')t=x<=1?'T1a':x<=2?'T1b':x<=3?'T1c':x<=4?'T2a':x<=5?'T2b':x<=7?'T3':'T4';
 if(organ==='breast')t=x<=.1?'T1mi':x<=.5?'T1a':x<=1?'T1b':x<=2?'T1c':x<=5?'T2':'T3';
 if(organ==='kidney')t=x<=4?'T1a':x<=7?'T1b':x<=10?'T2a':'T2b';
 if(organ==='pancreas')t=x<=.5?'T1a':x<1?'T1b':x<=2?'T1c':x<=4?'T2':'T3';
 if(organ==='thyroid')t=x<=1?'T1a':x<=2?'T1b':x<=4?'T2':'T3a';
 if(organ==='liver')return extent==='T4'?'T4':multiple?(x>5?'T3':'T2'):x<=2?'T1a':vascular?'T2':'T1b';
 if(extent!=='none'){
  if(!ext.some(e=>e.code===extent))return null;
  const list=o.t.map(d=>d.code);if(list.indexOf(extent)>list.indexOf(t))t=extent;
 }
 return t||null;
}
export function deriveN(organ,count,deposits=false){
 if(!validNumber(count)||!Number.isInteger(Number(count))||Number(count)<0)return null;
 const c=Number(count);
 if(['colon','rectum'].includes(organ))return c===0?(deposits?'N1c':'N0'):c===1?'N1a':c<=3?'N1b':c<=6?'N2a':'N2b';
 if(organ==='pancreas')return c===0?'N0':c<=3?'N1':'N2';
 return null;
}
