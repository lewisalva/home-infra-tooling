import { Box, Button, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';

import { useOrganizationContext } from '../../contexts/useOrganizationContext';

export const OrganizationCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createOrganization } = useOrganizationContext();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      name: data.get('name') + '',
    };
    console.log(body);
    try {
      await createOrganization(body);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Create Organization</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: 400 }}>
        <TextField
          margin="normal"
          required
          id="name"
          label="Name"
          name="name"
          fullWidth
          autoComplete="off"
          autoFocus
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isSubmitting}>
          Sign In
        </Button>
      </Box>
    </Box>
  );
};
