import test from 'node:test';
import assert from 'node:assert/strict';
import {COMPARISONS} from '../learning-visuals.js';
import {classify} from '../engine.js';
const expected={lung:[['IA3','IB'],['IIB','IIIA'],['IVB','IVB']],breast:[['IA','IIA'],['IIA','IIB'],['IA','IV']],colon:[['I','IIA'],['IIIB','IIIB'],['IVA','IVC']],rectum:[['IIA','IIC'],['IIA','IIIB'],['IIA','IVA']],prostate:[['I','IIIB'],['I','IVA'],['IVB','IVB'],['I','IIC']],kidney:[['I','III'],['I','III'],['I','IV']],bladder:[['I','II'],['IIIA','IIIB'],['IVA','IVB']],pancreas:[['IA','IB'],['IIB','III'],['IB','IV']],liver:[['IB','II'],['IB','IVA'],['IB','IVB']],thyroid:[['I','II'],['I','II'],['I','II'],['II','IVB']]};
test('all 32 visual comparisons match the stated groups and isolate one staging factor',()=>{
 for(const [organ,items] of Object.entries(COMPARISONS))for(const [i,e] of items.entries()){
  for(const [j,input] of [e.a,e.b].entries()){const r=classify({organ,mode:'c',context:'initial',...input});assert.equal(r.status,'ready',`${organ} ${i} ${j}`);assert.equal(r.stage,expected[organ][i][j],`${organ} ${i} ${j}`);}
  const changed=['t','n','m','age','grade','psa'].filter(k=>e.a[k]!==e.b[k]);assert.deepEqual(changed,[e.axis],`${organ} ${i}: only the selected clinical factor changes`);
 }
});
