import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Radio, ChevronRight, Zap, Activity, Globe, Target, Fish, FireExtinguisher, Badge, BadgeCent, BadgeAlert, ShieldEllipsis, Building2, BadgeCheck, Flame, Waves, FishIcon, FlameIcon } from 'lucide-react';
import { useEffect } from 'react';
import { ExternalLink, Camera } from 'lucide-react';

import fhpLogo from './assets/FHPBadge.png';
import opdLogo from './assets/OrlandoPDBadge.png';
import ocsoLogo from './assets/OCSOBadge.png';
import ocfrLogo from './assets/OCFRBadge.png';
import fwcLogo from './assets/FWCBadge.png';

import opdcruisers from './serverimages/OPDCruisers.png';
import ocsoexplorer from './serverimages/OCSOExplorer.png';
import ocsoexplorer2 from './serverimages/OCSOExplorer2.png';
import fhptroopers from './serverimages/FHPTroopers.png';
import leobriefing from './serverimages/LEOBriefing.png';
import blrpcivbike from './serverimages/BLRPCivBike.png';
import blrpcivbike2 from './serverimages/BLRPCivBike2.png';
import blrpcivcharger from './serverimages/BLRPCivCharger.png';
import blrpfirescene from './serverimages/BLRPFireScene.png';
import fhpchargerst from './serverimages/FHPChargerST.png';
import ocsocrimescene from './serverimages/OCSOCrimeScene.png';
import ocsocrimescene2 from './serverimages/OCSOCrimeScene2.png';
import fhpsunset from './serverimages/FHPSunset.png';
import blrplogo from './serverlogos/BLRPLogoTransparent.png';

const useFiveMStatus = (serverId) => {
  const [status, setStatus] = useState({ 
    online: false, 
    players: 0, 
    maxPlayers: 0, 
    loading: true 
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // We use a CORS proxy because Cfx.re blocks direct browser requests for security
        const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/jdemyp`);
        const data = await response.json();
        
        if (data && data.Data) {
          setStatus({
            online: true,
            players: data.Data.clients,
            maxPlayers: data.Data.sv_maxclients,
            loading: false
          });
        }
      } catch (error) {
        console.error("Bayline Link Error:", error);
        setStatus({ online: false, players: 0, maxPlayers: 0, loading: false });
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [serverId]);

  return status;
};

// --- BAYLINE REDLINE COMPONENTS ---

const StatCard = ({ label, value, icon: Icon, statusColor = "bg-gray-600", isLive = false }) => (
  <div className="relative p-8 md:p-10 border-r border-white/[0.03] group hover:bg-red-500/[0.03] transition-all duration-500 overflow-hidden last:border-r-0">
    {/* TOP GLOW LINE */}
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <div className="flex items-center gap-6">
      {/* ICON CONTAINER */}
      <div className="relative">
        <div className="p-3 bg-white/[0.02] border border-white/5 group-hover:border-red-500/40 transition-all duration-500 relative z-10">
          <Icon size={18} className="text-gray-500 group-hover:text-red-500 transition-colors" />
        </div>
        {/* Subtle background glow behind icon on hover */}
        <div className="absolute inset-0 bg-red-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className="block text-[10px] uppercase tracking-[0.5em] font-black text-gray-500 italic">
            {label}
          </span>
          {/* DYNAMIC STATUS PIN */}
          <div className="flex items-center gap-1.5">
            <span className={`relative flex h-1.5 w-1.5`}>
              {isLive && (
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${statusColor} opacity-75`}></span>
              )}
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${statusColor}`}></span>
            </span>
          </div>
        </div>

        <span className="text-sm md:text-base font-black tracking-[0.15em] uppercase text-gray-300 group-hover:text-white transition-colors leading-none">
          {value}
        </span>
      </div>
    </div>

    {/* BACKGROUND WATERMARK (Subtle Label) */}
    <span className="absolute -bottom-2 -right-2 text-4xl font-black italic text-white/[0.01] uppercase select-none group-hover:text-red-600/[0.03] transition-colors">
      {label.split(' ')[0]}
    </span>
  </div>
);

const DeptCard = ({ name, id, desc, image, onClick }) => (
  <div 
    onClick={onClick} // This connects the click from Home.jsx
    className="relative bg-[#1A1A1A] p-12 group border border-white/[0.03] hover:border-red-600/20 transition-all duration-700 shadow-xl overflow-hidden cursor-pointer"
  >
    {/* Background ID Text */}
    <div className="absolute top-4 right-4 text-[40px] font-black text-white/[0.01] group-hover:text-red-600/5 transition-colors tracking-tighter italic uppercase">
      {id}
    </div>
    
    {/* Badge Image */}
    <div className="mb-10 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 origin-left">
      <img 
        src={image} 
        alt={`${name} Badge`} 
        className="max-w-full max-h-full object-contain filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] brightness-95 group-hover:brightness-110 transition-all" 
      />
    </div>
    
    <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-4 group-hover:translate-x-2 transition-transform text-gray-100">
      {name}
    </h3>
    
    <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-[260px] group-hover:text-gray-400 transition-colors">
      {desc}
    </p>
    
    {/* Visual indicator that it's clickable */}
    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-600 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
      View Division
    </div>
  </div>
);

// --- PAGES ---

const DEPT_DETAILS = {
  FHP: {
    title: "Florida Highway Patrol",
    motto: "Service, Courtesy, Protection",
    longDesc: "The FHP is the premier state law enforcement agency. Our Troopers are trained in high-speed tactical interdiction, commercial vehicle enforcement, and state-wide traffic homicide investigation.",
    features: ["Criminal Interdiction Unit", "Aviation Division", "Aggressive Drivers Unit", "K-9 Unit", "Bureau of Criminal Investigations and Intelligence", "Commercial Vehicle Enforcement", "Special Response Team"],
    image: fhpsunset,
    command: [
      { callsign: "1101", name: "J. Miller" },
      { callsign: "1102", name: "B. Nichols" },
      { callsign: "1104", name: "J. Wilkins" }
    ]
  },
  OPD: {
    title: "Orlando Police Department",
    motto: "Keep Orlando Safe",
    longDesc: "Operating in the urban heart of Florida, OPD focuses on community-oriented policing, rapid response, and specialized tactical operations within city limits.",
    features: ["S.W.A.T.", "Aviation Division", "K9 Unit", "Criminal Investigations Division", "DUI Enforcement", "Motors Unit", "Marine Patrol"],
    image: opdcruisers,
    command: [
      { callsign: "O-101", name: "L. Caruso" },
      { callsign: "O-102", name: "R. Clark" }
    ]
  },
  OCSO: {
    title: "Orange County Sheriffs Office",
    motto: "Faithful Performance of Duty",
    longDesc: "Serving the vast Orange County territory with specialized tactical, aviation, and K9 units to ensure the safety of all residents and visitors.",
    features: ["S.W.A.T.", "Aviation Division", "K9 Unit", "Criminal Investigations Division", "Marine Patrol", "Motors Unit", "DUI Enforcement"],
    image: ocsoexplorer,
    command: [
      { callsign: "C-01", name: "A. Evans" },
      { callsign: "C-02", name: "T. Reagan" },
      { callsign: "C-03", name: "D. Blackstone" }
    ]
  },
  OCFR: {
    title: "Orange County Fire & Rescue",
    motto: "Always Ready",
    longDesc: "Paramedic response, fire suppression, and technical rescue operations across the region with state-of-the-art equipment.",
    features: ["Fire Suppression", "EMS / Paramedic", "Technical Rescue"],
    image: blrpfirescene,
    command: [
      { callsign: "N/A", name: "TBD" }
    ]
  },
  FWC: {
    title: "Florida Fish & Wildlife",
    motto: "Conserving the Future",
    longDesc: "Protecting Florida's natural resources through waterborne patrol and rural land enforcement across the state's diverse ecosystems.",
    features: ["Airboat Patrol", "Wildlife Enforcement", "Marine Safety"],
    image: "",
    command: [
      { callsign: "N/A", name: "TBD" }
    ]
  }
};

const DepartmentProfile = ({ id, data, logo }) => (
  <section className="group relative py-20 border-b border-white/[0.03] last:border-0">
    <div className="absolute inset-0 bg-red-600/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
      {/* BADGE SIDE */}
      <div className="w-full lg:w-1/3 flex flex-col">
        <div className="relative aspect-square bg-[#0A0A0A] border border-white/5 flex items-center justify-center overflow-hidden group-hover:border-red-600/20 transition-all duration-700">
          <span className="absolute -bottom-6 -right-6 text-[12rem] font-black italic text-white/[0.01] group-hover:text-red-600/[0.02] uppercase select-none transition-colors duration-700">
            {id}
          </span>
          <img 
            src={logo} 
            alt={data.title} 
            className="w-64 h-64 object-contain z-10 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105" 
          />
        </div>
      </div>

      {/* DATA SIDE */}
      <div className="w-full lg:w-2/3 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-red-600" />
            <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em] italic">{data.motto}</p>
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter text-white mb-6 leading-none group-hover:translate-x-2 transition-transform duration-500">
            {data.title}
          </h2>
          
          <p className="text-gray-400 leading-relaxed text-lg font-medium italic border-l-2 border-red-600/20 pl-8 mb-10 max-w-3xl">
            "{data.longDesc}"
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* DIVISIONS LIST */}
          <div className="bg-white/[0.01] p-6 border border-white/5">
            <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6 border-b border-white/5 pb-2 italic">
              Operational Divisions
            </h4>
            <ul className="space-y-3">
              {data.features.map(f => (
                <li key={f} className="flex items-center gap-3 group/item">
                  <div className="w-1 h-[1px] bg-red-600 group-hover/item:w-3 transition-all" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover/item:text-white transition-colors">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* COMMAND STAFF */}
          <div className="flex flex-col justify-end">
            <div className="pt-6 border-t border-white/5">
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 mb-3 italic">Internal Command</h4>
              <p className="text-[10px] font-black text-white tracking-widest uppercase italic mb-3">Administration & Oversight</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {data.command?.map((staff) => (
                  <div key={staff.callsign} className="flex flex-col">
                    <span className="text-[12px] font-black text-red-600 italic leading-none">{staff.callsign}</span>
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">{staff.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const DepartmentsPage = () => {
  return (
    <main className="bg-[#121212] min-h-screen pt-40 pb-20 px-6 relative overflow-hidden">
      {/* GLOBAL BACKGROUND TEXTURE (Matches Home) */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0F0F0F_100%)] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER SECTION */}
        <header className="mb-32 border-l-4 border-red-600 pl-8">
          <span className="text-red-600 text-[12px] font-black tracking-[0.6em] uppercase italic mb-4 block">
            Official Jurisdiction Registry
          </span>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tightest italic text-white leading-none">
            AGENCY <br /> <span className="text-gray-500/20">PROFILES.</span>
          </h1>
        </header>

        {/* AGENCY LIST */}
        <div className="space-y-40">
          <DepartmentProfile data={DEPT_DETAILS.FHP} logo={fhpLogo} />
          <DepartmentProfile data={DEPT_DETAILS.OPD} logo={opdLogo} />
          <DepartmentProfile data={DEPT_DETAILS.OCSO} logo={ocsoLogo} />
          <DepartmentProfile data={DEPT_DETAILS.OCFR} logo={ocfrLogo} />
          <DepartmentProfile data={DEPT_DETAILS.FWC} logo={fwcLogo} />
        </div>
      </div>
    </main>
  );
};

const About = () => {
  return (
    <main className="bg-[#121212] min-h-screen pt-40 pb-20 px-6 relative overflow-hidden">
      {/* GLOBAL BACKGROUND TEXTURE */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER SECTION */}
        <header className="mb-24 border-l-4 border-red-600 pl-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-red-600 text-[12px] font-black tracking-[0.6em] uppercase italic">
              Official Foundation Charter
            </span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tightest italic text-white leading-none">
            THE <br /> <span className="text-gray-500/20">REBIRTH.</span>
          </h1>
        </header>

        <div className="grid lg:grid-cols-12 gap-20">
          {/* LEFT COLUMN: THE STORY */}
          <div className="lg:col-span-7 space-y-12">
            <section>
              <h2 className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] mb-6">Origins // Easter Sunday Rebrand</h2>
              <p className="text-2xl text-gray-200 font-medium italic leading-relaxed border-b border-white/5 pb-12">
                Bayline RP was originally founded as <span className="text-white font-bold italic">The Great State of Arizona RP</span> and was officially rebranded on <span className="text-white underline decoration-red-600 underline-offset-8">Easter Sunday</span>.
              </p>
            </section>

            <section className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                This date represents rebirth, tradition, and values. We are a conservative-rooted community built on structure, realism, and respect. 
                We are looking for devoted members who want to help build something that lasts.
              </p>
              <p>
                Our server isn’t about chaos, shortcuts, or unrealistic roleplay. We stand for discipline, professionalism, and loyalty. If you're tired of gimmicks and immature servers, you've found your home.
              </p>
              
              <div className="bg-red-600/5 border-l-2 border-red-600 p-8 my-10">
                <p className="text-white font-bold uppercase italic tracking-widest mb-4 flex items-center gap-2">
                  <Shield size={16} className="text-red-600" /> Grounded Realism
                </p>
                <p className="text-gray-400 text-sm italic">
                  We believe in authentic, grounded roleplay. We do not tolerate "they/them" pronoun games, trend chasing, or identity politics that distract from our purpose.
                </p>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: LEADERSHIP & DEPARTMENTS */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#1A1A1A] p-10 border border-white/5 shadow-2xl">
              <h3 className="text-white font-black uppercase italic tracking-widest mb-8 border-b border-white/5 pb-4">
                Operational Status
              </h3>
              
              <ul className="space-y-6">
                {[
                  { name: "Orange County Sheriff’s Office", status: "Active" },
                  { name: "Orange County Fire Rescue", status: "Active" },
                  { name: "Orlando Police Dept", status: "Active" },
                  { name: "Florida Wildlife Commission", status: "TEMP CLOSED", color: "text-red-600" },
                  { name: "Dispatch / Communications", status: "Active" },
                ].map((dept) => (
                  <li key={dept.name} className="flex justify-between items-center group">
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                      {dept.name}
                    </span>
                    <span className={`text-[9px] font-bold uppercase px-2 py-1 bg-white/[0.03] border border-white/5 ${dept.color || 'text-gray-600'}`}>
                      {dept.status}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-4">We want leaders.</h4>
                <p className="text-gray-500 text-[12px] leading-relaxed italic">
                  We want grinders. We want the people who are ready to leave their mark and build something better.
                </p>
              </div>
            </div>
            {/* FINAL SIGNATURE BOX */}
<div className="mt-32 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-start gap-8 opacity-40 hover:opacity-100 transition-opacity">
  
  <div className="text-right">
    <p className="text-[12px] font-bold uppercase tracking-widest text-gray-500 italic">
      "Built with Purpose. Started with You."
    </p>
  </div>
</div>
          </div>
        </div>
      </div>
    </main>
  );
};

const MediaPage = () => {
  const galleryImages = [
    { id: 1, src: fhptroopers, cat: "FHP", title: "State Trooper Formation" },
    { id: 2, src: fhpchargerst, cat: "FHP", title: "High-Speed Interceptor" },
    { id: 3, src: opdcruisers, cat: "OPD", title: "City Patrol Unit" },
    { id: 4, src: ocsoexplorer, cat: "OCSO", title: "County Patrol" },
    { id: 5, src: ocsoexplorer2, cat: "OCSO", title: "K9 Unit Deployment" },
    { id: 6, src: ocsocrimescene, cat: "OCSO", title: "Active Investigation // 01" },
    { id: 7, src: ocsocrimescene2, cat: "OCSO", title: "Forensic Processing // 02" },
    { id: 8, src: blrpfirescene, cat: "OCFR", title: "Major Structure Fire" },
    { id: 9, src: leobriefing, cat: "LEO", title: "Pre-Shift Briefing" },
    { id: 10, src: blrpcivbike, cat: "CIV", title: "Coastal Transit" },
    { id: 11, src: blrpcivbike2, cat: "CIV", title: "Urban Explorer" },
    { id: 12, src: blrpcivcharger, cat: "CIV", title: "Street Culture" },
  ];

  return (
    <main className="bg-[#121212] min-h-screen pt-40 pb-20 px-6 relative overflow-hidden">
      {/* GLOBAL BACKGROUND TEXTURE */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-20 border-l-4 border-red-600 pl-8">
          <span className="text-red-600 text-[12px] font-black tracking-[0.6em] uppercase italic mb-4 block">
            Server Media Registry
          </span>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tightest italic text-white leading-none">
            MEDIA <br /> <span className="text-gray-500/20 text-8xl md:text-9xl">ARCHIVE.</span>
          </h1>
        </header>

        {/* MASONRY GRID - REMOVED GRAYSCALE AND SCALE EFFECTS */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((img) => (
            <motion.div 
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden bg-[#1A1A1A] border border-white/5 shadow-2xl break-inside-avoid"
            >
              {/* SUBTLE RED VIGNETTE ON HOVER */}
              <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
              
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-auto block object-cover transition-transform duration-500 group-hover:brightness-110" 
              />

              {/* OVERLAY INFO - SLIDES UP ON HOVER */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1.5 h-[1px] bg-red-600" />
                  <span className="text-red-600 text-[9px] font-black uppercase tracking-widest">{img.cat}</span>
                </div>
                <h4 className="text-white text-xl font-black uppercase italic tracking-tighter">{img.title}</h4>
              </div>

              {/* TACTICAL CORNER BRACKET */}
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-red-600/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* SUBMIT MEDIA CTA */}
        <section className="mt-32 p-12 bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
          <Camera className="text-red-600 mb-6" size={32} />
          <h4 className="text-2xl font-black uppercase italic text-white mb-2">Contribute to the Archive</h4>
          <p className="text-gray-500 text-sm mb-8 uppercase tracking-widest max-w-md">
            Submit your high-quality screenshots via Discord to be featured in the official Bayline Media Registry.
          </p>
          <a 
            href="https://discord.gg/baylinerp" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 bg-red-600 text-white px-8 py-4 font-black text-[11px] uppercase tracking-[0.3em] hover:bg-red-700 transition-all shadow-xl"
          >
            Open Registry <ExternalLink size={14} />
          </a>
        </section>
      </div>
    </main>
  );
};

const DivisionModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* OVERLAY */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* MODAL CONTAINER - Set to 95% width and fixed max-height */}
      <motion.div 
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-[95vw] max-w-[1600px] h-fit max-h-[90vh] bg-[#121212] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col lg:flex-row z-10"
      >
        
        {/* LEFT: IMAGE SECTION - 60% Width for that wide-angle look */}
        <div className="w-full lg:w-[60%] relative overflow-hidden bg-black border-r border-white/5">
          <div className="absolute inset-0 bg-red-600/5 z-10 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
          <img 
            src={data.image} 
            alt={data.title} 
            className="w-full h-full object-cover block" 
          />
          
          {/* Tactical Overlay Elements */}
          <div className="absolute top-10 left-10 z-20 w-16 h-16 border-t-2 border-l-2 border-red-600/50" />
          
          {/* Metadata tag in the corner of the image */}
          <div className="absolute bottom-6 left-10 z-20 flex items-center gap-4">
             <div className="h-[1px] w-8 bg-white/20" />
             <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">
               Live Field Documentation // {data.id}
             </p>
          </div>
        </div>

        {/* RIGHT: CONTENT SECTION - 40% Width */}
        <div className="w-full lg:w-[40%] p-10 md:p-14 lg:p-20 flex flex-col justify-between bg-[#0D0D0D] relative overflow-y-auto">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 text-gray-700 hover:text-red-600 transition-all uppercase text-[10px] font-black tracking-[0.5em] flex items-center gap-3 group"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">Dismiss</span> [ X ]
          </button>

          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-6 mb-6">
                <div className="h-[1px] w-12 bg-red-600" />
                <span className="text-red-600 text-[11px] font-black uppercase tracking-[0.6em] italic">
                  {data.motto}
                </span>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-black uppercase italic text-white mb-8 tracking-tightest leading-[0.85]">
                {data.title}
              </h2>
              
              <p className="text-gray-400 text-xl md:text-2xl leading-relaxed italic border-l-4 border-red-600/30 pl-8 mb-12">
                "{data.longDesc}"
              </p>
            </div>

            {/* FEATURES GRID - Optimized for the narrower text column */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600 border-b border-white/5 pb-4">
                Specialized Units
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {data.features.map(f => (
                  <div key={f} className="flex items-center gap-3 group/item">
                    <div className="w-1.5 h-1.5 bg-red-600 rotate-45 group-hover/item:scale-150 transition-all duration-300" />
                    <span className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em] group-hover/item:text-white transition-colors">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER ACTION */}
          <div className="mt-16 pt-10 border-t border-white/5 flex flex-col xl:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
               <div className="w-14 h-14 bg-red-600/5 border border-red-600/20 flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
               </div>
               <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mb-1">Status</p>
                  <p className="text-white text-[13px] font-black uppercase tracking-widest">Active Recruitment</p>
               </div>
            </div>
            
            <a 
              href="https://discord.gg/baylinerp"
              target="_blank"
              rel="noreferrer"
              className="w-full xl:w-auto bg-red-600 text-white px-12 py-5 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all text-center"
            >
              Apply Now
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


import { X } from 'lucide-react'; // Make sure X is imported

const Home = () => {
  const server = useFiveMStatus('jdemyp');
  const [selectedDept, setSelectedDept] = useState(null); // Track the active pop-out

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      
      {/* 1. DIVISION POP-OUT MODAL */}
      <DivisionModal 
        isOpen={!!selectedDept} 
        onClose={() => setSelectedDept(null)} 
        data={DEPT_DETAILS[selectedDept]} 
      />

      <header className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#121212]">
        <div className="absolute inset-0 z-0 opacity-[0.15] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0F0F0F_100%)]" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <div className="inline-block px-4 py-1 border border-red-600/20 bg-red-600/5 mb-8">
            <span className="text-red-600 text-[14px] font-black tracking-[0.6em] uppercase italic">
               Your Story, Your Legacy, Your City
            </span>
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.75] italic uppercase mb-12 text-white">
            BAYLINE<span className="text-red-600"></span>
          </h1>
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.75] italic uppercase mb-12 text-white">
            <span className="text-red-600">ROLEPLAY</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a 
              href="https://discord.gg/baylinerp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white border border-red-600/30 px-12 py-4 hover:bg-red-600 transition-all uppercase tracking-[0.3em] text-[18px] font-black bg-red-600/10"
            >
              Join Today!
            </a>
            <Link to="/about" className="text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-[0.4em] transition border-b border-white/5 hover:border-red-600 pb-1">
              History behind Bayline Roleplay
            </Link>
          </div>
        </motion.div>
      </header>

      {/* DATA BAR - Replace your existing section with this */}
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-y border-white/[0.03] bg-[#0F0F0F]">
  
  {/* 1. Network Status - Pulses red when server is online */}
  <StatCard 
    label="Network Status" 
    value={server.online ? "System // Operational" : "System // Syncing"} 
    icon={Target} 
    statusColor={server.online ? "bg-red-600" : "bg-orange-500"}
    isLive={server.online}
  />

  {/* 2. Entry Status - Always pulses red (assuming apps are open) */}
  <StatCard 
    label="Entry Status" 
    value="Applications Open" 
    icon={Activity} 
    statusColor="bg-red-600"
    isLive={true}
  />

  {/* 3. Authority - Solid red dot, no pulse */}
  <StatCard 
    label="Authority" 
    value="Whitelisted" 
    icon={Shield} 
    statusColor="bg-red-600"
    isLive={false} 
  />

  {/* 4. Personnel - Only pulses if players > 0 */}
  <StatCard 
    label="Personnel" 
    value={server.loading ? "Linking..." : `${server.players} / ${server.maxPlayers} On-Duty`} 
    icon={Users} 
    statusColor={server.players > 0 ? "bg-red-600" : "bg-gray-600"}
    isLive={server.players > 0} 
  />

</section>

      {/* DEPARTMENTS PREVIEW */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-gray-100">Agencies.</h2>
            <div className="h-1 w-20 bg-red-600 mt-4" />
          </div>
          <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
            Five agencies, one mission. From the concrete of the city to the brush of the county, we maintain the line with absolute professionalism.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DeptCard 
            image={fhpLogo} id="FHP" name="Florida Highway Patrol" 
            desc="The masters of the asphalt. Specialized in high-speed interdiction." 
            onClick={() => setSelectedDept('FHP')}
          />
          <DeptCard 
            image={opdLogo} id="OPD" name="Orlando Police Department" 
            desc="Urban enforcement and community protection within the heart of the city." 
            onClick={() => setSelectedDept('OPD')}
          />
          <DeptCard 
            image={ocsoLogo} id="OCSO" name="Orange County Sheriffs Office" 
            desc="Serving vast territory with specialized tactical, aviation, and K9 units." 
            onClick={() => setSelectedDept('OCSO')}
          />
          <DeptCard 
            image={ocfrLogo} id="OCFR" name="Orange County Fire & Rescue" 
            desc="Paramedic response and technical rescue operations across the region." 
            onClick={() => setSelectedDept('OCFR')}
          />
          <DeptCard 
            image={fwcLogo} id="FWC" name="Florida Fish & Wildlife" 
            desc="Protecting Florida's natural resources through land and water patrol." 
            onClick={() => setSelectedDept('FWC')}
          />

          <div className="relative bg-[#0F0F0F] p-12 border border-dashed border-white/5 flex flex-col items-center justify-center text-center group hover:border-red-600/20 transition-colors">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4 group-hover:border-red-600/40 transition-colors">
              <span className="text-gray-600 group-hover:text-red-600 font-bold">+</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 group-hover:text-gray-500 transition-colors">Additional Units Pending</span>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const Footer = () => (
  <footer className="relative bg-[#0A0A0A] border-t border-white/[0.03] pt-20 pb-10 overflow-hidden">
    {/* BACKGROUND WATERMARK */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] font-black italic text-white/[0.01] uppercase select-none pointer-events-none tracking-tighter">
      BAYLINE
    </div>

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        
        {/* LOGO & AUTHENTICATION */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-8 bg-red-600 flex items-center justify-center text-white font-black italic">B</div>
            <span className="text-xl font-black italic tracking-tighter text-white uppercase">Bayline Roleplay</span>
          </div>
          <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed italic">
            Maintaining the highest standards of simulation and professionalism across the State of Florida since inception.
          </p>
          
          {/* LEADERSHIP AUTHENTICATION BOX */}
          <div className="inline-flex flex-col border-l-2 border-red-600 pl-6 py-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-2">Authenticated By</span>
            <span className="text-white text-sm font-black uppercase tracking-widest italic">Bayline Leadership Team</span>
          </div>
        </div>

        {/* QUICK NAVIGATION UPDATE */}
<div>
  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8 italic">Quick Access</h4>
  <ul className="space-y-4">
    {['Home', 'About', 'Departments', 'Media'].map((item) => (
      <li key={item}>
        <Link 
          // If the item is "Home", use "/", otherwise use the lowercase name
          to={item === 'Home' ? "/" : `/${item.toLowerCase()}`} 
          className="text-gray-500 hover:text-red-600 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 group"
        >
          <div className="w-0 h-[1px] bg-red-600 group-hover:w-4 transition-all" />
          {item}
        </Link>
      </li>
    ))}
  </ul>
</div>

        {/* EXTERNAL ASSETS */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8 italic">External</h4>
          <ul className="space-y-4">
            <li>
              <a href="https://discord.gg/baylinerp" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Discord Communications</a>
            </li>
            <li>
              <a href="https://servers.fivem.net/servers/detail/jdemyp" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Server Status</a>
            </li>
            <li>
              <a href="https://imperialcad.app/home/blrp1" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">CAD System</a>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-[9px] font-bold text-gray-700 uppercase tracking-[0.5em]">
          &copy; 2026 Bayline Roleplay. All Rights Reserved.
        </span>
        <div className="flex items-center gap-8">
          <div className="h-4 w-[1px] bg-white/10" />
          <span className="text-[9px] font-bold text-gray-700 uppercase tracking-[0.5em]">NHTSA Certified</span>
        </div>
      </div>
    </div>
  </footer>
);

// --- MAIN WRAPPER ---

// HELPER: Fixes scroll position when changing pages
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    // 'flex flex-col' and 'min-h-screen' keep the footer at the bottom
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-500 flex flex-col">
      <ScrollToTop />
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#121212]/95 backdrop-blur-xl border-b border-white/[0.03] px-10 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative flex items-center justify-center">
            <img 
              src={blrplogo} 
              alt="BLRP" 
              className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform duration-300"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-red-600/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>

          <span className="text-2xl font-black tracking-tighter italic text-gray-100 uppercase">
            Bayline<span className="text-red-500">Roleplay</span>
          </span>
        </Link>
        
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.4em] font-black text-gray-500 items-center">
          <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
          <Link to="/departments" className="hover:text-red-500 transition-colors">Departments</Link>
          <Link to="/about" className="hover:text-red-500 transition-colors">About</Link>
          <Link to="/media" className="hover:text-red-500 transition-colors">Media</Link>
        </div>
      </nav>

      {/* MAIN CONTENT AREA - 'flex-grow' pushes footer down */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/apply" element={<div className="pt-60 pb-40 text-center uppercase tracking-widest text-red-500 font-black">Link Established // https://discord.gg/baylinerp</div>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* GLOBAL FOOTER */}
      {<Footer />}
    </div>
  );
}

export default App;