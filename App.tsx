
import React from 'react';
import { 
  Rocket, 
  Brain, 
  TrendingUp, 
  Users, 
  Zap, 
  Target, 
  MessageSquare,
  Instagram,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const WHATSAPP_NUMBER = "5551991209421";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const LOGO_URL = "https://i.imgur.com/mU2lnth.png";

// Reusable Components
const WhatsAppButton = ({ text, className = "", colorClass = "bg-[#25D366] hover:bg-[#22c35e] animate-cta-green shadow-green-500/20" }: { text: string; className?: string; colorClass?: string }) => (
  <a 
    href={WHATSAPP_URL}
    target="_blank" 
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-3 ${colorClass} text-white font-black py-5 px-10 rounded-full transition-all duration-500 transform hover:scale-105 text-lg uppercase tracking-wider shadow-lg ${className}`}
  >
    <MessageSquare size={24} fill="currentColor" />
    {text}
  </a>
);

const FloatingWhatsApp = () => (
  <a 
    href={WHATSAPP_URL}
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-500/40 transition-all duration-300 transform hover:scale-110 hover:rotate-6 flex items-center justify-center border-2 border-white/20"
    aria-label="Falar no WhatsApp"
  >
    <MessageSquare size={32} fill="currentColor" />
  </a>
);

const Section = ({ children, id, className = "" }: { children?: React.ReactNode; id?: string; className?: string }) => (
  <section id={id} className={`py-32 px-6 max-w-7xl mx-auto relative z-10 ${className}`}>
    {children}
  </section>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* BACKGROUND LOGO - WATERMARK ESTRATÉGICA */}
      <img src={LOGO_URL} alt="" className="bg-logo-watermark select-none" />
      
      <FloatingWhatsApp />

      {/* 1. NAVBAR - ULTRA MINIMALIST */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-2">
          <div className="flex items-center gap-4 group cursor-pointer">
            <img 
              src={LOGO_URL} 
              alt="TechView Logo" 
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tighter text-white uppercase">
                TechView
              </span>
              <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.4em]">Digital Labs</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <WhatsAppButton text="Agendar" className="py-2.5 px-6 text-xs" />
          </div>
        </div>
      </nav>

      {/* 2. HERO - IMPACTO TOTAL COM FUNDO IMERSIVO */}
      <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-hero overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto z-10 space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              <Zap size={14} className="animate-pulse" /> Performance Digital Extrema
            </div>
            <h1 className="text-5xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white uppercase italic">
              Sites que <br />
              <span className="text-cyan-500 text-glow">Vendem.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-2xl font-medium leading-relaxed">
              Posicionamento digital <span className="text-white">agressivo</span> para empresas que não aceitam ser apenas mais uma na multidão.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <WhatsAppButton text="Falar com a TechView Digital" className="px-14 py-8 text-xl" />
            <div className="flex items-center gap-8 text-slate-600 text-[10px] font-black uppercase tracking-widest">
               <span>UI/UX Elite</span>
               <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
               <span>Cloud Performance</span>
               <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
               <span>Scale Thinking</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-slate-400">Scroll</span>
          <ArrowRight className="rotate-90" size={16} />
        </div>
      </header>

      {/* 3. SERVIÇOS - CARDS GLASSMORPHISM */}
      <Section id="servicos">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              icon: <Rocket className="text-cyan-500" />, 
              title: "Sites Ultra-Velozes", 
              desc: "Infraestrutura de ponta para garantir que seu site carregue antes do seu cliente piscar." 
            },
            { 
              icon: <Brain className="text-cyan-500" />, 
              title: "Inteligência de Vendas", 
              desc: "Copywriting e design focados na psicologia do consumo para maximizar seus lucros." 
            },
            { 
              icon: <TrendingUp className="text-cyan-500" />, 
              title: "Escala Agressiva", 
              desc: "Integramos seu funil com tráfego pago de alta precisão para escalar seu faturamento." 
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-12 rounded-[2.5rem] group relative">
              <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-6 italic">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. PROVAS / CHECKLIST */}
      <Section className="bg-slate-900/30 rounded-[4rem] border border-white/5 py-24 px-12 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-20">
           <div className="w-full md:w-1/2 space-y-10">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
                Por que a <br /><span className="text-cyan-500">TechView?</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Projetos entregues em tempo recorde",
                  "Design exclusivo (nada de templates prontos)",
                  "Foco total em conversão de leads",
                  "Suporte direto pelo WhatsApp"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <CheckCircle2 size={24} className="text-cyan-500 group-hover:scale-125 transition-transform" />
                    <span className="text-lg text-slate-300 font-medium">{text}</span>
                  </div>
                ))}
              </div>
           </div>
           <div className="w-full md:w-1/2 relative">
              <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" alt="Development" className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-500/20 blur-[60px] rounded-full"></div>
           </div>
        </div>
      </Section>

      {/* 5. CTA FINAL */}
      <footer className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-12 mb-40">
          <h2 className="text-5xl md:text-9xl font-black text-white uppercase italic tracking-tighter leading-none">
            Vamos <br /><span className="text-cyan-500">Vencer.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-xl mx-auto font-medium">Não deixe seu lucro na mão da concorrência. Agende seu diagnóstico hoje.</p>
          <WhatsAppButton 
            text="Começar agora no WhatsApp" 
            className="px-16 py-9 text-2xl" 
          />
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 pt-16 flex flex-col items-center gap-12 relative z-10">
          <div className="flex flex-col items-center gap-4">
             <div className="flex items-center gap-3">
               <img src={LOGO_URL} alt="" className="w-12 h-12 object-contain" />
               <p className="text-3xl font-black text-white uppercase tracking-tighter">TECHVIEW</p>
             </div>
             <p className="text-[10px] text-slate-600 uppercase tracking-[0.6em] font-bold">A Nova Era do Posicionamento</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between w-full items-center gap-8 text-slate-600">
            <p className="text-xs font-bold uppercase tracking-widest">© 2024 TechView Digital Labs</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-cyan-500 transition-colors uppercase text-xs font-black tracking-widest">Instagram</a>
              <a href="#" className="hover:text-cyan-500 transition-colors uppercase text-xs font-black tracking-widest">LinkedIn</a>
            </div>
            <div className="text-slate-800 font-serif italic text-4xl select-none opacity-20 hidden md:block">
               TechView Excellence
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
