'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Plus, Trash2, Upload } from 'lucide-react';
import { ImagePreview } from '@/components/admin/ImagePreview';

const TABS = ['General', 'Itinerary', 'Pricing', 'Departures', 'Gallery', 'SEO'] as const;
type Tab = (typeof TABS)[number];
const DIFFICULTY_OPTIONS = ['easy', 'beginner', 'moderate', 'advanced', 'expert'];

interface PricingItem { label: string; price: number; description?: string }
interface ItineraryDay { day: number; title: string; description: string; overnight?: string; distance?: string; altitude?: string; highlights?: string[]; image?: string }
interface Departure { start_date: string; end_date: string; available_seats: number; booked_seats: number; status: string }

export default function EditTripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === 'new';

  const [tab, setTab] = useState<Tab>('General');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [categories, setCategories] = useState<any[]>([]);

  // Multi-select tags state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('');
  const [badge, setBadge] = useState('');
  const [durationDays, setDurationDays] = useState(1);
  const [durationNights, setDurationNights] = useState(0);
  const [maxAltitude, setMaxAltitude] = useState(0);
  const [difficulty, setDifficulty] = useState('moderate');
  const [groupSize, setGroupSize] = useState('');
  const [season, setSeason] = useState('');
  const [region, setRegion] = useState('');
  const [route, setRoute] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [totalDistance, setTotalDistance] = useState('');
  const [terrain, setTerrain] = useState('');
  const [bestFor, setBestFor] = useState('');
  const [mealsIncluded, setMealsIncluded] = useState('');
  const [rating, setRating] = useState(4.5);
  const [reviewCount, setReviewCount] = useState(0);
  const [highlightsStr, setHighlightsStr] = useState('');
  const [inclusionsStr, setInclusionsStr] = useState('');
  const [exclusionsStr, setExclusionsStr] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [coverImage, setCoverImage] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywordsStr, setKeywordsStr] = useState('');
  const [pricing, setPricing] = useState<PricingItem[]>([]);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (!isNew) fetchTrip();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      setCategories(await res.json() || []);
    } catch {}
  };

  const fetchTrip = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/trips/${id}`);
      const t = await res.json();
      setTitle(t.title || ''); setSlug(t.slug || ''); setTagline(t.tagline || '');
      setDescription(t.description || ''); setCategoryId(t.category_id || '');
      setCategoryLabel(t.category_label || ''); setBadge(t.badge || '');
      setDurationDays(t.duration_days || 1); setDurationNights(t.duration_nights || 0);
      setMaxAltitude(t.max_altitude_ft || 0); setDifficulty(t.difficulty || 'moderate');
      setGroupSize(t.group_size || ''); setSeason(t.season || ''); setRegion(t.region || '');
      setRoute(t.route || ''); setStartLocation(t.start_location || '');
      setEndLocation(t.end_location || ''); setTotalDistance(t.total_distance || '');
      setTerrain(t.terrain || ''); setBestFor(t.best_for || '');
      setMealsIncluded(t.meals_included || '');
      setRating(t.rating || 4.5); setReviewCount(t.review_count || 0);
      setHighlightsStr((t.highlights || []).join('\n'));
      setInclusionsStr((t.inclusions || []).join('\n'));
      setExclusionsStr((t.exclusions || []).join('\n'));
      setIsFeatured(t.is_featured || false); setIsActive(t.is_active ?? true);
      setCoverImage(t.cover_image || ''); setHeroImage(t.hero_image || '');
      setGalleryImages(t.gallery_images || []);
      setKeywordsStr((t.keywords || []).join(', '));
      setMetaTitle(t.meta_title || ''); setMetaDescription(t.meta_description || '');
      setPricing(
        (t.trip_pricing || []).sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
          .map((p: any) => ({ label: p.label, price: p.price, description: p.description || '' }))
      );
      setItinerary(
        (t.trip_itinerary || []).sort((a: any, b: any) => a.day - b.day)
          .map((d: any) => ({ day: d.day, title: d.title, description: d.description || '', overnight: d.overnight || '', distance: d.distance || '', altitude: d.altitude || '', highlights: d.highlights || [], image: d.image || '' }))
      );
      setDepartures(
        (t.trip_departures || []).map((d: any) => ({ start_date: d.start_date, end_date: d.end_date, available_seats: d.available_seats || 20, booked_seats: d.booked_seats || 0, status: d.status || 'available' }))
      );

      // Fetch Tags
      try {
        const tagsRes = await fetch(`/api/admin/trip-tags?trip_id=${t.id}`);
        if (tagsRes.ok) {
          const tags = await tagsRes.json();
          setSelectedCategories(tags.filter((tag: any) => tag.tag_type === 'category').map((tag: any) => tag.tag_value));
          setSelectedSubcategories(tags.filter((tag: any) => tag.tag_type === 'subcategory').map((tag: any) => tag.tag_value));
        }
      } catch (err) { console.error('Failed to load tags:', err); }

    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const uploadImage = async (file: File, setter: (url: string) => void) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      setter(url);
    } catch (err: any) { alert('Upload failed: ' + err.message); }
    finally { setUploading(false); }
  };

  const deleteImage = async (url: string) => {
    if (!confirm('Permanently delete this image?')) return false;
    try {
      await fetch('/api/admin/r2-delete', { method: 'POST', body: JSON.stringify({ url }), headers: { 'Content-Type': 'application/json' }});
      return true;
    } catch (e) { alert('Failed to delete from storage'); return false; }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body: any = {
        title, slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        tagline, description, category_id: categoryId || null, category_label: categoryLabel, badge,
        duration_days: durationDays, duration_nights: durationNights, max_altitude_ft: maxAltitude,
        difficulty, group_size: groupSize, season, region, route, start_location: startLocation,
        end_location: endLocation, total_distance: totalDistance, terrain, best_for: bestFor,
        meals_included: mealsIncluded, rating, review_count: reviewCount,
        highlights: highlightsStr.split('\n').map(s => s.trim()).filter(Boolean),
        inclusions: inclusionsStr.split('\n').map(s => s.trim()).filter(Boolean),
        exclusions: exclusionsStr.split('\n').map(s => s.trim()).filter(Boolean),
        is_featured: isFeatured, is_active: isActive, cover_image: coverImage, hero_image: heroImage,
        gallery_images: galleryImages,
        keywords: keywordsStr.split(',').map(s => s.trim()).filter(Boolean),
        meta_title: metaTitle, meta_description: metaDescription,
        pricing, itinerary, departures,
      };
      const url = isNew ? '/api/admin/trips' : `/api/admin/trips/${id}`;
      const res = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || 'Save failed'); }
      const saved = await res.json();

      // Save tags
      const tripIdToTag = isNew ? saved.id : id;
      await fetch('/api/admin/trip-tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trip_id: tripIdToTag,
          categories: selectedCategories,
          subcategories: selectedSubcategories
        })
      });

      if (isNew) { router.push(`/admin/trips/${saved.id}`); } else { alert('Trip saved!'); }
    } catch (err: any) { alert(err.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  const addPricing = () => setPricing([...pricing, { label: '', price: 0 }]);
  const removePricing = (i: number) => setPricing(pricing.filter((_, idx) => idx !== i));
  const updatePricing = (i: number, field: string, val: any) => { const c = [...pricing]; (c[i] as any)[field] = val; setPricing(c); };
  const addItineraryDay = () => setItinerary([...itinerary, { day: itinerary.length + 1, title: '', description: '' }]);
  const removeItineraryDay = (i: number) => setItinerary(itinerary.filter((_, idx) => idx !== i).map((d, idx) => ({ ...d, day: idx + 1 })));
  const updateItinerary = (i: number, field: string, val: any) => { const c = [...itinerary]; (c[i] as any)[field] = val; setItinerary(c); };
  const addDeparture = () => setDepartures([...departures, { start_date: '', end_date: '', available_seats: 20, booked_seats: 0, status: 'available' }]);
  const removeDeparture = (i: number) => setDepartures(departures.filter((_, idx) => idx !== i));
  const updateDeparture = (i: number, field: string, val: any) => { const c = [...departures]; (c[i] as any)[field] = val; setDepartures(c); };

  if (loading) return <div className="p-12 text-center text-slate-400">Loading...</div>;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/trips')} className="p-2 rounded hover:bg-gray-100 text-slate-400 hover:text-slate-700">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">{isNew ? 'New Trip' : 'Edit Trip'}</h1>
            {!isNew && <p className="text-xs text-slate-400 mt-1">/{slug}</p>}
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50">
          <Save size={16} /> {saving ? 'Saving...' : 'Save Trip'}
        </button>
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2.5 text-xs font-medium rounded-md transition-colors ${tab === t ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        {tab === 'General' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Title" required><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="admin-input" /></Field>
              <Field label="Slug"><input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Auto-generated" className="admin-input" /></Field>
            </div>
            <Field label="Tagline"><input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} className="admin-input" /></Field>
            <Field label="Description"><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="admin-input" /></Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Categories" required>
                <div className="flex flex-wrap gap-3 mt-2">
                  {['Domestic', 'International', 'Road Trip'].map(cat => (
                    <label key={cat} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedCategories(prev => [...prev, cat]);
                          else setSelectedCategories(prev => prev.filter(c => c !== cat));
                          // Also set legacy field for backward compatibility
                          if (e.target.checked && !categoryLabel) setCategoryLabel(cat);
                        }}
                        className="rounded text-[#122822] focus:ring-[#122822] w-4 h-4"
                      />
                      <span className="text-sm font-medium">{cat}</span>
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Subcategories (Locations)">
                <div className="flex flex-wrap gap-3 mt-2">
                  {['Leh', 'Spiti', 'Meghalaya', 'Tawang', 'Vietnam', 'Thailand', 'Bali'].map(sub => (
                    <label key={sub} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100">
                      <input 
                        type="checkbox" 
                        checked={selectedSubcategories.includes(sub)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedSubcategories(prev => [...prev, sub]);
                          else setSelectedSubcategories(prev => prev.filter(s => s !== sub));
                        }}
                        className="rounded text-[#122822] focus:ring-[#122822] w-4 h-4"
                      />
                      <span className="text-sm font-medium">{sub}</span>
                    </label>
                  ))}
                </div>
              </Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Badge"><input type="text" value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="e.g. Bestseller" className="admin-input" /></Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Field label="Duration (Days)"><input type="number" value={durationDays} onChange={(e) => setDurationDays(Number(e.target.value))} className="admin-input" /></Field>
              <Field label="Duration (Nights)"><input type="number" value={durationNights} onChange={(e) => setDurationNights(Number(e.target.value))} className="admin-input" /></Field>
              <Field label="Difficulty">
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="admin-input">
                  {DIFFICULTY_OPTIONS.map((d) => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
                </select>
              </Field>
              <Field label="Group Size"><input type="text" value={groupSize} onChange={(e) => setGroupSize(e.target.value)} placeholder="e.g. 6-15" className="admin-input" /></Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Region"><input type="text" value={region} onChange={(e) => setRegion(e.target.value)} className="admin-input" /></Field>
              <Field label="Season"><input type="text" value={season} onChange={(e) => setSeason(e.target.value)} className="admin-input" /></Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Start Location"><input type="text" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} className="admin-input" /></Field>
              <Field label="End Location"><input type="text" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} className="admin-input" /></Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Route"><input type="text" value={route} onChange={(e) => setRoute(e.target.value)} className="admin-input" /></Field>
              <Field label="Total Distance"><input type="text" value={totalDistance} onChange={(e) => setTotalDistance(e.target.value)} className="admin-input" /></Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Field label="Terrain"><input type="text" value={terrain} onChange={(e) => setTerrain(e.target.value)} className="admin-input" /></Field>
              <Field label="Best For"><input type="text" value={bestFor} onChange={(e) => setBestFor(e.target.value)} className="admin-input" /></Field>
              <Field label="Meals Included"><input type="text" value={mealsIncluded} onChange={(e) => setMealsIncluded(e.target.value)} placeholder="e.g. Breakfast & Dinner" className="admin-input" /></Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Cover Image URL">
                <div className="flex gap-2">
                  <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="admin-input flex-1" />
                  <label className={`flex items-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-100 cursor-pointer transition-colors ${uploading ? 'opacity-50' : ''}`}>
                    <Upload size={14} /> Upload
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], setCoverImage)} />
                  </label>
                </div>
                <ImagePreview url={coverImage} />
              </Field>
              <Field label="Hero Image URL">
                <div className="flex gap-2">
                  <input type="text" value={heroImage} onChange={(e) => setHeroImage(e.target.value)} className="admin-input flex-1" />
                  <label className={`flex items-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-100 cursor-pointer transition-colors ${uploading ? 'opacity-50' : ''}`}>
                    <Upload size={14} /> Upload
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], setHeroImage)} />
                  </label>
                </div>
                <ImagePreview url={heroImage} />
              </Field>
            </div>
            <Field label="Highlights (one per line)"><textarea value={highlightsStr} onChange={(e) => setHighlightsStr(e.target.value)} rows={4} className="admin-input" /></Field>
            <Field label="Inclusions (one per line)"><textarea value={inclusionsStr} onChange={(e) => setInclusionsStr(e.target.value)} rows={4} className="admin-input" /></Field>
            <Field label="Exclusions (one per line)"><textarea value={exclusionsStr} onChange={(e) => setExclusionsStr(e.target.value)} rows={4} className="admin-input" /></Field>
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="w-4 h-4 accent-emerald-600" /><span className="text-sm text-slate-700">Featured Trip</span></label>
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-4 h-4 accent-emerald-600" /><span className="text-sm text-slate-700">Active</span></label>
            </div>
          </>
        )}

        {tab === 'Itinerary' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-[family-name:var(--font-heading)] text-slate-800">Day-by-Day Itinerary</h3>
              <button onClick={addItineraryDay} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700"><Plus size={14} /> Add Day</button>
            </div>
            {itinerary.length === 0 && <p className="text-sm text-slate-400">No itinerary days yet.</p>}
            {itinerary.map((day, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-emerald-600">Day {day.day}</span>
                  <button onClick={() => removeItineraryDay(i)} className="p-1.5 rounded hover:bg-red-50 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Title"><input type="text" value={day.title} onChange={(e) => updateItinerary(i, 'title', e.target.value)} className="admin-input" /></Field>
                  <Field label="Overnight"><input type="text" value={day.overnight || ''} onChange={(e) => updateItinerary(i, 'overnight', e.target.value)} className="admin-input" /></Field>
                </div>
                <Field label="Description"><textarea value={day.description} onChange={(e) => updateItinerary(i, 'description', e.target.value)} rows={2} className="admin-input" /></Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Distance"><input type="text" value={day.distance || ''} onChange={(e) => updateItinerary(i, 'distance', e.target.value)} className="admin-input" /></Field>
                  <Field label="Altitude"><input type="text" value={day.altitude || ''} onChange={(e) => updateItinerary(i, 'altitude', e.target.value)} className="admin-input" /></Field>
                </div>
                <Field label="Day Image URL">
                  <div className="flex gap-2">
                    <input type="text" value={day.image || ''} onChange={(e) => updateItinerary(i, 'image', e.target.value)} className="admin-input flex-1" />
                    <label className={`flex items-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-100 cursor-pointer transition-colors ${uploading ? 'opacity-50' : ''}`}>
                      <Upload size={14} /> Upload
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                        e.target.files?.[0] && uploadImage(e.target.files[0], async (url) => {
                          if (day.image) await deleteImage(day.image);
                          updateItinerary(i, 'image', url);
                        })
                      }} />
                    </label>
                  </div>
                  <ImagePreview url={day.image || ''} maxWidth={200} maxHeight={140} />
                </Field>
              </div>
            ))}
          </>
        )}

        {tab === 'Pricing' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-[family-name:var(--font-heading)] text-slate-800">Pricing & Packages</h3>
                <p className="text-xs text-slate-400 mt-1">Add different pricing tiers / packages for this trip. These show on the booking page.</p>
              </div>
              <button onClick={addPricing} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700"><Plus size={14} /> Add Package</button>
            </div>
            {pricing.length === 0 && <p className="text-sm text-slate-400">No pricing packages yet. Add your first pricing tier.</p>}
            {pricing.map((p, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Package {i + 1}</span>
                  <button onClick={() => removePricing(i)} className="p-1.5 rounded hover:bg-red-50 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Package Name" className="md:col-span-1"><input type="text" value={p.label} onChange={(e) => updatePricing(i, 'label', e.target.value)} placeholder="e.g. Solo Rider, Duo, Group of 5" className="admin-input" /></Field>
                  <Field label="Price (₹)"><input type="number" value={p.price} onChange={(e) => updatePricing(i, 'price', Number(e.target.value))} className="admin-input" /></Field>
                  <Field label="Description"><input type="text" value={p.description || ''} onChange={(e) => updatePricing(i, 'description', e.target.value)} placeholder="e.g. Per person twin sharing" className="admin-input" /></Field>
                </div>
              </div>
            ))}
          </>
        )}

        {tab === 'Departures' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-[family-name:var(--font-heading)] text-slate-800">Departure Dates</h3>
              <button onClick={addDeparture} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700"><Plus size={14} /> Add Departure</button>
            </div>
            {departures.length === 0 && <p className="text-sm text-slate-400">No departures yet.</p>}
            {departures.map((d, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <Field label="Start Date"><input type="date" value={d.start_date} onChange={(e) => updateDeparture(i, 'start_date', e.target.value)} className="admin-input" /></Field>
                <Field label="End Date"><input type="date" value={d.end_date} onChange={(e) => updateDeparture(i, 'end_date', e.target.value)} className="admin-input" /></Field>
                <Field label="Seats"><input type="number" value={d.available_seats} onChange={(e) => updateDeparture(i, 'available_seats', Number(e.target.value))} className="admin-input" /></Field>
                <Field label="Status">
                  <select value={d.status} onChange={(e) => updateDeparture(i, 'status', e.target.value)} className="admin-input">
                    <option value="available">Available</option>
                    <option value="filling_fast">Filling Fast</option>
                    <option value="sold_out">Sold Out</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </Field>
                <button onClick={() => removeDeparture(i)} className="p-2.5 rounded hover:bg-red-50 text-red-400 hover:text-red-600 self-end mb-0.5"><Trash2 size={16} /></button>
              </div>
            ))}
          </>
        )}

        {tab === 'Gallery' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-[family-name:var(--font-heading)] text-slate-800">Gallery Images</h3>
              <label className={`flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 cursor-pointer transition-colors ${uploading ? 'opacity-50' : ''}`}>
                <Upload size={14} /> {uploading ? 'Uploading...' : 'Add Image'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  e.target.files?.[0] && uploadImage(e.target.files[0], (url) => setGalleryImages([...galleryImages, url]));
                }} />
              </label>
            </div>
            
            {galleryImages.length === 0 && <p className="text-sm text-slate-400">No gallery images added yet.</p>}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((url, i) => (
                <div key={i} className="group relative aspect-square rounded-xl bg-gray-100 bg-cover bg-center border border-gray-200 overflow-hidden shadow-sm" style={{ backgroundImage: `url(${url})` }}>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <label className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 text-slate-800 text-xs font-medium rounded-md hover:bg-white cursor-pointer backdrop-blur-sm">
                      <Upload size={14} /> Replace
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                        e.target.files?.[0] && uploadImage(e.target.files[0], async (newUrl) => {
                          await deleteImage(url);
                          const newImages = [...galleryImages];
                          newImages[i] = newUrl;
                          setGalleryImages(newImages);
                        });
                      }} />
                    </label>
                    <button type="button" onClick={async () => {
                      if (await deleteImage(url)) {
                        setGalleryImages(galleryImages.filter((_, idx) => idx !== i));
                      }
                    }} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/90 text-white text-xs font-medium rounded-md hover:bg-red-600 backdrop-blur-sm">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'SEO' && (
          <>
            <h3 className="text-xl font-[family-name:var(--font-heading)] text-slate-800 mb-4">SEO & Search</h3>
            <Field label="Meta Title"><input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="admin-input" /></Field>
            <Field label="Meta Description"><textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={3} className="admin-input" /></Field>
            <Field label="Keywords (comma separated)"><input type="text" value={keywordsStr} onChange={(e) => setKeywordsStr(e.target.value)} className="admin-input" /></Field>
            <div className="grid grid-cols-2 gap-6">
              <Field label="Rating"><input type="number" step="0.1" value={rating} onChange={(e) => setRating(Number(e.target.value))} className="admin-input" /></Field>
              <Field label="Review Count"><input type="number" value={reviewCount} onChange={(e) => setReviewCount(Number(e.target.value))} className="admin-input" /></Field>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, children, className }: { label: string; required?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
