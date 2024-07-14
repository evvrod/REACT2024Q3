import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div>
      <h1>404</h1>
      <p>
        Page not found. Go<Link to="/">Home</Link>{' '}
      </p>
    </div>
  );
}
