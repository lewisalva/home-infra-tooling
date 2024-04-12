import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { LinkUnstyled } from '../../components/LinkUnstyled';
import { type OrganizationContextType } from '../../contexts/OrganizationContext';
import { useOrganizationContext } from '../../contexts/useOrganizationContext';

type OrganizationCardProps = {
  isSelected?: boolean;
  loading?: boolean;
  organizationName: string;
  organizationId: string;
  setSelectedOrganization: OrganizationContextType['setSelectedOrganization'];
};

const OrganizationCard = ({
  isSelected = false,
  loading,
  organizationId,
  organizationName,
  setSelectedOrganization,
}: OrganizationCardProps) => {
  return (
    <Card
      sx={{
        maxWidth: 200,
        m: 2,
        cursor: 'pointer',
        backgroundColor: isSelected ? 'action.selected' : 'background.paper',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
      onClick={() => setSelectedOrganization(organizationId, organizationName)}
    >
      <CardContent>
        {loading ? (
          <>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        ) : (
          <Typography variant="body2" color="text.secondary" component="p">
            {organizationName}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export const Organizations = () => {
  const { organizations, selectedOrganizationId, setSelectedOrganization } =
    useOrganizationContext();

  return (
    <Stack>
      <Stack justifyContent="space-between" direction="row">
        <Typography variant="h4">Organizations</Typography>
        <LinkUnstyled to="/portal/organizations/create">
          <Button variant="contained" color="primary">
            Create Organization
          </Button>
        </LinkUnstyled>
      </Stack>
      <Grid container>
        {organizations.length === 0 && (
          <Typography variant="body1" component="p">
            No organizations found. Please contact your administrator.
          </Typography>
        )}
        {organizations.map((organization) => (
          <Grid item xs={3} key={organization.id}>
            <OrganizationCard
              organizationName={organization.name}
              organizationId={organization.id}
              setSelectedOrganization={setSelectedOrganization}
              isSelected={selectedOrganizationId === organization.id}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
