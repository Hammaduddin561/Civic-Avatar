import React, { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 flex flex-col border-r border-slate-200 bg-white dark:bg-slate-900 z-10">
          <div className="p-6 border-b border-slate-100 bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-white p-2 rounded-lg">
                <span className="material-symbols-outlined">account_balance</span>
              </div>
              <div>
                <h1 className="text-primary font-bold text-sm tracking-tight leading-none">CIVIC AVATAR</h1>
                <p className="text-[10px] text-primary/60 font-semibold uppercase tracking-wider mt-1">Operations v3.0</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            <button 
              onClick={() => setActiveTab('townhall')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === 'townhall' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <span className="material-symbols-outlined text-[20px]">record_voice_over</span> Townhall Mode
            </button>
            <button 
              onClick={() => setActiveTab('service')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === 'service' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <span className="material-symbols-outlined text-[20px]">support_agent</span> Service Mode
            </button>
            <button 
              onClick={() => setActiveTab('outreach')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === 'outreach' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <span className="material-symbols-outlined text-[20px]">connect_without_contact</span> Outreach Mode
            </button>
            
            <div className="pt-8 pb-4 px-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Command Center</p>
            </div>
            
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('config')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === 'config' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <span className="material-symbols-outlined text-[20px]">account_circle</span> Avatar Config
            </button>
            
            <div className="pt-8 pb-4 px-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administration</p>
            </div>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">
              <span className="material-symbols-outlined text-[20px]">settings</span> Settings
            </button>
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">shield_person</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">Admin: S. Sharma</p>
                <p className="text-[10px] text-slate-500 truncate italic">Supervisory Access</p>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-sm cursor-pointer hover:text-primary">logout</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-screen bg-slate-50 overflow-hidden">
          {activeTab === 'townhall' && <TownhallView />}
          {activeTab === 'dashboard' && <DashboardView />}
          {(activeTab === 'service' || activeTab === 'outreach' || activeTab === 'config') && (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-500">
              <div>
                <span className="material-symbols-outlined text-4xl mb-4 text-slate-300">construction</span>
                <h2 className="text-xl font-bold text-slate-700">Under Construction</h2>
                <p className="mt-2 text-sm max-w-sm mx-auto">This module is being configured for the hackathon demo. Please switch to Townhall or Dashboard view.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function TownhallView() {
  return (
    <div className="flex flex-col h-full relative">
      <header className="absolute top-6 right-8 flex gap-4 z-20 pointer-events-none">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20 rounded-full shadow-lg">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
          <span className="text-[10px] font-bold text-white tracking-widest leading-none">OFFICIAL SYNTHETIC MEDIA</span>
          <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
        </div>
        <div className="hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-md pl-3 pr-2 py-1.5 border border-white/20 rounded-full shadow-lg pointer-events-auto cursor-pointer group hover:bg-white/20 transition-all">
          <div className="flex flex-col pr-2 border-r border-white/20">
            <span className="text-[8px] font-bold text-emerald-300 uppercase leading-none mb-0.5">Trust Stack</span>
            <span className="text-[10px] font-medium text-white/80 leading-none">C2PA Verified</span>
          </div>
          <span className="material-symbols-outlined text-white/50 text-xl group-hover:text-white transition-colors">qr_code_2</span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/3 flex flex-col bg-[#050510] relative">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-80" data-alt="Photorealistic human avatar delivering a briefing" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AOfcidUc3h1SbxsJG2YosC_tQGAU7xrL88eDviPGlMaGDehcghS7glkGY9cp0PTu7P88h1mlZALLVOsynbJ6gvhWVebODvhvYDfmFoQMVQl9iwonQN76g3GPWhEH7GdyqU4Wcc0n05X51CuF7NC8X_B7o_4BNEa6utVc8LThsUOg0BPJh4OYBQGugAUccXYMC8TPkEPt10IM6ya_vXmcip1Biuc5VfYZQswMdCzpmfWRmWzmcEALQxnF6kkgymo')" }}></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
            <div className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white/60 font-semibold tracking-wide">
              IDENTITY: SHRI. R. SHARMA
            </div>
            <div className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white/60 font-semibold tracking-wide w-max">
              LANG: EN/HI [AUTO-SWITCHING]
            </div>
          </div>
          <div className="relative z-10 flex-1 flex flex-col justify-end p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <span className="material-symbols-outlined text-blue-400">interpreter_mode</span>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg tracking-tight">Daily Briefing</h2>
                <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider">Digital Infrastructure Initiatives</p>
              </div>
            </div>
            <p className="text-white/90 text-sm leading-relaxed max-w-sm">
              "...and therefore, the deployment of secure, citizen-centric touchpoints across the NCR region remains our absolute priority for Q3."
            </p>
          </div>
        </div>
        <div className="w-2/3 bg-slate-900 border-l border-white/10 flex flex-col">
          <div className="flex-1 bg-slate-800 p-8 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute top-4 right-4 bg-black/40 text-white/60 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider backdrop-blur-sm z-10 group-hover:opacity-100 transition-opacity">
              Slide 4 / 12
            </div>
            <div className="w-full max-w-2xl bg-slate-50 text-slate-800 rounded-xl shadow-2xl overflow-hidden aspect-[16/9] flex flex-col h-full max-h-[600px] border border-slate-200">
              <div className="h-14 bg-white border-b border-slate-100 flex items-center px-6 shrink-0 justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-blue-600"></div>
                  <span className="font-bold text-sm tracking-tight text-slate-900">Ministry of IT</span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confidential</div>
              </div>
              <div className="flex-1 p-10 flex flex-col justify-center">
                <p className="text-sm font-bold text-blue-600 mb-2 tracking-wide uppercase">Strategic Priority 1</p>
                <h1 className="text-4xl font-extrabold text-slate-900 leading-none mb-8 tracking-tight">Digital Infrastructure<br />Goals 2026</h1>
                <div className="grid grid-cols-2 gap-6 mt-4">
                  <div className="bg-slate-100 p-5 rounded-lg border border-slate-200/60">
                    <span className="material-symbols-outlined text-blue-600 mb-3 text-3xl">public</span>
                    <h3 className="font-bold text-slate-800 mb-1">100% Connectivity</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">Ensure high-speed broadband access to all Gram Panchayats.</p>
                  </div>
                  <div className="bg-slate-100 p-5 rounded-lg border border-slate-200/60">
                    <span className="material-symbols-outlined text-blue-600 mb-3 text-3xl">security</span>
                    <h3 className="font-bold text-slate-800 mb-1">Zero-Trust Security</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">Implement C2PA standards across all citizen communications.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-72 bg-white flex flex-col border-t border-slate-200 shrink-0">
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">forum</span>
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">Live Q&A Module</h3>
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-200/50 px-2 py-1 rounded">24 Participants</div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex flex-col items-start gap-1 max-w-2xl px-2">
            <span className="text-[10px] font-bold text-slate-400 pl-1 shrink-0">10:42 AM • Citizen ID: A-294</span>
            <div className="bg-slate-100 px-4 py-2.5 rounded-2xl text-sm text-slate-800 rounded-tl-sm w-fit inline-block">
              Kya naya infrastructure mere gaon (Block B) mein network improve karega?
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 max-w-2xl self-end ml-auto px-2">
            <div className="flex items-center gap-2 pr-1 shrink-0 justify-end">
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Verified AI Response</span>
              <span className="material-symbols-outlined text-emerald-500 text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <div className="bg-primary px-4 py-2.5 rounded-2xl text-sm text-white rounded-tr-sm w-fit block relative">
              Yes. Phase 2 of the Digital Goals 2026 includes full spectrum coverage for Block B starting next quarter. (जी हां। 2026 के लक्ष्यों के चरण 2 में अगले महीने से ब्लॉक बी के लिए पूर्ण कवरेज शामिल है।)
              <div className="mt-2.5 pt-2 border-t border-white/20 flex flex-nowrap items-center gap-1.5 w-max">
                <span className="material-symbols-outlined text-blue-300 text-[14px]">description</span>
                <span className="text-[9px] font-bold text-blue-200 uppercase tracking-wider relative top-px">Source: Telecom Strategy Doc (Pg 42)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <div className="relative flex-1 group">
              <input type="text" placeholder="Type a question in any language (Hindi, English, Tamil...) OR use voice..." className="w-full bg-white border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-full pl-4 pr-12 py-3 text-sm shadow-sm transition-all text-slate-800 placeholder:text-slate-400" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </button>
            </div>
            <button className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center shadow-md transition-transform active:scale-95 shrink-0">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="flex flex-col h-full">
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">STATUS:</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[10px] font-bold">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> LIVE
            </div>
          </div>
          <div className="h-4 w-px bg-slate-200"></div>
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input className="w-full bg-slate-100 border-none rounded-lg pl-10 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-primary" placeholder="Query entities, logs, or users..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDaJTSNzSywYT8igP8QbCG72YKBKj3v_LhFq1Oa5o30dB8RzGrx9qg1Xx1d5ZrMbc0o7U7UelU6zMb3M-KDXWvBfGVj4J5MlUfszoQgM21KI2WHtBjMxll9sgqqKvFGQ8JulQ5DKtHZz7Gk18W0sdfk_SQRLjXkdd2oVFBC1SpfGnotF7dAE2TmmWU6xK7Nwrxw_VtFkcbRq3Bz4O3xRhUUYxB2KsOMpXn5lvkMSH3mLfTL2rNcIk4z3JAD8X6gFuHyzenqvrrZWLw')"}}></div>
            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 overflow-hidden bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGwi6aEdBBxYn8gQhnCXLOTEL1k0fNNxLlqYCQkyIqPsz2hUOoDXuysqvGk7gO83dgKYvFdiAF637-luOeP1CF4Xl0R9fxln6fVw8CpmnHEl3yPqthjRG5NcUSvC96pgj7eIwYqbGNccHG2rfIkJgU6fXN4G52alwFGznc1v7OL3qC5vsU9PFAuHMpOG_c7zbtJ4HmVSixoblj3Imzei6dI5n7B4XNc57qa-kLNqEOJeGnKLXxGgvOgdz0GGdpHaL3eAHIUU7dDjw')"}}></div>
          </div>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-primary/90">
            <span className="material-symbols-outlined text-sm">publish</span> DEPLOY VERSION 4.1.2
          </button>
          <button className="p-2 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="bg-slate-900 aspect-[4/5] relative">
                <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AOfcidUc3h1SbxsJG2YosC_tQGAU7xrL88eDviPGlMaGDehcghS7glkGY9cp0PTu7P88h1mlZALLVOsynbJ6gvhWVebODvhvYDfmFoQMVQl9iwonQN76g3GPWhEH7GdyqU4Wcc0n05X51CuF7NC8X_B7o_4BNEa6utVc8LThsUOg0BPJh4OYBQGugAUccXYMC8TPkEPt10IM6ya_vXmcip1Biuc5VfYZQswMdCzpmfWRmWzmcEALQxnF6kkgymo')"}}></div>
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> 4K PREVIEW
                  </div>
                  <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold flex items-center justify-center">
                    LATENCY: 42ms
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-3 rounded-lg text-white">
                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Identity Matrix</p>
                    <p className="text-sm font-semibold">Senior Administrative Officer (GoI)</p>
                  </div>
                </div>
              </div>
              <div className="p-4 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50">
                  <span className="material-symbols-outlined text-base">videocam</span> CALIBRATE
                </button>
                <button className="flex items-center justify-center gap-2 py-2 bg-slate-100 rounded-lg text-xs font-bold hover:bg-slate-200">
                  <span className="material-symbols-outlined text-base">refresh</span> SYNC VOICE
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">tune</span> Behavior Configuration
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 italic">AUTO-SAVING ACTIVE</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="text-xs font-bold text-slate-600 uppercase">Response Formality</label>
                        <span className="text-xs font-bold text-primary">85%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[85%]"></div>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 italic">Official GIGW Standard: High Protocol</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="text-xs font-bold text-slate-600 uppercase">Gestural Fluidity</label>
                        <span className="text-xs font-bold text-primary">62%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[62%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="text-xs font-bold text-slate-600 uppercase">Empathetic Response</label>
                        <span className="text-xs font-bold text-primary">45%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[45%]"></div>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 italic">Standard Bureaucratic Tone</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="text-xs font-bold text-slate-600 uppercase">Cognitive Load</label>
                        <span className="text-xs font-bold text-primary">24%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[24%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="relative inline-block w-10 h-5">
                      <input defaultChecked className="peer sr-only" type="checkbox" id="toggle1"/>
                      <div className="w-10 h-5 bg-slate-200 peer-checked:bg-primary rounded-full transition-colors cursor-pointer" onClick={() => document.getElementById('toggle1').click()}></div>
                      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5 pointer-events-none"></div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">Eye Contact Lock</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative inline-block w-10 h-5">
                      <input defaultChecked className="peer sr-only" type="checkbox" id="toggle2"/>
                      <div className="w-10 h-5 bg-slate-200 peer-checked:bg-primary rounded-full transition-colors cursor-pointer" onClick={() => document.getElementById('toggle2').click()}></div>
                      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5 pointer-events-none"></div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">Policy Guardrails</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative inline-block w-10 h-5">
                      <input className="peer sr-only" type="checkbox" id="toggle3"/>
                      <div className="w-10 h-5 bg-slate-200 peer-checked:bg-primary rounded-full transition-colors cursor-pointer" onClick={() => document.getElementById('toggle3').click()}></div>
                      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5 pointer-events-none"></div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">Multilingual Sink</span>
                  </div>
                </div>
              </div>
              <div className="bg-primary/5 rounded-xl border border-primary/10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">info</span>
                  <p className="text-xs font-medium text-primary leading-tight">
                    <span className="font-bold">Next Compliance Check:</span> March 24th, 2026. Ensure all response datasets are synchronized.
                  </p>
                </div>
                <button className="text-[10px] font-bold text-primary underline decoration-2 underline-offset-4 uppercase tracking-wider">Review Guidelines</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500">assignment_late</span> Human Escalation Queue
                </h3>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold">12 ACTIVE</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-[10px] font-bold">3 CRITICAL</span>
                </div>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ticket ID</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Issue Type</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Wait Time</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Severity</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-xs font-bold text-slate-700">#E-9921</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-600">Complex Policy Query</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-600">02m 45s</td>
                      <td className="px-6 py-4"><span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px] font-bold">HIGH</span></td>
                      <td className="px-6 py-4"><button className="text-primary text-[10px] font-bold uppercase hover:underline">Intercept</button></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-xs font-bold text-slate-700">#E-9922</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-600">Emotional Distress</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-600">01m 12s</td>
                      <td className="px-6 py-4"><span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-[10px] font-bold">CRITICAL</span></td>
                      <td className="px-6 py-4"><button className="text-primary text-[10px] font-bold uppercase hover:underline">Intercept</button></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-xs font-bold text-slate-700">#E-9925</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-600">Dialect Mismatch</td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-600">05m 30s</td>
                      <td className="px-6 py-4"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">MEDIUM</span></td>
                      <td className="px-6 py-4"><button className="text-primary text-[10px] font-bold uppercase hover:underline">Intercept</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-500">history</span> Provenance Logs
                </h3>
                <button className="p-1 hover:bg-slate-50 rounded">
                  <span className="material-symbols-outlined text-slate-400 text-lg">filter_list</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5"></div>
                    <div className="flex-1 w-px bg-slate-100 my-1"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-slate-400">14:02:12</span>
                      <span className="text-[10px] font-bold text-primary px-1.5 py-0.5 bg-primary/5 rounded">SYNC_OK</span>
                    </div>
                    <p className="text-xs font-bold text-slate-700 mb-1">Core Identity Re-Verification</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Neural weights successfully validated against Ministry of Electronics DB.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-slate-300 mt-1.5"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-slate-400">13:58:45</span>
                      <span className="text-[10px] font-bold text-slate-500 px-1.5 py-0.5 bg-slate-100 rounded">SYS_UPDATE</span>
                    </div>
                    <p className="text-xs font-bold text-slate-700 mb-1">Tone Adjustment Module</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Formal protocol increased by 12% following user interaction feedback logs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="h-10 bg-slate-200 border-t border-slate-300 px-8 flex items-center justify-between flex-shrink-0 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
        <div className="flex items-center gap-6">
          <a className="hover:text-primary transition-colors" href="#">Digital India Initiative</a>
          <a className="hover:text-primary transition-colors" href="#">Cyber Security Policy</a>
        </div>
        <div className="flex items-center gap-4">
          <span>Server: DELHI-NCR-01</span>
          <span>Last Updated: 2024-10-23 14:05 IST</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
