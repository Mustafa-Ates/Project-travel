import { mekanlar, hafizayaKaydet } from './veri.js';
import { istatistikGuncelle } from './istatistik.js';

import { sehirFotograflariniGetir, sehirKoordinatGetir, anlikHavaGetir, gecmisOrtalamaGetir } from './api.js';

// --- DOM ELEMANLARI (Sadece HTML'de Aktif Olanlar) ---
const seyehatListesi = document.querySelector('#seyehatListesi'); // Kartların ekleneceği UL[cite: 2]
const aramaInput = document.querySelector('#aramaInput'); // Arama girdi kutusu[cite: 2]
const kategoriButonlari = document.querySelector('#kategoriButonlari'); // Kategori butonlarının kutusu[cite: 2]

// --- MODAL ELEMANLARI ---
const detayModal = document.querySelector('#detayModal');
const modalKapatBtn = document.querySelector('#modalKapatBtn');
const modalResim = document.querySelector('#modalResim');
const modalBaslik = document.querySelector('#modalBaslik');
const modalKategori = document.querySelector('#modalKategori');
const modalSehir = document.querySelector('#modalSehir');
const modalAciklama = document.querySelector('#modalAciklama');
const modalPuan = document.querySelector('#modalPuan');

const tarihBaslangic = document.querySelector('#tarihBaslangic');
const tarihBitis = document.querySelector('#tarihBitis');
const aramaBtn = document.querySelector('#aramaBtn');
const siralamaSelect = document.querySelector('#siralamaSelect');

// --- HAFIZA VE SLIDER DEĞİŞKENLERİ ---
const havaDurumuHafizasi = {}; // Şehir hava durumlarını tekrar sorgulamamak için önbellek
let aktifResimler = []; // Modal içindeki slider fotoğrafları dizisi
let mevcutResimIndeksi = 0; // O an gösterilen resmin indeksi

function metinTemizleme (metin){
  if (!metin) return '';
  return metin
    .replace(/İ/g, 'i') // Türkçe büyük İ için özel haritalama
    .replace(/I/g, 'ı') // Türkçe büyük I için özel haritalama
    .normalize('NFD')   // Unicode ayrıştırma (harf + aksan)
    .replace(/[\u0300-\u036f]/g, '') // Tüm aksan ve noktaları temizler
    .toLowerCase();
}
// --- EKRANA KARTLARI ÇİZEN ANA FONKSİYON ---
function listeyiCiz(gosterilecekListe = mekanlar) {
  seyehatListesi.innerHTML = ''; // Önceki kartları temizle

  // Eğer aranılan veya filtrelenen kriterde mekan yoksa uyarı göster
  if (gosterilecekListe.length === 0) {
    seyehatListesi.innerHTML = `
      <li style="color: #e74c3c; grid-column: 1 / -1; text-align: center; padding: 20px;">
        <span>Aradığınız kriterlere uygun mekan bulunamadı 🔍</span>
      </li>
    `;
    istatistikGuncelle([]);
    return;
  }

  // Mekanlar dizisini dönüp HTML kart yapılarını oluşturuyoruz
  const htmlDizisi = gosterilecekListe.map((mekan) => {
    const { isim, sehir, ulke, kategori, puan, favori, resim, aciklama } = mekan;

    const gercekIndeks = mekanlar.findIndex(m => m.isim === isim)

    const miniResim = resim || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=300&q=80';
    const miniAciklama = aciklama || 'Bu rota için detaylar hazırlanıyor.';
    const favoriSinifi = favori ? 'favori-aktif' : '';

    const konumBilgisi = ulke ? `${sehir},${ulke}` : sehir;

    return `
      <li class="travel-card-wrapper">
        <article class="travel-card-mini ${favoriSinifi}" data-islem="detay-ac" data-indeks="${gercekIndeks}">
          <!-- Kapak Resmi -->
          <img src="${miniResim}" id="resim-${gercekIndeks}" alt="${isim}" class="mini-card-img" />

          <div class="mini-card-body">
            <!-- Başlık ve Favori Kalbi -->
            <div class="mini-header">
              <h3 class="mini-title">${isim}</h3>
              <button style="border:none; background:none; cursor:pointer;" data-islem="favori" data-indeks="${gercekIndeks}">
                ${favori ? '❤️' : '🤍'}
              </button>
            </div>

            <!-- Konum, Kategori ve Puan -->
            <div class="mini-info">
              <span>📍 ${konumBilgisi}</span>
              <span class="mini-tag">${kategori}</span>
              <span>⭐ ${puan.toFixed(1)}</span>
            </div>

            <!-- Kısa Açıklama -->
            <p class="mini-desc">${miniAciklama}</p>

            <!-- Hava Durumu Kutusu -->
            <div class="weather-box-mini" id="hava-${gercekIndeks}">
              🌤️ Yükleniyor...
            </div>

            <div class="click-hint">Detaylar için tıkla ➔</div>
          </div>
        </article>
      </li>
    `;
  });

  seyehatListesi.innerHTML = htmlDizisi.join('');
  
  // İstatistik paneli ve hava durumunu güncelle
  istatistikGuncelle(gosterilecekListe);
  kartHavaDurumlariniGuncelle(gosterilecekListe);
  kartResimleriniGuncelle(gosterilecekListe);
}

// --- KARTLARA TIKLAMA OLAYI (Event Delegation) ---
seyehatListesi.addEventListener('click', function(e) {
  const hedef = e.target.closest('[data-islem]');
  if (!hedef) return;

  const islem = hedef.dataset.islem;
  const indeks = Number(hedef.dataset.indeks);

  if (islem === 'favori') {
    e.stopPropagation(); // Kalbe tıklanınca modalın açılmasını engeller
    mekanlar[indeks].favori = !mekanlar[indeks].favori;
    hafizayaKaydet();
    listeyiCiz();
  } else if (islem === 'detay-ac') {
    detayGoster(indeks);
  }
});

// --- CANLI ARAMA ---
aramaInput.addEventListener('input', hepsiniFiltreleVeSirala);

// --- KATEGORİ FİLTRELEME (İkonlu Butonlar) ---
kategoriButonlari.addEventListener('click', function(e) {
  const buton = e.target.closest('.kat-btn');
  if (!buton) return;

  // Aktif sınıfını tıklanan butona kaydırıyoruz
  document.querySelectorAll('.kat-btn').forEach(b => b.classList.remove('aktif'));
  buton.classList.add('aktif');

 hepsiniFiltreleVeSirala();
});

// --- MODAL DETAY VE SLIDER İŞLEMLERİ ---
async function detayGoster(indeks) {
  const mekan = mekanlar[indeks];

  modalBaslik.textContent = mekan.isim;
  modalKategori.textContent = mekan.kategori;
  modalSehir.textContent = `📍 ${mekan.sehir}${mekan.ulke ? `, ${mekan.ulke}` : ''}`;
  modalAciklama.textContent = mekan.aciklama || 'Bu mekan hakkında henüz detaylı açıklama eklenmemiş.';
  modalPuan.textContent = `⭐ Puan: ${mekan.puan.toFixed(1)}`;

  modalResim.src = 'https://via.placeholder.com/400x200?text=Yukleniyor...';
  detayModal.classList.add('aktif');

  const sorgu = mekan.aramaTerimi || `${mekan.isim} ${mekan.sehir}`;
  aktifResimler = await sehirFotograflariniGetir(sorgu, 4);
  mevcutResimIndeksi = 0;

  if (aktifResimler.length > 0) {
    modalResim.src = aktifResimler[0];
  } else {
    modalResim.src = mekan.resim || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500';
  }

  // Preload (Resimleri önceden hafızaya alma)
  aktifResimler.forEach(resimUrl => {
    const img = new Image();
    img.src = resimUrl;
  });
}

function modaliKapat() {
  detayModal.classList.remove('aktif');
}

modalKapatBtn.addEventListener('click', modaliKapat);
detayModal.addEventListener('click', (e) => {
  if (e.target === detayModal) modaliKapat();
});

// Slider İleri / Geri Butonları
document.querySelector('#sliderNext')?.addEventListener('click', () => {
  if (aktifResimler.length === 0) return;
  mevcutResimIndeksi = (mevcutResimIndeksi + 1) % aktifResimler.length;
  modalResim.src = aktifResimler[mevcutResimIndeksi];
});

document.querySelector('#sliderPrev')?.addEventListener('click', () => {
  if (aktifResimler.length === 0) return;
  mevcutResimIndeksi = (mevcutResimIndeksi - 1 + aktifResimler.length) % aktifResimler.length;
  modalResim.src = aktifResimler[mevcutResimIndeksi];
});

// --- HAVA DURUMU SİMÜLASYONU ---


async function kartHavaDurumlariniGuncelle(liste) {
  const baslangic = tarihBaslangic.value;
  const bitis = tarihBitis.value;

  liste.forEach(async (mekan, indeks) => {
    const havaKutusu = document.querySelector(`#hava-${indeks}`);
    if (!havaKutusu) return;

    havaKutusu.textContent = "⏳ Hava hesaplanıyor...";

    // 1. Şehrin koordinatlarını alıyoruz
    const koordinat = await sehirKoordinatGetir(mekan.sehir);
    if (!koordinat) {
      havaKutusu.textContent = "🌤️ Veri bulunamadı";
      return;
    }
if (baslangic && bitis) {
  const ortalama = await gecmisOrtalamaGetir(koordinat.enlem, koordinat.boylam, baslangic, bitis);
  if (ortalama) {
    // Artık hem gündüz hem gece değerini ayrıştırıp yazdırıyoruz
    havaKutusu.innerHTML = `☀️ <strong>Gündüz:</strong> ${ortalama.gunduz}°C | 🌙 <strong>Gece:</strong> ${ortalama.gece}°C`;
  } else {
    havaKutusu.textContent = "🌤️ Hava tahmini alınamadı";
  }
}
    // 3. Tarih seçilmediyse o anki CANLI dereceyi göster
    else {
      const anlikDerece = await anlikHavaGetir(koordinat.enlem, koordinat.boylam);
      if (anlikDerece !== null) {
        havaKutusu.innerHTML = `☀️ <strong>Anlık:</strong> ${anlikDerece}°C`;
      } else {
        havaKutusu.textContent = "🌤️ Canlı derece alınamadı";
      }
    }
  });
}

// "Keşfet" Butonuna Basıldığında Hava Durumlarını Yeniden Hesapla
aramaBtn.addEventListener('click', () => {
  listeyiCiz();
});
siralamaSelect.addEventListener('change',hepsiniFiltreleVeSirala);

function hepsiniFiltreleVeSirala() {
  const arananMetin = metinTemizleme(aramaInput.value);
  const aktifButton = document.querySelector('.kat-btn.aktif');
  const secilenKategori = aktifButton ? aktifButton.dataset.kategori: 'hepsi';
  const siralamaTuru = siralamaSelect.value;

  let sonuc = mekanlar;

  if (secilenKategori === 'favori') {
    sonuc = sonuc.filter(mekan => mekan.favori === true);
  } else if (secilenKategori !== 'hepsi') {
    sonuc = sonuc.filter(mekan => mekan.kategori === secilenKategori);
  }

  if (arananMetin !== '') {
    sonuc = sonuc.filter(mekan =>{
      const isimYalin = metinTemizleme(mekan.isim);
      const sehirYalin = metinTemizleme(mekan.sehir);
      const ulkeYalin = metinTemizleme(mekan.ulke);
      
      return (
        isimYalin.includes(arananMetin) ||
        sehirYalin.includes(arananMetin) ||
        ulkeYalin.includes(arananMetin)
      );
    });
  }

  const siralamaSonuc = [...sonuc].sort((a,b) => {
    if (siralamaTuru === 'puan') {
      return b.puan - a.puan;
    }else if (siralamaTuru === 'isim'){
      return a.isim.localeCompare(b.isim, undefined, {sensitivity: 'base'});
    }
    return 0;
  });  

  listeyiCiz(siralamaSonuc);
}
async function kartResimleriniGuncelle(liste) {
  liste.forEach(async (mekan) => {
    const gercekIndeks = mekanlar.findIndex(m => m.isim === mekan.isim);
    const imgElemani = document.querySelector(`#resim-${gercekIndeks}`);
    if (!imgElemani) return;

    // Mekanın 'aramaTerimi' bilgisiyle API'den 5 adet fotoğraf getiriyoruz
    const sorgu = mekan.aramaTerimi || `${mekan.isim} ${mekan.sehir}`;
    const fotograflar = await sehirFotograflariniGetir(sorgu, 5);

    // Gelen 5 fotoğraf arasından Math.random() ile rastgele birini seçiyoruz
    if (fotograflar && fotograflar.length > 0) {
      const rastgeleIndeks = Math.floor(Math.random() * fotograflar.length);
      imgElemani.src = fotograflar[rastgeleIndeks];
    }
  });
}
// --- İLK AÇILIŞTA ÇALIŞTIR ---
hepsiniFiltreleVeSirala();