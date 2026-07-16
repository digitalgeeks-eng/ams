import { useEffect, useState } from 'react';
import api from '../services/api.js';
import { LOCATIONS } from '../constants/locations.js';
import PropertyCard from '../components/PropertyCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const response = await api.get('/properties', { params: { search: query, location, type, priceRange } });
      setProperties(response.data.data.properties);
      setLoading(false);
    };
    fetchProperties();
  }, [query, location, type, priceRange]);

  return (
    <section className="space-y-8">
      <div className="rounded-[32px] bg-white p-6 shadow-card ring-1 ring-slate-200">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">Search properties</h2>
            <p className="mt-2 text-sm text-slate-500">Find the perfect accommodation with filters for location, price and type.</p>
          </div>
          <div className="inline-flex items-center rounded-3xl bg-slate-50 px-4 py-2 text-sm text-slate-600 shadow-sm">
            <span className="mr-2 text-primary">•</span>
            Showing {properties.length} properties
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <input
            placeholder="Search title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="">All locations</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="">All house types</option>
            <option value="Single Room">Single Room</option>
            <option value="Self-Contain">Self-Contain</option>
            <option value="Room and Parlour">Room and Parlour</option>
            <option value="Mini Flat">Mini Flat</option>
          </select>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="">Price range</option>
            <option value="0-50000">Under ₦50k</option>
            <option value="50000-150000">₦50k - ₦150k</option>
            <option value="150000-300000">₦150k+</option>
          </select>
        </div>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.length ? properties.map((property) => <PropertyCard key={property._id} property={property} />) : (
            <div className="col-span-full rounded-[28px] bg-white p-10 text-center text-slate-600 shadow-card ring-1 ring-slate-200">
              No matching properties found.
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Listings;
