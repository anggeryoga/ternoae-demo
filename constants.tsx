
import React from 'react';
import { Service, Testimonial, BlogPost, NavItem } from './types';
import { BikeIcon, PackageIcon, UtensilsIcon, UsersIcon, HomeIcon, InfoIcon, MessageSquareIcon, BriefcaseIcon, MapPinIcon, PhoneIcon, MailIcon, RssIcon, CheckCircleIcon, TrendingUpIcon } from './components/icons/AppIcons';


export const TERNOAE_WHATSAPP_NUMBER = "6281234567890"; // Replace with actual number
export const WHATSAPP_BASE_URL = "https://wa.me/";
export const DEFAULT_WHATSAPP_MESSAGE = "Halo TernoAE, saya ingin memesan layanan.";

export const OPENROUTESERVICE_API_KEY = "YOUR_OPENROUTESERVICE_API_KEY"; 


export const TERNOAE_YELLOW = "#FFD700"; // Maintained from Tailwind config
export const TERNOAE_GREEN = "#0C4A1F"; // Maintained from Tailwind config
export const TERNOAE_GREEN_LIGHT = "#15803d"; // Maintained


export const NAV_LINKS: NavItem[] = [
  { label: "Beranda", path: "/" },
  { label: "Layanan", path: "/layanan" },
  { label: "Cek Ongkir", path: "/ongkir" },
  { label: "Gabung Driver", path: "/driver" },
  { label: "Tentang Kami", path: "/tentang" },
  { label: "Kontak", path: "/kontak" },
  { label: "Blog", path: "/blog" },
];

export const SERVICES_DATA: Service[] = [
  {
    id: "ride",
    name: "TernoAE Ride",
    description: "Antar jemput penumpang dengan aman dan nyaman.",
    longDescription: "Layanan TernoAE Ride siap mengantar Anda ke tujuan dengan cepat, aman, dan nyaman. Driver kami ramah dan profesional, memastikan perjalanan Anda menyenangkan. Cocok untuk perjalanan sehari-hari, ke kantor, sekolah, atau sekadar jalan-jalan di Jepara.",
    icon: BikeIcon,
    image: "https://picsum.photos/seed/rideAE/600/400",
  },
  {
    id: "kirim",
    name: "TernoAE Kirim",
    description: "Kirim barang cepat sampai tujuan.",
    longDescription: "Butuh kirim dokumen, paket, atau barang lainnya? TernoAE Kirim solusinya! Kami memastikan barang Anda sampai ke tujuan dengan cepat dan aman. Layanan pengiriman instan untuk berbagai kebutuhan Anda di area Jepara.",
    icon: PackageIcon,
    image: "https://picsum.photos/seed/kirimAE/600/400",
  },
  {
    id: "makan",
    name: "TernoAE Makan",
    description: "Pesan antar makanan favoritmu.",
    longDescription: "Lapar tapi malas keluar? Pesan makanan favorit Anda melalui TernoAE Makan. Kami bekerja sama dengan berbagai restoran dan warung makan di Jepara untuk mengantarkan hidangan lezat langsung ke depan pintu Anda. Praktis dan cepat!",
    icon: UtensilsIcon,
    image: "https://picsum.photos/seed/makanAE/600/400",
  },
  {
    id: "sowan",
    name: "TernoAE Sowan",
    description: "Layanan khusus untuk kebutuhan sowan atau kunjungan.",
    longDescription: "TernoAE Sowan adalah layanan unik kami yang dirancang khusus untuk kebutuhan kunjungan, silaturahmi, atau acara khusus lainnya. Kami menyediakan transportasi yang nyaman dan representatif, serta driver yang memahami adat istiadat lokal untuk menemani perjalanan sowan Anda.",
    icon: UsersIcon,
    image: "https://picsum.photos/seed/sowanAE/600/400",
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "1",
    name: "Siti Aminah",
    role: "Mahasiswi",
    quote: "TernoAE sangat membantu mobilitas saya sebagai mahasiswi. Harganya pas di kantong, drivernya juga ramah-ramah!",
    avatar: "https://picsum.photos/seed/sitiAE/100/100",
  },
  {
    id: "2",
    name: "Budi Santoso",
    role: "Karyawan Swasta",
    quote: "Sering pakai TernoAE Kirim buat antar dokumen kantor. Cepat dan terpercaya. Recommended!",
    avatar: "https://picsum.photos/seed/budiAE/100/100",
  },
  {
    id: "3",
    name: "Retno Wulandari",
    role: "Ibu Rumah Tangga",
    quote: "TernoAE Makan jadi andalan kalau lagi nggak sempat masak. Pilihan restonya banyak, pengantarannya juga cepat.",
    avatar: "https://picsum.photos/seed/retnoAE/100/100",
  },
];

export const HOW_IT_WORKS_STEPS = [
    { title: "Pesan via WhatsApp", description: "Hubungi kami melalui tombol 'Pesan Sekarang' atau simpan nomor WA kami.", icon: MessageSquareIcon},
    { title: "Sebutkan Layanan & Tujuan", description: "Informasikan layanan yang Anda butuhkan beserta detail alamat jemput dan tujuan.", icon: MapPinIcon},
    { title: "Driver Menjemput", description: "Driver kami akan segera datang ke lokasi penjemputan Anda.", icon: BikeIcon},
    { title: "Nikmati Perjalanan", description: "Duduk manis dan nikmati perjalanan aman dan nyaman bersama TernoAE.", icon: UsersIcon},
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: "1",
    slug: "tips-aman-naik-ojek-online",
    title: "5 Tips Aman dan Nyaman Naik Ojek Online di Era Digital",
    excerpt: "Naik ojek online sudah menjadi bagian dari keseharian. Simak tips berikut agar perjalananmu selalu aman, nyaman, dan menyenangkan...",
    date: "15 Juli 2024",
    imageUrl: "https://picsum.photos/seed/blogAE1/400/250",
    author: "Tim TernoAE"
  },
  {
    id: "2",
    slug: "jelajah-kuliner-jepara-bersama-ternoae",
    title: "Jelajah Kuliner Khas Jepara: Rekomendasi Wajib Coba via TernoAE Makan",
    excerpt: "Jepara tidak hanya terkenal dengan ukirannya, tapi juga kulinernya yang lezat. Yuk, cicipi berbagai hidangan autentik bersama TernoAE Makan!",
    date: "10 Juli 2024",
    imageUrl: "https://picsum.photos/seed/blogAE2/400/250",
    author: "Tim TernoAE"
  },
  {
    id: "3",
    slug: "kenalan-dengan-layanan-ternoae-sowan",
    title: "Lebih Dekat dengan TernoAE Sowan: Solusi Transportasi Kunjungan Spesial Anda",
    excerpt: "Apa itu TernoAE Sowan? Kenali lebih jauh layanan unik kami yang dirancang khusus untuk menemani berbagai kebutuhan kunjungan penting Anda di Jepara.",
    date: "5 Juli 2024",
    imageUrl: "https://picsum.photos/seed/blogAE3/400/250",
    author: "Tim TernoAE"
  },
  {
    id: "4",
    slug: "manfaat-gabung-mitra-driver-ternoae",
    title: "Untungnya Jadi Mitra Driver TernoAE: Penghasilan Fleksibel dan Komunitas Solid",
    excerpt: "Cari penghasilan tambahan dengan waktu kerja yang bisa diatur sendiri? Simak berbagai keuntungan bergabung menjadi mitra driver TernoAE Jepara.",
    date: "20 Juli 2024",
    imageUrl: "https://picsum.photos/seed/blogAE4/400/250",
    author: "Tim TernoAE"
  },
  {
    id: "5",
    slug: "panduan-menggunakan-fitur-cek-ongkir",
    title: "Anti Kaget! Panduan Mudah Cek Estimasi Ongkir TernoAE Sebelum Pesan",
    excerpt: "Rencanakan perjalananmu lebih matang dengan fitur Cek Ongkir TernoAE. Ketahui perkiraan biaya sebelum memesan, jadi lebih transparan!",
    date: "25 Juli 2024",
    imageUrl: "https://picsum.photos/seed/blogAE5/400/250",
    author: "Tim TernoAE"
  },
];

export const COMPANY_EMAIL = "info@ternoae.co.id"; 
export const COMPANY_ADDRESS = "Jl. Pemuda No. 1, Jepara, Jawa Tengah, Indonesia"; 
export const COMPANY_PHONE_DISPLAY = "0812-3456-7890"; 

export const JEPARA_COORDINATES: [number, number] = [-6.5956, 110.6745];
export const DEFAULT_MAP_ZOOM = 13;

export const FARE_PER_KM = 2100; // Rp 2.100 per km
export { CheckCircleIcon, TrendingUpIcon }; // Exporting for use in pages
