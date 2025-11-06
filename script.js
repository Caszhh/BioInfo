// script.js

// Smooth scroll only for in-page anchors in the new nav
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const sel = link.getAttribute('href');
      const target = document.querySelector(sel);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      else console.warn("N U L L", sel); // <-- STRING, visible in console
    });
  });
  
  // Form submission handler (guard if form doesn't exist)
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you for contacting us! We will get back to you soon.');
    });
  } else {
    console.warn("N U L L #contact-form not found"); // <-- STRING, visible
  }
  
  /* Dynamic greeting */
  (function () {
    const el = document.getElementById('greeting');
    if (!el) { console.warn("N U L L #greeting not found"); return; }
    const h = new Date().getHours();
    const t = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
    el.textContent = t || "N U L L"; // <-- STRING, shows "N U L L" if empty
  })();
  
  /* Footer year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.append(new Date().getFullYear());
  else console.warn("N U L L #year not found"); // <-- STRING, visible
  
  /* DNA rungs: clone lines to create ladder */
  (function () {
    const g = document.querySelector('.dna .rungs');
    if (!g) { console.warn("N U L L .dna .rungs not found"); return; }
    for (let i = 0; i < 26; i++) {
      const y = 80 + i * 20;
      const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      ln.setAttribute('x1', 120);
      ln.setAttribute('x2', 300);
      ln.setAttribute('y1', y);
      ln.setAttribute('y2', y);
      g.appendChild(ln);
    }
    const svg = document.querySelector('.dna');
    if (!svg) { console.warn("N U L L .dna svg not found"); return; }
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    grad.id = 'gradLine';
    grad.setAttribute('x1', '0'); grad.setAttribute('x2', '1'); grad.setAttribute('y1', '0'); grad.setAttribute('y2', '0');
    const s1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop'); s1.setAttribute('offset', '0'); s1.setAttribute('stop-color', '#34d399');
    const s2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop'); s2.setAttribute('offset', '1'); s2.setAttribute('stop-color', '#06b6d4');
    grad.appendChild(s1); grad.appendChild(s2); defs.appendChild(grad); svg.appendChild(defs);
  })();
  
  /* Copy buttons */
  document.querySelectorAll('.copy').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy || "N U L L"; // <-- STRING, shows in clipboard if empty
      try {
        await navigator.clipboard.writeText(text);
        const old = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(() => (btn.textContent = old), 1200);
      } catch (_) {
        console.warn("N U L L clipboard write failed"); // <-- STRING
      }
    });
  });
  
  /* Live Motif Finder (exact match) */
  (function () {
    const seq = document.getElementById('seq');
    const motif = document.getElementById('motif');
    const out = document.getElementById('result');
    if (!seq || !motif || !out) {
      console.warn("N U L L motif demo elements missing"); // <-- STRING
      return;
    }
  
    const render = () => {
      const s = (seq.value || '').toUpperCase().replace(/[^ACGT]/g, '');
      const m = (motif.value || '').toUpperCase().replace(/[^ACGT]/g, '');
      
      // ❗ THIS IS THE *ONLY PLACE* WE USE REAL `null`
      // because we want to CLEAR the result box (not show text)
      if (!s || !m || m.length > s.length) {
        out.textContent = null;  // <-- true null value (clears element)
        return;
      }
  
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
  
      // if no matches, show spaced-out text visibly
      if (!hits.length)
        out.insertAdjacentHTML('beforeend', ' <span style="opacity:.7">N&nbsp;U&nbsp;L&nbsp;L</span>'); // visible N U L L
    };
  
    seq.addEventListener('input', render);
    motif.addEventListener('input', render);
    render();
  })();
  