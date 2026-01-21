
import React, { useState } from 'react';
import { 
  Rocket, 
  Brain, 
  TrendingUp, 
  Zap, 
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  X,
  ChevronRight,
  ShieldAlert,
  Target,
  Users,
  Layout,
  MousePointer2,
  Instagram,
  Globe,
  Monitor,
  ShoppingBag,
  ZapOff,
  ExternalLink
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

const WHATSAPP_URL = "https://wa.me/5551991209421";
const LOGO_URL = "https://i.imgur.com/mU2lnth.png";

// Define an interface for Project to ensure strict typing across the app.
interface Project {
  title: string;
  url: string;
  type: string;
  image: string;
}

const PORTFOLIO_PROJECTS: Project[] = [
  {
    title: "SIEL - Gestão & Estratégia",
    url: "https://pag-siel.vercel.app/",
    type: "Landing Page de Conversão",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop"
  },
  {
    title: "Lorena Duarte - Guia",
    url: "https://guia-lorena-duarte.vercel.app/",
    type: "Posicionamento Digital",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=500&auto=format&fit=crop"
  },
  {
    title: "Andressa Valim",
    url: "https://andressa-valim.vercel.app/",
    type: "Arquitetura de Autoridade",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=500&auto=format&fit=crop"
  },
  {
    title: "Diéssica Lorandi",
    url: "https://diesssica-lorandi.vercel.app/",
    type: "Landing Page Premium",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=500&auto=format&fit=crop"
  },
  {
    title: "Caroline Riegel",
    url: "https://caroline-riegel.vercel.app/",
    type: "Estratégia de Marca",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=500&auto=format&fit=crop"
  }
];

// Reusable Components
const WhatsAppButton = ({ text, className = "", subtext = "" }: { text: string; className?: string; subtext?: string }) => (
  <div className="flex flex-col items-center gap-3 w-full md:w-auto">
    <a 
      href={WHATSAPP_URL}
      target="_blank" 
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 bg-cyan-600 hover:bg-cyan-500 animate-cta-tech text-white font-black py-6 px-10 rounded-full transition-all duration-300 transform hover:scale-105 text-lg md:text-xl uppercase tracking-tighter shadow-[0_0_30px_rgba(6,182,212,0.4)] ${className}`}
    >
      <MessageSquare size={26} fill="currentColor" />
      {text}
    </a>
    {subtext && <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{subtext}</p>}
  </div>
);

const AIStrategyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [input, setInput] = useState('');
  const [strategy, setStrategy] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const cleanJsonResponse = (text: string) => {
    let cleaned = text.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?/, '').replace(/```$/, '').trim();
    }
    return cleaned;
  };

  const generateStrategy = async () => {
    const userInput = input.trim();
    if (!userInput) return;
    setLoading(true);
    setStrategy(null);
    try {
      // Fix: Follow @google/genai guidelines for client initialization and use process.env.API_KEY directly.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Analise meu negócio e como um novo site profissional pode me ajudar a escalar: ${userInput}`,
        config: {
          systemInstruction: "Você é o estrategista-chefe da TechView Digital. Sua missão é explicar como um site de alta performance é o alicerce para escala digital. Retorne APENAS um JSON válido.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              titulo: { type: Type.STRING },
              alavancas: { type: Type.ARRAY, items: { type: Type.STRING } },
              analise: { type: Type.STRING },
              impacto: { type: Type.STRING }
            },
            required: ["titulo", "alavancas", "analise", "impacto"]
          }
        },
      });
      // Fix: Use response.text property directly without parentheses.
      const responseText = response.text;
      if (responseText) {
        setStrategy(JSON.parse(cleanJsonResponse(responseText)));
      }
    } catch (e) {
      setStrategy({ 
        titulo: "Análise Técnica Estrutural", 
        analise: "Seu nicho exige uma presença digital agressiva. Recomendamos uma estrutura focada em conversão imediata.",
        alavancas: ["Arquitetura Mobile-First", "Otimização de Carregamento Ultra-Rápida", "Call-to-Action Estratégico"],
        impacto: "Aumento Imediato em Leads"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/98 backdrop-blur-xl animate-in fade-in">
      <div className="bg-slate-900 border-2 border-cyan-600/20 p-8 md:p-12 rounded-[2.5rem] max-w-2xl w-full shadow-2xl space-y-8 max-h-[90vh] overflow-y-auto relative border-glow">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
          <X size={28} />
        </button>
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">TechView <span className="text-cyan-500">Web Analysis</span></h2>
          <p className="text-slate-400 font-medium text-lg">Como podemos transformar seu site em uma máquina de vendas?</p>
        </div>
        <div className="space-y-6">
          <textarea 
            className="w-full bg-slate-950 border border-white/10 rounded-3xl p-6 text-white focus:outline-none focus:border-cyan-500 transition-all h-40 resize-none text-lg"
            placeholder="Ex: Vendo bolas de futebol e não tenho site..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            onClick={generateStrategy}
            disabled={loading || !input.trim()}
            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-black py-6 rounded-full transition-all uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Receber Diagnóstico do Site"}
          </button>
        </div>
        {strategy && (
          <div className="bg-slate-950 border border-cyan-600/30 p-8 rounded-[2rem] space-y-6 animate-in slide-in-from-bottom-6">
             <div className="space-y-5">
                <h3 className="text-2xl font-black text-cyan-500 italic uppercase leading-none">{strategy.titulo}</h3>
                <p className="text-slate-300 leading-relaxed font-medium">"{strategy.analise}"</p>
                <div className="space-y-3">
                  {strategy.alavancas?.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="mt-1"><CheckCircle2 className="text-cyan-500" size={18} /></div>
                      <span className="text-sm md:text-base text-slate-200 font-bold">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 mt-6 border-t border-white/10">
                  <p className="text-cyan-400 font-black text-xl mb-6">Meta: {strategy.impacto}</p>
                  <WhatsAppButton text="Solicitar Esse Site" className="w-full" />
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Fix: Use React.FC to properly handle standard props like 'key' in list rendering.
const PortfolioCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group relative bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-cyan-600/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.1)]">
    <div className="aspect-[16/10] overflow-hidden relative">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
      <div className="absolute top-4 left-4 flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
      </div>
    </div>
    <div className="p-8 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 mb-1 block">{project.type}</span>
          <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">{project.title}</h3>
        </div>
        <a 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white/5 p-3 rounded-full hover:bg-cyan-600 transition-colors text-slate-400 hover:text-white"
        >
          <ExternalLink size={20} />
        </a>
      </div>
      <a 
        href={project.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-cyan-500 transition-colors"
      >
        Ver Site Online <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  </div>
);

// Fix: Use React.FC for consistency and proper prop type handling.
const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; features: string[] }> = ({ icon, title, desc, features }) => (
  <div className="bg-slate-900/50 border border-white/5 p-10 rounded-[2.5rem] hover:border-cyan-600/40 transition-all duration-500 group flex flex-col gap-6 backdrop-blur-sm relative overflow-hidden">
    <div className="w-16 h-16 bg-cyan-600/10 rounded-2xl flex items-center justify-center text-cyan-600 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500 z-10">
      {icon}
    </div>
    <div className="z-10 space-y-4">
      <h3 className="text-2xl font-black uppercase italic text-white tracking-tighter">{title}</h3>
      <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
      <ul className="space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
            <div className="w-1 h-1 rounded-full bg-cyan-600" /> {f}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-600 selection:text-white relative">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-[0.03]">
        <img src={LOGO_URL} alt="" className="w-[120%] max-w-none grayscale brightness-200 blur-sm" />
      </div>

      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex justify-between items-center backdrop-blur-md border-b border-white/5 bg-slate-950/50">
        <div className="flex items-center gap-4">
          <img src={LOGO_URL} alt="TechView Logo" className="h-10 md:h-12 w-auto object-contain" />
          <div className="hidden md:flex flex-col leading-none">
            <span className="text-xl font-black italic uppercase tracking-tighter text-white">TechView <span className="text-cyan-500">Digital</span></span>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-cyan-600/10 border border-cyan-600/20 text-cyan-500 text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full hover:bg-cyan-600 hover:text-white transition-all"
        >
          Análise por IA
        </button>
      </nav>

      <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-600/10 via-slate-950 to-slate-950 opacity-60"></div>
        <div className="max-w-5xl mx-auto z-10 space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-600/20 bg-cyan-600/5 text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
            <Monitor size={14} /> Arquitetura de Conversão & Performance
          </div>
          <h1 className="text-5xl md:text-[6.5rem] font-black tracking-tighter leading-[0.9] text-white uppercase italic drop-shadow-2xl">
            Sites que vendem. <br />
            <span className="text-cyan-500 text-neon-cyan">Arquitetura de elite.</span> <br />
            Performance Bruta.
          </h1>
          <p className="max-w-3xl mx-auto text-slate-400 text-lg md:text-2xl font-medium leading-tight px-4">
            Não entregamos apenas "sites bonitos". Criamos ferramentas de escala ultra-velozes, otimizadas para o Google e focadas em conversão real.
          </p>
          <WhatsAppButton text="Quero meu Site Profissional" subtext="Consultoria estratégica gratuita hoje" className="md:px-16 md:py-8 md:text-2xl" />
        </div>
      </header>

      {/* PORTFOLIO SECTION */}
      <section className="py-32 px-6 relative z-10 bg-slate-900/20">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">Arquiteturas de <span className="text-cyan-500">Sucesso</span></h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest">Sites reais desenvolvidos pela nossa equipe para gerar escala.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_PROJECTS.map((project, i) => (
              <PortfolioCard key={i} project={project} />
            ))}
          </div>
          <div className="text-center pt-10">
            <WhatsAppButton text="Quero um Site desse nível" className="scale-90" />
          </div>
        </div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto space-y-20 relative z-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">O que <span className="text-cyan-500">Entregamos</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest">Tecnologia de ponta para faturar mais.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Target size={32} />} 
            title="Landing Pages" 
            desc="Focadas em um único objetivo: Converter tráfego em Leads e Vendas rápidas." 
            features={["Copy Persuasivo", "Design 100% Custom", "Velocidade A++"]}
          />
          <ServiceCard 
            icon={<Globe size={32} />} 
            title="Sites Institucionais" 
            desc="Autoridade imediata. Sua empresa vista como líder de mercado desde o primeiro segundo." 
            features={["SEO Avançado", "Blog Otimizado", "Integração CRM"]}
          />
          <ServiceCard 
            icon={<ShoppingBag size={32} />} 
            title="E-commerce High-End" 
            desc="Lojas virtuais preparadas para alto volume de tráfego e checkout sem fricção." 
            features={["Checkout Veloz", "Gestão de Estoque", "Mobile-First"]}
          />
        </div>
      </section>

      <section className="py-24 bg-slate-900/30 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Zap size={24} />, t: "Performance Core", d: "Sites que carregam em menos de 1 segundo. Menos espera, mais vendas." },
              { icon: <ShieldAlert size={24} />, t: "Código Limpo", d: "Nada de templates pesados. Desenvolvemos com foco em escalabilidade." },
              { icon: <MousePointer2 size={24} />, t: "UX/UI Estratégico", d: "Design pensado na jornada do cliente para maximizar o ROI." },
              { icon: <TrendingUp size={24} />, t: "Foco em SEO", d: "Arquitetura preparada para as primeiras posições do Google." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-4 border-l border-cyan-600/20 pl-6 group">
                <div className="text-cyan-500 group-hover:scale-125 transition-transform origin-left">{item.icon}</div>
                <h4 className="text-lg font-black uppercase italic text-white">{item.t}</h4>
                <p className="text-slate-500 text-sm font-medium">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-40 px-6 bg-slate-900 border-t border-white/5 text-center space-y-20 relative overflow-hidden z-10">
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <h2 className="text-6xl md:text-[8rem] font-black text-white uppercase italic tracking-tighter leading-[0.8] mb-8">
            Pare de perder leads com um site amador. <br /><span className="text-cyan-500 text-neon-cyan">Evolua AGORA.</span>
          </h2>
          <WhatsAppButton text="Solicitar Orçamento de Site" className="md:px-20 md:py-10 md:text-3xl" />
        </div>
        <div className="pt-32 border-t border-white/5 flex flex-col items-center gap-12 relative z-10">
          <div className="flex flex-col items-center gap-4">
            <img src={LOGO_URL} alt="TechView Logo" className="h-14 w-auto drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black italic uppercase tracking-tighter text-white">TechView <span className="text-cyan-500">Digital</span></span>
              <span className="text-[11px] uppercase font-bold tracking-[0.5em] text-slate-500">Professional Web Architecture</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between w-full items-center gap-8 text-slate-600 border-t border-white/5 pt-12">
            <p className="text-xs font-bold uppercase tracking-widest italic">© 2024 TechView Digital • Focado em resultados reais.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-cyan-500 transition-colors uppercase text-xs font-black tracking-widest flex items-center gap-2 group">
                <Instagram size={14} className="group-hover:scale-125 transition-transform" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>

      <AIStrategyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
