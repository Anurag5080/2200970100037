import {
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { log } from '../middleware/logger';

interface ClickDetail {
  timestamp: string;
  source: string;
  location: string;
}

interface ShortUrlStat {
  shortcode: string;
  originalUrl: string;
  createdAt: string;
  expiryAt: string;
  clicks: ClickDetail[];
}

const mockStats: ShortUrlStat[] = [
  {
    shortcode: 'abc123',
    originalUrl: 'https://example.com',
    createdAt: dayjs().subtract(10, 'minutes').toISOString(),
    expiryAt: dayjs().add(20, 'minutes').toISOString(),
    clicks: [
      {
        timestamp: dayjs().subtract(3, 'minute').toISOString(),
        source: 'https://google.com',
        location: 'Delhi, India',
      },
      {
        timestamp: dayjs().subtract(1, 'minute').toISOString(),
        source: 'https://twitter.com',
        location: 'Mumbai, India',
      },
    ],
  },
];

const StatsPage = () => {
  useEffect(() => {
    log('frontend', 'info', 'page', 'Visited Stats Page');
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        URL Statistics
      </Typography>

      {mockStats.map((stat) => (
        <Paper key={stat.shortcode} sx={{ p: 3, mt: 3, backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
          <Typography variant="h6">Short URL: http://localhost:5173/{stat.shortcode}</Typography>
          <Typography>Original URL: {stat.originalUrl}</Typography>
          <Typography>Created At: {dayjs(stat.createdAt).format('HH:mm:ss')}</Typography>
          <Typography>Expires At: {dayjs(stat.expiryAt).format('HH:mm:ss')}</Typography>
          <Typography>Total Clicks: {stat.clicks.length}</Typography>

          <Typography variant="subtitle1" mt={2}>Click Details:</Typography>
          <List>
            {stat.clicks.map((click, index) => (
              <Box key={index}>
                <ListItem>
                  <ListItemText
                    primary={`Time: ${dayjs(click.timestamp).format('HH:mm:ss')}`}
                    secondary={`Source: ${click.source} | Location: ${click.location}`}
                  />
                </ListItem>
                {index < stat.clicks.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>
      ))}
    </Container>
  );
};

export default StatsPage;