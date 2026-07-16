import { Link } from 'react-router-dom';

const Home = () => (
  <section className="relative overflow-hidden bg-surface py-16">
    <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/20 to-transparent" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.9fr] lg:items-center">
        <div className="space-y-6 rounded-[32px] bg-white p-10 shadow-card ring-1 ring-slate-200">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Premium accommodation management
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Manage student accommodations in one beautifully designed system.
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            Browse verified properties, manage bookings, handle payments and approvals, and keep every role connected with a modern interface built for universities and agents.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/listings" className="inline-flex items-center justify-center rounded-3xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-blue-600">
              Explore listings
            </Link>
            <Link to="/register" className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
              Get started
            </Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[32px] bg-white p-6 shadow-card ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Bookings</p>
            <p className="mt-4 text-3xl font-semibold text-slate-950">320+</p>
            <p className="mt-2 text-sm text-slate-600">Fast student bookings with secure payment flow.</p>
          </div>
          <div className="rounded-[32px] bg-white p-6 shadow-card ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Properties</p>
            <p className="mt-4 text-3xl font-semibold text-slate-950">150+</p>
            <p className="mt-2 text-sm text-slate-600">Verified listings with image galleries and ratings.</p>
          </div>
          <div className="rounded-[32px] bg-white p-6 shadow-card ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Agents</p>
            <p className="mt-4 text-3xl font-semibold text-slate-950">45+</p>
            <p className="mt-2 text-sm text-slate-600">Smooth agent validation and onboarding workflow.</p>
          </div>
          <div className="rounded-[32px] bg-white p-6 shadow-card ring-1 ring-slate-200">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Support</p>
            <p className="mt-4 text-3xl font-semibold text-slate-950">24/7</p>
            <p className="mt-2 text-sm text-slate-600">Peace of mind with payment and complaint management.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Home;
