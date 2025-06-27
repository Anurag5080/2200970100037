import {
  Button,
  TextField,
  Stack
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShortenedUrl } from '../types';
import { log } from '../middleware/logger';
import dayjs from 'dayjs';

const formSchema = z.object({
  originalUrl: z.string().url({ message: 'Please enter a valid URL' }),
  validity: z
    .string()
    .optional()
    .transform((val: string | undefined) => (val ? parseInt(val) : 30)),
  shortcode: z
    .string()
    .optional()
    .refine((val: string | undefined) => !val || /^[a-zA-Z0-9]{3,10}$/.test(val), {
      message: 'Shortcode must be 3-10 alphanumeric characters',
    }),
});

type FormData = z.infer<typeof formSchema>;

const UrlForm = ({ onSuccess }: { onSuccess: (url: ShortenedUrl) => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver : zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const shortcode = data.shortcode || Math.random().toString(36).substring(2, 8);
    const now = dayjs();

    const newUrl: ShortenedUrl = {
      shortcode,
      originalUrl: data.originalUrl,
      createdAt: now.toISOString(),
      expiryAt: now.add(data.validity || 30, 'minute').toISOString(),
    };

    log('frontend', 'info', 'component', `Shortened: ${data.originalUrl} → ${shortcode}`);
    onSuccess(newUrl);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Original URL"
          {...register('originalUrl')}
          error={!!errors.originalUrl}
          helperText={errors.originalUrl?.message}
          fullWidth
        />
        <TextField
          label="Validity (minutes, default 30)"
          {...register('validity')}
          error={!!errors.validity}
          helperText={errors.validity?.message}
          fullWidth
        />
        <TextField
          label="Shortcode (optional)"
          {...register('shortcode')}
          error={!!errors.shortcode}
          helperText={errors.shortcode?.message}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Shorten URL
        </Button>
      </Stack>
    </form>
  );
};

export default UrlForm;