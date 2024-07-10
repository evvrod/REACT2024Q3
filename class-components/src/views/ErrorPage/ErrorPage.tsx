import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl text-gray-500">
        Page not found. Go<Link to="/">Home</Link>{' '}
      </p>
    </div>
  );
}
