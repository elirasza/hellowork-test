import { Box, Card, Chip, Divider, Stack, Typography } from '@mui/material'

export interface JobEntity {
  id: string
  link: string
  title: string
  description: string
  city: string
  postalCode: string
  contractType: string[]
  salary: string
  publicationDate: string
}

export interface JobProps {
  job: JobEntity
}

export const Job = ({ job }: JobProps) => (
  <a href={job.link} target="_blank" rel="noreferrer">
    <Card variant="outlined" sx={{ maxWidth: '100%' }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="start" gap={4}>
          <Typography gutterBottom variant="h5" component="div" textAlign="left">{job.title}</Typography>
          <Typography gutterBottom variant="h6" component="div" whiteSpace="pre">{`${job.city} (${job.postalCode})`}</Typography>
        </Stack>
        <Typography align="left" color="text.secondary" variant="body2">{job.description}</Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2, display: 'flex' }} justifyContent="space-between" flexDirection="row">
        <Stack sx={{ width: 'fit-content' }} direction="row" spacing={1}>
          {
          job.contractType && job.contractType.length > 0 && job.contractType.map((contract) => <Chip label={contract} size="small" key={contract} />)
        }
          {
          job.salary && <Chip label={job.salary} size="small" />
        }
        </Stack>
        <Stack direction="row" spacing={1}>
          {
          job.publicationDate && <Typography color="text.secondary" variant="body2">{new Date(job.publicationDate).toLocaleString('fr-FR')}</Typography>
        }
        </Stack>
      </Box>
    </Card>
  </a>
)
