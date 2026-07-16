import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await api.get('/users/recommendations');
        setRecommendations(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Recommended Houses For You</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {recommendations.length ? recommendations.map((property) => (
          <div key={property._id} className="rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="font-semibold">{property.title}</h3>
            <p className="text-slate-600 mt-2">{property.location}</p>
            <p className="text-slate-600">Type: {property.type}</p>
            <Link to={`/properties/${property._id}`} className="mt-3 inline-block text-primary hover:underline">View details</Link>
          </div>
        )) : <div className="rounded-3xl bg-slate-50 p-6 text-slate-600">No recommendations yet. Search and view properties to improve suggestions.</div>}
      </div>
    </section>
  );
};

export default Recommendations;
