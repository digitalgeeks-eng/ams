import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold tracking-wide text-slate-900">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-card">F</span>
          <span>FULAFIA AMS</span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm font-medium text-slate-700 md:flex">
          <Link to="/listings" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Listings</Link>
          {!user && <Link to="/login" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Login</Link>}
          {!user && <Link to="/register" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Register</Link>}
          {user && user.role === 'admin' && (
            <>
              <Link to="/admin/agents" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Agents</Link>
              <Link to="/admin/properties" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Properties</Link>
              <Link to="/admin/payments" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Payments</Link>
              <Link to="/complaints" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Complaints</Link>
              <Link to="/admin/notifications" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Send Notification</Link>
              <Link to="/notifications" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Notifications</Link>
            </>
          )}
          {user && user.role === 'student' && (
            <>
              <Link to="/student/bookings" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">My Bookings</Link>
              <Link to="/student/payments" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Payments</Link>
              <Link to="/student/complaints" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Complaints</Link>
              <Link to="/student/recommendations" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Recommendations</Link>
              <Link to="/notifications" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Notifications</Link>
            </>
          )}
          {user && user.role === 'agent' && (
            <>
              <Link to="/agent/listings" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">My Listings</Link>
              <Link to="/agent/add-property" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Add Property</Link>
              <Link to="/agent/booking-requests" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Booking Requests</Link>
              <Link to="/complaints" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Complaints</Link>
              <Link to="/notifications" className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Notifications</Link>
            </>
          )}
          {user && <Link to={user.role === 'admin' ? '/admin' : user.role === 'agent' ? '/agent' : '/student'} className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-primary">Dashboard</Link>}
          {user && <button onClick={logout} className="rounded-full px-4 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-danger">Logout</button>}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
