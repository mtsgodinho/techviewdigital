
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
  Globe
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

const WHATSAPP_URL = "https://wa.me/5551991209421";
const LOGO_URL = "https://i.imgur.com/mU2lnth.png";

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

  const generateStrategy = async () => {
    if (!input) return;
    setLoading(true);
    setStrategy(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Analise meu negócio e objetivos para escala digital: ${input}`,
        config: {
          systemInstruction: "Você é o estrategista-chefe da TechView Digital. Sua missão é criar planos de escala digital baseados em dados e tecnologia de ponta. Use um tom profissional, altamente capacitado e focado em lucro massivo através de tecnologia.",
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

      const responseText = response.text;
      if (responseText) {
        setStrategy(JSON.parse(responseText.trim()));
      }
    } catch (e) {
      console.error(e);
      setStrategy({ 
        titulo: "Erro de Processamento", 
        analise: "Nossa IA está processando um alto volume de dados. Chame nossos especialistas no WhatsApp para um diagnóstico técnico imediato.",
        alavancas: ["Arquitetura de Conversão", "Tráfego Direcionado", "Otimização de LTV"],
        impacto: "Escala Sustentável"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/98 backdrop-blur-xl animate-in fade-in">
      <div className="bg-slate-900 border-2 border-cyan-600/20 p-8 md:p-12 rounded-[2.5rem] max-w-2xl w-full shadow-2xl space-y-8 max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
          <X size={28} />
        </button>
        
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">TechView <span className="text-cyan-500">AI Strategy</span></h2>
          <p className="text-slate-400 font-medium text-lg">Defina seu objetivo e receba um plano de escala.</p>
        </div>

        <div className="space-y-6">
          <textarea 
            className="w-full bg-slate-950 border border-white/10 rounded-3xl p-6 text-white focus:outline-none focus:border-cyan-500 transition-all h-40 resize-none text-lg"
            placeholder="Ex: Tenho um e-commerce e quero dobrar meu faturamento mensal usando tráfego pago..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            onClick={generateStrategy}
            disabled={loading || !input}
            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-black py-6 rounded-full transition-all uppercase tracking-widest flex items-center justify-center gap-3 group shadow-xl shadow-cyan-600/20"
          >
            {loading ? "Processando Algoritmos de Escala..." : "Gerar Estratégia de Crescimento"}
            <Zap size={22} fill="currentColor" />
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
                  <p className="text-cyan-400 font-black text-xl mb-6">Projeção de ROI: {strategy.impacto}</p>
                  <WhatsAppButton text="Executar Estratégia" className="w-full" />
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Card = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="bg-slate-900/50 border border-white/5 p-10 rounded-[2.5rem] hover:border-cyan-600/40 transition-all duration-500 group flex flex-col gap-6 backdrop-blur-sm relative overflow-hidden">
    <div className="w-16 h-16 bg-cyan-600/10 rounded-2xl flex items-center justify-center text-cyan-600 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500 z-10">
      {icon}
    </div>
    <h3 className="text-2xl font-black uppercase italic text-white tracking-tighter z-10">{title}</h3>
    <p className="text-slate-400 font-medium leading-relaxed z-10">{desc}</p>
  </div>
);

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-600 selection:text-white relative">
      {/* GLOBAL BACKGROUND WATERMARK */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-[0.03]">
        <img src={LOGO_URL} alt="" className="w-[120%] max-w-none grayscale brightness-200 blur-sm" />
      </div>

      {/* HEADER / NAV */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex justify-between items-center backdrop-blur-md border-b border-white/5 bg-slate-950/50">
        <div className="flex items-center gap-4">
          <img src={LOGO_URL} alt="TechView Logo" className="h-10 md:h-12 w-auto object-contain" />
          <div className="hidden md:flex flex-col leading-none">
            <span className="text-xl font-black italic uppercase tracking-tighter text-white">TechView <span className="text-cyan-500">Digital</span></span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all"
          >
            Diagnóstico IA
          </button>
        </div>
      </nav>

      {/* 1. HERO */}
      <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
        {/* Local subtle Hero Watermark - The Logo in the background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-5xl opacity-[0.08] pointer-events-none z-0 select-none">
          <img src={LOGO_URL} alt="" className="w-full h-auto grayscale" />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-600/10 via-slate-950 to-slate-950 opacity-60"></div>
        
        <div className="max-w-5xl mx-auto z-10 space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-600/20 bg-cyan-600/5 text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
            <Globe size={14} /> Tecnologia e Escala de Alta Performance
          </div>
          <h1 className="text-5xl md:text-[6.5rem] font-black tracking-tighter leading-[0.9] text-white uppercase italic drop-shadow-2xl">
            Sites que vendem. <br />
            Dados que dominam. <br />
            <span className="text-cyan-500 text-neon-cyan">Escala Digital Real.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-slate-400 text-lg md:text-2xl font-medium leading-tight px-4">
            Desenvolvemos ecossistemas digitais focados em conversão, velocidade e crescimento acelerado para o seu negócio.
          </p>

          <WhatsAppButton 
            text="Falar com a TechView Digital no WhatsApp" 
            subtext="Análise de projeto gratuita hoje"
            className="md:px-16 md:py-8 md:text-2xl"
          />
        </div>
      </header>

      {/* 2. O QUE A GENTE FAZ */}
      <section className="py-32 px-6 max-w-7xl mx-auto space-y-20 relative z-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Nosso Core de <span className="text-cyan-500">Performance</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest">Tecnologia de ponta a serviço do seu faturamento.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card 
            icon={<Layout size={32} />} 
            title="Sites Ultra-Velozes" 
            desc="Sua presença digital otimizada para o Google e focada na melhor experiência de compra do usuário." 
          />
          <Card 
            icon={<TrendingUp size={32} />} 
            title="Escala com Tráfego" 
            desc="Investimento inteligente. Algoritmos focados em atrair leads prontos para fechar negócio." 
          />
          <Card 
            icon={<Brain size={32} />} 
            title="Estratégia & Dados" 
            desc="Decisões baseadas em números, não em achismo. Posicionamos sua marca como líder do nicho." 
          />
        </div>
      </section>

      {/* 3. DIFERENCIAIS */}
      <section className="py-24 bg-slate-900/30 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <ShieldAlert size={24} />, t: "Segurança de Dados", d: "Arquitetura robusta e proteção total da sua operação." },
            { icon: <Zap size={24} />, t: "Entrega Express", d: "Seu projeto no ar em tempo recorde com qualidade premium." },
            { icon: <MousePointer2 size={24} />, t: "Otimização Mensal", d: "Ajustes constantes baseados no comportamento do usuário." },
            { icon: <Users size={24} />, t: "Suporte Especialista", d: "Time técnico dedicado ao crescimento da sua marca." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-4 border-l border-cyan-600/20 pl-6 group">
              <div className="text-cyan-500 group-hover:scale-125 transition-transform origin-left">{item.icon}</div>
              <h4 className="text-lg font-black uppercase italic text-white">{item.t}</h4>
              <p className="text-slate-500 text-sm font-medium">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DIAGNÓSTICO IA */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[3rem] p-12 md:p-24 text-center space-y-10 shadow-2xl shadow-cyan-600/20 relative overflow-hidden">
          {/* Subtle logo watermark inside the CTA banner */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 opacity-[0.08] pointer-events-none rotate-12 select-none">
            <img src={LOGO_URL} alt="" className="w-full h-auto brightness-0 invert" />
          </div>
          
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none relative z-10">Quer um plano de escala gratuito?</h2>
          <p className="text-xl md:text-2xl text-white/90 font-medium relative z-10">Use nossa inteligência artificial treinada em faturamento digital.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-cyan-600 font-black py-6 px-12 rounded-full text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-xl relative z-10"
          >
            Iniciar Diagnóstico IA
          </button>
        </div>
      </section>

      {/* 5. SOBRE A TECHVIEW */}
      <section className="py-32 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center relative z-10">
        <div className="w-full md:w-1/2 relative group">
          <div className="bg-slate-900 aspect-square rounded-[3rem] overflow-hidden border border-white/5 relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" 
              alt="TechView Digital Workspace" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-full h-full bg-cyan-600/10 -z-10 rounded-[3rem] blur-3xl"></div>
        </div>
        <div className="w-full md:w-1/2 space-y-8">
          <img src={LOGO_URL} alt="TechView Logo" className="h-12 w-auto mb-4" />
          <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none text-white">Inovação que gera <br /><span className="text-cyan-500">Lucratividade</span></h2>
          <p className="text-xl text-slate-400 leading-relaxed font-medium">
            Na TechView Digital, não entregamos apenas sites. Entregamos ativos de negócio. Nossa metodologia une tecnologia de ponta, design focado no usuário e estratégias de escala para tirar sua empresa do amadorismo e colocá-la no topo do digital.
          </p>
          <div className="flex gap-10 items-center pt-4">
            <div className="text-center">
              <span className="block text-3xl font-black text-white italic">+100</span>
              <span className="text-xs uppercase font-bold text-slate-500 tracking-widest">Projetos Ativos</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-black text-white italic">R$ 10M+</span>
              <span className="text-xs uppercase font-bold text-slate-500 tracking-widest">Em Vendas Geradas</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL */}
      <footer className="py-40 px-6 bg-slate-900 border-t border-white/5 text-center space-y-20 relative overflow-hidden z-10">
        {/* Large fixed watermark in footer background - centered and rotated */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] opacity-[0.04] pointer-events-none -rotate-12 select-none">
          <img src={LOGO_URL} alt="" className="w-full h-auto" />
        </div>

        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <h2 className="text-6xl md:text-[8rem] font-black text-white uppercase italic tracking-tighter leading-[0.8] mb-8">
            O amadorismo custa caro. <br /><span className="text-cyan-500">Escale agora.</span>
          </h2>
          <WhatsAppButton text="Comece seu projeto com a TechView Digital" className="md:px-20 md:py-10 md:text-3xl" />
        </div>

        <div className="pt-32 border-t border-white/5 flex flex-col items-center gap-12 relative z-10">
          <div className="flex flex-col items-center gap-4">
            <img src={LOGO_URL} alt="TechView Logo" className="h-14 w-auto opacity-100 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black italic uppercase tracking-tighter text-white">TechView <span className="text-cyan-500">Digital</span></span>
              <span className="text-[11px] uppercase font-bold tracking-[0.5em] text-slate-500">Performance & High-End Tech</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between w-full items-center gap-8 text-slate-600 border-t border-white/5 pt-12">
            <p className="text-xs font-bold uppercase tracking-widest italic">© 2024 TechView Digital • Projetado para escala real.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-cyan-500 transition-colors uppercase text-xs font-black tracking-widest flex items-center gap-2 group">
                <Instagram size={14} className="group-hover:scale-125 transition-transform" /> Instagram
              </a>
            </div>
            <div className="text-white font-black italic text-2xl tracking-tighter opacity-20 select-none">
               TechView Digital
            </div>
          </div>
        </div>
      </footer>

      <AIStrategyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
