import React, { useState, useEffect } from 'react';
import {databases} from "../../helpers/appwrite"; // Import account from Appwrite
import '../css/gymmembership.css';



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

    const fetchDocuments = async () => {
        setIsLoading(true);
        try {
            const response = await databases.listDocuments('6704c99a003ba58938df', '6721402b00046052866b');
            const fetchedDocuments = response.documents as unknown as DocumentData[];
            setDocuments(fetchedDocuments);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleChange = (id: string, name: string, value: string | number | string[]) => {
        setDocuments((prevDocuments) =>
            prevDocuments.map((doc) =>
                doc.$id === id
                    ? { ...doc, [name]: name === 'price' ? parseInt(value as string) : value }
                    : doc
            )
        );
    };

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
            await databases.updateDocument(
                '6704c99a003ba58938df',
                '6721402b00046052866b',
                id,
                updatedData
            );
            alert('Document updated successfully!');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    return (
        <div className="document-form-container">
            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-text">Loading...</div>
                </div>
            ) : (
                <div className="documents-list">
                    {documents.map((doc) => (
                        <div key={doc.$id} className="document-card">
                            <div className="form-grid">
                                <div className="form-column">
                                    <div className="form-group">
                                        <label>Duration</label>
                                        <input
                                            type="text"
                                            value={doc.duration}
                                            onChange={(e) => handleChange(doc.$id, 'duration', e.target.value)}
                                            placeholder="Duration"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Price</label>
                                        <input
                                            type="number"
                                            value={doc.price}
                                            onChange={(e) => handleChange(doc.$id, 'price', e.target.value)}
                                            placeholder="Price"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            value={doc.title}
                                            onChange={(e) => handleChange(doc.$id, 'title', e.target.value)}
                                            placeholder="Title"
                                        />
                                    </div>
                                </div>

                                <div className="form-column">
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            value={doc.description}
                                            onChange={(e) => handleChange(doc.$id, 'description', e.target.value)}
                                            placeholder="Description"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Benefits (comma-separated)</label>
                                        <input
                                            type="text"
                                            value={doc.benefits.join(', ')}
                                            onChange={(e) =>
                                                handleChange(doc.$id, 'benefits', e.target.value.split(',').map((b) => b.trim()))
                                            }
                                            placeholder="Benefits (comma-separated)"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="button-container">
                                <button
                                    onClick={() => updateDocument(doc.$id)}
                                    className="update-button"
                                >
                                    Update Document
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style >{`
                
            `}</style>
        </div>
    );
};

export default DocumentForm;