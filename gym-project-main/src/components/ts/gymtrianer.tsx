import { useEffect, useState } from 'react';
import { Client, Databases } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('6700b592001d71931ab9'); // Replace with your project ID

// Initialize Database
const database = new Databases(client);

const TrainerForm: React.FC = () => {
    const [name, setName] = useState('');
    const [expertise, setExpertise] = useState('');
    const [experience, setExperience] = useState<number | ''>('');
    const [rate, setRate] = useState<number | ''>('');
    const [qualifications, setQualifications] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [trainerId, setTrainerId] = useState(''); // State for the trainer ID
    const [trainers, setTrainers] = useState<any[]>([]); // State to store fetched trainers

    // Function to fetch all trainers from the database
    const fetchTrainers = async () => {
        setIsLoading(true);
        try {
            const response = await database.listDocuments('6704c99a003ba58938df', '6721ae03002c0583966b'); // Replace with your collection ID
            setTrainers(response.documents);
        } catch (error) {
            console.error('Error fetching trainers:', error);
            alert('Failed to fetch trainers');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch trainers when the component mounts
    useEffect(() => {
        fetchTrainers();
    }, []);

    const handleSubmit = async () => {
        if (!name || !expertise || experience === '' || rate === '' || !qualifications) {
            alert('Please fill in all fields');
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
                await database.updateDocument(
                    '6704c99a003ba58938df',
                    '6721ae03002c0583966b',
                    trainerId,
                    trainerData
                );
                alert('Trainer updated successfully!');
            } else {
                await database.createDocument(
                    '6704c99a003ba58938df',
                    '6721ae03002c0583966b',
                    'unique()',
                    trainerData
                );
                alert('Trainer created successfully!');
            }
            clearForm();
            fetchTrainers(); // Refresh the trainers list after submission
        } catch (error) {
            console.error('Error handling trainer:', error);
            alert('Failed to handle trainer');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTrainer = async (trainerId: string) => {
        setIsLoading(true);
        try {
            await database.deleteDocument('6704c99a003ba58938df', '6721ae03002c0583966b', trainerId);
            alert('Trainer deleted successfully!');
            fetchTrainers(); // Refresh the trainers list after deletion
        } catch (error) {
            console.error('Error deleting trainer:', error);
            alert('Failed to delete trainer');
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
        <div>
            <h2>{trainerId ? 'Update Trainer' : 'Add New Trainer'}</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <input
                type="text"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                placeholder="Expertise"
            />
            <input
                type="number"
                value={experience === '' ? '' : experience}
                onChange={(e) => setExperience(e.target.value ? Number(e.target.value) : '')}
                placeholder="Experience (in years)"
            />
            <input
                type="number"
                value={rate === '' ? '' : rate}
                onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')}
                placeholder="Rate"
            />
            <input
                type="text"
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
                placeholder="Qualifications (comma-separated)"
            />
            <button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Processing...' : trainerId ? 'Update Trainer' : 'Create Trainer'}
            </button>

            <h3>Existing Trainers</h3>
            <ul>
                {trainers.map((trainer) => (
                    <li key={trainer.$id}>
                        <span>{trainer.name}</span>
                        <button onClick={() => editTrainer(trainer)}>Edit</button>
                        <button onClick={() => deleteTrainer(trainer.$id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrainerForm;
