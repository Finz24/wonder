// Throwaway study: continuous native scrolling drives a parchment aperture.
const root=document.documentElement, cover=document.querySelector('.cover-inner'), ending=document.querySelector('.ending');
const media=matchMedia('(prefers-reduced-motion: reduce)');
let reduced=media.matches, queued=false;
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
function render(){queued=false;const h=innerHeight,y=scrollY,open=clamp(y/(h*.7));const close=clamp((y-ending.offsetTop)/(ending.offsetHeight-h*.85));const gap=210+(h*.43-210)*open-(h*.43-260)*close;root.style.setProperty('--gap',`${gap}px`);cover.style.opacity=1-clamp(y/(h*.55));cover.style.transform=`translateY(${y*.3-8}px) scale(${1-open*.08})`;document.querySelectorAll('.chapter figure').forEach((el,i)=>{const p=clamp((h-el.getBoundingClientRect().top)/(h+el.offsetHeight));el.style.transform=reduced?'none':`translateY(${(p-.5)*-24}px) rotate(${(i?1:-1)*(2-p)}deg)`});}
function schedule(){if(!queued){queued=true;requestAnimationFrame(render)}}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
function motion(){document.body.classList.toggle('reduced',reduced);document.querySelector('#motion').setAttribute('aria-pressed',String(reduced));document.querySelector('#motion').textContent=reduced?'הפעלת תנועה':'הפחתת תנועה';render()}
document.querySelector('#motion').onclick=()=>{reduced=!reduced;motion()};media.onchange=e=>{reduced=e.matches;motion()};
const dialog=document.querySelector('dialog');document.querySelectorAll('[data-contact]').forEach(button=>button.onclick=()=>{document.querySelector('#message').textContent='היי הילה, ראיתי את העבודות ב־Wonder ואשמח לדבר על משהו לאירוע שלי.'+(button.dataset.project?' הפרויקט שנתן לי השראה: '+location.href.split('#')[0]+'#'+button.dataset.project:'');dialog.showModal()});dialog.querySelectorAll('.close,.close-action').forEach(button=>button.onclick=()=>dialog.close());motion();
