// script.js

// Adding navigation scroll effect
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Form submission handler
document.querySelector('#contact-form').addEventListener('submit', event => {
    event.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
});

/* Dynamic greeting */
(function() {
    const el = document.getElementById('greeting');
    if (!el) return;
    const h = new Date().getHours();
    const t = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
    el.textContent = t;
  })();
  
  /* Footer year */
  document.getElementById('year')?.append(new Date().getFullYear());
  
  /* DNA rungs: clone lines to create ladder */
  (function() {
    const g = document.querySelector('.dna .rungs');
    if (!g) return;
    for (let i = 0; i < 26; i++) {
      const y = 80 + i * 20;
      const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ln.setAttribute('x1', 120);
      ln.setAttribute('x2', 300);
      ln.setAttribute('y1', y);
      ln.setAttribute('y2', y);
      g.appendChild(ln);
    }
    // Add gradient stroke
    const svg = document.querySelector('.dna');
    const defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
    const grad = document.createElementNS('http://www.w3.org/2000/svg','linearGradient');
    grad.id = 'gradLine';
    grad.setAttribute('x1','0'); grad.setAttribute('x2','1'); grad.setAttribute('y1','0'); grad.setAttribute('y2','0');
    const s1 = document.createElementNS('http://www.w3.org/2000/svg','stop'); s1.setAttribute('offset','0'); s1.setAttribute('stop-color','#34d399');
    const s2 = document.createElementNS('http://www.w3.org/2000/svg','stop'); s2.setAttribute('offset','1'); s2.setAttribute('stop-color','#06b6d4');
    grad.appendChild(s1); grad.appendChild(s2); defs.appendChild(grad); svg.appendChild(defs);
  })();
  
  /* Copy buttons */
  document.querySelectorAll('.copy').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy || '';
      try {
        await navigator.clipboard.writeText(text);
        const old = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(() => (btn.textContent = old), 1200);
      } catch (_) {}
    });
  });
  
  /* Live Motif Finder (exact match) */
  (function() {
    const seq = document.getElementById('seq');
    const motif = document.getElementById('motif');
    const out = document.getElementById('result');
    if (!seq || !motif || !out) return;
  
    const render = () => {
      const s = (seq.value || '').toUpperCase().replace(/[^ACGT]/g, '');
      const m = (motif.value || '').toUpperCase().replace(/[^ACGT]/g, '');
      if (!s || !m || m.length > s.length) { out.textContent = ''; return; }
  
      // find exact matches
      const hits = [];
      for (let i = 0; i <= s.length - m.length; i++) {
        if (s.slice(i, i + m.length) === m) hits.push(i);
      }
  
      // render with highlights
      out.innerHTML = '';
      for (let i = 0; i < s.length; i++) {
        const span = document.createElement('span');
        const inHit = hits.some(p => i >= p && i < p + m.length);
        if (inHit) span.className = 'hit';
        span.textContent = s[i];
        out.appendChild(span);
      }
      if (!hits.length) out.insertAdjacentHTML('beforeend', ' <span style="opacity:.7">No matches</span>');
    };
  
    seq.addEventListener('input', render);
    motif.addEventListener('input', render);
    render();
  })();
  