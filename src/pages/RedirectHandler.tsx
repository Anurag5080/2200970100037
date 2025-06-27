import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { log } from '../middleware/logger';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    log('frontend', 'info', 'redirect', `Redirect for shortcode: ${shortcode}`);

    // Simulate redirect (replace with real API call)
    const originalUrl = 'https://example.com';
    window.location.href = originalUrl;
  }, [shortcode]);

  return null;
};

export default RedirectHandler;
