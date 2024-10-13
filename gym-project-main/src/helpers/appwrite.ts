import { Client, Account, Databases } from 'appwrite';

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
    .setProject("6700b592001d71931ab9"); // Your Appwrite project ID

// Initialize Account and Databases
export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from 'appwrite';

// Helper function to fetch documents


// Helper function to fetch a document by ID
export const fetchDocumentById = async (documentId: string) => {
    const databaseId = '6704c99a003ba58938df'; // Your Database ID
    const collectionId = '6704c9a100110ea3d659'; // Your Collection ID

    try {
        const response = await databases.getDocument(databaseId, collectionId, documentId);
        return response;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error for further handling if needed
    }
};

// Example usage
(async () => {
    const documentId = '670934af000e47874db1'; // Your Document ID
    try {
        const document = await fetchDocumentById(documentId);
        console.log('Retrieved Document:', document);
    } catch (error) {
        console.error('Error fetching document:', error);
    }
})();
