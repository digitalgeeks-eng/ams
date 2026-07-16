import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import api from '../services/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState({ bookings: [], payments: [], complaints: [], recommendations: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const results = await Promise.allSettled([
          api.get('/bookings/student'),
          api.get('/payments/student'),
          api.get('/complaints/student'),
          api.get('/users/recommendations')
        ]);
        
        setData({
          bookings: results[0].status === 'fulfilled' ? results[0].value.data.data : [],
          payments: results[1].status === 'fulfilled' ? results[1].value.data.data : [],
          complaints: results[2].status === 'fulfilled' ? results[2].value.data.data : [],
          recommendations: results[3].status === 'fulfilled' ? results[3].value.data.data : []
        });
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setData({ bookings: [], payments: [], complaints: [], recommendations: [] });
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchDashboard();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <LoadingSpinner />;

  const unpaidBookings = data.bookings.filter((booking) => booking.paymentStatus !== 'paid' && booking.bookingStatus !== 'cancelled');
  const pendingPayments = unpaidBookings.length;
  const unresolvedComplaints = data.complaints.filter((complaint) => complaint.status !== 'resolved').length;

  return (
    <section className="space-y-8">
      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-[28px] bg-white p-6 shadow-card ring-1 ring-slate-200">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Bookings</p>
          <p className="mt-4 text-4xl font-bold text-slate-950">{data.bookings.length}</p>
          <p className="mt-2 text-sm text-slate-500">Total booking records</p>
          <Link to="/student/bookings" className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-blue-600">View bookings →</Link>
        </div>
        <div className="rounded-[28px] bg-white p-6 shadow-card ring-1 ring-slate-200">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Payments</p>
          <p className="mt-4 text-4xl font-bold text-slate-950">{data.payments.length}</p>
          <p className="mt-2 text-sm text-slate-500">All payment records</p>
          <Link to="/student/payments" className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-blue-600">View payments →</Link>
        </div>
        <div className="rounded-[28px] bg-white p-6 shadow-card ring-1 ring-slate-200">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Pending payments</p>
          <p className="mt-4 text-4xl font-bold text-slate-950">{pendingPayments}</p>
          <p className="mt-2 text-sm text-slate-500">Need attention</p>
          <Link to="/student/bookings" className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-blue-600">Pay now →</Link>
        </div>
        <div className="rounded-[28px] bg-white p-6 shadow-card ring-1 ring-slate-200">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Complaints</p>
          <p className="mt-4 text-4xl font-bold text-slate-950">{data.complaints.length}</p>
          <p className="mt-2 text-sm text-slate-500">Support tickets</p>
          <Link to="/student/complaints" className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-blue-600">View complaints →</Link>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[28px] bg-white p-6 shadow-card ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Upcoming bookings</h2>
              <p className="mt-2 text-sm text-slate-500">Recent booking activity at a glance.</p>
            </div>
            <span className="inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary">{data.bookings.length} total</span>
          </div>
          <ul className="mt-6 space-y-4">
            {data.bookings.length ? data.bookings.map((booking) => (
              <li key={booking._id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{booking.propertyId?.title || 'Booked property'}</p>
                <p className="mt-1 text-sm text-slate-600">Status: {booking.bookingStatus}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-500">Payment: {booking.paymentStatus}</p>
              </li>
            )) : <p className="text-slate-600">No bookings yet.</p>}
          </ul>
        </div>
        <div className="rounded-[28px] bg-white p-6 shadow-card ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Recommended for you</h2>
              <p className="mt-2 text-sm text-slate-500">Personalized matches based on your activity.</p>
            </div>
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">{data.recommendations.length}</span>
          </div>
          <ul className="mt-6 space-y-4">
            {data.recommendations.length ? data.recommendations.map((property) => (
              <li key={property._id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{property.title}</p>
                <p className="mt-1 text-sm text-slate-600">{property.location} · {property.type}</p>
                <Link to={`/properties/${property._id}`} className="mt-3 inline-flex items-center text-sm font-semibold text-primary hover:text-blue-600">View details →</Link>
              </li>
            )) : <p className="text-slate-600">No recommendations available yet.</p>}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StudentDashboard;
