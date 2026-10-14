// Original teaching models. No patient data or image interpretation.
export function windowGray(hu,center,width){
 if(![hu,center,width].every(Number.isFinite)||width<1)throw new RangeError('Finite values and width >= 1 required');
 const lower=center-.5-(width-1)/2,upper=center-.5+(width-1)/2;
 if(hu<=lower)return 0;if(hu>upper)return 255;
 return Math.round(((hu-(center-.5))/(width-1)+.5)*255);
}
export const presets={soft:{center:40,width:400},lung:{center:-600,width:1500},bone:{center:400,width:1800},narrow:{center:40,width:80}};
export const materials=[{name:'Air insert',hu:-1000,x:.32,y:.32},{name:'Low-density insert',hu:-750,x:.68,y:.32},{name:'Fat-like insert',hu:-100,x:.28,y:.65},{name:'Water insert',hu:0,x:.5,y:.72},{name:'Dense insert',hu:1000,x:.72,y:.65}];
export function phantomHU(x,y,slice=10){
 const r=.43-Math.abs(slice-10)*.008;
 if((x-.5)**2+(y-.5)**2>r*r)return -1000;
 for(const m of materials)if((x-m.x)**2+(y-m.y)**2<(.075+.012*Math.sin(slice*.24))**2)return m.hu;
 // Deterministic low-amplitude variation demonstrates contrast, not CT noise physics.
 return 40+Math.round(8*Math.sin(x*50)*Math.cos(y*40));
}
export function magnification(sourceDetector,objectDetector){
 if(sourceDetector<=objectDetector||objectDetector<0)throw new RangeError('Object must lie between source and detector');
 return sourceDetector/(sourceDetector-objectDetector);
}
export const sequences={
 t1:{name:'T1 weighted',fluid:25,white:170,gray:105,note:'Typical brain teaching pattern: CSF is dark and white matter brighter than gray matter. Fat suppression and other parameters can change appearances.'},
 t2:{name:'T2 weighted',fluid:240,white:90,gray:145,note:'Typical teaching pattern: CSF is bright; gray matter is relatively brighter than white matter.'},
 flair:{name:'FLAIR',fluid:15,white:85,gray:130,note:'A T2-weighted inversion-recovery technique suppresses free-fluid/CSF signal. Fluid suppression does not make every fluid-containing lesion dark.'},
 dwi:{name:'DWI + ADC',fluid:25,white:100,gray:120,note:'High signal on high-b-value DWI plus low ADC supports restricted diffusion in the right context. T2 shine-through can make DWI bright without low ADC.'}
};
