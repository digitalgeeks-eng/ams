import { useEffect, useState } from 'react';
import api from '../services/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/communications/notifications');
        setNotifications(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <p className="mt-2 text-slate-600">Review alerts about bookings, payments, and admin actions.</p>
      </div>
      <div className="grid gap-4">
        {notifications.length ? notifications.map((notification) => (
          <article key={notification._id} className="rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{notification.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{new Date(notification.createdAt).toLocaleString()}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">{notification.type}</span>
            </div>
            <p className="mt-4 text-slate-600 whitespace-pre-line">{notification.message}</p>
          </article>
        )) : (
          <div className="rounded-3xl bg-slate-50 p-6 text-slate-600">No notifications yet.</div>
        )}
      </div>
    </section>
  );
};

export default Notifications;
