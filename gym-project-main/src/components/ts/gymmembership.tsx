import React, { useState, useEffect } from 'react';
import {databases} from "../../helpers/appwrite"; // Import account from Appwrite




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
                .document-form-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 24px;
                    background

                .loading-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 200px;
                }

                .loading-text {
                    font-size: 18px;
                    color: #666;
                }

                .documents-list {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .document-card {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    padding: 24px;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                }

                @media (max-width: 768px) {
                    .form-grid {
                        grid-template-columns: 1fr;
                    }
                }

                .form-column {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .form-group label {
                    font-size: 14px;
                    font-weight: 500;
                    color: #333;
                }

                .form-group input,
                .form-group textarea {
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 14px;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #4a90e2;
                    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
                }

                .form-group textarea {
                    min-height: 120px;
                    resize: vertical;
                }

                .button-container {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 24px;
                }

                .update-button {
                    background-color: #4a90e2;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 10px 20px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .update-button:hover {
                    background-color: #357abd;
                }

                .update-button:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.4);
                }
            `}</style>
        </div>
    );
};

export default DocumentForm;