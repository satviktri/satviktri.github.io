import * as THREE from './vendor/three.module.min.js';
import {OrbitControls} from './vendor/OrbitControls.js';
import {STRUCTURES,BY_ID} from './data.js';
import {compatibilityRenderer} from './compat-renderer.js';

export function createAtlas(onSelect){
 const canvas=document.querySelector('#anatomy'),wrap=document.querySelector('#canvas-wrap'),labelRoot=document.querySelector('#labels');
 let renderer;
 try{const context=canvas.getContext('webgl2',{antialias:true,alpha:true});if(!context)throw new Error('WebGL2 unavailable');renderer=new THREE.WebGLRenderer({canvas,context,antialias:true,alpha:true});}
 catch{renderer=compatibilityRenderer(canvas);const tag=document.querySelector('.schematic-tag');tag.textContent='SCHEMATIC 3D · COMPATIBILITY';}
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,80);
 const controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.dampingFactor=.09;controls.minDistance=5;controls.maxDistance=23;controls.maxPolarAngle=Math.PI*.85;controls.minPolarAngle=Math.PI*.15;controls.enablePan=true;
 scene.add(new THREE.HemisphereLight(0xd8fbff,0x263343,2.4));const key=new THREE.DirectionalLight(0xffffff,3.1);key.position.set(-3,6,6);scene.add(key);const rim=new THREE.DirectionalLight(0x75e4ba,2);rim.position.set(4,1,-4);scene.add(rim);
 const groups={nodes:new THREE.Group(),vessels:new THREE.Group(),organs:new THREE.Group(),body:new THREE.Group()};Object.entries(groups).forEach(([name,g])=>{g.name=name;scene.add(g);});
 const selectable=[],models=new Map(),curves=[],beads=[],labelItems=[];let selected=new Set(['thoracic']),isolated=false,flow=true,showLabels=true,routeLine=null,routeBeads=[],last=0,elapsed=0,destroyed=false;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;flow=!reduced;
 const sphere=new THREE.SphereGeometry(1,20,14),v=p=>new THREE.Vector3(...p);
 function ellipsoid(pos,scale,mat,group){const m=new THREE.Mesh(sphere,mat);m.position.copy(v(pos));m.scale.set(...scale);group.add(m);return m;}
 const bodyMat=new THREE.MeshPhongMaterial({color:0x9ab6c8,transparent:true,opacity:.07,depthWrite:false,shininess:22,side:THREE.DoubleSide});
 function envelope(pos,scale){return ellipsoid(pos,scale,bodyMat,groups.body);}
 // A coordinate scaffold only: all body envelopes and organs are schematic.
 envelope([0,3.89,-.05],[.48,.61,.41]);envelope([0,3.02,-.04],[.26,.47,.26]);
 const profiles=[[-1.36,.54],[-1.12,.79],[-.78,.86],[-.4,.77],[.05,.76],[.62,.91],[1.2,1.04],[1.86,1.04],[2.28,.96],[2.53,.67],[2.72,.27]];
 const torso=new THREE.Mesh(new THREE.LatheGeometry(profiles.map(([y,r])=>new THREE.Vector2(r,y)),48),bodyMat);torso.scale.z=.48;groups.body.add(torso);
 function limb(a,b,r1,r2){const d=v(b).sub(v(a)),m=new THREE.Mesh(new THREE.CylinderGeometry(r2,r1,d.length(),24,1,false),bodyMat);m.position.copy(v(a).add(v(b)).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());groups.body.add(m);envelope(a,[r1,r1,r1*.9]);envelope(b,[r2,r2,r2*.9]);}
 for(const s of [-1,1]){limb([s*.96,2.25,0],[s*1.53,.7,0],.29,.21);limb([s*1.53,.7,0],[s*1.97,-.66,.08],.21,.13);envelope([s*2.02,-.94,.1],[.17,.35,.12]);limb([s*.46,-1.12,-.02],[s*.59,-2.99,-.04],.37,.23);limb([s*.59,-2.99,-.04],[s*.63,-4.54,.04],.23,.13);envelope([s*.64,-4.65,.24],[.19,.18,.38]);}
 // Sparse coordinate guides give depth without implying a segmented skeleton.
 const guideMat=new THREE.LineBasicMaterial({color:0x4a7385,transparent:true,opacity:.15});
 const ring=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({length:100},(_,i)=>{const a=i/100*Math.PI*2;return new THREE.Vector3(Math.cos(a)*2.1,-4.86,Math.sin(a)*.7)})),guideMat);scene.add(ring);
 function addMesh(id,mesh){mesh.userData.id=id;selectable.push(mesh);if(!models.has(id))models.set(id,[]);models.get(id).push(mesh);}
 function tube(points,color=0x5dafbd,radius=.018,id=null){const curve=new THREE.CatmullRomCurve3(points.map(v));const mat=new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.30,roughness:.5,transparent:true,opacity:.6});const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,Math.max(24,points.length*12),radius,6,false),mat);groups.vessels.add(mesh);if(id)addMesh(id,mesh);mesh.userData.baseOpacity=.6;curves.push({curve,mesh,id});return {curve,mesh};}
 STRUCTURES.forEach(s=>{
  const color=s.kind==='node'?0x81eeba:s.kind==='organ'?0xe6b576:0x68cbed;
  const mat=new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.28,metalness:.12,roughness:.36,transparent:true,opacity:1});
  if(s.path){tube(s.path,color,s.id==='thoracic'?.042:.048,s.id);return;}
  if(s.kind==='node'){
   const n=s.cluster||5;for(let i=0;i<n;i++){const angle=i*2.4,spread=i===0?0:.085+Math.floor(i/3)*.055;const p=[s.pos[0]+Math.cos(angle)*spread,s.pos[1]+(i-(n-1)/2)*.063,s.pos[2]+Math.sin(angle)*.10];const mesh=ellipsoid(p,[.066,.084,.053],mat.clone(),groups.nodes);mesh.rotation.z=Math.sin(i*2)*.65;addMesh(s.id,mesh);}
  }else if(s.id==='tonsils'){for(const x of [-.21,.21])addMesh(s.id,ellipsoid([x,s.pos[1],s.pos[2]],[.075,.13,.065],mat.clone(),groups.organs));
  }else if(s.id==='thymus'){for(const x of [-.1,.1]){const mesh=ellipsoid([x,2.07,.38],[.14,.32,.10],mat.clone(),groups.organs);mesh.rotation.z=x>0?-.15:.15;addMesh(s.id,mesh);}
  }else if(s.id==='peyers'){for(let i=0;i<4;i++)addMesh(s.id,ellipsoid([s.pos[0]+Math.sin(i*1.5)*.13,s.pos[1]+i*.09,s.pos[2]],[.043,.067,.04],mat.clone(),groups.organs));
  }else{const sc=s.id==='spleen'?[.20,.38,.14]:s.id==='marrow'?[.1,.36,.09]:[.095,.2,.075];const m=ellipsoid(s.pos,sc,mat,s.kind==='duct'?groups.vessels:groups.organs);if(s.id==='spleen')m.rotation.z=-.35;addMesh(s.id,m);}
 });
 for(const sign of [-1,1]){
  const side=sign===-1?'r':'l',p=id=>BY_ID[id+'-'+side].pos,end=[sign*.64,2.61,.2];
  for(const dx of [-.13,.04,.15])tube([[sign*(.64+dx),-4.35,.15],[sign*(.63+dx),-3.45,.14],[sign*(.62+dx),-2.65,.16],p('inguinal')],0x589d9e,.012);
  tube([[sign*.67,-4.35,-.15],p('popliteal'),p('inguinal')],0x529595,.013);
  tube([p('inguinal'),p('iliac'),BY_ID.lumbar.pos,BY_ID.cisterna.pos],0x63bca9,.019);
  for(const dx of [-.05,.07])tube([[sign*(2.04+dx),-.97,.08],[sign*(1.86+dx),-.2,.1],p('cubital'),p('axillary')],0x68b7ae,.014);
  tube([p('axillary'),[sign*.84,2.38,.05],end],sign===-1?0x7eb9e3:0x74c9b4,.022);
  tube([[sign*.30,3.6,.07],p('cervical'),[sign*.36,2.84,.06],end],0x6bc3b1,.022);
  tube([p('hilar'),[sign*.28,2.12,-.15],[sign*.30,2.5,-.05],end],0x6dafc6,.014);
  tube([[sign*.78,.8,.13],[sign*.9,1.26,.17],p('axillary')],0x4d9494,.012);
 }
 tube([BY_ID.mesenteric.pos,[.18,.45,.03],BY_ID.cisterna.pos],0x79b7b0,.022);
 for(const x of [-.3,-.1,.15,.32])tube([[x,-.25,.26],[x,.04,.25],BY_ID.mesenteric.pos],0x789f89,.013);
 // Short blue segments indicate the venous junctions, not complete veins.
 for(const sign of [-1,1])tube([[sign*.92,2.6,.18],[sign*.64,2.61,.2],[sign*.35,2.48,.18]],0x5188ba,.045);
 const beadGeo=new THREE.SphereGeometry(.025,8,6),beadMat=new THREE.MeshBasicMaterial({color:0xa9ffce});
 curves.forEach(({curve,mesh,id},i)=>{if(i%2!==0&&!id)return;for(let j=0;j<2;j++){const b=new THREE.Mesh(beadGeo,beadMat);groups.vessels.add(b);beads.push({b,curve,base:mesh,offset:j*.5+i*.17});}});
 const labeled=[['cervical-l','Cervical nodes',[1.17,3.10,.1]],['axillary-r','Axillary nodes',[-1.67,2.10,.3]],['thoracic','Thoracic duct',[1.21,1.45,.2]],['spleen','Spleen',[1.37,.61,.15]],['inguinal-r','Inguinal nodes',[-1.42,-1.4,.3]],['popliteal-l','Popliteal nodes',[1.31,-3,.2]]];
 labeled.forEach(([id,text,pos])=>{const el=document.createElement('span');el.className='model-label';el.textContent=text;el.addEventListener('click',()=>onSelect(id));labelRoot.append(el);labelItems.push({id,el,pos:v(pos)});});
 function updateAppearance(){
  for(const [id,meshes] of models){const active=selected.has(id);for(const m of meshes){m.visible=!isolated||active;m.material.opacity=active?1:(selected.size>1?.33:.8);m.material.emissiveIntensity=active?.75:.18;}}
  for(const c of curves)if(!c.id){c.mesh.visible=!isolated;c.mesh.material.opacity=selected.size>1?.2:.5;}
  labelItems.forEach(l=>{l.el.classList.toggle('selected',selected.has(l.id));});
 }
 const ray=new THREE.Raycaster(),pointer=new THREE.Vector2(),tip=document.querySelector('#tooltip');let down=null;
 function hit(e){const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);return ray.intersectObjects(selectable.filter(m=>m.visible&&m.parent.visible),false)[0];}
 canvas.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY]});
 canvas.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const h=hit(e);if(h)onSelect(h.object.userData.id);down=null;});
 canvas.addEventListener('pointermove',e=>{if(e.buttons){tip.hidden=true;return;}const h=hit(e);canvas.style.cursor=h?'pointer':'grab';tip.hidden=!h;if(h){const s=BY_ID[h.object.userData.id];tip.textContent=(s.side?s.side+' ':'')+s.name;const r=canvas.getBoundingClientRect();tip.style.left=Math.min(e.clientX-r.left+12,r.width-185)+'px';tip.style.top=e.clientY-r.top+12+'px';}});
 canvas.addEventListener('pointerleave',()=>tip.hidden=true);
 function resize(){const w=wrap.clientWidth,h=wrap.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);}
 const observer=new ResizeObserver(resize);observer.observe(wrap);
 function view(which){const distance=window.innerWidth<620?20.8:21;const target=new THREE.Vector3(0,-.2,0);camera.position.set(which==='side'?distance:0,-.15,which==='back'?-distance:which==='side'?0:distance);controls.target.copy(target);controls.update();}
 controls.addEventListener('change',()=>{const angle=controls.getAzimuthalAngle(),front=Math.cos(angle)>=0,lateral=Math.abs(Math.cos(angle))<.25;document.querySelector('#orientation-r').textContent=lateral?(Math.sin(angle)>0?'A':'P'):(front?'R':'L');document.querySelector('#orientation-l').textContent=lateral?(Math.sin(angle)>0?'P':'A'):(front?'L':'R');});
 controls.addEventListener('start',()=>document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active')));
 canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-'].includes(e.key))return;e.preventDefault();const off=camera.position.clone().sub(controls.target);const sph=new THREE.Spherical().setFromVector3(off);if(e.key==='ArrowLeft')sph.theta-=.1;if(e.key==='ArrowRight')sph.theta+=.1;if(e.key==='ArrowUp')sph.phi=Math.max(.2,sph.phi-.1);if(e.key==='ArrowDown')sph.phi=Math.min(Math.PI-.2,sph.phi+.1);if(e.key==='+')sph.radius=Math.max(5,sph.radius-.5);if(e.key==='-')sph.radius=Math.min(23,sph.radius+.5);camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(sph));controls.update();});
 function setRoute(route){if(routeLine){scene.remove(routeLine);routeLine.geometry.dispose();routeLine.material.dispose();routeLine=null;}routeBeads.forEach(b=>scene.remove(b));routeBeads=[];if(!route)return;
  let pts=[route.start];if(route.id.includes('leg'))pts.push(...route.ids.filter(id=>id!=='thoracic').map(id=>BY_ID[id].pos),...BY_ID.thoracic.path.slice(1));
  else if(route.id==='gut')pts.push(BY_ID.mesenteric.pos,...BY_ID.thoracic.path);
  else if(route.id==='left-neck')pts.push(BY_ID['cervical-l'].pos,[.38,2.8,.1],route.end);
  else{const s=route.id==='right-arm'?-1:1;pts.push([s*1.66,.59,.12],BY_ID['axillary-'+(s===-1?'r':'l')].pos,[s*.82,2.36,.08],route.end);}
  const curve=new THREE.CatmullRomCurve3(pts.map(v));routeLine=new THREE.Mesh(new THREE.TubeGeometry(curve,160,.028,8,false),new THREE.MeshBasicMaterial({color:0xc8ffe0,transparent:true,opacity:.8}));scene.add(routeLine);routeLine.userData.curve=curve;
  for(let i=0;i<7;i++){const b=new THREE.Mesh(beadGeo,new THREE.MeshBasicMaterial({color:0xffffff}));b.scale.setScalar(1.8);scene.add(b);routeBeads.push(b);}
 }
 function frame(t){if(destroyed)return;requestAnimationFrame(frame);const dt=Math.min((t-last)/1000,.05);last=t;if(flow)elapsed+=dt;controls.update();
  beads.forEach(({b,curve,base,offset})=>{b.visible=base.visible&&groups.vessels.visible&&!isolated;b.position.copy(curve.getPointAt((elapsed*.13+offset)%1));});
  if(routeLine){routeLine.visible=groups.vessels.visible;routeBeads.forEach((b,i)=>{b.visible=groups.vessels.visible;b.position.copy(routeLine.userData.curve.getPointAt((elapsed*.1+i/7)%1));});}
  labelItems.forEach(l=>{const p=l.pos.clone().project(camera),item=BY_ID[l.id],layer=item.kind==='node'?'nodes':item.kind==='organ'?'organs':'vessels';l.el.hidden=!showLabels||!groups[layer].visible||(isolated&&!selected.has(l.id))||p.z>1||p.z< -1;l.el.style.left=(p.x*.5+.5)*wrap.clientWidth+'px';l.el.style.top=(-p.y*.5+.5)*wrap.clientHeight+'px';});renderer.render(scene,camera);
 }
 view('front');resize();updateAppearance();requestAnimationFrame(frame);
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();document.querySelector('#viewer-error').hidden=false;});
 return {select(ids){selected=new Set(ids);updateAppearance();},layer(name,value){if(groups[name])groups[name].visible=value;},labels(value){showLabels=value;},isolate(value){isolated=value;updateAppearance();},flow(value){flow=value;},view,setRoute,reset(){Object.values(groups).forEach(g=>g.visible=true);isolated=false;showLabels=true;updateAppearance();view('front');},destroy(){destroyed=true;observer.disconnect();controls.dispose();renderer.dispose();}};
}
