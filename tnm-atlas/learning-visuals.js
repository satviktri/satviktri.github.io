// Original teaching comparisons. Category definitions and sources live in data.js.
const pair=(axis,title,note,a,b,labels)=>({axis,title,note,a,b,labels});
export const COMPARISONS={
 lung:[
  pair('t','Cross the 3 cm boundary','Size-only example: no higher T descriptor. A small measurement difference can cross a category boundary.',{t:'T1c',n:'N0',m:'M0'},{t:'T2a',n:'N0',m:'M0'},['3.0 cm primary','3.1 cm primary']),
  pair('n','One N2 station or several?','N2a and N2b distinguish one from multiple ipsilateral mediastinal/subcarinal stations in Version 9.',{t:'T1c',n:'N2a',m:'M0'},{t:'T1c',n:'N2b',m:'M0'},['One N2 station','Multiple N2 stations']),
  pair('m','Metastatic category can change without a new group','Multiple extrathoracic metastases in one organ system are M1c1; across multiple organ systems they are M1c2. Both group as IVB.',{t:'T1c',n:'N0',m:'M1c1'},{t:'T1c',n:'N0',m:'M1c2'},['One organ system','Multiple organ systems'])],
 breast:[
  pair('t','Measure the invasive component','With N0 M0, crossing 2 cm changes T1 to T2 and the anatomic group. Associated in-situ extent is not the invasive measurement.',{t:'T1c',n:'N0',m:'M0'},{t:'T2',n:'N0',m:'M0'},['2.0 cm invasive tumor','2.1 cm invasive tumor']),
  pair('n','Regional spread changes the group','Keep T2 and M0 fixed. This is anatomic staging; biomarkers and grade are not included.',{t:'T2',n:'N0',m:'M0'},{t:'T2',n:'N1',m:'M0'},['No regional nodal disease','Clinical N1 nodal disease']),
  pair('m','Distant disease overrides the local group','A small primary can still have distant metastasis. T does not determine M.',{t:'T1c',n:'N0',m:'M0'},{t:'T1c',n:'N0',m:'M1'},['No distant disease','Distant metastasis'])],
 colon:[
  pair('t','Follow depth through the bowel wall','T2 reaches muscularis propria. T3 extends beyond it into pericolorectal tissue; diameter is not the deciding boundary.',{t:'T2',n:'N0',m:'M0'},{t:'T3',n:'N0',m:'M0'},['Into the muscle layer','Beyond the muscle layer']),
  pair('n','A new N category can share a stage','N1b means 2–3 positive regional nodes; N2a means 4–6. With T3 M0, both combinations group as IIIB.',{t:'T3',n:'N1b',m:'M0'},{t:'T3',n:'N2a',m:'M0'},['Three positive nodes','Four positive nodes']),
  pair('m','Peritoneal spread has its own category','One distant organ without peritoneal involvement is M1a. Peritoneal metastasis is M1c, with or without other distant sites.',{t:'T3',n:'N0',m:'M1a'},{t:'T3',n:'N0',m:'M1c'},['One distant organ','Peritoneal metastasis'])],
 rectum:[
  pair('t','Mesorectal extension versus an adjacent organ','T3 extends beyond muscularis propria. Direct invasion of an adjacent organ is T4b; a threatened mesorectal fascia alone is not T4.',{t:'T3',n:'N0',m:'M0'},{t:'T4b',n:'N0',m:'M0'},['Into mesorectal tissue','Into an adjacent organ']),
  pair('n','Deposits are not positive lymph nodes','With no involved regional nodes, qualifying tumor deposits make N1c. The diamond represents a deposit outside a node.',{t:'T3',n:'N0',m:'M0'},{t:'T3',n:'N1c',m:'M0'},['No involved nodes or deposits','Deposits; zero positive nodes']),
  pair('m','Local extent and distant spread are separate','The primary remains T3 in both examples. One distant site without peritoneal metastasis changes M0 to M1a.',{t:'T3',n:'N0',m:'M0'},{t:'T3',n:'N0',m:'M1a'},['No distant disease','One distant site'])],
 prostate:[
  pair('t','Extension beyond the prostate','Clinical T2a is organ-confined. T3a describes extraprostatic extension; PSA and Grade Group are held fixed here.',{t:'T2a',n:'N0',m:'M0',psa:8,grade:1},{t:'T3a',n:'N0',m:'M0',psa:8,grade:1},['Organ-confined cT2a','Extraprostatic extension']),
  pair('n','Stage IV can occur at M0','Regional nodal involvement gives IVA even without distant spread.',{t:'T2a',n:'N0',m:'M0',psa:8,grade:1},{t:'T2a',n:'N1',m:'M0',psa:8,grade:1},['N0, no distant disease','N1, still M0']),
  pair('m','Different distant sites, same stage group','Nonregional nodes are M1a; bone metastasis is M1b. Both fall within stage IVB.',{t:'T2a',n:'N0',m:'M1a',psa:8,grade:1},{t:'T2a',n:'N0',m:'M1b',psa:8,grade:1},['Nonregional nodes','Bone metastasis']),
  pair('grade','Same anatomy, different Grade Group','PSA remains 8 ng/mL and the clinical categories remain T2a N0 M0. Grade Group changes the prognostic group.',{t:'T2a',n:'N0',m:'M0',psa:8,grade:1},{t:'T2a',n:'N0',m:'M0',psa:8,grade:3},['Grade Group 1','Grade Group 3'])],
 kidney:[
  pair('t','Local invasion can outweigh diameter','Both examples have a 3 cm primary. Renal-vein invasion makes the second T3a despite its small size.',{t:'T1a',n:'N0',m:'M0'},{t:'T3a',n:'N0',m:'M0'},['3 cm, kidney-confined','3 cm with renal-vein invasion']),
  pair('n','Nodal disease can upstage a confined primary','The kidney-confined T1b primary and M0 remain fixed. Regional nodal spread changes the stage group.',{t:'T1b',n:'N0',m:'M0'},{t:'T1b',n:'N1',m:'M0'},['No regional spread','Regional nodal spread']),
  pair('m','A confined primary can have distant spread','M1 groups as IV, regardless of the kidney-confined appearance of this T1b primary.',{t:'T1b',n:'N0',m:'M0'},{t:'T1b',n:'N0',m:'M1'},['No distant disease','Distant metastasis'])],
 bladder:[
  pair('t','The muscle boundary matters','T1 reaches lamina propria. T2 invades muscularis propria: the key boundary between these non-muscle-invasive and muscle-invasive categories.',{t:'T1',n:'N0',m:'M0'},{t:'T2',n:'N0',m:'M0'},['Lamina propria','Muscularis propria']),
  pair('n','Count involved true-pelvic nodes','N1 is one involved regional node in the true pelvis; N2 is multiple such nodes. Common iliac nodes are N3.',{t:'T2',n:'N1',m:'M0'},{t:'T2',n:'N2',m:'M0'},['One true-pelvic node','Multiple true-pelvic nodes']),
  pair('m','Distant nodes versus other sites','M1a is spread to lymph nodes beyond the common iliacs. Other distant metastases are M1b.',{t:'T2',n:'N0',m:'M1a'},{t:'T2',n:'N0',m:'M1b'},['Distant lymph nodes','Other distant metastasis'])],
 pancreas:[
  pair('t','Cross the 2 cm boundary','Without a T4 arterial feature, a 2 cm primary is T1c and a primary just over 2 cm is T2.',{t:'T1c',n:'N0',m:'M0'},{t:'T2',n:'N0',m:'M0'},['2.0 cm primary','2.1 cm primary']),
  pair('n','The fourth positive node changes N','N1 includes 1–3 involved regional nodes; N2 includes at least four. T2 and M0 remain fixed.',{t:'T2',n:'N1',m:'M0'},{t:'T2',n:'N2',m:'M0'},['Three positive nodes','Four positive nodes']),
  pair('m','Distant spread sets stage IV','Anatomical resectability is a separate assessment; it is not calculated from this comparison.',{t:'T2',n:'N0',m:'M0'},{t:'T2',n:'N0',m:'M1'},['No distant disease','Distant metastasis'])],
 liver:[
  pair('t','Vascular invasion changes a solitary tumor','For a solitary 3 cm HCC, smaller-vessel invasion changes T1b to T2. Major portal/hepatic branch involvement is a different, T4 feature.',{t:'T1b',n:'N0',m:'M0'},{t:'T2',n:'N0',m:'M0',visualFeature:'small-vessel'},['3 cm, no vascular invasion','3 cm with smaller-vessel invasion']),
  pair('n','Regional nodes can give stage IVA','N1 M0 is stage IVA in HCC. Stage IV does not always mean distant metastasis.',{t:'T1b',n:'N0',m:'M0'},{t:'T1b',n:'N1',m:'M0'},['No nodal spread','Regional nodal spread']),
  pair('m','Separate extent from liver function','M1 gives IVB. TNM does not measure hepatic reserve or replace liver-function assessment.',{t:'T1b',n:'N0',m:'M0'},{t:'T1b',n:'N0',m:'M1'},['No distant disease','Distant metastasis'])],
 thyroid:[
  pair('t','Gross strap-muscle invasion changes T','At age 60, compare a thyroid-confined T2 primary with gross strap-muscle invasion. Microscopic extension alone is not T3b.',{t:'T2',n:'N0',m:'M0',age:60},{t:'T3b',n:'N0',m:'M0',age:60},['Thyroid-confined T2','Gross strap-muscle invasion']),
  pair('n','Central nodes affect the older age band','At age 60, T2 N0 M0 is I; central level VI / upper mediastinal level VII involvement is N1a and groups as II.',{t:'T2',n:'N0',m:'M0',age:60},{t:'T2',n:'N1a',m:'M0',age:60},['No regional nodal spread','Central / level VII nodes']),
  pair('m','M1 does not always mean stage IV','For differentiated thyroid carcinoma diagnosed before age 55, M0 groups as I and M1 as II.',{t:'T2',n:'N1b',m:'M0',age:54},{t:'T2',n:'N1b',m:'M1',age:54},['Age 54, M0','Age 54, M1']),
  pair('age','Age changes the group, not the anatomy','The same T2 N1b M1 findings group differently at age 54 and age 55. Use age at diagnosis.',{t:'T2',n:'N1b',m:'M1',age:54},{t:'T2',n:'N1b',m:'M1',age:55},['Diagnosed at age 54','Diagnosed at age 55'])]
};
export function uniqueDiagram(svg,key){return svg.replace(/id="grid"/g,`id="grid-${key}"`).replace(/url\(#grid\)/g,`url(#grid-${key})`);}
export function conceptDiagram(axis){
 const start=`<svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${axis==='t'?'Primary tumor within an organ':axis==='n'?'Regional nodes near a primary tumor':'Distant spread separate from the primary organ'}">`;
 const primary='<path d="M35 37Q78 8 116 40Q143 66 111 109Q70 139 35 99Q13 68 35 37Z" fill="#264a5b" stroke="#779dae" stroke-width="2"/><circle cx="76" cy="73" r="20" fill="#f38b8f" stroke="#ffc1c4" stroke-width="2"/>';
 if(axis==='t')return start+primary+'<path d="M147 73H257M147 66v14M257 66v14" stroke="#f38b8f" stroke-width="3"/><path d="M74 45v56M68 45h12M68 101h12" stroke="#ffdcde" stroke-width="2"/><text x="161" y="110" fill="#b9ccd7" font-size="17" font-family="system-ui">Size / depth</text></svg>';
 if(axis==='n')return start+primary+'<path d="M110 72Q147 38 185 52M112 81Q159 105 221 99" fill="none" stroke="#728998" stroke-width="2" stroke-dasharray="5 5"/><ellipse cx="198" cy="47" rx="19" ry="13" fill="#e5c17a"/><ellipse cx="247" cy="53" rx="17" ry="12" fill="#28434d" stroke="#a3b8be"/><ellipse cx="225" cy="106" rx="20" ry="13" fill="#e5c17a"/></svg>';
 return start+primary+'<path d="M130 74H180" stroke="#bba6f4" stroke-width="3" stroke-dasharray="5 6"/><path d="M222 23Q192 18 192 63v46q32 21 37-5V33M242 23Q272 18 277 63v46q-32 21-37-5V33" fill="#263c51" stroke="#9390b2" stroke-width="2"/><circle cx="211" cy="80" r="11" fill="#c7b5f2"/></svg>';
}
