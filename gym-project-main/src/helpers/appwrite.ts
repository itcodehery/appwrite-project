import { Client, Account, Databases } from 'appwrite';

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
    .setProject("6700b592001d71931ab9"); // Your Appwrite project ID

// Initialize Account and Databases
export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from 'appwrite';

export const fetchSlots = async () => {
    const response = await databases.listDocuments('6704c99a003ba58938df', 'slots');
    return response.documents;
};

export const logOut = async () => {
    try {
        await account.deleteSession('current');
        console.log("Logged out");
    } catch (error) {
        console.error("Logout failed:", error);
    }
}