// ── 1. ACTIVE NAV LINK ──────────────────────────────────────────
// Otomatis tandai menu yang sedang aktif berdasarkan nama file HTML
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();


// ── 2. WELCOME TOAST (Home saja) ────────────────────────────────
function showToast(msg, duration = 4000) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

if (window.location.pathname.endsWith('index.html') ||
    window.location.pathname === '/' ||
    window.location.pathname.endsWith('/')) {
  window.addEventListener('load', () => {
    showToast('👋 Selamat datang di Website Desa Pepe!');
  });
}


// ── 3. SMOOTH PAGE TRANSITION ───────────────────────────────────
// Fade-in ringan setiap halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
  });
});


// ── 4. INTERCEPT LINK CLICK → FADE OUT sebelum pindah halaman ──
document.addEventListener('click', e => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  // Hanya halaman lokal (.html), bukan download / eksternal
  if (!href || href.startsWith('http') || href.startsWith('#') ||
      link.hasAttribute('download')) return;
  e.preventDefault();
  document.body.style.opacity = '0';
  setTimeout(() => { window.location.href = href; }, 300);
});


// ── 5. DOWNLOAD FEEDBACK ────────────────────────────────────────
// Muncul toast konfirmasi saat tombol unduh diklik
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[download]').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('⬇ File sedang diunduh...');
    });
  });
});


// ── 6. TAHUN OTOMATIS DI FOOTER ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});


// ── 7. GALERI LIGHTBOX SEDERHANA ────────────────────────────────
// Klik foto di galeri → tampil besar di tengah layar
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.gallery-item img');
  if (!items.length) return;

  // Buat overlay
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.innerHTML = '<img id="lb-img" src="" alt=""><span id="lb-close">✕</span>';
  document.body.appendChild(overlay);

  const lbImg   = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');

  function openLb(src) {
    lbImg.src = src;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  items.forEach(img => img.addEventListener('click', () => openLb(img.src)));
  lbClose.addEventListener('click', closeLb);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
});