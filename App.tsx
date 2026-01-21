
import React, { useState } from 'react';
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
  CheckCircle2,
  X,
  ChevronRight
} from 'lucide-react';
// Import GoogleGenAI as per the latest SDK guidelines
import { GoogleGenAI, Type } from "@google/genai";

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

// AI Strategy Modal Component
const AIStrategyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [input, setInput] = useState('');
  const [strategy, setStrategy] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Function to generate content using Gemini API
  const generateStrategy = async () => {
    if (!input) return;
    setLoading(true);
    setStrategy(null);
    try {
      // Initialize the AI client using the provided environment variable
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Analise meu negócio e objetivos: ${input}`,
        config: {
          systemInstruction: "Você é o estrategista sênior da TechView Digital Labs. Seu objetivo é fornecer uma análise agressiva e baseada em dados sobre como escalar o negócio do cliente. Use um tom profissional, audacioso e focado em ROI. Retorne a resposta em JSON estruturado.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              growthLevers: { type: Type.ARRAY, items: { type: Type.STRING } },
              analysis: { type: Type.STRING },
              projectedImpact: { type: Type.STRING }
            },
            required: ["title", "growthLevers", "analysis", "projectedImpact"]
          }
        },
      });

      if (response.text) {
        setStrategy(JSON.parse(response.text.trim()));
      }
    } catch (e) {
      console.error(e);
      setStrategy({ title: "Erro na Geração", analysis: "Não foi possível gerar sua análise agora. Entre em contato diretamente pelo WhatsApp para um diagnóstico humano gratuito." });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in">
      <div className="bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white">
          <X size={24} />
        </button>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Diagnóstico de <span className="text-cyan-500">Escala IA</span></h2>
          <p className="text-slate-400">Insira seu nicho e seu objetivo de faturamento atual.</p>
        </div>

        <div className="space-y-4">
          <textarea 
            className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-cyan-500 transition-colors h-32 resize-none"
            placeholder="Ex: Tenho uma clínica odontológica e faturo 50k, quero chegar nos 200k/mês..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            onClick={generateStrategy}
            disabled={loading || !input}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-black py-5 rounded-full transition-all uppercase tracking-widest flex items-center justify-center gap-2 group shadow-xl shadow-cyan-500/10"
          >
            {loading ? "Processando Big Data..." : "Gerar Plano de Guerra Digital"}
            <Zap size={20} fill="currentColor" className="group-hover:scale-125 transition-transform" />
          </button>
        </div>

        {strategy && (
          <div className="bg-slate-950 border border-cyan-500/20 p-8 rounded-3xl space-y-6 animate-in slide-in-from-bottom-4">
             <div className="flex items-center gap-3 text-cyan-500 font-bold text-xs uppercase tracking-[0.3em]">
                <Brain size={16} /> Estratégia Recomendada
             </div>
             <div className="space-y-4">
                <h3 className="text-2xl font-black text-white italic uppercase">{strategy.title}</h3>
                <p className="text-slate-400 leading-relaxed italic">{strategy.analysis}</p>
                <div className="grid grid-cols-1 gap-3">
                  {strategy.growthLevers?.map((lever: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                      <ChevronRight className="text-cyan-500 mt-1 shrink-0" size={16} />
                      <span className="text-sm text-slate-300 font-medium">{lever}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 mt-4 border-t border-white/5">
                  <p className="text-cyan-500 font-black text-lg mb-4">Impacto Estimado: {strategy.projectedImpact}</p>
                  <WhatsAppButton text="Implementar com Especialistas" className="w-full" />
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Section = ({ children, id, className = "" }: { children?: React.ReactNode; id?: string; className?: string }) => (
  <section id={id} className={`py-32 px-6 max-w-7xl mx-auto relative z-10 ${className}`}>
    {children}
  </section>
);

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500 selection:text-slate-950">
      <style>{`
        @keyframes cta-green {
          0%, 100% { box-shadow: 0 0 20px rgba(37, 211, 102, 0.2); transform: scale(1); }
          50% { box-shadow: 0 0 40px rgba(37, 211, 102, 0.4); transform: scale(1.02); }
        }
        .animate-cta-green {
          animation: cta-green 3s infinite ease-in-out;
        }
        .text-glow {
          text-shadow: 0 0 30px rgba(6, 182, 212, 0.5);
        }
        .bg-logo-watermark {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60vw;
          opacity: 0.02;
          filter: grayscale(1) invert(1);
          pointer-events: none;
          z-index: 0;
        }
        .glass-card {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
          border-color: rgba(6, 182, 212, 0.4);
          background: rgba(15, 23, 42, 0.7);
          transform: translateY(-10px) scale(1.02);
        }
        .bg-gradient-hero {
          background: radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 1) 0%, rgba(2, 6, 23, 1) 100%);
        }
      `}</style>

      {/* BACKGROUND LOGO - WATERMARK ESTRATÉGICA */}
      <img src={LOGO_URL} alt="" className="bg-logo-watermark select-none" />
      
      <FloatingWhatsApp />
      <AIStrategyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* 1. NAVBAR - ULTRA MINIMALIST */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-8 backdrop-blur-md bg-slate-950/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-2">
          <div className="flex items-center gap-4 group cursor-pointer">
            <img 
              src={LOGO_URL} 
              alt="TechView Logo" 
              className="w-12 h-12 object-contain brightness-0 invert"
            />
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tighter text-white uppercase">
                TechView
              </span>
              <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.4em]">Digital Labs</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="py-3 px-8 text-xs font-black uppercase tracking-widest border border-cyan-500/50 text-cyan-500 rounded-full hover:bg-cyan-500 hover:text-slate-950 transition-all"
            >
              Diagnóstico IA
            </button>
            <WhatsAppButton text="Consultar" className="py-2.5 px-6 text-xs hidden md:inline-flex" />
          </div>
        </div>
      </nav>

      {/* 2. HERO - IMPACTO TOTAL COM FUNDO IMERSIVO */}
      <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-hero overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none animate-pulse"></div>

        <div className="max-w-6xl mx-auto z-10 space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-500 text-[11px] font-black uppercase tracking-[0.4em] mb-4">
              <Zap size={14} className="animate-pulse" /> Engineering Perfection
            </div>
            <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-white uppercase italic">
              Sites que <br />
              <span className="text-cyan-500 text-glow">Dominam.</span>
            </h1>
            <p className="max-w-3xl mx-auto text-slate-400 text-lg md:text-3xl font-medium leading-tight">
              Aceleramos seu faturamento com <span className="text-white">tecnologia de elite</span> e design focado em conversão extrema.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col md:flex-row gap-4">
              <WhatsAppButton text="Falar no WhatsApp" className="px-14 py-8 text-xl" />
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-14 py-8 text-xl font-black uppercase tracking-widest bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <Brain size={24} className="text-cyan-500" />
                Diagnóstico IA
              </button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-600 text-[10px] font-black uppercase tracking-widest opacity-60">
               <span>Performance Ultra</span>
               <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
               <span>Direct Response UI</span>
               <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
               <span>Escala Digital</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-slate-400">Deslize</span>
          <ArrowRight className="rotate-90" size={16} />
        </div>
      </header>

      {/* 3. SERVIÇOS - CARDS GLASSMORPHISM */}
      <Section id="servicos">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Rocket className="text-cyan-500" size={32} />, 
              title: "Performance Brutal", 
              desc: "Carregamento instantâneo. Servidores otimizados para converter antes mesmo do cliente pensar em sair." 
            },
            { 
              icon: <Brain className="text-cyan-500" size={32} />, 
              title: "Arquitetura de Vendas", 
              desc: "Cada pixel é posicionado estrategicamente para guiar o olhar do cliente até o botão de compra." 
            },
            { 
              icon: <TrendingUp className="text-cyan-500" size={32} />, 
              title: "Consultoria de Escala", 
              desc: "Não entregamos apenas um site. Entregamos uma máquina de vendas pronta para o tráfego pago." 
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-14 rounded-[3rem] group relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/5 blur-3xl rounded-full group-hover:bg-cyan-500/10 transition-colors"></div>
              <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-6 italic leading-none">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed text-lg font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. PROVAS / CHECKLIST */}
      <Section className="bg-slate-900/30 rounded-[5rem] border border-white/5 py-24 px-12 md:px-24 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-24">
           <div className="w-full md:w-1/2 space-y-12">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.85]">
                Diferença <br /><span className="text-cyan-500">TechView.</span>
              </h2>
              <div className="space-y-8">
                {[
                  "Desenvolvimento nativo sem templates",
                  "SEO avançado para domínio de busca",
                  "Copywriting de alta persuasão",
                  "Infraestrutura Cloud de nível global"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-5 group">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={20} className="text-cyan-500" />
                    </div>
                    <span className="text-xl text-slate-300 font-bold">{text}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-3 text-cyan-500 font-black uppercase tracking-widest group"
                >
                  Fazer Diagnóstico IA Gratuito <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
           </div>
           <div className="w-full md:w-1/2 relative">
              <div className="relative z-10 rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(6,182,212,0.15)] group">
                 <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" alt="Coding" className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-500/20 blur-[80px] rounded-full animate-pulse"></div>
           </div>
        </div>
      </Section>

      {/* 5. CTA FINAL */}
      <footer className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-12 mb-52">
          <h2 className="text-6xl md:text-[12rem] font-black text-white uppercase italic tracking-tighter leading-[0.8]">
            Pronto para <br /><span className="text-cyan-500">Vencer?</span>
          </h2>
          <p className="text-2xl md:text-4xl text-slate-400 max-w-2xl mx-auto font-medium leading-tight">O mercado não espera. Sua empresa merece o topo.</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <WhatsAppButton 
              text="Agendar Call Estratégica" 
              className="px-20 py-10 text-2xl" 
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 pt-20 flex flex-col items-center gap-16 relative z-10">
          <div className="flex flex-col items-center gap-6">
             <div className="flex items-center gap-4 group cursor-default">
               <img src={LOGO_URL} alt="" className="w-16 h-16 object-contain brightness-0 invert opacity-80" />
               <p className="text-4xl font-black text-white uppercase tracking-tighter">TECHVIEW</p>
             </div>
             <p className="text-xs text-slate-600 uppercase tracking-[0.8em] font-bold">Engineering The Future of Sales</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between w-full items-center gap-12 text-slate-600 border-t border-white/5 pt-12">
            <p className="text-xs font-bold uppercase tracking-widest">© 2024 TechView Digital Labs • Porto Alegre, BR</p>
            <div className="flex gap-12">
              <a href="#" className="hover:text-cyan-500 transition-colors uppercase text-xs font-black tracking-widest">Instagram</a>
              <a href="#" className="hover:text-cyan-500 transition-colors uppercase text-xs font-black tracking-widest">LinkedIn</a>
              <a href="#" className="hover:text-cyan-500 transition-colors uppercase text-xs font-black tracking-widest">Behance</a>
            </div>
            <div className="text-slate-900 font-serif italic text-4xl select-none opacity-20 hidden lg:block tracking-tighter">
               Standard Excellence
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
