import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const { pathname } = useLocation();
  const pageName = pathname.replace(/^\//, '') || 'Home';
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-[#1a56db] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page "{pageName}" could not be found in this application.
        </p>
        <Link
          to="/Home"
          className="inline-flex items-center gap-2 bg-[#1a56db] text-white font-semibold rounded-full px-6 py-3 hover:bg-[#1240a8] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
