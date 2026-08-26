import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Palette, 
  Building2, 
  Sparkles, 
  Save, 
  RotateCcw, 
  Eye, 
  Check, 
  Globe, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Image as ImageIcon,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Zap,
  LayoutTemplate
} from 'lucide-react';
import { gymConfigStore, GYM_PRESETS } from '../../services/gymConfigStore';
import { GymConfig, PresetKey } from '../../types';
import { soundManager } from '../common/SoundEffects';

interface WebsiteCustomizerPanelProps {
  onNavigateToPreview?: () => void;
}

export const WebsiteCustomizerPanel: React.FC<WebsiteCustomizerPanelProps> = ({ onNavigateToPreview }) => {
  const [config, setConfig] = useState<GymConfig>(gymConfigStore.getConfig());
  const [activeSubTab, setActiveSubTab] = useState<'branding' | 'presets' | 'colors' | 'hero' | 'contact' | 'whatsapp'>('branding');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const unsub = gymConfigStore.subscribe((newConfig) => {
      setConfig(newConfig);
    });
    return () => unsub();
  }, []);

  const handleSave = () => {
    soundManager.playSuccess();
    gymConfigStore.updateConfig(config);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleApplyPreset = (presetKey: PresetKey) => {
    soundManager.playSuccess();
    gymConfigStore.loadPreset(presetKey);
    setConfig(gymConfigStore.getConfig());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Reset all website branding and colors to original default?')) {
      soundManager.playClick();
      gymConfigStore.resetToDefaults();
      setConfig(gymConfigStore.getConfig());
    }
  };

  const handleTogglePreview = () => {
    soundManager.playClick();
    gymConfigStore.setClientPreviewMode(true);
    if (onNavigateToPreview) {
      onNavigateToPreview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-wider">
              White-Label Engine
            </span>
            <span className="text-xs text-zinc-500">• Instant CSS Theme Injection</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase mt-1">
            Website Customizer & Branding
          </h2>
          <p className="text-xs text-zinc-400">
            Easily rebrand KSG DEMO GYM into any client's gym in under 60 seconds with live color synchronization.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            id="customizer-client-preview-btn"
            onClick={handleTogglePreview}
            className="px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>Client Preview</span>
          </button>
          <button
            id="customizer-save-btn"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer transition-all hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>SAVE & APPLY</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Website configuration and CSS variables updated successfully across the platform!</span>
          </div>
          <button onClick={() => setSaveSuccess(false)} className="text-emerald-400 hover:text-white">
            ✕
          </button>
        </motion.div>
      )}

      {/* Sub Tab Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 border-b border-zinc-800 pb-2">
        {[
          { id: 'branding', label: 'Gym Identity & Logo', icon: Building2 },
          { id: 'presets', label: '1-Click Gym Presets', icon: LayoutTemplate },
          { id: 'colors', label: 'Theme Colors & Styling', icon: Palette },
          { id: 'hero', label: 'Hero Banner & Stats', icon: ImageIcon },
          { id: 'contact', label: 'Contact & Google Maps', icon: MapPin },
          { id: 'whatsapp', label: 'WhatsApp Automation', icon: MessageCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`customizer-tab-${tab.id}`}
              onClick={() => {
                soundManager.playClick();
                setActiveSubTab(tab.id as any);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/10'
                  : 'bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB TAB 1: BRANDING & IDENTITY */}
      {activeSubTab === 'branding' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <h3 className="text-base font-black text-white uppercase tracking-tight">
              Gym Brand Identity
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Configure the gym's public name, navbar title, established date, and white-label mode.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Gym Full Name
              </label>
              <input
                id="brand-gym-name-input"
                type="text"
                value={config.brand.name}
                onChange={(e) => setConfig({
                  ...config,
                  brand: { ...config.brand, name: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Short Name / Logo Text (Navbar)
              </label>
              <input
                id="brand-short-name-input"
                type="text"
                value={config.brand.shortName}
                onChange={(e) => setConfig({
                  ...config,
                  brand: { ...config.brand, shortName: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Logo Subtitle (e.g. PERFORMANCE CLUB)
              </label>
              <input
                id="brand-logo-subtitle-input"
                type="text"
                value={config.brand.logoSubtitle}
                onChange={(e) => setConfig({
                  ...config,
                  brand: { ...config.brand, logoSubtitle: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Established Year
              </label>
              <input
                id="brand-est-year-input"
                type="text"
                value={config.brand.establishedYear}
                onChange={(e) => setConfig({
                  ...config,
                  brand: { ...config.brand, establishedYear: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Brand Slogan / Tagline
            </label>
            <input
              id="brand-tagline-input"
              type="text"
              value={config.brand.tagline}
              onChange={(e) => setConfig({
                ...config,
                brand: { ...config.brand, tagline: e.target.value }
              })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
            />
          </div>

          {/* White-Label & Demo Switches */}
          <div className="pt-4 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-black uppercase text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>White-Label Production Mode</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  Hides agency demo branding, leaving only your gym name.
                </div>
              </div>
              <input
                id="brand-whitelabel-mode-checkbox"
                type="checkbox"
                checked={config.whiteLabelMode}
                onChange={(e) => setConfig({ ...config, whiteLabelMode: e.target.checked })}
                className="w-5 h-5 accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-black uppercase text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Demo Mode Watermark</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  Show discreet 'DEMO WEBSITE' badge on top right.
                </div>
              </div>
              <input
                id="brand-demo-mode-checkbox"
                type="checkbox"
                checked={config.demoMode}
                onChange={(e) => setConfig({ ...config, demoMode: e.target.checked })}
                className="w-5 h-5 accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 2: 1-CLICK GYM PRESETS */}
      {activeSubTab === 'presets' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <h3 className="text-base font-black text-white uppercase tracking-tight">
              Instant 1-Click Gym Presets
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Select a pre-configured gym theme to instantly see how this platform adapts to different brand aesthetics and cities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Object.entries(GYM_PRESETS).map(([key, preset]) => {
              const isSelected = config.brand.name === preset.brand.name;
              return (
                <div
                  key={key}
                  id={`preset-card-${key}`}
                  className={`p-5 rounded-2xl border transition-all ${
                    isSelected 
                      ? 'bg-zinc-950 border-amber-500 shadow-xl shadow-amber-500/10' 
                      : 'bg-zinc-950/60 hover:bg-zinc-950 border-zinc-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-mono uppercase text-amber-400 font-bold">
                        {preset.brand.city}, {preset.brand.state}
                      </div>
                      <h4 className="text-lg font-black text-white uppercase mt-0.5">
                        {preset.brand.name}
                      </h4>
                      <p className="text-zinc-400 text-xs mt-1">
                        {preset.brand.tagline}
                      </p>
                    </div>

                    {/* Color Dots */}
                    <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
                      <span className="w-3.5 h-3.5 rounded-full border border-black" style={{ backgroundColor: preset.theme.primary }} />
                      <span className="w-3.5 h-3.5 rounded-full border border-black" style={{ backgroundColor: preset.theme.secondary }} />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-500">
                      {preset.contact.phone}
                    </span>
                    <button
                      id={`apply-preset-${key}-btn`}
                      onClick={() => handleApplyPreset(key as PresetKey)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500 hover:bg-amber-400 text-black shadow-md'
                      }`}
                    >
                      {isSelected ? 'ACTIVE PRESET' : 'APPLY THIS GYM'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB TAB 3: THEME COLORS & STYLING */}
      {activeSubTab === 'colors' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <h3 className="text-base font-black text-white uppercase tracking-tight">
              Theme Palette & Color Variables
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Changes update CSS root variables dynamically. Test different hues to match your gym's real interior and brand guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Primary Accent Color */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Primary Brand Accent Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="theme-primary-color-picker"
                  type="color"
                  value={config.theme.primary}
                  onChange={(e) => {
                    const updated = { ...config, theme: { ...config.theme, primary: e.target.value } };
                    setConfig(updated);
                    gymConfigStore.updateConfig(updated);
                  }}
                  className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0"
                />
                <input
                  id="theme-primary-hex-input"
                  type="text"
                  value={config.theme.primary}
                  onChange={(e) => {
                    const updated = { ...config, theme: { ...config.theme, primary: e.target.value } };
                    setConfig(updated);
                    gymConfigStore.updateConfig(updated);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-sm uppercase"
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-2">
                Used for main CTA buttons, badges, highlights, and borders.
              </p>
            </div>

            {/* Secondary Accent */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Secondary Accent Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="theme-secondary-color-picker"
                  type="color"
                  value={config.theme.secondary}
                  onChange={(e) => {
                    const updated = { ...config, theme: { ...config.theme, secondary: e.target.value } };
                    setConfig(updated);
                    gymConfigStore.updateConfig(updated);
                  }}
                  className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0"
                />
                <input
                  id="theme-secondary-hex-input"
                  type="text"
                  value={config.theme.secondary}
                  onChange={(e) => {
                    const updated = { ...config, theme: { ...config.theme, secondary: e.target.value } };
                    setConfig(updated);
                    gymConfigStore.updateConfig(updated);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-sm uppercase"
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-2">
                Used for gradient transitions, secondary tags, and hover rings.
              </p>
            </div>
          </div>

          {/* Quick Preset Color Swatches */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Popular Gym Palettes:
            </label>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'KSG Gold', p: '#eab308', s: '#ca8a04' },
                { name: 'Titan Orange', p: '#f97316', s: '#ea580c' },
                { name: 'Neon Lime', p: '#84cc16', s: '#65a30d' },
                { name: 'Cyber Cyan', p: '#06b6d4', s: '#0891b2' },
                { name: 'Crimson Red', p: '#ef4444', s: '#dc2626' },
                { name: 'Electric Emerald', p: '#10b981', s: '#059669' },
              ].map((swatch) => (
                <button
                  key={swatch.name}
                  onClick={() => {
                    soundManager.playClick();
                    const updated = { ...config, theme: { ...config.theme, primary: swatch.p, secondary: swatch.s } };
                    setConfig(updated);
                    gymConfigStore.updateConfig(updated);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 flex items-center gap-2 text-xs text-zinc-300 cursor-pointer"
                >
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: swatch.p }} />
                  <span>{swatch.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 4: HERO BANNER & STATS */}
      {activeSubTab === 'hero' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <h3 className="text-base font-black text-white uppercase tracking-tight">
              Hero Section Copy & Stats
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Customize the above-the-fold headline, background photo, and performance metric boxes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Top Pill Badge
              </label>
              <input
                id="hero-badge-input"
                type="text"
                value={config.hero.badge}
                onChange={(e) => setConfig({
                  ...config,
                  hero: { ...config.hero, badge: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Headline (First Line)
              </label>
              <input
                id="hero-title-main-input"
                type="text"
                value={config.hero.titleMain}
                onChange={(e) => setConfig({
                  ...config,
                  hero: { ...config.hero, titleMain: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Headline Highlight (Gold Gradient)
              </label>
              <input
                id="hero-title-highlight-input"
                type="text"
                value={config.hero.titleHighlight}
                onChange={(e) => setConfig({
                  ...config,
                  hero: { ...config.hero, titleHighlight: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-amber-400 text-sm outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Primary CTA Button Text
              </label>
              <input
                id="hero-primary-cta-input"
                type="text"
                value={config.hero.primaryCtaText}
                onChange={(e) => setConfig({
                  ...config,
                  hero: { ...config.hero, primaryCtaText: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Hero Subtitle Paragraph
            </label>
            <textarea
              id="hero-subtitle-input"
              rows={2}
              value={config.hero.subtitle}
              onChange={(e) => setConfig({
                ...config,
                hero: { ...config.hero, subtitle: e.target.value }
              })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
              Hero Background Image URL
            </label>
            <input
              id="hero-bg-image-input"
              type="text"
              value={config.hero.backgroundImage}
              onChange={(e) => setConfig({
                ...config,
                hero: { ...config.hero, backgroundImage: e.target.value }
              })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm font-mono outline-none"
            />
          </div>
        </div>
      )}

      {/* SUB TAB 5: CONTACT & GOOGLE MAPS */}
      {activeSubTab === 'contact' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <h3 className="text-base font-black text-white uppercase tracking-tight">
              Location, Contact Info & Google Maps
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Displayed in the footer, contact page, and map direction triggers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Primary Phone Number
              </label>
              <input
                id="contact-phone-input"
                type="text"
                value={config.contact.phone}
                onChange={(e) => setConfig({
                  ...config,
                  contact: { ...config.contact, phone: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Official Email Address
              </label>
              <input
                id="contact-email-input"
                type="email"
                value={config.contact.email}
                onChange={(e) => setConfig({
                  ...config,
                  contact: { ...config.contact, email: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Street Address & Building
              </label>
              <input
                id="contact-address-input"
                type="text"
                value={config.contact.address}
                onChange={(e) => setConfig({
                  ...config,
                  contact: { ...config.contact, address: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Landmark / Floor
              </label>
              <input
                id="contact-landmark-input"
                type="text"
                value={config.contact.landmark}
                onChange={(e) => setConfig({
                  ...config,
                  contact: { ...config.contact, landmark: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                City
              </label>
              <input
                id="contact-city-input"
                type="text"
                value={config.contact.city}
                onChange={(e) => setConfig({
                  ...config,
                  contact: { ...config.contact, city: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                State & Pincode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  id="contact-state-input"
                  type="text"
                  placeholder="State"
                  value={config.contact.state}
                  onChange={(e) => setConfig({
                    ...config,
                    contact: { ...config.contact, state: e.target.value }
                  })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
                />
                <input
                  id="contact-pincode-input"
                  type="text"
                  placeholder="Pincode"
                  value={config.contact.pincode}
                  onChange={(e) => setConfig({
                    ...config,
                    contact: { ...config.contact, pincode: e.target.value }
                  })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-zinc-800">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Weekday Working Hours
              </label>
              <input
                id="contact-weekday-hours-input"
                type="text"
                value={config.contact.workingHours.weekdays}
                onChange={(e) => setConfig({
                  ...config,
                  contact: {
                    ...config.contact,
                    workingHours: { ...config.contact.workingHours, weekdays: e.target.value }
                  }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Sunday / Weekend Hours
              </label>
              <input
                id="contact-sunday-hours-input"
                type="text"
                value={config.contact.workingHours.sunday}
                onChange={(e) => setConfig({
                  ...config,
                  contact: {
                    ...config.contact,
                    workingHours: { ...config.contact.workingHours, sunday: e.target.value }
                  }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 6: WHATSAPP AUTOMATION */}
      {activeSubTab === 'whatsapp' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <h3 className="text-base font-black text-white uppercase tracking-tight">
              WhatsApp Direct Routing
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Configure phone number and pre-filled message templates that launch when users click WhatsApp CTA buttons.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                WhatsApp Phone Number (with Country Code)
              </label>
              <input
                id="whatsapp-number-input"
                type="text"
                placeholder="e.g. 919876543210"
                value={config.whatsapp.number}
                onChange={(e) => setConfig({
                  ...config,
                  whatsapp: { ...config.whatsapp, number: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-emerald-400 font-mono text-sm outline-none font-bold"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                Enter digits without '+' or spaces for direct wa.me routing.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Default Inquiry Template
              </label>
              <textarea
                id="whatsapp-default-message-input"
                rows={3}
                value={config.whatsapp.defaultMessage}
                onChange={(e) => setConfig({
                  ...config,
                  whatsapp: { ...config.whatsapp, defaultMessage: e.target.value }
                })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Action Footer */}
      <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
        <button
          id="customizer-reset-all-btn"
          onClick={handleReset}
          className="px-4 py-2 rounded-xl text-zinc-400 hover:text-red-400 text-xs font-bold uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Defaults</span>
        </button>

        <button
          id="customizer-bottom-save-btn"
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer transition-all hover:scale-105"
        >
          <Save className="w-4 h-4" />
          <span>SAVE ALL CHANGES</span>
        </button>
      </div>
    </div>
  );
};
