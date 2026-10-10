import * as THREE from './vendor/three.module.min.js';
import {OrbitControls} from './vendor/OrbitControls.js';
import {VESSELS,BY_ID} from './data.js';
import {compatibilityRenderer} from './compat-renderer.js';

export function createAtlas(onSelect){
 const canvas=document.querySelector('#anatomy'),wrap=document.querySelector('#canvas-wrap'),labelRoot=document.querySelector('#labels');
 let renderer;
 try{const context=canvas.getContext('webgl2',{antialias:true,alpha:true});if(!context)throw new Error('WebGL2 unavailable');renderer=new THREE.WebGLRenderer({canvas,context,antialias:true,alpha:true});}
 catch{renderer=compatibilityRenderer(canvas);document.querySelector('.schematic-tag').textContent='SCHEMATIC 3D · COMPATIBILITY';}
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,80),controls=new OrbitControls(camera,canvas);
 controls.enableDamping=true;controls.dampingFactor=.09;controls.minDistance=2.5;controls.maxDistance=26;
 scene.add(new THREE.HemisphereLight(0xf0f8ff,0x183146,2.4));const key=new THREE.DirectionalLight(0xffffff,2.5);key.position.set(-3,6,7);scene.add(key);
 const body=new THREE.Group();body.name='body';scene.add(body);
 const sphere=new THREE.SphereGeometry(1,20,14),v=p=>new THREE.Vector3(...p);
 const bodyMat=new THREE.MeshPhongMaterial({color:0x9ab6c8,transparent:true,opacity:.055,depthWrite:false,shininess:22,side:THREE.DoubleSide});
 function ellipse(pos,scale,mat=bodyMat,group=body){const m=new THREE.Mesh(sphere,mat);m.position.copy(v(pos));m.scale.set(...scale);group.add(m);return m;}
 ellipse([0,3.89,-.05],[.48,.61,.41]);ellipse([0,3.02,-.04],[.26,.47,.26]);
 const profiles=[[-1.36,.54],[-1.12,.79],[-.78,.86],[-.4,.77],[.05,.76],[.62,.91],[1.2,1.04],[1.86,1.04],[2.28,.96],[2.53,.67],[2.72,.27]];
 const torso=new THREE.Mesh(new THREE.LatheGeometry(profiles.map(([y,r])=>new THREE.Vector2(r,y)),40),bodyMat);torso.scale.z=.48;body.add(torso);
 function limb(a,b,r1,r2){const d=v(b).sub(v(a)),m=new THREE.Mesh(new THREE.CylinderGeometry(r2,r1,d.length(),20),bodyMat);m.position.copy(v(a).add(v(b)).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());body.add(m);ellipse(a,[r1,r1,r1*.9]);ellipse(b,[r2,r2,r2*.9]);}
 for(const s of [-1,1]){limb([s*.96,2.25,0],[s*1.53,.7,0],.29,.21);limb([s*1.53,.7,0],[s*1.97,-.66,.08],.21,.13);ellipse([s*2.02,-.94,.1],[.17,.35,.12]);limb([s*.46,-1.12,-.02],[s*.59,-2.99,-.04],.37,.23);limb([s*.59,-2.99,-.04],[s*.63,-4.54,.04],.23,.13);ellipse([s*.64,-4.65,.24],[.19,.18,.38]);ellipse([s*.69,1.57,-.15],[.30,.71,.24]);ellipse([s*.69,.03,-.18],[.17,.28,.11]);}
 const heart=new THREE.Group();heart.name='heart';scene.add(heart);
 for(const [pos,scale,color] of [[[-.16,1.70,.08],[.23,.29,.20],0x27678b],[[.05,1.35,.17],[.31,.38,.24],0x35779a],[[.34,1.77,-.07],[.24,.23,.20],0xa35265],[[.40,1.30,.14],[.29,.42,.25],0xc35f6e]]){
 const m=ellipse(pos,scale,new THREE.MeshStandardMaterial({color,transparent:true,opacity:.27,roughness:.75,depthWrite:false}),heart);m.rotation.z=.28;}
 const models=new Map(),selectable=[],labels=[],beads=[];let selected=new Set(['aortic-arch']),visible=new Set(VESSELS.map(d=>d.id)),isolated=false,flow=!matchMedia('(prefers-reduced-motion: reduce)').matches,showLabels=true,speed=1,time=0,last=0;
 const beadGeo=new THREE.SphereGeometry(.021,6,5),beadMat=new THREE.MeshBasicMaterial({color:0xfff8e5});
 VESSELS.forEach((d,i)=>{
  const color=d.oxygen==='high'?0xff777d:0x60bfea,curve=new THREE.CatmullRomCurve3(d.path.map(v),false,'centripetal');
  const mat=new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.3,roughness:.55,transparent:true,opacity:.82});
  const tube=new THREE.Mesh(new THREE.TubeGeometry(curve,Math.max(20,d.path.length*12),d.radius,7,false),mat);tube.userData.id=d.id;scene.add(tube);selectable.push(tube);
  const arrow=new THREE.Mesh(new THREE.ConeGeometry(.057,.15,8),new THREE.MeshBasicMaterial({color:0xf8f3e9,transparent:true,opacity:.75,depthTest:false}));
  arrow.position.copy(curve.getPointAt(.58));arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),curve.getTangentAt(.58));arrow.userData.arrowTangent=curve.getTangentAt(.58);arrow.renderOrder=5;scene.add(arrow);
  const b=new THREE.Mesh(beadGeo,beadMat.clone());b.renderOrder=6;scene.add(b);beads.push({b,curve,offset:(i*.371)%1,tube,id:d.id});models.set(d.id,{tube,arrow,curve});
 });
 const labelData=[['cca-r','Common carotid',[-1.02,3.4,.2]],['subclavian-l','Subclavian',[1.18,2.72,.2]],['aortic-arch','Aortic arch',[1.13,2.10,.3]],['renal-l','Renal vessels',[1.31,.15,.2]],['femoral-r','Femoral artery',[-1.38,-2.15,.2]],['popliteal-l','Popliteal',[1.26,-3.11,.1]]];
 labelData.forEach(([id,name,pos])=>{const el=document.createElement('button');el.className='model-label';el.textContent=name;el.addEventListener('click',()=>onSelect(id));labelRoot.append(el);labels.push({id,el,pos:v(pos)});});
 function appearance(){for(const [id,{tube,arrow}] of models){const active=selected.has(id),shown=visible.has(id)&&(!isolated||active);tube.visible=arrow.visible=shown;tube.material.opacity=active?1:selected.size>1?.12:.78;tube.material.emissiveIntensity=active?.75:.24;arrow.material.opacity=active?1:selected.size>1?.10:.62;}labels.forEach(l=>l.el.classList.toggle('selected',selected.has(l.id)));}
 const ray=new THREE.Raycaster(),pointer=new THREE.Vector2(),tip=document.querySelector('#tooltip');let down=null;
 function hit(e){const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);return ray.intersectObjects(selectable.filter(m=>m.visible),false)[0];}
 canvas.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);
 canvas.addEventListener('pointerup',e=>{if(down&&Math.hypot(e.clientX-down[0],e.clientY-down[1])<5){const h=hit(e);if(h)onSelect(h.object.userData.id);}down=null;});
 canvas.addEventListener('pointermove',e=>{if(e.buttons){tip.hidden=true;return;}const h=hit(e);canvas.style.cursor=h?'pointer':'grab';tip.hidden=!h;if(h){tip.textContent=BY_ID[h.object.userData.id].name;const r=canvas.getBoundingClientRect();tip.style.left=Math.max(8,Math.min(e.clientX-r.left+12,r.width-225))+'px';tip.style.top=e.clientY-r.top+12+'px';}});
 canvas.addEventListener('pointerleave',()=>tip.hidden=true);
 function resize(){const w=wrap.clientWidth,h=wrap.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);}
 new ResizeObserver(resize).observe(wrap);
 function view(which){const distance=19.3;controls.target.set(0,-.2,0);camera.position.set(which==='side'?distance:0,-.2,which==='back'?-distance:which==='side'?0:distance);controls.update();document.querySelector('#view-title').textContent='Whole-body circulation';}
 controls.addEventListener('change',()=>{const angle=controls.getAzimuthalAngle(),front=Math.cos(angle)>=0,lateral=Math.abs(Math.cos(angle))<.25;document.querySelector('#orientation-r').textContent=lateral?(Math.sin(angle)>0?'A':'P'):(front?'R':'L');document.querySelector('#orientation-l').textContent=lateral?(Math.sin(angle)>0?'P':'A'):(front?'L':'R');});
 controls.addEventListener('start',()=>document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active')));
 canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-'].includes(e.key))return;e.preventDefault();const sph=new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target));if(e.key==='ArrowLeft')sph.theta-=.12;if(e.key==='ArrowRight')sph.theta+=.12;if(e.key==='ArrowUp')sph.phi=Math.max(.2,sph.phi-.12);if(e.key==='ArrowDown')sph.phi=Math.min(Math.PI-.2,sph.phi+.12);if(e.key==='+'||e.key==='=')sph.radius=Math.max(2.5,sph.radius-.5);if(e.key==='-')sph.radius=Math.min(26,sph.radius+.5);camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(sph));controls.update();});
 function focus(ids){const points=ids.flatMap(id=>BY_ID[id]?.path||[]).map(v);if(!points.length)return;const box=new THREE.Box3().setFromPoints(points),center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3());const distance=Math.max(3.5,Math.max(size.y,size.x/Math.max(camera.aspect,.5))*2.2+1.4);controls.target.copy(center);camera.position.copy(center).add(new THREE.Vector3(0,0,Math.min(distance,22)));controls.update();document.querySelector('#view-title').textContent=ids.length===1?BY_ID[ids[0]].name:'Selected circulation';}
 function frame(t){requestAnimationFrame(frame);if(wrap.offsetParent===null){last=t;return;}const dt=Math.min((t-last)/1000,.05);last=t;if(flow)time+=dt*speed;controls.update();beads.forEach(({b,curve,offset,tube,id})=>{b.visible=tube.visible&&(selected.size<=1||selected.has(id));if(b.visible){b.position.copy(curve.getPointAt((time*.16+offset)%1));b.scale.setScalar(selected.has(id)?1.5:1);}});labels.forEach(l=>{const p=l.pos.clone().project(camera);l.el.hidden=!showLabels||!visible.has(l.id)||(isolated&&!selected.has(l.id))||p.z>1||p.z< -1;l.el.style.left=(p.x*.5+.5)*wrap.clientWidth+'px';l.el.style.top=(-p.y*.5+.5)*wrap.clientHeight+'px';});renderer.render(scene,camera);}
 view('front');resize();appearance();requestAnimationFrame(frame);
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();document.querySelector('#viewer-error').hidden=false;});
 return{select(ids){selected=new Set(ids);appearance();},filter(ids){visible=new Set(ids);appearance();},isolate(value){isolated=value;appearance();},labels(value){showLabels=value;},flow(value){flow=value;},speed(value){speed=value;},view,focus,resize};
}
