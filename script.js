/* ── LOADER ── */
window.addEventListener('load',()=>{
  setTimeout(()=>{
    const loader = document.getElementById('loader');
    loader.style.transition='opacity .6s ease';
    loader.style.opacity='0';
    setTimeout(()=>{loader.style.display='none';},600);
    // Trigger hero BG zoom
    document.getElementById('heroBg').classList.add('zoomed');
  },2200);
});

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mouseX=0,mouseY=0,ringX=0,ringY=0;

document.addEventListener('mousemove',e=>{
  mouseX=e.clientX;mouseY=e.clientY;
  cursor.style.left=mouseX+'px';cursor.style.top=mouseY+'px';
});

function animateRing(){
  ringX+=(mouseX-ringX)*0.12;
  ringY+=(mouseY-ringY)*0.12;
  ring.style.left=ringX+'px';ring.style.top=ringY+'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a,button,.program-card,.trainer-card,.price-card,.feature-item').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cursor.style.transform='translate(-50%,-50%) scale(2.5)';
    ring.style.width='60px';ring.style.height='60px';
    ring.style.borderColor='rgba(255,60,0,0.8)';
  });
  el.addEventListener('mouseleave',()=>{
    cursor.style.transform='translate(-50%,-50%) scale(1)';
    ring.style.width='40px';ring.style.height='40px';
    ring.style.borderColor='rgba(255,60,0,0.5)';
  });
});

/* ── NAVBAR SCROLL ── */
const header = document.getElementById('header');
window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled',window.scrollY>60);
});

/* ── PARTICLES ── */
const particleContainer = document.getElementById('particles');
for(let i=0;i<25;i++){
  const p = document.createElement('div');
  p.className='particle';
  const size = Math.random()*3+1;
  p.style.cssText=`
    left:${Math.random()*100}%;
    width:${size}px;height:${size}px;
    animation-duration:${Math.random()*10+8}s;
    animation-delay:${Math.random()*8}s;
    opacity:${Math.random()*0.5+0.3};
  `;
  particleContainer.appendChild(p);
}

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const observer = new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>{e.target.classList.add('visible');},
        parseInt(e.target.style.transitionDelay||'0')*1000||0
      );
    }
  });
},{threshold:0.12});
revealEls.forEach(el=>observer.observe(el));

/* ── COUNTER ANIMATION ── */
const counters = document.querySelectorAll('.counter');
let countersStarted = false;
const counterObserver = new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting && !countersStarted){
    countersStarted = true;
    counters.forEach(counter=>{
      const target = +counter.dataset.target;
      const suffix = target>=100?'%':'';
      const plusSign = target===3500?'+':'';
      let current = 0;
      const step = target/60;
      const timer = setInterval(()=>{
        current = Math.min(current+step,target);
        counter.textContent = Math.floor(current)+(current>=target?plusSign+suffix:'');
        if(current>=target)clearInterval(timer);
      },25);
    });
  }
},{threshold:0.5});
counters.forEach(c=>counterObserver.observe(c));

/* ── PARALLAX HERO ── */
window.addEventListener('scroll',()=>{
  const scrolled = window.scrollY;
  const heroBg = document.getElementById('heroBg');
  if(heroBg && scrolled<window.innerHeight){
    heroBg.style.transform=`scale(1) translateY(${scrolled*0.3}px)`;
  }
});

/* ── FORM ── */
function handleForm(e){
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent='Sending...';
  btn.style.opacity='0.7';
  setTimeout(()=>{
    btn.textContent='✓ Message Sent!';
    btn.style.background='#1a7a1a';
    btn.style.opacity='1';
    setTimeout(()=>{
      btn.textContent='Send Message →';
      btn.style.background='';
      e.target.reset();
    },3000);
  },1500);
}

/* ── RIPPLE on buttons ── */
document.querySelectorAll('.btn-primary,.btn-price,.btn-outline').forEach(btn=>{
  btn.addEventListener('click',function(e){
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    ripple.style.cssText=`
      position:absolute;border-radius:50%;
      background:rgba(255,255,255,0.25);
      width:10px;height:10px;
      top:${e.clientY-rect.top-5}px;left:${e.clientX-rect.left-5}px;
      transform:scale(0);
      animation:rippleOut .6s ease forwards;
      pointer-events:none;
    `;
    this.style.position='relative';
    this.style.overflow='hidden';
    this.appendChild(ripple);
    setTimeout(()=>ripple.remove(),600);
  });
});

const style = document.createElement('style');
style.textContent=`
@keyframes rippleOut{
  to{transform:scale(40);opacity:0;}
}`;
document.head.appendChild(style);