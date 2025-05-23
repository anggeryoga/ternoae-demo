
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { COMPANY_EMAIL, COMPANY_ADDRESS, TERNOAE_WHATSAPP_NUMBER, COMPANY_PHONE_DISPLAY, JEPARA_COORDINATES, CheckCircleIcon } from '../constants';
import { MailIcon, PhoneIcon, MapPinIcon, WhatsAppIcon } from '../components/icons/AppIcons';
import LoadingSpinner from '../components/LoadingSpinner';

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormInputs>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Hubungi Kami - TernoAE Jepara";
  }, []);

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setSubmitError(null);
    setIsSubmitted(false); 
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Pesan Kontak Terkirim:", data);
      setIsSubmitted(true);
      reset(); 
      window.scrollTo(0,0);
    } catch (e) {
      setSubmitError("Gagal mengirim pesan. Silakan coba lagi.");
    }
  };

  const inputClass = (hasError?: boolean) => 
    `mt-1 block w-full px-4 py-3 border-2 ${hasError ? 'border-red-500' : 'border-ternoae-green'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ternoae-yellow focus:border-ternoae-green sm:text-sm transition-colors bg-white text-text-main placeholder-gray-400`;
  
  const labelClass = "block text-sm font-bold text-ternoae-green mb-1";

  return (
    <div className="bg-soft-cream min-h-screen">
      <div className="bg-ternoae-green py-20 text-soft-cream text-center border-b-2 border-ternoae-yellow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MailIcon className="w-16 h-16 text-ternoae-yellow mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Hubungi TernoAE</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Punya pertanyaan, saran, atau keluhan? Jangan ragu untuk menghubungi kami.
          </p>
        </div>
      </div>

      <div className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="bg-white p-6 md:p-8 rounded-xl border-2 border-ternoae-green shadow-[4px_4px_0px_#0C4A1F] order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-ternoae-green mb-6">Kirim Pesan Langsung</h2>
              {isSubmitted && (
                <div className="p-4 mb-6 bg-green-100 border-2 border-green-600 text-green-800 rounded-lg shadow-neo-sm flex items-center">
                  <CheckCircleIcon className="w-6 h-6 mr-3 text-green-600" />
                  <p className="font-semibold">Pesan Anda telah berhasil terkirim! Kami akan segera merespons.</p>
                </div>
              )}
              {submitError && (
                <div className="p-4 mb-6 bg-red-100 border-2 border-red-500 text-red-700 rounded-lg shadow-sm">
                  <p>{submitError}</p>
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className={labelClass}>Nama Anda</label>
                  <input type="text" id="name" {...register("name", { required: "Nama wajib diisi" })} className={inputClass(!!errors.name)} />
                  {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email Anda</label>
                  <input type="email" id="email" {...register("email", { required: "Email wajib diisi", pattern: { value: /^\S+@\S+$/i, message: "Format email tidak valid" }})} className={inputClass(!!errors.email)} />
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="subject" className={labelClass}>Subjek</label>
                  <input type="text" id="subject" {...register("subject", { required: "Subjek wajib diisi" })} className={inputClass(!!errors.subject)} />
                  {errors.subject && <p className="text-red-600 text-xs mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <label htmlFor="message" className={labelClass}>Pesan Anda</label>
                  <textarea id="message" rows={4} {...register("message", { required: "Pesan wajib diisi" })} className={inputClass(!!errors.message)}></textarea>
                  {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <div>
                  <button type="submit" disabled={isSubmitting} 
                          className={`w-full flex justify-center py-3 px-4 rounded-lg font-bold text-ternoae-green bg-ternoae-yellow border-2 border-ternoae-green
                                     shadow-[3px_3px_0px_#0C4A1F] hover:shadow-[4px_4px_0px_#0C4A1F] active:shadow-[1px_1px_0px_#0C4A1F]
                                     hover:bg-yellow-400 active:translate-x-[1px] active:translate-y-[1px] transition-all duration-150 
                                     ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    {isSubmitting ? <LoadingSpinner size="sm" color="text-ternoae-green"/> : 'Kirim Pesan'}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl border-2 border-ternoae-green shadow-[4px_4px_0px_#0C4A1F] order-1 lg:order-2">
              <h2 className="text-2xl font-bold text-ternoae-green mb-6">Informasi Kontak</h2>
              <ul className="space-y-5 text-text-main mb-8">
                {[
                  { icon: WhatsAppIcon, label: "WhatsApp", value: TERNOAE_WHATSAPP_NUMBER, href: `https://wa.me/${TERNOAE_WHATSAPP_NUMBER}`, display: `+${TERNOAE_WHATSAPP_NUMBER} (Klik untuk chat)` },
                  { icon: PhoneIcon, label: "Telepon", value: COMPANY_PHONE_DISPLAY, display: COMPANY_PHONE_DISPLAY },
                  { icon: MailIcon, label: "Email", value: COMPANY_EMAIL, href: `mailto:${COMPANY_EMAIL}`, display: COMPANY_EMAIL },
                  { icon: MapPinIcon, label: "Alamat Kantor", value: COMPANY_ADDRESS, display: COMPANY_ADDRESS }
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-ternoae-yellow rounded-full border-2 border-ternoae-green flex items-center justify-center mr-4 shadow-neo-sm">
                        <Icon className="w-5 h-5 text-ternoae-green" />
                      </div>
                      <div>
                        <strong className="block text-sm text-ternoae-green font-semibold">{item.label}:</strong>
                        {item.href ? (
                          <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-ternoae-green hover:underline font-medium">
                            {item.display}
                          </a>
                        ) : (
                          <span className="font-medium">{item.display}</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
              
              <h3 className="text-xl font-bold text-ternoae-green mb-4">Lokasi Kantor Kami</h3>
              <div className="rounded-lg overflow-hidden border-2 border-ternoae-green shadow-[3px_3px_0px_#0C4A1F] h-80">
                 <iframe 
                    src={`https://maps.google.com/maps?q=${JEPARA_COORDINATES[0]},${JEPARA_COORDINATES[1]}&hl=id&z=15&output=embed`}
                    width="100%" 
                    height="100%" 
                    style={{ border:0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Peta Kantor TernoAE"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;