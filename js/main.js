// ===== BOGA SHOWRYA — Security Portfolio =====

// mobile nav toggle
(function(){
  const btn = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
})();

// status bar: live clock + session timer
(function(){
  const clockEl = document.getElementById('clock');
  const upEl = document.getElementById('uptime');
  const start = Date.now();
  function pad(n){ return n.toString().padStart(2,'0'); }
  function tick(){
    const now = new Date();
    if(clockEl){
      clockEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} IST`;
    }
    if(upEl){
      const s = Math.floor((Date.now()-start)/1000);
      upEl.textContent = `session ${pad(Math.floor(s/60))}:${pad(s%60)}`;
    }
  }
  tick();
  setInterval(tick, 1000);
})();

// scroll reveal
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window) || !els.length){
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:0.12 });
  els.forEach(el => io.observe(el));
})();

// matrix rain — signature background element
function startMatrixRain(canvasId){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const glyphs = 'アイウエオカキクケコサシスセソ01;:.=*+-<>/\\|[]{}#$%'.split('');
  let cols, drops, colors;
  const palette = ['#39ff8c','#2ee6ff','#ff3fa4'];

  function resize(){
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    cols = Math.floor(canvas.width / 16);
    drops = new Array(cols).fill(0).map(()=> Math.random() * -40);
    colors = new Array(cols).fill(0).map(()=> palette[Math.floor(Math.random()*palette.length)]);
  }
  resize();
  window.addEventListener('resize', resize);

  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){ return; }

  function draw(){
    ctx.fillStyle = 'rgba(6,9,10,0.16)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = '14px monospace';
    for(let i=0;i<cols;i++){
      const text = glyphs[Math.floor(Math.random()*glyphs.length)];
      ctx.fillStyle = colors[i];
      ctx.fillText(text, i*16, drops[i]*16);
      if(drops[i]*16 > canvas.height && Math.random() > 0.975){
        drops[i] = 0;
        colors[i] = palette[Math.floor(Math.random()*palette.length)];
      }
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

// terminal boot sequence (used on homepage hero)
function bootTerminal(targetId, lines, opts){
  const el = document.getElementById(targetId);
  if(!el) return;
  const options = Object.assign({ typeSpeed:16, lineDelay:260, loop:false }, opts||{});
  let i = 0;

  function typeLine(line, cb){
    const row = document.createElement('div');
    row.className = 'term-line';
    row.innerHTML = line.prefix || '';
    el.appendChild(row);

    if(line.instant){
      row.innerHTML += line.text;
      return cb();
    }

    let j = 0;
    const span = document.createElement('span');
    row.appendChild(span);
    const timer = setInterval(()=>{
      span.textContent += line.text[j];
      j++;
      if(j >= line.text.length){
        clearInterval(timer);
        setTimeout(cb, options.lineDelay);
      }
    }, options.typeSpeed);
  }

  function next(){
    if(i >= lines.length){
      const caret = document.createElement('span');
      caret.className = 'cursor';
      el.appendChild(caret);
      if(options.loop){ setTimeout(()=>{ el.innerHTML=''; i=0; next(); }, 3200); }
      return;
    }
    typeLine(lines[i], ()=>{ i++; next(); });
  }
  next();
}
