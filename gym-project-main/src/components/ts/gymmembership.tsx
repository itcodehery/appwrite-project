import React, { useState } from 'react';
import { Client, Databases } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('6700b592001d71931ab9'); // Replace with your project ID

// Initialize Database
const database = new Databases(client);

const CreateDocument: React.FC = () => {
    const [formData, setFormData] = useState({
        duration: '',
        price: 0,
        title: '',
        description: '',
        benefits: [] as string[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'price' ? parseInt(value) : value,
        });
    };

    const handleBenefitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            benefits: e.target.value.split(',').map((benefit) => benefit.trim()),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await database.createDocument(
                '6704c99a003ba58938df',        // Replace with your database ID
                '6721402b00046052866b',       // Replace with your collection ID
                'unique()',              // Document ID; use 'unique()' for automatic generation
                formData                 // The data to be inserted
            );
            console.log('Document created successfully:', response);
        } catch (error) {
            console.error('Error creating document:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration"
                required
            />
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                required
            />
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <input
                type="text"
                name="benefits"
                onChange={handleBenefitsChange}
                placeholder="Benefits (comma-separated)"
                required
            />
            <button type="submit">Create Document</button>
        </form>
    );
};

export default CreateDocument;
