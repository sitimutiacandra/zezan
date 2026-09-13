/* ============================================================
   KONFIGURASI 
   ============================================================ */
const CONFIG = {
  pin: "140902",                    
  boysName: "Sayanggg",               
  noteMessage: "Today its about you, yess babyyy this your birthday, sayangnyaa akoooo thankyou so much sayangg udah hadir dihidup akuuu, udah jadi rumah yg paling nyaman, paling indah, jadi pelangi di dihidup aku, kalau kata rangga raja Bumi Luas sekali tapi, untungnya kita bertemu dan yapss i'm so lucky, happy and bersyukur dikehidupan yg hanya sekali ini bisa ketemu laki-laki hebat seperti sayang🤍",
  letterMessage: "Terima kasih sudah jadi manusia moodboster yang paling hangat, paling sabar, dan paling gampang bikin tia senyum sendiri tanpa alasan. Semoga tahun ini semua yang sayang perjuangkan diam-diam bisa tercapai, termasuk IPK 4. sayangkuuu tia tidak pintar dan hebat kaya yg lain but i'm heree sayang, i'm always here for you sayang, tia akan selalu ada buat sayanggg selamanya. sekali lagiii Selamat ulang tahun sayangnyaa akooo, bahagia selalu, panjang umur, sukses terus pokoknya tetap jadi zezannnya tia, I Love you So Much sayanggg🤍",
  photos: [
    // isi dengan nama file foto di folder assets, kosongkan "" kalau belum ada
    { src: "assets/foto1.jpeg", rotate: -6 },
    { src: "assets/foto2.jpeg", rotate: 4 },
    { src: "assets/foto3.jpeg", rotate: -3 },
    { src: "assets/foto4.jpeg", rotate: 7 }
  ],
  birthMonth: "September",
  birthDay: 14,                     // tanggal lahirnya
  song: { title: "About You", artist: "The 1975" },
  musicSrc: "assets/lagu.mp3",       // file musik latar
  videoSrc: "assets/video.mp4",      // video untuk ditampilkan
  finalTitle: "Selamat ulang tahun,",
  finalCopy: "Makasih udah mau baca sampai akhir walaupun membosankan dan tidak bagus, but maaciw cintakuuu, maap jugaaa tahun ini gak ada hadiah kaya tahun sebelumnya sayang, but i am always pray to god for you sayangg, walaupun tia banyak dosa sihh but doaku selalu untukmu sayang, maaf juga yaa sayanggg tiia belum bisa bikin sayang bangga knk."
};
 
/* ============================================================
   Logika di bawah ini biasanya tidak perlu diubah
   ============================================================ */
 
// bintang latar
const starsWrap = document.getElementById('stars');
for (let i = 0; i < 60; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.animationDelay = (Math.random() * 3) + 's';
  starsWrap.appendChild(s);
}
 
// navigasi antar scene
const scenes = ["scene-pin", "scene-gift", "scene-note", "scene-envelope", "scene-letter", "scene-moon", "scene-calendar", "scene-video", "scene-final"];
let current = 0;
 
const progressWrap = document.getElementById('progress');
scenes.forEach(() => {
  const p = document.createElement('div');
  p.className = 'p';
  progressWrap.appendChild(p);
});
 
function renderProgress() {
  [...progressWrap.children].forEach((el, i) => el.classList.toggle('on', i <= current));
}
 
function goTo(index) {
  document.getElementById(scenes[current]).classList.remove('active');
  current = index;
  document.getElementById(scenes[current]).classList.add('active');
  renderProgress();
  if (scenes[current] !== 'scene-pin') document.getElementById('soundToggle').style.display = 'flex';
}
function next() {
  if (current < scenes.length - 1) goTo(current + 1);
}
 
document.querySelectorAll('[data-next]').forEach(btn => btn.addEventListener('click', next));
 
/* ---------- Scene 1: PIN ---------- */
const dotsWrap = document.getElementById('pinDots');
const keypad = document.getElementById('keypad');
let entered = "";
 
for (let i = 0; i < CONFIG.pin.length; i++) {
  const d = document.createElement('div');
  d.className = 'dot';
  dotsWrap.appendChild(d);
}
 
const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];
keys.forEach(k => {
  const b = document.createElement('button');
  b.className = 'key' + (k === "⌫" ? ' wide' : '');
  b.textContent = k;
  b.disabled = k === "";
  b.style.visibility = k === "" ? 'hidden' : 'visible';
  b.addEventListener('click', () => {
    if (k === "⌫") {
      entered = entered.slice(0, -1);
    } else if (entered.length < CONFIG.pin.length) {
      entered += k;
    }
    updateDots();
    if (entered.length === CONFIG.pin.length) {
      setTimeout(() => {
        if (entered === CONFIG.pin) {
          next();
          tryPlayMusic();
        } else {
          [...dotsWrap.children].forEach(d => d.classList.add('shake'));
          setTimeout(() => {
            entered = "";
            updateDots();
            [...dotsWrap.children].forEach(d => d.classList.remove('shake'));
          }, 400);
        }
      }, 150);
    }
  });
  keypad.appendChild(b);
});
 
function updateDots() {
  [...dotsWrap.children].forEach((d, i) => d.classList.toggle('filled', i < entered.length));
}
 
/* ---------- Scene 2: gift box ---------- */
document.getElementById('giftWrap').addEventListener('click', (e) => {
  const burst = document.createElement('div');
  burst.className = 'burst';
  document.body.appendChild(burst);
  const colors = ['#f3b9c4', '#e8c27d', '#f8f1e6'];
  for (let i = 0; i < 26; i++) {
    const s = document.createElement('div');
    s.className = 'spark';
    const size = 4 + Math.random() * 6;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.left = e.clientX + 'px';
    s.style.top = e.clientY + 'px';
    s.style.background = colors[i % colors.length];
    const angle = Math.random() * Math.PI * 2, dist = 80 + Math.random() * 140;
    s.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    s.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    burst.appendChild(s);
  }
  setTimeout(() => burst.remove(), 950);
  setTimeout(next, 350);
});
 
/* ---------- Scene 3: note ---------- */
document.getElementById('noteCard').textContent = CONFIG.noteMessage;
if (CONFIG.photos[0] && CONFIG.photos[0].src) {
  document.getElementById('photoFrame').innerHTML = `<img src="${CONFIG.photos[0].src}" alt="foto kalian">`;
}
 
/* ---------- Scene 4: envelope ---------- */
document.getElementById('envTitle').textContent = `Happy Birthday\n${CONFIG.boysName}`;
document.getElementById('envelope').addEventListener('click', function () {
  this.classList.add('open');
  setTimeout(next, 650);
});
 
/* ---------- Scene 5: letter ---------- */
document.getElementById('letterText').textContent = CONFIG.letterMessage;
 
/* ---------- Scene 6: moon polaroids ---------- */
const polWrap = document.getElementById('polaroids');
CONFIG.photos.forEach(p => {
  const d = document.createElement('div');
  d.className = 'polaroid';
  d.style.setProperty('--r', (p.rotate || 0) + 'deg');
  d.innerHTML = `<div class="ph">${p.src ? `<img src="${p.src}" alt="foto">` : '🤍'}</div>`;
  polWrap.appendChild(d);
});
 
/* ---------- Scene 7: calendar ---------- */
document.getElementById('calMonth').textContent = CONFIG.birthMonth;
const dow = ["S", "M", "T", "W", "T", "F", "S"];
const grid = document.getElementById('calGrid');
dow.forEach(l => {
  const s = document.createElement('span');
  s.textContent = l;
  grid.appendChild(s);
});
// susun kalender sederhana; ubah firstDayCol (0=Minggu) kalau mau tanggal 1 jatuh di hari lain
const firstDayCol = 0;
for (let i = 0; i < firstDayCol; i++) {
  grid.appendChild(document.createElement('div'));
}
for (let day = 1; day <= 31; day++) {
  const el = document.createElement('div');
  el.className = 'day' + (day === CONFIG.birthDay ? ' special' : '');
  el.textContent = day;
  grid.appendChild(el);
}
document.getElementById('songTitle').textContent = CONFIG.song.title;
document.getElementById('songArtist').textContent = CONFIG.song.artist;
 
/* ---------- Musik latar ---------- */
const bgm = document.getElementById('bgm');
bgm.src = CONFIG.musicSrc;
const soundToggle = document.getElementById('soundToggle');
let musicOn = false;
 
function tryPlayMusic() {
  bgm.volume = 0.55;
  bgm.play()
    .then(() => { musicOn = true; soundToggle.textContent = '🔊'; })
    .catch(() => { musicOn = false; soundToggle.textContent = '🔈'; });
}
soundToggle.addEventListener('click', () => {
  if (musicOn) {
    bgm.pause();
    musicOn = false;
    soundToggle.textContent = '🔈';
  } else {
    bgm.play();
    musicOn = true;
    soundToggle.textContent = '🔊';
  }
});
const playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', () => {
  if (bgm.paused) {
    bgm.play();
    musicOn = true;
    playBtn.textContent = '⏸';
    soundToggle.textContent = '🔊';
  } else {
    bgm.pause();
    musicOn = false;
    playBtn.textContent = '▶';
    soundToggle.textContent = '🔈';
  }
});
 
/* ---------- Video ---------- */
document.getElementById('videoPlayer').src = CONFIG.videoSrc;
 
/* ---------- Scene final ---------- */
document.getElementById('finalTitle').textContent = `${CONFIG.finalTitle} ${CONFIG.boysName}`;
document.getElementById('finalCopy').textContent = CONFIG.finalCopy;
 
renderProgress();
 