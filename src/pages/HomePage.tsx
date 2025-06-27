import { Container, Typography, Paper } from '@mui/material';
import UrlForm from '../components/UrlForm';
import { useState } from 'react';
import { ShortenedUrl } from '../types';

const HomePage = () => {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);

  const handleNewUrl = (url: ShortenedUrl) => {
    setUrls([url, ...urls]);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        URL Shortener
      </Typography>

      <UrlForm onSuccess={handleNewUrl} />

      {urls.map((url) => (
        <Paper key={url.shortcode} sx={{ mt: 2, p: 2, backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
          <Typography>Short URL: http://localhost:5173/{url.shortcode}</Typography>
          <Typography>Original URL: {url.originalUrl}</Typography>
          <Typography>Expires At: {url.expiryAt}</Typography>
        </Paper>
      ))}
    </Container>
  );
};

export default HomePage;