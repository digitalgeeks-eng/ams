import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getImageUrl } from '../utils/imageUtils.js';

const PropertyCard = ({ property }) => {
  const [showDebug, setShowDebug] = useState(false);
  const imageUrl = getImageUrl(property.images?.[0]);

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-card transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative w-full bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden flex items-center justify-center" style={{ minHeight: '300px', aspectRatio: '4/3' }}>
        <img
          src={imageUrl}
          alt={property.title}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-105 p-2"
          onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/600x400'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100"></div>
        <div className="absolute left-5 top-5 inline-flex items-center rounded-full bg-white/95 px-4 py-2.5 text-sm font-bold text-slate-900 shadow-md backdrop-blur-sm transition duration-300 group-hover:bg-white">
          ₦{property.price?.toLocaleString()}
        </div>
        <div className="absolute right-5 top-5 inline-flex items-center rounded-full bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-white shadow-md backdrop-blur-sm transition duration-300 group-hover:bg-slate-900">
          {property.approvalStatus || 'Pending'}
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-950 line-clamp-2 transition group-hover:text-primary">{property.title}</h3>
            <p className="mt-1.5 text-sm text-slate-500 flex items-center gap-1.5">
              📍 {property.location}
            </p>
          </div>
          <div className="rounded-full bg-gradient-to-r from-primary/10 to-accent/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary whitespace-nowrap">
            {property.type || 'Room'}
          </div>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <span className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-2.5 text-sm font-semibold text-slate-700 border border-yellow-100/50">
            <span className="text-lg">⭐</span>
            {property.averageRating?.toFixed(1) || 'No rating'}
          </span>
          <span className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2.5 text-sm font-semibold text-slate-700 border border-blue-100/50">
            <span className="text-lg">🛏️</span>
            {property.type || 'Room'}
          </span>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">{property.description || 'A comfortable property with premium amenities and convenient campus access.'}</p>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <Link to={`/properties/${property._id}`} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:shadow-lg hover:from-blue-600 hover:to-blue-700 active:scale-95">
            View Details →
          </Link>
          <button
            type="button"
            onClick={() => setShowDebug((visible) => !visible)}
            className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400 transition hover:text-slate-600"
          >
            {showDebug ? 'Hide URL' : 'Show image URL'}
          </button>
        </div>
        {showDebug && (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-3 text-xs text-slate-600 break-all border border-slate-200">{imageUrl}</pre>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
