import { Client, Account} from 'appwrite';


const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6700b592001d71931ab9");

export const account = new Account(client);
export { ID } from 'appwrite';