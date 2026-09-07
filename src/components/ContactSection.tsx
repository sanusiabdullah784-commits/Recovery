"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, CheckCircle2, Paperclip, X, FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ContactSection() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setAttachedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: t("Main Office", "Main Office"),
      detail: "Suite 205 NCWS House, Area 11 Garki 2, Abuja, FCT, Nigeria.",
      sub: t("Available Mon-Fri, 9AM - 6PM", "Available Mon-Fri, 9AM - 6PM")
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: t("WhatsApp Support", "WhatsApp Support"),
      detail: "09136931832",
      link: "https://wa.me/2349136931832",
      sub: t("Fastest response time", "Fastest response time")
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: t("Normal Call", "Normal Call"),
      detail: "+234 906 517 3333",
      link: "tel:+2349065173333",
      sub: t("Mon-Fri, 9AM - 6PM WAT", "Mon-Fri, 9AM - 6PM WAT")
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: t("Email Us", "Email Us"),
      detail: "homelandrecoveryservicesltd@gmail.com",
      link: "mailto:homelandrecoveryservicesltd@gmail.com",
      sub: t("We reply within 24 hours", "We reply within 24 hours")
    }
  ];

  // Custom Color Variables
  const bgMain = "bg-[#6D28D9]";
  const textMain = "text-[#D7FF00]";
  const textMuted = "text-[#D7FF00]/70";
  const glassBg = "bg-[#D7FF00]/5";
  const glassBorder = "border-[#D7FF00]/10";
  const inputBg = "bg-black/20";
  const inputBorder = "border-[#D7FF00]/20 focus:border-[#D7FF00]/50 focus:ring-[#D7FF00]/20";
  const btnBg = "bg-[#D7FF00] hover:bg-[#C4E600]";
  const btnText = "text-[#6D28D9]";

  return (
    <section className={`relative min-h-screen pt-32 pb-24 px-4 overflow-hidden ${bgMain}`}>
      
      {/* Subtle Ambient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#D7FF00]/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#D7FF00]/5 rounded-full blur-[150px] animate-pulse delay-1000" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(215, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(215, 255, 0, 0.1) 1px, transparent 1px)`, 
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }} 
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-6 ${textMain}`}>
            {t("Get in Touch", "Get in Touch")}
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${textMuted}`}>
            {t("Have a question or need immediate assistance? Our dedicated support team is here to help you 24/7.", "You get question or you need immediate help? Our dedicated support team dey here to help you.")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Left: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.link || "#"}
                target={item.link ? "_blank" : undefined}
                rel={item.link ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ x: 5 }}
                className={`flex items-start gap-4 p-5 rounded-2xl ${glassBg} border ${glassBorder} hover:border-[#D7FF00]/30 hover:bg-[#D7FF00]/10 transition-all duration-300 group`}
              >
                <div className={`p-3 rounded-xl ${glassBg} ${textMain} group-hover:bg-[#D7FF00]/20 group-hover:scale-110 transition-all duration-300`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className={`${textMain} font-bold text-lg mb-1`}>{item.title}</h3>
                  <p className={`${textMain} font-medium mb-1`}>{item.detail}</p>
                  <p className={`${textMuted} text-sm flex items-center gap-1.5`}>
                    <Clock className="h-3 w-3" /> {item.sub}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className={`relative overflow-hidden rounded-3xl border ${glassBorder} ${glassBg} backdrop-blur-xl p-8 md:p-10 shadow-2xl`}>
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#D7FF00]/10 rounded-full blur-[100px] pointer-events-none" />
              
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="text-center py-12 relative z-10"
                >
                  <div className="inline-flex items-center justify-center p-4 bg-[#D7FF00]/10 rounded-full mb-6 border border-[#D7FF00]/20">
                    <CheckCircle2 className={`h-12 w-12 ${textMain}`} />
                  </div>
                  <h2 className={`text-3xl font-extrabold mb-4 ${textMain}`}>{t("Message Sent!", "Message Don Send!")}</h2>
                  <p className={`${textMuted} max-w-md mx-auto mb-8`}>
                    {t("Thank you for reaching out. Our team will review your message and get back to you shortly.", "Thank you for reaching out. Our team go review your message and get back to you shortly.")}
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)} 
                    className={`px-8 py-3 ${glassBg} hover:bg-[#D7FF00]/10 ${textMain} font-bold rounded-xl border ${glassBorder} transition-all`}
                  >
                    {t("Send Another Message", "Send Another Message")}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${textMuted}`}>{t("Full Name", "Full Name")}</label>
                      <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className={`w-full px-4 py-3.5 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-[#D7FF00]/40 focus:outline-none transition-all`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${textMuted}`}>{t("Email Address", "Email Address")}</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={`w-full px-4 py-3.5 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-[#D7FF00]/40 focus:outline-none transition-all`} />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textMuted}`}>{t("Subject", "Subject")}</label>
                    <input required type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder={t("How can we help you?", "How we fit help you?")} className={`w-full px-4 py-3.5 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-[#D7FF00]/40 focus:outline-none transition-all`} />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textMuted}`}>{t("Message", "Message")}</label>
                    <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} placeholder={t("Tell us more about your inquiry...", "Tell us more about your inquiry...")} className={`w-full px-4 py-3.5 ${inputBg} border ${inputBorder} rounded-xl ${textMain} placeholder:text-[#D7FF00]/40 focus:outline-none transition-all resize-none`} />
                  </div>

                  {/* ==========================================
                      BULLETPROOF FILE ATTACHMENT AREA
                      ========================================== */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textMuted}`}>{t("Attachment (Optional)", "Attachment (Optional)")}</label>
                    
                    {/* Hidden Native Input */}
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange} 
                    />

                    {/* Visible Clickable Box */}
                    <div 
                      onClick={triggerFileInput}
                      className={`w-full min-h-[100px] flex items-center justify-center p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                        attachedFile 
                          ? "border-[#D7FF00]/40 bg-[#D7FF00]/10" 
                          : "border-[#D7FF00]/30 bg-black/10 hover:bg-[#D7FF00]/5 hover:border-[#D7FF00]/50"
                      }`}
                    >
                      {attachedFile ? (
                        <div className="flex items-center gap-3 w-full">
                          <div className="p-2 bg-[#D7FF00]/20 rounded-lg flex-shrink-0">
                            <FileText className="h-5 w-5 text-[#D7FF00]" />
                          </div>
                          <div className="text-left flex-grow min-w-0">
                            <p className="text-sm font-bold text-[#D7FF00] truncate">{attachedFile.name}</p>
                            <p className="text-xs text-[#D7FF00]/60">{(attachedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); removeFile(); }} 
                            className="p-1.5 rounded-full hover:bg-black/20 transition-colors flex-shrink-0"
                          >
                            <X className="h-4 w-4 text-[#D7FF00]" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-center">
                          <Paperclip className="h-6 w-6 text-[#D7FF00] mb-2" />
                          <p className={`text-sm font-bold ${textMain}`}>{t("Click here to attach a file", "Click here to attach file")}</p>
                          <p className="text-xs text-[#D7FF00]/50 mt-1">PNG, JPG, PDF up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* ========================================== */}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full py-4 ${btnBg} ${btnText} font-bold rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg`}
                  >
                    {isSubmitting ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="h-6 w-6 border-2 border-[#6D28D9]/30 border-t-[#6D28D9] rounded-full" />
                    ) : (
                      <>
                        {t("Send Message", "Send Message")}
                        <Send className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>

        {/* Google Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 rounded-3xl overflow-hidden border border-[#D7FF00]/20 shadow-2xl bg-black/20 backdrop-blur-sm"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.267!2d7.495!3d9.033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7da48d0d%3A0x89a90daa313b1c93!2sArea%2011%2C%20Garki%202%2C%20Abuja!5e0!3m2!1sen!2sng!4v1690000000000!5m2!1sen!2sng" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
            className="w-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
}