
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'; // Removed Controller as not used
import { UserIcon, BikeIcon, MailIcon, PhoneIcon } from '../components/icons/AppIcons';
import { CheckCircleIcon } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';

interface DriverFormInputs {
  fullName: string;
  phone: string;
  email: string;
  vehicleType: 'motor' | 'mobil';
  licensePlate: string;
  domicile: string;
  agreement: boolean;
}

const JoinDriverPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<DriverFormInputs>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Gabung Mitra Driver - TernoAE Jepara";
  }, []);

  const onSubmit: SubmitHandler<DriverFormInputs> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Formulir Pendaftaran Driver:", data);
    setIsSubmitted(true);
    window.scrollTo(0,0);
  };
  
  const inputClass = (hasError?: boolean) => 
    `mt-1 block w-full px-4 py-3 border-2 ${hasError ? 'border-red-500' : 'border-ternoae-green'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ternoae-yellow focus:border-ternoae-green sm:text-sm transition-colors bg-white text-text-main placeholder-gray-400`;
  
  const labelClass = "block text-sm font-bold text-ternoae-green mb-1";

  if (isSubmitted) {
    return (
      <div className="bg-soft-cream min-h-screen py-16 sm:py-20 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white p-8 md:p-10 rounded-xl border-2 border-ternoae-green shadow-[4px_4px_0px_#0C4A1F] max-w-md">
          <CheckCircleIcon className="w-20 h-20 text-ternoae-green mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-ternoae-green mb-4">Pendaftaran Terkirim!</h1>
          <p className="text-text-main mb-6">Terima kasih telah mendaftar menjadi mitra driver TernoAE. Tim kami akan segera menghubungi Anda untuk proses selanjutnya.</p>
          <button 
            onClick={() => { setIsSubmitted(false); /* Potentially reset form state if needed */ }}
            className="bg-ternoae-yellow text-ternoae-green font-bold py-3 px-6 rounded-lg border-2 border-ternoae-green
                       shadow-[3px_3px_0px_#0C4A1F] hover:shadow-[4px_4px_0px_#0C4A1F] active:shadow-[1px_1px_0px_#0C4A1F]
                       hover:bg-yellow-400 active:translate-x-[1px] active:translate-y-[1px] transition-all duration-150"
          >
            Daftar Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-soft-cream min-h-screen py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-ternoae-green mb-3">Gabung Mitra Driver TernoAE</h1>
          <p className="text-lg text-gray-700">Jadilah bagian dari keluarga TernoAE dan dapatkan penghasilan tambahan dengan waktu fleksibel.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="bg-white p-6 md:p-8 rounded-xl border-2 border-ternoae-green shadow-[4px_4px_0px_#0C4A1F] order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-ternoae-green mb-6">Formulir Pendaftaran</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="fullName" className={labelClass}>Nama Lengkap</label>
                <input type="text" id="fullName" {...register("fullName", { required: "Nama lengkap wajib diisi" })} className={inputClass(!!errors.fullName)} />
                {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>Nomor WhatsApp Aktif</label>
                <input type="tel" id="phone" {...register("phone", { required: "Nomor WhatsApp wajib diisi", pattern: { value: /^[0-9+]{10,15}$/, message: "Format nomor tidak valid" }})} className={inputClass(!!errors.phone)} />
                {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Alamat Email (Opsional)</label>
                <input type="email" id="email" {...register("email", { pattern: { value: /^\S+@\S+$/i, message: "Format email tidak valid" }})} className={inputClass(!!errors.email)} />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
              </div>
              
              <div>
                <label htmlFor="domicile" className={labelClass}>Domisili (Kecamatan di Jepara)</label>
                <input type="text" id="domicile" {...register("domicile", { required: "Domisili wajib diisi" })} className={inputClass(!!errors.domicile)} placeholder="Contoh: Tahunan, Jepara Kota, Mlonggo"/>
                {errors.domicile && <p className="text-red-600 text-xs mt-1">{errors.domicile.message}</p>}
              </div>

              <div>
                <label htmlFor="vehicleType" className={labelClass}>Jenis Kendaraan</label>
                <select id="vehicleType" {...register("vehicleType", { required: "Jenis kendaraan wajib dipilih" })} className={inputClass(!!errors.vehicleType)}>
                  <option value="">Pilih Jenis Kendaraan</option>
                  <option value="motor">Motor</option>
                  <option value="mobil">Mobil</option>
                </select>
                {errors.vehicleType && <p className="text-red-600 text-xs mt-1">{errors.vehicleType.message}</p>}
              </div>

              <div>
                <label htmlFor="licensePlate" className={labelClass}>Nomor Polisi Kendaraan</label>
                <input type="text" id="licensePlate" {...register("licensePlate", { required: "Nomor polisi wajib diisi" })} className={inputClass(!!errors.licensePlate)} placeholder="Contoh: K 1234 AB"/>
                {errors.licensePlate && <p className="text-red-600 text-xs mt-1">{errors.licensePlate.message}</p>}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <input id="agreement" type="checkbox" {...register("agreement", { required: "Anda harus menyetujui syarat dan ketentuan" })} className={`focus:ring-ternoae-yellow h-5 w-5 text-ternoae-green border-2 border-ternoae-green rounded transition-colors bg-white checked:bg-ternoae-yellow checked:border-ternoae-green`} />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreement" className="font-medium text-text-main">Saya menyetujui <a href="#" className="text-ternoae-green hover:underline font-semibold">syarat dan ketentuan</a> yang berlaku.</label>
                  {errors.agreement && <p className="text-red-600 text-xs mt-1">{errors.agreement.message}</p>}
                </div>
              </div>

              <div>
                <button type="submit" disabled={isSubmitting} 
                        className={`w-full flex justify-center py-3 px-4 rounded-lg font-bold text-ternoae-green bg-ternoae-yellow border-2 border-ternoae-green
                                   shadow-[3px_3px_0px_#0C4A1F] hover:shadow-[4px_4px_0px_#0C4A1F] active:shadow-[1px_1px_0px_#0C4A1F]
                                   hover:bg-yellow-400 active:translate-x-[1px] active:translate-y-[1px] transition-all duration-150 
                                   ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  {isSubmitting ? <LoadingSpinner size="sm" color="text-ternoae-green" /> : 'Kirim Pendaftaran'}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-xl border-2 border-ternoae-green shadow-[4px_4px_0px_#0C4A1F] order-1 lg:order-2">
            <h2 className="text-2xl font-bold text-ternoae-green mb-6">Keuntungan Bergabung</h2>
            <ul className="space-y-4 text-text-main">
              {[
                { icon: UserIcon, text: "<strong>Waktu Fleksibel:</strong> Atur jam kerjamu sendiri, cocok untuk pekerjaan utama maupun sampingan." },
                { icon: BikeIcon, text: "<strong>Penghasilan Menarik:</strong> Dapatkan tarif yang kompetitif dan bonus untuk performa terbaik." },
                { icon: PhoneIcon, text: "<strong>Dukungan Penuh:</strong> Tim support TernoAE siap membantu jika ada kendala di lapangan." },
                { icon: MailIcon, text: "<strong>Komunitas Solid:</strong> Bergabung dengan komunitas driver TernoAE yang suportif dan saling membantu." }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-ternoae-yellow rounded-full border-2 border-ternoae-green flex items-center justify-center mr-3 mt-0.5">
                        <Icon className="w-5 h-5 text-ternoae-green" />
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: item.text }}></span>
                  </li>
                );
              })}
            </ul>
            <h3 className="text-xl font-bold text-ternoae-green mt-8 mb-4">Syarat Pendaftaran</h3>
            <ul className="list-none space-y-2 text-text-main text-sm">
              {["Memiliki KTP Jepara atau surat keterangan domisili.", "Memiliki SIM C (motor) atau SIM A (mobil) yang masih berlaku.", "Memiliki STNK kendaraan yang masih berlaku.", "Kendaraan layak jalan dan terawat.", "Smartphone Android dengan koneksi internet aktif.", "Berperilaku baik, jujur, dan bertanggung jawab."].map((syarat, i) => (
                 <li key={i} className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-ternoae-green mr-2 flex-shrink-0"/> {syarat}
                 </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinDriverPage;