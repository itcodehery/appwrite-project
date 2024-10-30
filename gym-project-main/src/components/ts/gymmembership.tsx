import React, { useState, useEffect } from 'react';
import { Client, Databases } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('6700b592001d71931ab9'); // Replace with your project ID

// Initialize Database
const database = new Databases(client);

interface DocumentData {
    $id: string;
    duration: string;
    price: number;
    title: string;
    description: string;
    benefits: string[];
}

const DocumentForm: React.FC = () => {
    const [documents, setDocuments] = useState<DocumentData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch all documents from the collection
    const fetchDocuments = async () => {
        setIsLoading(true);
        try {
            const response = await database.listDocuments('6704c99a003ba58938df', '6721402b00046052866b');
            const fetchedDocuments = response.documents as unknown as DocumentData[];
            setDocuments(fetchedDocuments);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch documents on component mount
    useEffect(() => {
        fetchDocuments();
    }, []);

    // Handle change for individual document fields
    const handleChange = (id: string, name: string, value: string | number | string[]) => {
        setDocuments((prevDocuments) =>
            prevDocuments.map((doc) =>
                doc.$id === id
                    ? { ...doc, [name]: name === 'price' ? parseInt(value as string) : value }
                    : doc
            )
        );
    };

    // Update a document in the Appwrite database
    const updateDocument = async (id: string) => {
        const documentToUpdate = documents.find((doc) => doc.$id === id);
        if (!documentToUpdate) return;

        const updatedData = {
            duration: documentToUpdate.duration,
            price: documentToUpdate.price,
            title: documentToUpdate.title,
            description: documentToUpdate.description,
            benefits: documentToUpdate.benefits,
        };

        try {
            await database.updateDocument(
                '6704c99a003ba58938df',           // Database ID
                '6721402b00046052866b',           // Collection ID
                id,                               // Document ID to update
                updatedData                       // Pass only the required fields
            );
            alert('Document updated successfully!');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                documents.map((doc) => (
                    <div key={doc.$id} style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc' }}>
                        <input
                            type="text"
                            value={doc.duration}
                            onChange={(e) => handleChange(doc.$id, 'duration', e.target.value)}
                            placeholder="Duration"
                        />
                        <input
                            type="number"
                            value={doc.price}
                            onChange={(e) => handleChange(doc.$id, 'price', e.target.value)}
                            placeholder="Price"
                        />
                        <input
                            type="text"
                            value={doc.title}
                            onChange={(e) => handleChange(doc.$id, 'title', e.target.value)}
                            placeholder="Title"
                        />
                        <textarea
                            value={doc.description}
                            onChange={(e) => handleChange(doc.$id, 'description', e.target.value)}
                            placeholder="Description"
                        />
                        <input
                            type="text"
                            value={doc.benefits.join(', ')}
                            onChange={(e) =>
                                handleChange(doc.$id, 'benefits', e.target.value.split(',').map((b) => b.trim()))
                            }
                            placeholder="Benefits (comma-separated)"
                        />
                        <button onClick={() => updateDocument(doc.$id)}>Update Document</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default DocumentForm;
