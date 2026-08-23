export const mekanlar = JSON.parse(localStorage.getItem('benimMekanlarim')) || [
  // --- TARİHİ MEKANLAR ---
  { 
    isim: "Anıtkabir", 
    sehir: "Ankara", 
    ulke: "Türkiye",
    aramaTerimi: "Anitkabir",
    kategori: "Tarihi", 
    puan: 5.0, 
    favori: true,
    resim: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=400&q=80",
    aciklama: "Mustafa Kemal Atatürk'ün anıt mezarı ve Anıtkabir Müzesi.",
    hava: null
  },
  { 
    isim: "Tac Mahal", 
    sehir: "Agra", 
    ulke: "Hindistan",
    aramaTerimi: "Taj Mahal",
    kategori: "Tarihi", 
    puan: 4.9, 
    favori: false,
    resim: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80",
    aciklama: "Mihrimah ve sevginin sembolü olan beyaz mermerden yapılma tarihi anıt mezar.",
    hava: null
  },
  { 
    isim: "Kolezyum", 
    sehir: "Roma", 
    ulke: "İtalya",
    aramaTerimi: "Colosseum Rome",
    kategori: "Tarihi", 
    puan: 4.8, 
    favori: false,
    resim: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80",
    aciklama: "Antik Roma'nın gladyatör dövüşlerine ev sahipliği yapmış devasa amfitiyatrosu.",
    hava: null
  },
  { 
    isim: "Efes Antik Kenti", 
    sehir: "İzmir", 
    ulke: "Türkiye",
    aramaTerimi: "Ephesus İzmir",
    kategori: "Tarihi", 
    puan: 4.6, 
    favori: false,
    resim: "https://images.unsplash.com/photo-1605883705077-8d3d3f66f583?auto=format&fit=crop&w=400&q=80",
    aciklama: "Celsus Kütüphanesi ve antik tiyatrosuyla ünlü Klasik Yunan mimarisi harikası.",
    hava: null
  },
  { 
    isim: "Sümela Manastırı", 
    sehir: "Trabzon", 
    ulke: "Türkiye",
    aramaTerimi: "Sumela Monastery",
    kategori: "Tarihi", 
    puan: 4.2, 
    favori: true,
    resim: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=400&q=80",
    aciklama: "Altındere Vadisi'ne bakan dik kayalıklar üzerine kurulmuş tarihi Rum manastırı.",
    hava: null
  },

  // --- DOĞA MEKANLARI ---
  { 
    isim: "Fuji Dağı", 
    sehir: "Tokyo", 
    ulke: "Japonya",
    aramaTerimi: "Mount Fuji",
    kategori: "Doğa", 
    puan: 4.9, 
    favori: false,
    resim: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80",
    aciklama: "Japonya'nın simgesi olan, karlı tepesiyle ünlü aktif stratovolkan dağ.",
    hava: null
  },
  { 
    isim: "Kapadokya", 
    sehir: "Nevşehir", 
    ulke: "Türkiye",
    aramaTerimi: "Cappadocia",
    kategori: "Doğa", 
    puan: 4.7, 
    favori: false,
    resim: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=400&q=80",
    aciklama: "Peribacaları, sıcak hava balonları ve tarihi taş oteller.",
    hava: null
  },
  { 
    isim: "Pamukkale Travertenleri", 
    sehir: "Denizli", 
    ulke: "Türkiye",
    aramaTerimi: "Pamukkale",
    kategori: "Doğa", 
    puan: 4.5, 
    favori: false,
    resim: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=400&q=80",
    aciklama: "Kalsiyum bakımından zengin termal sulardan oluşan beyaz traverten teraslar.",
    hava: null
  },
  { 
    isim: "Ihlara Vadisi", 
    sehir: "Aksaray", 
    ulke: "Türkiye",
    aramaTerimi: "Ihlara Valley",
    kategori: "Doğa", 
    puan: 4.3, 
    favori: false,
    resim: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=400&q=80",
    aciklama: "Melendiz Çayı boyunca uzanan, kaya oyma kiliseleri barındıran kanyon vadi.",
    hava: null
  },
  { 
    isim: "Yosemite Vadisi", 
    sehir: "Kaliforniya", 
    ulke: "ABD",
    aramaTerimi: "Yosemite National Park",
    kategori: "Doğa", 
    puan: 4.1, 
    favori: false,
    resim: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=400&q=80",
    aciklama: "Dev sekoya ağaçları, kayalık uçurumlar ve şelaleleri ile ünlü milli park.",
    hava: null
  },

  // --- DENİZ & PLAJ MEKANLARI ---
  { 
    isim: "Ölüdeniz", 
    sehir: "Muğla", 
    ulke: "Türkiye",
    aramaTerimi: "Oludeniz",
    kategori: "Deniz", 
    puan: 4.9, 
    favori: false,
    resim: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80",
    aciklama: "Eşsiz turkuaz denizi ve Babadağ'dan yapılan yamaç paraşütü keyfi.",
    hava: null
  },
  { 
    isim: "Amalfi Kıyıları", 
    sehir: "Salerno", 
    ulke: "İtalya",
    aramaTerimi: "Amalfi Coast",
    kategori: "Deniz", 
    puan: 4.8, 
    favori: false,
    resim: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80",
    aciklama: "Dik kayalıklara kurulmuş renkli evleri ve büyüleyici Akdeniz manzarası.",
    hava: null
  },
  { 
    isim: "Kaputaş Plajı", 
    sehir: "Antalya", 
    ulke: "Türkiye",
    aramaTerimi: "Kaputas Beach",
    kategori: "Deniz", 
    puan: 4.7, 
    favori: false,
    resim: "https://images.unsplash.com/photo-1589139264455-d021c1729377?auto=format&fit=crop&w=400&q=80",
    aciklama: "Kanyon ağzında yer alan büyüleyici turkuaz rengiyle famous koy plajı.",
    hava: null
  },
  { 
    isim: "Santorini Plajları", 
    sehir: "Santorini", 
    ulke: "Yunanistan",
    aramaTerimi: "Santorini Beach",
    kategori: "Deniz", 
    puan: 4.4, 
    favori: false,
    resim: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80",
    aciklama: "Ege Denizi'nin ortasında volkanik kumlu plajlar ve beyaz kubbeli evler.",
    hava: null
  },
  { 
    isim: "Maya Bay", 
    sehir: "Phuket", 
    ulke: "Tayland",
    aramaTerimi: "Maya Bay Thailand",
    kategori: "Deniz", 
    puan: 4.0, 
    favori: false,
    resim: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    aciklama: "Yüksek kireçtaşı kayalıklarıyla çevrili, tropikal turkuaz koy.",
    hava: null
  }
];

export function hafizayaKaydet() {
  localStorage.setItem('benimMekanlarim', JSON.stringify(mekanlar));
}
