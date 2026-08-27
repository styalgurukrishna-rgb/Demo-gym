import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Tag, 
  Tags, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Copy, 
  CheckCheck, 
  Sparkles, 
  Globe, 
  ExternalLink, 
  HelpCircle, 
  ArrowUp, 
  ArrowDown, 
  Layers, 
  FileText, 
  AlertCircle,
  BarChart2,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { GymConfig, SeoConfig } from '../../types';
import { gymConfigStore } from '../../services/gymConfigStore';
import { soundManager } from '../common/SoundEffects';

interface SeoKeywordsManagerSectionProps {
  config: GymConfig;
  onChange: (updatedConfig: GymConfig) => void;
}

const POPULAR_KEYWORD_SUGGESTIONS = [
  {
    category: 'Local Search & Discovery',
    keywords: [
      'gym near me',
      'best fitness center',
      '24/7 luxury gym',
      'strength training studio',
      'modern gym with certified trainers'
    ]
  },
  {
    category: 'Equipment & Strength Rigs',
    keywords: [
      'olympic weightlifting',
      'powerlifting platforms',
      'crossfit training box',
      'squat racks and bumper plates',
      'biomechanics strength machines'
    ]
  },
  {
    category: 'Coaching & Body Transformation',
    keywords: [
      'certified personal trainer',
      'custom diet and workout plan',
      'fat loss transformation program',
      'muscle building coaching',
      'sports conditioning specialist'
    ]
  },
  {
    category: 'Trials & Membership Offers',
    keywords: [
      'free 1-day gym pass',
      'free trial workout session',
      'annual gym membership discount',
      'vip gym tour booking',
      'student fitness membership'
    ]
  }
];

export const SeoKeywordsManagerSection: React.FC<SeoKeywordsManagerSectionProps> = ({
  config,
  onChange
}) => {
  const seo: SeoConfig = config.seo || {
    metaTitle: `${config.brand.gymName || 'KSG DEMO GYM'} | ${config.brand.tagline || 'Transform Your Body'}`,
    metaDescription: `${config.brand.gymName || 'KSG DEMO GYM'} is a premier athletic performance sanctuary with Olympic equipment and certified coaching.`,
    keywords: [
      'gym in bangalore',
      'luxury fitness sanctuary',
      'olympic weightlifting',
      'personal training bangalore',
      'strength and conditioning',
      'body transformation program',
      '24/7 gym access',
      'crossfit training studio'
    ],
    ogImage: config.hero.heroImage || '',
    canonicalUrl: '',
    author: config.brand.gymName || 'KSG Fitness Lab',
    robots: 'index, follow'
  };

  const [newKeywordInput, setNewKeywordInput] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkTextInput, setBulkTextInput] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => {
      setActionNotice(null);
    }, 3000);
  };

  const updateSeoData = (partialSeo: Partial<SeoConfig>) => {
    const updatedSeo: SeoConfig = {
      ...seo,
      ...partialSeo
    };
    const updatedConfig: GymConfig = {
      ...config,
      seo: updatedSeo
    };
    onChange(updatedConfig);
    gymConfigStore.updateConfig(updatedConfig);
  };

  // Add single or comma-separated keyword(s)
  const handleAddKeyword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newKeywordInput.trim()) return;

    // Support comma-separated batch entry
    const rawTokens = newKeywordInput.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    const existingKeywords = seo.keywords || [];
    const lowerExisting = existingKeywords.map(k => k.toLowerCase());

    const toAdd: string[] = [];
    for (const token of rawTokens) {
      if (!lowerExisting.includes(token) && !toAdd.includes(token)) {
        toAdd.push(token);
      }
    }

    if (toAdd.length === 0) {
      soundManager.playError();
      showNotice('Keyword(s) already exist in your SEO list.');
      return;
    }

    soundManager.playSuccess();
    const newKeywordsList = [...existingKeywords, ...toAdd];
    updateSeoData({ keywords: newKeywordsList });
    setNewKeywordInput('');
    showNotice(`Added ${toAdd.length} new SEO keyword${toAdd.length > 1 ? 's' : ''}!`);
  };

  // Quick suggestion click
  const handleAddSuggestion = (kw: string) => {
    const existingKeywords = seo.keywords || [];
    if (existingKeywords.some(k => k.toLowerCase() === kw.toLowerCase())) {
      soundManager.playHover();
      showNotice(`"${kw}" is already in your keywords list.`);
      return;
    }
    soundManager.playClick();
    const newKeywordsList = [...existingKeywords, kw];
    updateSeoData({ keywords: newKeywordsList });
    showNotice(`Added keyword: "${kw}"`);
  };

  // Start Inline Edit
  const handleStartEdit = (idx: number, currentText: string) => {
    soundManager.playClick();
    setEditingIndex(idx);
    setEditingValue(currentText);
  };

  // Save Inline Edit
  const handleSaveEdit = (idx: number) => {
    const trimmed = editingValue.trim().toLowerCase();
    if (!trimmed) {
      handleDeleteKeyword(idx);
      return;
    }

    const currentKeywords = [...(seo.keywords || [])];
    // Check if another keyword already has this name
    const conflict = currentKeywords.some((k, i) => i !== idx && k.toLowerCase() === trimmed);
    if (conflict) {
      soundManager.playError();
      showNotice(`Keyword "${trimmed}" already exists.`);
      return;
    }

    soundManager.playSuccess();
    currentKeywords[idx] = trimmed;
    updateSeoData({ keywords: currentKeywords });
    setEditingIndex(null);
    setEditingValue('');
    showNotice('Keyword updated successfully!');
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingValue('');
  };

  // Delete Keyword
  const handleDeleteKeyword = (idx: number) => {
    soundManager.playClick();
    const currentKeywords = [...(seo.keywords || [])];
    const removedItem = currentKeywords[idx];
    currentKeywords.splice(idx, 1);
    updateSeoData({ keywords: currentKeywords });
    showNotice(`Removed keyword: "${removedItem}"`);
  };

  // Move Keyword Up
  const handleMoveUp = (idx: number) => {
    if (idx === 0) return;
    soundManager.playClick();
    const currentKeywords = [...(seo.keywords || [])];
    const temp = currentKeywords[idx - 1];
    currentKeywords[idx - 1] = currentKeywords[idx];
    currentKeywords[idx] = temp;
    updateSeoData({ keywords: currentKeywords });
  };

  // Move Keyword Down
  const handleMoveDown = (idx: number) => {
    const currentKeywords = [...(seo.keywords || [])];
    if (idx === currentKeywords.length - 1) return;
    soundManager.playClick();
    const temp = currentKeywords[idx + 1];
    currentKeywords[idx + 1] = currentKeywords[idx];
    currentKeywords[idx] = temp;
    updateSeoData({ keywords: currentKeywords });
  };

  // Copy All Keywords (CSV)
  const handleCopyAll = () => {
    const keywordsList = seo.keywords || [];
    const text = keywordsList.join(', ');
    navigator.clipboard.writeText(text);
    soundManager.playSuccess();
    setCopiedAll(true);
    showNotice('All SEO keywords copied to clipboard as comma-separated text!');
    setTimeout(() => setCopiedAll(false), 3000);
  };

  // Bulk Import
  const handleBulkImport = () => {
    if (!bulkTextInput.trim()) return;
    const lines = bulkTextInput.split(/[\n,]+/).map(s => s.trim().toLowerCase()).filter(Boolean);
    const existingKeywords = seo.keywords || [];
    const lowerExisting = existingKeywords.map(k => k.toLowerCase());

    const toAdd: string[] = [];
    for (const item of lines) {
      if (!lowerExisting.includes(item) && !toAdd.includes(item)) {
        toAdd.push(item);
      }
    }

    if (toAdd.length === 0) {
      soundManager.playError();
      showNotice('No new unique keywords found to import.');
      return;
    }

    soundManager.playSuccess();
    const newKeywordsList = [...existingKeywords, ...toAdd];
    updateSeoData({ keywords: newKeywordsList });
    setBulkTextInput('');
    setShowBulkModal(false);
    showNotice(`Successfully imported ${toAdd.length} new keywords!`);
  };

  // Filtered keywords based on search
  const allKeywords = seo.keywords || [];
  const filteredKeywords = allKeywords.filter(k => 
    k.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // SEO Health Calculations
  const keywordCount = allKeywords.length;
  const isOptimalKeywordCount = keywordCount >= 6 && keywordCount <= 20;
  const titleLength = (seo.metaTitle || '').length;
  const isOptimalTitle = titleLength >= 40 && titleLength <= 70;
  const descLength = (seo.metaDescription || '').length;
  const isOptimalDesc = descLength >= 120 && descLength <= 165;

  return (
    <div className="space-y-6">
      {/* SECTION HEADER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>Search Engine Visibility</span>
              </span>
              <span className="text-xs text-zinc-500">• Meta Tags & Google SERP</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1 flex items-center gap-2">
              SEO & Meta Keywords Manager
            </h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
              Optimize how your gym ranks on Google, Bing, and local search queries by defining high-intent meta keywords, social Open Graph previews, and indexing tags.
            </p>
          </div>

          {/* Quick Header Metric Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center gap-2">
              <Tags className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-[10px] text-zinc-500 uppercase font-mono">Keywords</div>
                <div className="text-xs font-bold text-white font-mono">{keywordCount} Active</div>
              </div>
            </div>

            <div className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-[10px] text-zinc-500 uppercase font-mono">SEO Status</div>
                <div className="text-xs font-bold text-emerald-400">
                  {isOptimalKeywordCount && isOptimalTitle ? 'Optimized' : 'Needs Review'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NOTIFICATION TOAST */}
        <AnimatePresence>
          {actionNotice && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{actionNotice}</span>
              </div>
              <button 
                onClick={() => setActionNotice(null)} 
                className="text-zinc-400 hover:text-white text-xs cursor-pointer px-1"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GOOGLE LIVE SEARCH RESULT SNIPPET (SERP PREVIEW) */}
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span>Live Google Search Snippet Preview</span>
            </div>
            <span className="text-[11px] text-zinc-500 font-mono">Desktop & Mobile View</span>
          </div>

          <div className="p-4 rounded-xl bg-[#202124] border border-zinc-800 text-left font-sans shadow-inner space-y-1.5">
            {/* Google URL Line */}
            <div className="flex items-center gap-2 text-xs text-[#bdc1c6] truncate">
              <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold">
                G
              </div>
              <span className="truncate">https://ksgdemogym.com › {config.contact.city?.toLowerCase() || 'fitness'}</span>
              <span className="text-zinc-500">⋮</span>
            </div>

            {/* Google Title */}
            <h4 className="text-base sm:text-lg font-medium text-[#8ab4f8] hover:underline cursor-pointer truncate">
              {seo.metaTitle || `${config.brand.gymName || 'KSG DEMO GYM'} | Transform Your Body`}
            </h4>

            {/* Google Description */}
            <p className="text-xs text-[#bdc1c6] line-clamp-2 leading-relaxed">
              {seo.metaDescription || `${config.brand.gymName} offers certified coaching, Olympic powerlifting rigs, and 24/7 membership access in ${config.contact.city || 'your area'}.`}
            </p>

            {/* Google Rich Snippet Rating */}
            <div className="flex items-center gap-2 text-[11px] text-[#9aa0a6] pt-1">
              <span className="text-amber-400">★★★★★</span>
              <span>4.9 (480+ Reviews)</span>
              <span>•</span>
              <span className="text-emerald-400">Open 24/7</span>
              <span>•</span>
              <span>{config.contact.city || 'Bangalore'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CORE KEYWORDS INTERACTIVE BUILDER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div>
            <h4 className="text-base font-black text-white uppercase tracking-tight flex items-center gap-2">
              <Tags className="w-4 h-4 text-amber-400" />
              <span>Target Meta Keywords ({keywordCount})</span>
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Add phrases and localized queries your potential gym members search on Google to find you.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            <button
              id="bulk-import-keywords-btn"
              type="button"
              onClick={() => {
                soundManager.playClick();
                setShowBulkModal(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Bulk Paste / Import</span>
            </button>

            <button
              id="copy-all-keywords-btn"
              type="button"
              onClick={handleCopyAll}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copiedAll ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Copy CSV</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* INPUT: ADD SINGLE OR COMMA-SEPARATED KEYWORD */}
        <form onSubmit={handleAddKeyword} className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
            Add New Meta Keyword(s)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="new-meta-keyword-input"
                type="text"
                value={newKeywordInput}
                onChange={(e) => setNewKeywordInput(e.target.value)}
                placeholder="Type keyword (e.g., 'powerlifting gym patna', '24/7 fitness') or paste comma-separated list..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none font-medium placeholder:text-zinc-600"
              />
            </div>
            <button
              id="add-meta-keyword-btn"
              type="submit"
              disabled={!newKeywordInput.trim()}
              className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                newKeywordInput.trim()
                  ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 cursor-pointer hover:scale-105 active:scale-95'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Keyword</span>
            </button>
          </div>
          <p className="text-[11px] text-zinc-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Tip: You can paste multiple keywords separated by commas into this box and click Add.</span>
          </p>
        </form>

        {/* 1-CLICK POPULAR KEYWORD SUGGESTIONS */}
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>High-Converting Gym SEO Suggestions</span>
            </span>
            <span className="text-[11px] text-zinc-500">Click any tag to add instantly</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {POPULAR_KEYWORD_SUGGESTIONS.map((group) => (
              <div key={group.category} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-2">
                <div className="text-[11px] font-mono font-bold text-zinc-400 uppercase">
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.keywords.map((kw) => {
                    const isAdded = allKeywords.some(k => k.toLowerCase() === kw.toLowerCase());
                    return (
                      <button
                        key={kw}
                        type="button"
                        onClick={() => handleAddSuggestion(kw)}
                        disabled={isAdded}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                          isAdded
                            ? 'bg-zinc-800/40 text-zinc-600 border border-zinc-800/40 cursor-default'
                            : 'bg-zinc-900 hover:bg-amber-500/20 text-zinc-300 hover:text-amber-300 border border-zinc-700/60 hover:border-amber-500/40'
                        }`}
                      >
                        {isAdded ? (
                          <Check className="w-3 h-3 text-emerald-500/70" />
                        ) : (
                          <Plus className="w-3 h-3 text-amber-400" />
                        )}
                        <span>{kw}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KEYWORDS FILTER & LIST */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <span>Active Keywords ({filteredKeywords.length} of {allKeywords.length})</span>
            </div>

            {/* Keyword Search Filter */}
            {allKeywords.length > 5 && (
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter keywords..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-xs outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </div>

          {/* KEYWORD TILES / ROWS */}
          {allKeywords.length === 0 ? (
            <div className="p-8 rounded-2xl bg-zinc-950 border border-dashed border-zinc-800 text-center space-y-2">
              <Tags className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-sm font-bold text-zinc-300">No meta keywords configured yet</p>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Add target keywords above or click the popular fitness suggestions to help search engines index your gym.
              </p>
            </div>
          ) : filteredKeywords.length === 0 ? (
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-center text-xs text-zinc-400">
              No keywords match "{searchQuery}".
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {filteredKeywords.map((keyword, index) => {
                const globalIndex = allKeywords.indexOf(keyword);
                const isEditing = editingIndex === globalIndex;
                const charLength = keyword.length;
                const wordCount = keyword.trim().split(/\s+/).length;

                return (
                  <div
                    key={`${keyword}-${globalIndex}`}
                    id={`keyword-card-${globalIndex}`}
                    className={`p-3 rounded-2xl border transition-all flex flex-col justify-between gap-2 ${
                      isEditing
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/5'
                        : 'bg-zinc-950 hover:bg-zinc-950/90 border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    {isEditing ? (
                      /* INLINE EDIT FORM */
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                          Edit Keyword #{globalIndex + 1}
                        </div>
                        <input
                          id={`edit-keyword-input-${globalIndex}`}
                          type="text"
                          autoFocus
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit(globalIndex);
                            if (e.key === 'Escape') handleCancelEdit();
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-amber-500 text-white text-xs outline-none font-bold"
                        />
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                            <span>Cancel</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(globalIndex)}
                            className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-[11px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3 h-3" />
                            <span>Save</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* NORMAL DISPLAY */
                      <>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500 font-mono text-[10px] font-bold shrink-0">
                              #{globalIndex + 1}
                            </span>
                            <span className="text-xs font-bold text-zinc-100 truncate">
                              {keyword}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              id={`edit-kw-btn-${globalIndex}`}
                              type="button"
                              title="Edit keyword"
                              onClick={() => handleStartEdit(globalIndex, keyword)}
                              className="p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              id={`delete-kw-btn-${globalIndex}`}
                              type="button"
                              title="Delete keyword"
                              onClick={() => handleDeleteKeyword(globalIndex)}
                              className="p-1 rounded-lg bg-zinc-900 hover:bg-red-950/60 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Keyword metadata footer */}
                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-zinc-900 pt-1.5 mt-0.5">
                          <span>{wordCount} {wordCount === 1 ? 'word' : 'words'} • {charLength} chars</span>

                          <div className="flex items-center gap-1">
                            {globalIndex > 0 && (
                              <button
                                type="button"
                                onClick={() => handleMoveUp(globalIndex)}
                                title="Move Up in priority"
                                className="hover:text-zinc-300 transition-colors"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                            )}
                            {globalIndex < allKeywords.length - 1 && (
                              <button
                                type="button"
                                onClick={() => handleMoveDown(globalIndex)}
                                title="Move Down in priority"
                                className="hover:text-zinc-300 transition-colors"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* PAGE TITLE, DESCRIPTION & SEARCH ENGINE DIRECTIVES */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
        <div className="border-b border-zinc-800 pb-4">
          <h4 className="text-base font-black text-white uppercase tracking-tight flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Page Title, Meta Description & Indexing Tags</span>
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            Configure how your primary landing page appears in browser tabs and web crawlers.
          </p>
        </div>

        <div className="space-y-5">
          {/* META TITLE */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                SEO Meta Title Tag (`&lt;title&gt;`)
              </label>
              <span className={`text-[11px] font-mono font-bold ${
                isOptimalTitle ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {titleLength}/60 chars {isOptimalTitle ? '(Optimal)' : '(50-60 recommended)'}
              </span>
            </div>
            <input
              id="seo-meta-title-input"
              type="text"
              value={seo.metaTitle || ''}
              onChange={(e) => updateSeoData({ metaTitle: e.target.value })}
              placeholder="e.g. KSG DEMO GYM | Transform Your Body. Upgrade Your Life."
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none font-bold"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              Include your gym name, primary location/city, and main differentiator.
            </p>
          </div>

          {/* META DESCRIPTION */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                SEO Meta Description Tag (`&lt;meta name="description"&gt;`)
              </label>
              <span className={`text-[11px] font-mono font-bold ${
                isOptimalDesc ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {descLength}/160 chars {isOptimalDesc ? '(Optimal)' : '(120-160 recommended)'}
              </span>
            </div>
            <textarea
              id="seo-meta-desc-input"
              rows={3}
              value={seo.metaDescription || ''}
              onChange={(e) => updateSeoData({ metaDescription: e.target.value })}
              placeholder="Provide a compelling 2-sentence summary of your fitness sanctuary to entice clicks from Google search results."
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {/* META AUTHOR */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Meta Author / Publishing Organization
              </label>
              <input
                id="seo-meta-author-input"
                type="text"
                value={seo.author || ''}
                onChange={(e) => updateSeoData({ author: e.target.value })}
                placeholder="e.g. KSG Athletic Performance Lab"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none"
              />
            </div>

            {/* ROBOTS DIRECTIVE */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Search Engine Crawler Directive (Robots)
              </label>
              <select
                id="seo-robots-select"
                value={seo.robots || 'index, follow'}
                onChange={(e) => updateSeoData({ robots: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm outline-none cursor-pointer"
              >
                <option value="index, follow">index, follow (Standard - Fully Index Site)</option>
                <option value="noindex, follow">noindex, follow (Hide from search, follow links)</option>
                <option value="noindex, nofollow">noindex, nofollow (Private / Staging Mode)</option>
              </select>
            </div>

            {/* OPEN GRAPH SOCIAL SHARE IMAGE */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                Open Graph Social Share Image URL (WhatsApp & Facebook Preview)
              </label>
              <input
                id="seo-og-image-input"
                type="text"
                value={seo.ogImage || ''}
                onChange={(e) => updateSeoData({ ogImage: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-sm font-mono outline-none"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                Image shown when members share your gym website link on WhatsApp, Instagram DMs, or Facebook.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BULK IMPORT MODAL DIALOG */}
      <AnimatePresence>
        {showBulkModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-black text-white uppercase">
                    Bulk Import Meta Keywords
                  </h3>
                </div>
                <button
                  onClick={() => setShowBulkModal(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 uppercase">
                  Paste Keywords (Separated by Commas or New Lines)
                </label>
                <textarea
                  rows={6}
                  value={bulkTextInput}
                  onChange={(e) => setBulkTextInput(e.target.value)}
                  placeholder={`gym in bangalore\nolympic weightlifting studio\npersonal trainer bangalore\nstrength and conditioning\n24/7 fitness club`}
                  className="w-full p-4 rounded-2xl bg-zinc-950 border border-zinc-800 focus:border-amber-500 text-white text-xs font-mono outline-none resize-none leading-relaxed"
                />
                <p className="text-[11px] text-zinc-500">
                  Duplicates and empty lines will be automatically filtered out.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleBulkImport}
                  disabled={!bulkTextInput.trim()}
                  className={`px-5 py-2 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 ${
                    bulkTextInput.trim()
                      ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-md cursor-pointer'
                      : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Import All Keywords</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
