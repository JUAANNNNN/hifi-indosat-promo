"use client"; // Penting karena kita menggunakan state dan effect

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// --- KOMPONEN NAVBAR ---
// --- KOMPONEN NAVBAR ---
const Navbar = () => {
  // State untuk mendeteksi apakah halaman sudah di-scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek untuk memantau posisi scroll
  useEffect(() => {
    const handleScroll = () => {
      // Jika di-scroll lebih dari 50px ke bawah, ubah state menjadi true
      if (window.scrollY > 5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Pasang event listener saat komponen dimuat
    window.addEventListener('scroll', handleScroll);
    
    // Bersihkan event listener saat komponen dilepas
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Setup link WhatsApp untuk Navbar
  const waNumber = "628161147484";
  const waMessage = encodeURIComponent("Halo, saya tertarik untuk mendaftar layanan internet Indosat HiFi.");
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white shadow-md py-0' // Saat di-scroll: Background putih solid (tertutup) dengan bayangan
          : 'bg-white/40 backdrop-blur-md py-2' // Saat di atas: Agak transparan dengan efek blur kaca
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <Image 
              src="/logo-indosat.png" 
              alt="Logo Indosat HiFi"
              width={70}
              height={30}
              className="object-contain"
              priority
            />
          </a>

          {/* Menu Tengah */}
          <div className="hidden md:flex space-x-8 text-sm font-semibold text-gray-800">
            <a href="#paket" className="hover:text-[#d60055] transition-colors">Paket Internet</a>
            <a href="#keunggulan" className="hover:text-[#d60055] transition-colors">Keunggulan</a>
            <a 
              href="https://hificare.ioh.co.id/s/?language=in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#d60055] transition-colors"
            >
              Bantuan
            </a>
          </div>
          <div>
            <a 
              href={waLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#d60055] text-white px-5 py-2.5 rounded-full font-bold hover:bg-[#a70020] shadow-sm transition-all hover:shadow-md"
            >
              Daftar Sekarang
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- KOMPONEN HERO SECTION DENGAN CAROUSEL BACKGROUND ---
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Daftar gambar carousel
  const slides = [
    "/promo.jpg", // Family Streaming
    "/hifi.jpeg",  // Work from Home
    "/family.jpeg"   // Gaming
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Ganti gambar setiap 5 detik
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[600px] md:h-[700px] w-full overflow-hidden flex items-center justify-center">
      {/* Container Gambar Carousel */}
      {slides.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Overlay Gelap agar teks mudah dibaca */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Konten Hero (Teks & Input) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight drop-shadow-lg">
          Internet Rumah <br /> <span className="text-[#fbb615]">Tanpa Batas</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto drop-shadow-md text-gray-100">
          Nikmati koneksi 100% Fiber Optik super cepat untuk streaming, gaming, dan kerja dari rumah tanpa khawatir kuota habis.
        </p>
        
        {/* Box Cek Area */}
        <div className="bg-white p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row max-w-xl mx-auto border border-white/20">
          <input 
            type="text" 
            placeholder="Masukkan alamat atau kode pos..." 
            className="flex-1 px-6 py-4 rounded-full outline-none text-gray-800 placeholder:text-gray-400"
          />
          <button className="bg-[#d60055] text-white font-bold px-8 py-4 rounded-xl md:rounded-full hover:bg-[#a70020] transition-all transform hover:scale-105 mt-2 md:mt-0">
            Cek Jangkauan
          </button>
        </div>
      </div>

      {/* Indikator Slide (Titik di bawah) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentSlide ? 'bg-[#fbb615] w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// --- KOMPONEN KEUNGGULAN ---
const FeaturesSection = () => {
  const features = [
    { title: "100% Fiber Optik", desc: "Koneksi stabil dan ngebut setiap saat tanpa terpengaruh gangguan cuaca." },
    { title: "Internet yang #NyataAndalnya", desc: "Penggunaan banyak gadget pada saat yang bersamaan tanpa gangguan." },
    { title: "Streaming Online Terbaik", desc: "HiFi adalah operator ISP paling stabil untuk mengakses Konten Netflix." }
  ];

  return (
    <section id="keunggulan" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900">Mengapa Pilih Harus HiFi?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-[#d60055] text-white mx-auto rounded-full flex items-center justify-center mb-4 font-bold text-2xl">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{feat.title}</h3>
              <p className="text-gray-600">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- KOMPONEN BROSUR (YANG SUDAH DIBUAT SEBELUMNYA) ---
const PricingCard = ({ badgeTitle, badgeSubtitle, badgeBg, badgeTextClass, cardBg, cardBorder, textClass, items, waNumber }) => {
  const waMessage = encodeURIComponent(`Halo, saya tertarik dengan paket Indosat HiFi ${badgeTitle}.`);
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className={`
      relative flex flex-col ${cardBg} ${cardBorder} border-4 ${textClass} 
      rounded-[2.5rem] p-8 pt-14 shadow-xl h-full
      
      /* --- KELAS UNTUK HOVER REACTION (TAMBAHAN & PEMBARUAN) --- */
      transition-all duration-300 ease-out transform
      
      /* Saat kursor mendekat: mengangkat ke atas (-translate-y), membesar tipis (scale), bayangan pekat */
      hover:-translate-y-3 hover:scale-[1.01] hover:shadow-2xl
      
      /* Menambahkan ring fokus untuk aksesibilitas */
      focus-within:ring-4 focus-within:ring-[#d60055]/30 outline-none
      /* -------------------------------------------------------- */
    `}>
      {/* Header Badge */}
      <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 ${badgeBg} ${badgeTextClass} px-8 py-3 rounded-full border-4 border-white shadow-md w-max text-center z-10`}>
        <h3 className="font-black text-lg md:text-xl uppercase tracking-wider leading-tight">{badgeTitle}</h3>
        {badgeSubtitle && <p className="font-bold text-xs opacity-80">{badgeSubtitle}</p>}
      </div>

      {/* List Kecepatan & Harga */}
      <div className="flex-1 mt-6 space-y-5">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0">
            <span className="text-lg md:text-xl font-medium opacity-90">{item.speed}</span>
            <span className="text-xl md:text-2xl font-black">{item.price}</span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <a 
        href={waLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="mt-10 block w-full bg-green-500 hover:bg-green-600 text-white text-center font-black py-4 px-6 rounded-2xl shadow-lg transition-all active:scale-95 z-10"
      >
        Pesan Sekarang Via WhatsApp
      </a>
    </div>
  );
};

const PricingSection = () => {
  const waNumber = "628161147484";
  const packages = [
    {
      id: "promo-3-bulan", badgeTitle: "BAYAR 3 BULAN", badgeSubtitle: "FREE 1 BULAN", badgeBg: "bg-white", badgeTextClass: "text-[#d60055]", cardBg: "bg-[#d60055]", cardBorder: "border-[#d60055]", textClass: "text-white",
      items: [{ speed: "500 Mbps", price: "Rp. 1.328.670" }, { speed: "1 Gbps", price: "Rp. 3.326.670" }]
    },
    {
      id: "bulanan", badgeTitle: "BULANAN", badgeSubtitle: "", badgeBg: "bg-[#d60055]", badgeTextClass: "text-white", cardBg: "bg-white", cardBorder: "border-[#d60055]", textClass: "text-gray-900",
      items: [{ speed: "20 Mbps", price: "Rp. 205.350" }, { speed: "100 Mbps", price: "Rp. 220.890" }, { speed: "300 Mbps", price: "Rp. 331.890" }, { speed: "500 Mbps", price: "Rp. 442.890" }, { speed: "1 Gbps", price: "Rp. 1.108.890" }]
    },
    {
      id: "promo-5-bulan", badgeTitle: "BAYAR 5 BULAN", badgeSubtitle: "FREE 1 BULAN", badgeBg: "bg-white", badgeTextClass: "text-[#d60055]", cardBg: "bg-[#d60055]", cardBorder: "border-[#d60055]", textClass: "text-white",
      items: [{ speed: "100 Mbps", price: "Rp. 1.104.450" }, { speed: "300 Mbps", price: "Rp. 1.659.450" }, { speed: "500 Mbps", price: "Rp. 2.214.450" }, { speed: "1 Gbps", price: "Rp. 5.544.450" }]
    },
    {
      id: "promo-10-bulan", badgeTitle: "BAYAR 10 BULAN", badgeSubtitle: "FREE 2 BULAN", badgeBg: "bg-white", badgeTextClass: "text-[#d60055]", cardBg: "bg-[#d60055]", cardBorder: "border-[#d60055]", textClass: "text-white",
      items: [{ speed: "100 Mbps", price: "Rp. 2.208.900" }, { speed: "300 Mbps", price: "Rp. 3.318.900" }, { speed: "500 Mbps", price: "Rp. 4.428.900" }, { speed: "1 Gbps", price: "Rp. 11.088.900" }]
    }
  ];

  return (
    <section id="paket" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Pilih Paket Internetmu</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-8 md:gap-y-12">
          {packages.map((pkg) => <PricingCard key={pkg.id} {...pkg} waNumber={waNumber} />)}
        </div>
        <div className="mt-16 pt-8 border-t border-gray-300 max-w-4xl mx-auto text-center text-xs md:text-sm text-gray-500 leading-relaxed">
          <p>
            <span className="text-[#d60055] font-bold">*</span> Harga belum termasuk pajak 11% <span className="mx-2 text-gray-300">|</span> 
            Instalasi dan ONT (Wi-Fi) sudah termasuk dalam harga hingga radius 200m <span className="mx-2 text-gray-300">|</span> 
            Untuk koneksi optimal disarankan untuk menggunakan kabel ethernet. Vision+ hanya berlaku di area tertentu.
          </p>
        </div>
      </div>
    </section>
  );
};

// --- KOMPONEN FOOTER ---
const Footer = () => (
  <footer className="bg-gray-900 text-white py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:flex md:justify-between md:items-center">
      <p className="text-gray-400 text-sm mb-4 md:mb-0">
        &copy; {new Date().getFullYear()} Indosat HiFi Sales. Ini adalah website promosi mitra, bukan halaman ofisial.
      </p>
      <div className="space-x-4 text-sm text-gray-400">
        <a href="#" className="hover:text-white">Syarat & Ketentuan</a>
        <a href="#" className="hover:text-white">Kebijakan Privasi</a>
      </div>
    </div>
  </footer>
);

// --- HALAMAN UTAMA (MENGGABUNGKAN SEMUA KOMPONEN) ---
export default function IndosatHiFiFullWeb() {
  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}