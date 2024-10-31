import { useEffect, useState } from 'react';
import {databases} from "../../helpers/appwrite"; // Import account from Appwrite

import { 
    Box, 
    Container,
    TextField,
    Button,
    Typography,
   
    List,
    ListItem,
    IconButton,
    Chip,
    ThemeProvider,
    createTheme,
    styled,
    Card,
    CardContent,
    Grow,
    LinearProgress,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Save as SaveIcon,
    Person as PersonIcon,
    WorkHistory as WorkIcon,
    Euro as EuroIcon,
    School as SchoolIcon
} from '@mui/icons-material';

// Initialize Appwrite client


// Custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#2c3e50',
            light: '#3498db',
        },
        secondary: {
            main: '#e74c3c',
        },
        background: {
            default: '#f5f6fa',
        },
    },
    typography: {
        fontFamily: '"Poppins", sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '10px 20px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
            },
        },
    },
});


const StyledForm = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    borderRadius: 12,
    backgroundColor: '#fff',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
    },
}));

const TrainerForm: React.FC = () => {
    const [name, setName] = useState('');
    const [expertise, setExpertise] = useState('');
    const [experience, setExperience] = useState<number | ''>('');
    const [rate, setRate] = useState<number | ''>('');
    const [qualifications, setQualifications] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [trainerId, setTrainerId] = useState('');
    const [trainers, setTrainers] = useState<any[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [trainerToDelete, setTrainerToDelete] = useState<string | null>(null);

    const fetchTrainers = async () => {
        setIsLoading(true);
        try {
            const response = await databases.listDocuments(
                '6704c99a003ba58938df',
                '6721ae03002c0583966b'
            );
            setTrainers(response.documents);
        } catch (error) {
            console.error('Error fetching trainers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTrainers();
    }, []);

    const handleSubmit = async () => {
        if (!name || !expertise || experience === '' || rate === '' || !qualifications) {
            return;
        }

        setIsLoading(true);
        const qualificationsArray = qualifications.split(',').map((q) => q.trim());

        const trainerData = {
            name,
            expertise,
            experience: Number(experience),
            rate: Number(rate),
            qualifications: qualificationsArray,
        };

        try {
            if (trainerId) {
                await databases.updateDocument(
                    '6704c99a003ba58938df',
                    '6721ae03002c0583966b',
                    trainerId,
                    trainerData
                );
            } else {
                await databases.createDocument(
                    '6704c99a003ba58938df',
                    '6721ae03002c0583966b',
                    'unique()',
                    trainerData
                );
            }
            clearForm();
            fetchTrainers();
        } catch (error) {
            console.error('Error handling trainer:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setTrainerToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!trainerToDelete) return;

        setIsLoading(true);
        try {
            await databases.deleteDocument(
                '6704c99a003ba58938df',
                '6721ae03002c0583966b',
                trainerToDelete
            );
            fetchTrainers();
            setDeleteDialogOpen(false);
            setTrainerToDelete(null);
        } catch (error) {
            console.error('Error deleting trainer:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const clearForm = () => {
        setName('');
        setExpertise('');
        setExperience('');
        setRate('');
        setQualifications('');
        setTrainerId('');
    };

    const editTrainer = (trainer: any) => {
        setName(trainer.name);
        setExpertise(trainer.expertise);
        setExperience(trainer.experience);
        setRate(trainer.rate);
        setQualifications(trainer.qualifications.join(', '));
        setTrainerId(trainer.$id);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ 
                    fontWeight: 600, 
                    color: 'primary.main',
                    marginBottom: 4,
                    textAlign: 'center'
                }}>
                    {trainerId ? '✏️ Update Trainer' : '✨ Add New Trainer'}
                </Typography>

                <StyledForm elevation={0}>
                    {isLoading && <LinearProgress sx={{ marginBottom: 2 }} />}
                    <Box component="form" sx={{ display: 'grid', gap: 3 }}>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: <PersonIcon sx={{ mr: 1, color: 'primary.light' }} />,
                            }}
                        />
                        <TextField
                            label="Expertise"
                            value={expertise}
                            onChange={(e) => setExpertise(e.target.value)}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: <WorkIcon sx={{ mr: 1, color: 'primary.light' }} />,
                            }}
                        />
                        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: '1fr 1fr' }}>
                            <TextField
                                label="Experience (years)"
                                type="number"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value ? Number(e.target.value) : '')}
                                variant="outlined"
                            />
                            <TextField
                                label="Hourly Rate"
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <EuroIcon sx={{ mr: 1, color: 'primary.light' }} />,
                                }}
                            />
                        </Box>
                        <TextField
                            label="Qualifications"
                            value={qualifications}
                            onChange={(e) => setQualifications(e.target.value)}
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={2}
                            helperText="Enter qualifications separated by commas"
                            InputProps={{
                                startAdornment: <SchoolIcon sx={{ mr: 1, color: 'primary.light' }} />,
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            startIcon={trainerId ? <SaveIcon /> : <AddIcon />}
                            sx={{ height: 48 }}
                        >
                            {trainerId ? 'Update Trainer' : 'Add Trainer'}
                        </Button>
                    </Box>
                </StyledForm>

                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}>
                    Current Trainers
                </Typography>

                <List sx={{ display: 'grid', gap: 2 }}>
                    {trainers.map((trainer) => (
                        <Grow key={trainer.$id} in={true}>
                            <StyledListItem
                                secondaryAction={
                                    <Box>
                                        <Tooltip title="Edit">
                                            <IconButton 
                                                edge="end" 
                                                onClick={() => editTrainer(trainer)}
                                                sx={{ mr: 1 }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton 
                                                edge="end" 
                                                onClick={() => handleDeleteClick(trainer.$id)}
                                                color="secondary"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                }
                            >
                                <CardContent sx={{ width: '100%' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        <Typography variant="h6">{trainer.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {trainer.expertise}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                                            <Chip 
                                                label={`${trainer.experience} years`}
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                            />
                                            <Chip 
                                                label={`€${trainer.rate}/hr`}
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                                            {trainer.qualifications.map((qual: string, index: number) => (
                                                <Chip 
                                                    key={index}
                                                    label={qual}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </StyledListItem>
                        </Grow>
                    ))}
                </List>

                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this trainer?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleDeleteConfirm} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
};

export default TrainerForm;