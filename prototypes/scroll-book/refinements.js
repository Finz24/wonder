// Local visual prototype only. Album selection is intentionally in memory.
document.querySelectorAll('.seal').forEach(seal=>{seal.replaceChildren(Object.assign(document.createElement('img'),{src:'assets/seal-v2.png',alt:'חותם שעווה אדום עם מונוגרמה W H O בכתב יד'}))});
document.querySelectorAll('.chapter').forEach(chapter=>{
 const figure=chapter.querySelector('figure'),mainImage=figure.querySelector('img');
 const album=document.createElement('div');album.className='album';figure.before(album);album.append(figure);
 const thumbs=document.createElement('div');thumbs.className='album-thumbs';thumbs.setAttribute('role','group');thumbs.setAttribute('aria-label','תמונות הפרויקט');
 const status=document.createElement('p');status.className='album-status';status.setAttribute('aria-live','polite');
 const originals=[{src:mainImage.getAttribute('src'),alt:mainImage.alt,label:'הסט המלא'},{src:`assets/${chapter.id}-detail.png`,alt:chapter.id==='moon'?'תקריב של קופסאות תכולות וכוכבי חומר':'תקריב של קופסאות תותים וסרטים',label:'מבט מקרוב'}];
 originals.forEach((item,i)=>{const button=document.createElement('button');button.type='button';button.className='album-thumb';button.setAttribute('aria-label',`תמונה ${i+1}: ${item.label}`);button.setAttribute('aria-pressed',String(i===0));button.append(Object.assign(document.createElement('img'),{src:item.src,alt:'',loading:'lazy'}));button.onclick=()=>{mainImage.src=item.src;mainImage.alt=item.alt;thumbs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));status.textContent=item.label;count.textContent=`${i+1} / ${originals.length}`};thumbs.append(button)});
 const count=document.createElement('span');count.className='album-count';count.dir='ltr';count.textContent=`1 / ${originals.length}`;thumbs.append(count);album.append(thumbs,status);
});
if(!new URLSearchParams(location.search).has('ownerPreview')){const link=document.createElement('a');link.className='owner-entry';link.href='owner.html';link.textContent='הסטודיו של הילה ↗';link.title='הדגמת אזור הניהול — ללא התחברות';document.body.append(link)}
function renderProjectTestimonials(chapter,quotes){
 chapter.querySelector('.project-testimonials')?.remove();if(!quotes?.length)return;
 const panel=document.createElement('details');panel.className='project-testimonials';panel.open=true;
 const summary=document.createElement('summary');summary.textContent=`מילים טובות על הפרויקט · ${quotes.length}`;panel.append(summary);
 quotes.forEach(text=>{const item=document.createElement('div');item.className='quote-item';const quote=document.createElement('blockquote');quote.textContent=text;const note=document.createElement('p');note.className='quote-note';note.textContent='המלצה אנונימית בדיונית · להמחשת העיצוב בלבד';item.append(quote,note);panel.append(item)});
 chapter.querySelector('.chapter-end').before(panel);
}
renderProjectTestimonials(document.querySelector('#strawberry'),['הצבעים, האריזה וההשקעה — היה ברור שהכול נעשה באהבה.']);
renderProjectTestimonials(document.querySelector('#moon'),['כל כוכב קטן הרגיש כמו מתנה בפני עצמו. נשאר לנו זיכרון יפה מהחגיגה.']);
// The owner preview receives unsaved text from its same-origin parent only.
addEventListener('message',event=>{if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='wonder-preview')return;const project=event.data.project;const chapter=document.querySelector('#strawberry');chapter.querySelector('h2').textContent=project.title;chapter.querySelector('.story p').textContent=project.description;const img=chapter.querySelector('figure>img');if(project.image)img.src=project.image;renderProjectTestimonials(chapter,project.testimonials||[]);document.querySelectorAll('.chapter').forEach(el=>{if(el!==chapter)el.hidden=true});chapter.scrollIntoView();});
