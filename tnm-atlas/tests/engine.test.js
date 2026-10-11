import test from 'node:test';
import assert from 'node:assert/strict';
import {ORGANS,BY_ID,categories} from '../data.js';
import {classify,deriveT,deriveN,formatTNM} from '../engine.js';
const input=(organ,t,n,m='M0',extra={})=>({organ,t,n,m,mode:'c',context:'initial',...extra});
const stage=(...args)=>classify(input(...args)).stage;

test('all 30 independently authored worked cases match their stated groups',()=>{
 assert.equal(ORGANS.reduce((n,o)=>n+o.examples.length,0),30);
 for(const o of ORGANS)for(const e of o.examples){const result=classify({organ:o.id,context:'initial',...e.input});assert.equal(result.stage,e.expected,`${o.name}: ${e.title} — ${result.rule}`);}
});
test('lung Version 9 migrations, station distinctions and metastatic subclasses',()=>{
 // Reference: NCI lung PDQ Table 4, AJCC Version 9, reviewed 2026-10-11.
 const cases=[['T1a','N1','IIA'],['T1b','N2a','IIB'],['T1c','N2b','IIIA'],['T2a','N2b','IIIB'],['T3','N2a','IIIA'],['T3','N2b','IIIB'],['T3','N3','IIIC'],['T4','N2a','IIIB'],['T4','N0','IIIA']];
 for(const [t,n,want] of cases)assert.equal(stage('lung',t,n),want);
 assert.equal(stage('lung','TX','NX','M1a'),'IVA');assert.equal(stage('lung','T1a','N0','M1b'),'IVA');
 assert.equal(stage('lung','T1a','N0','M1c1'),'IVB');assert.equal(stage('lung','T1a','N0','M1c2'),'IVB');
 assert.equal(stage('lung','TX','N0'),null,'TX is not automatically occult carcinoma');
});
test('numeric T helpers include the correct side of each threshold',()=>{
 const cases={lung:[[1,'T1a'],[1.001,'T1b'],[2,'T1b'],[2.001,'T1c'],[3,'T1c'],[3.001,'T2a'],[4,'T2a'],[4.001,'T2b'],[5,'T2b'],[5.001,'T3'],[7,'T3'],[7.001,'T4']],breast:[[.1,'T1mi'],[.101,'T1a'],[.5,'T1a'],[.501,'T1b'],[1,'T1b'],[1.001,'T1c'],[2,'T1c'],[2.001,'T2'],[5,'T2'],[5.001,'T3']],kidney:[[4,'T1a'],[4.001,'T1b'],[7,'T1b'],[7.001,'T2a'],[10,'T2a'],[10.001,'T2b']],pancreas:[[.5,'T1a'],[.501,'T1b'],[.999,'T1b'],[1,'T1c'],[2,'T1c'],[2.001,'T2'],[4,'T2'],[4.001,'T3']],thyroid:[[1,'T1a'],[1.001,'T1b'],[2,'T1b'],[2.001,'T2'],[4,'T2'],[4.001,'T3a']]};
 for(const [organ,tests] of Object.entries(cases))for(const [size,want] of tests)assert.equal(deriveT(organ,{size}),want,`${organ}, ${size} cm`);
 for(const size of ['',null,undefined,-1,0,'abc',Infinity])assert.equal(deriveT('lung',{size}),null);
});
test('invasion cannot be downgraded by small size, and lower extension cannot reduce size category',()=>{
 assert.equal(deriveT('lung',{size:8,extent:'T2a'}),'T4');assert.equal(deriveT('lung',{size:1,extent:'T3'}),'T3');
 assert.equal(deriveT('kidney',{size:2,extent:'T3a'}),'T3a');assert.equal(deriveT('pancreas',{size:1,extent:'T4'}),'T4');
 assert.equal(deriveT('breast',{size:1,extent:'T4a'}),'T4a');assert.equal(deriveT('thyroid',{size:1,extent:'T3b'}),'T3b');
});
test('colorectal deposits, positive counts and stage-III combinations',()=>{
 for(const [c,want] of [[0,'N0'],[1,'N1a'],[2,'N1b'],[3,'N1b'],[4,'N2a'],[6,'N2a'],[7,'N2b']])assert.equal(deriveN('colon',c),want);
 assert.equal(deriveN('rectum',0,true),'N1c');assert.equal(deriveN('colon',2,true),'N1b');
 for(const c of ['',null,undefined,-1,1.5,'bad'])assert.equal(deriveN('colon',c),null);
 for(const [t,n,want] of [['T1','N2a','IIIA'],['T2','N2a','IIIB'],['T1','N2b','IIIB'],['T4a','N2a','IIIC'],['T3','N2b','IIIC'],['T4b','N1a','IIIC'],['T3','N1c','IIIB']]){
  assert.equal(stage('colon',t,n),want);assert.equal(stage('rectum',t,n),want);
 }
 for(const [m,want] of [['M1a','IVA'],['M1b','IVB'],['M1c','IVC']])assert.equal(stage('colon','TX','NX',m),want);
});
test('breast anatomic micrometastatic grouping and clinical/pathological distinction',()=>{
 assert.equal(stage('breast','T1c','N1mi','M0',{mode:'p'}),'IB');assert.equal(stage('breast','T2','N1mi','M0',{mode:'p'}),'IIB');assert.equal(stage('breast','T3','N1mi','M0',{mode:'p'}),'IIIA');assert.equal(stage('breast','T4a','N1mi','M0',{mode:'p'}),'IIIB');
 assert.equal(stage('breast','T1c','N1mi'),null,'This implementation does not accept cN1mi');
 assert.equal(stage('breast','T0','N0'),null);assert.equal(stage('breast','T0','N1'),'IIA');
 assert.equal(stage('breast','Tis','N1'),null);assert.equal(stage('breast','Tis','N0','M1'),null);
});
test('prostate PSA/GG boundaries and true pT2',()=>{
 const base={grade:1,psa:9.999};assert.equal(stage('prostate','T2a','N0','M0',base),'I');assert.equal(stage('prostate','T2a','N0','M0',{...base,psa:10}),'IIA');
 assert.equal(stage('prostate','T2c','N0','M0',base),'IIA');assert.equal(stage('prostate','T2','N0','M0',{...base,mode:'p'}),'I');assert.equal(stage('prostate','T1c','N0','M0',{...base,mode:'p'}),null);
 assert.equal(stage('prostate','T2a','N0','M0',{psa:19.999,grade:2}),'IIB');assert.equal(stage('prostate','T2a','N0','M0',{psa:20,grade:2}),'IIIA');assert.equal(stage('prostate','T2a','N0','M0',{psa:1,grade:3}),'IIC');
 assert.equal(stage('prostate','T4','N0','M0',{psa:1,grade:4}),'IIIB');assert.equal(stage('prostate','TX','N0','M0',{grade:5}),'IIIC');assert.equal(stage('prostate','TX','N1'),'IVA');assert.equal(stage('prostate','TX','NX','M1b'),'IVB');
 for(const extra of [{psa:'',grade:1},{psa:-1,grade:1},{psa:10,grade:''},{psa:10,grade:6}])assert.equal(stage('prostate','T1c','N0','M0',extra),null);
});
test('thyroid age boundary and explicit any-T/any-N rules',()=>{
 assert.equal(stage('thyroid','T4b','N1b','M0',{age:54}),'I');assert.equal(stage('thyroid','T4b','N1b','M1',{age:54}),'II');
 assert.equal(stage('thyroid','T4b','N1b','M0',{age:55}),'IVA');assert.equal(stage('thyroid','T1a','N0','M1',{age:55}),'IVB');
 assert.equal(stage('thyroid','T1a','NX','M0',{age:55}),'I');assert.equal(stage('thyroid','T3b','NX','M0',{age:55}),'II');assert.equal(stage('thyroid','TX','NX','M0',{age:54}),'I');
 for(const age of ['',null,-1,55.5,'bad'])assert.equal(stage('thyroid','T1a','N0','M0',{age}),null);
});
test('kidney/bladder local stage IV and metastatic site distinctions',()=>{
 assert.equal(stage('kidney','T4','NX'),'IV');assert.equal(stage('kidney','T1a','N1'),'III');
 assert.equal(stage('bladder','T4b','N3'),'IVA');assert.equal(stage('bladder','T4b','NX'),'IVA');assert.equal(stage('bladder','T2','N3'),'IIIB');
 assert.equal(stage('bladder','TX','NX','M1a'),'IVA');assert.equal(stage('bladder','TX','NX','M1b'),'IVB');assert.equal(stage('bladder','Ta','N1'),null);
 assert.equal(stage('bladder','T2b','N0'),null);assert.equal(stage('bladder','T2b','N0','M0',{mode:'p'}),'II');
});
test('pancreatic node counts and HCC number/vascular priorities',()=>{
 assert.equal(deriveN('pancreas',3),'N1');assert.equal(deriveN('pancreas',4),'N2');
 assert.equal(stage('pancreas','T1a','N2'),'III');assert.equal(stage('pancreas','T4','NX'),'III');
 assert.equal(deriveT('liver',{size:2,vascular:true}),'T1a');assert.equal(deriveT('liver',{size:2.01,vascular:true}),'T2');
 assert.equal(deriveT('liver',{size:5,multiple:true}),'T2');assert.equal(deriveT('liver',{size:5.01,multiple:true}),'T3');assert.equal(deriveT('liver',{size:1,extent:'T4'}),'T4');assert.equal(stage('liver','TX','N1'),'IVA');
});
test('missing inputs, incompatible categories and post-therapy never silently produce a stage',()=>{
 for(const organ of ORGANS){const t=organ.t[0].code,n=organ.n[0].code,m=organ.m[0].code;
  for(const field of ['t','n','m'])assert.equal(classify({...input(organ.id,t,n,m),[field]:''}).stage,null);
  assert.equal(classify(input(organ.id,t,n,'unknown')).stage,null);
  assert.equal(classify({...input(organ.id,t,n,m),context:'post'}).stage,null);
  assert.equal(classify({...input(organ.id,t,n,m),context:'recurrent'}).stage,null);
  assert.equal(classify(input(organ.id,'bogus',n,m)).stage,null);
 }
 assert.equal(formatTNM(input('kidney','T1a','N0','M0',{mode:'p',metPath:true})),'pT1a · pN0 · cM0');
 assert.equal(formatTNM(input('kidney','T1a','N0','M1',{mode:'p'})),'pT1a · pN0 · cM1');
 assert.equal(formatTNM(input('kidney','T1a','N0','M1',{mode:'p',metPath:true})),'pT1a · pN0 · pM1');
});
test('all exposed combinations produce a structured result, and metastatic invasive cases are grouped',()=>{
 for(const o of ORGANS)for(const mode of ['c','p'])for(const t of categories(o,'t',mode))for(const n of categories(o,'n',mode))for(const m of o.m){
  const r=classify(input(o.id,t.code,n.code,m.code,{mode,psa:12,grade:2,age:60}));assert(['ready','review','incomplete'].includes(r.status));assert.equal(typeof r.rule,'string');assert(!r.rule.includes('undefined'));
  if(m.code.startsWith('M1')&&!['Ta','Tis','T1mi'].includes(t.code))assert(r.stage,`${o.id} ${t.code} ${n.code} ${m.code}`);
 }
});
