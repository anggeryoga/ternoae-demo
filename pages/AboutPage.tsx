
import React, { useEffect } from 'react';
import { UsersIcon, HomeIcon, InfoIcon, TrendingUpIcon } from '../components/icons/AppIcons'; // Added TrendingUpIcon

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "Tentang Kami - TernoAE Jepara";
  }, []);

  const teamMembers = [
    { name: "Ahmad 'AE' Sutomo", role: "Founder & CEO", image: "https://picsum.photos/seed/team1/300/300" },
    { name: "Siti 'Terno' Lestari", role: "Head of Operations", image: "https://picsum.photos/seed/team2/300/300" },
    { name: "Jepara 'Joyo' Maskot", role: "Maskot Keberuntungan", image: "https://picsum.photos/seed/maskotAE/300/300" }
  ];

  const Card: React.FC<{icon: React.FC<React.SVGProps<SVGSVGElement>>, title: string, children: React.ReactNode}> = ({icon: Icon, title, children}) => (
    <div className="bg-white p-6 md:p-8 rounded-xl border-2 border-ternoae-green shadow-[4px_4px_0px_#0C4A1F]">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-ternoae-yellow rounded-full border-2 border-ternoae-green mr-3 shadow-neo-sm">
            <Icon className="w-8 h-8 text-ternoae-green" />
        </div>
        <h2 className="text-2xl font-bold text-ternoae-green">{title}</h2>
      </div>
      <div className="text-text-main leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );


  return (
    <div className="bg-soft-cream min-h-screen">
      <div className="bg-ternoae-green py-20 text-soft-cream text-center border-b-2 border-ternoae-yellow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <UsersIcon className="w-16 h-16 text-ternoae-yellow mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Tentang TernoAE</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Mengenal lebih dekat TernoAE, layanan ojek online lokal kebanggaan Jepara.
          </p>
        </div>
      </div>

      <div className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <Card icon={HomeIcon} title="Visi Kami">
                <p>
                  Menjadi platform layanan transportasi dan pengiriman lokal terdepan di Jepara yang memberdayakan masyarakat dan UMKM, serta memberikan kemudahan mobilitas dengan harga terjangkau dan pelayanan prima.
                </p>
              </Card>
              <Card icon={InfoIcon} title="Misi Kami">
                <ul className="list-none space-y-2">
                  {[
                    "Menyediakan layanan ojek online yang aman, nyaman, cepat, dan terjangkau.",
                    "Membuka lapangan pekerjaan dan meningkatkan kesejahteraan mitra driver lokal.",
                    "Mendukung pertumbuhan UMKM lokal melalui layanan pesan antar dan pengiriman.",
                    "Terus berinovasi untuk meningkatkan kualitas layanan dan kepuasan pelanggan.",
                    "Menjaga kearifan lokal dan keramahan khas Jepara dalam setiap layanan."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <TrendingUpIcon className="w-5 h-5 text-ternoae-green mr-2 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </section>

          <section className="mb-16 bg-white p-6 md:p-8 rounded-xl border-2 border-ternoae-green shadow-[4px_4px_0px_#0C4A1F]">
            <h2 className="text-3xl font-bold text-ternoae-green mb-6 text-center">Sejarah Singkat TernoAE</h2>
            <div className="max-w-3xl mx-auto text-text-main leading-relaxed space-y-4">
              <p>
                TernoAE lahir dari semangat untuk memberikan solusi transportasi yang lebih baik dan terjangkau bagi masyarakat Jepara. Didirikan pada tahun 2023 oleh putra-putri daerah yang peduli akan kebutuhan mobilitas lokal, TernoAE (gabungan kata "Anter" dan "Neng Omah AE" yang berarti "Antar ke Rumah Saja" dalam dialek lokal, sekaligus bisa merujuk pada inisial pendiri) memulai perjalanannya dengan beberapa mitra driver dan tekad yang kuat.
              </p>
              <p>
                Kami melihat potensi besar di Jepara dan tantangan yang dihadapi warganya dalam mendapatkan layanan transportasi yang efisien. Dengan memanfaatkan teknologi sederhana seperti WhatsApp untuk pemesanan, kami ingin TernoAE mudah diakses oleh semua kalangan.
              </p>
              <p>
                Sejak awal, fokus kami adalah pada pelayanan yang ramah, tarif yang jujur, dan keamanan penumpang. Kami percaya bahwa dengan menjunjung tinggi nilai-nilai ini, TernoAE bisa menjadi sahabat perjalanan masyarakat Jepara. Kini, kami terus berkembang, menambah layanan, dan berkomitmen untuk terus memberikan yang terbaik bagi kota ukir tercinta ini.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-ternoae-green mb-10 text-center">Tim & Maskot Kami</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                    key={index} 
                    className="bg-white p-6 rounded-xl border-2 border-ternoae-green shadow-[4px_4px_0px_#0C4A1F] 
                               text-center transition-all duration-200 hover:shadow-[6px_6px_0px_#0C4A1F] hover:-translate-y-1"
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-36 h-36 rounded-full mx-auto mb-4 object-cover border-[3px] border-ternoae-green shadow-neo-sm"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-bold text-ternoae-green">{member.name}</h3>
                  <p className="text-ternoae-yellow font-semibold bg-ternoae-green px-2 py-0.5 rounded-md inline-block mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;