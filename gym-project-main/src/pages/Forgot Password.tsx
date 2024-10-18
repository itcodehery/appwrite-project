import React, { useState } from 'react';
import { Client, Account } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject('6700b592001d71931ab9'); // Your project ID

const account = new Account(client);

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1); // Track the step (1: Email, 2: Confirm Email, 3: New Password)
  const [email, setEmail] = useState('');
  const [secret, setSecret] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const recoveryUrl = 'https://your-redirect-url.com'; // Your valid redirect URL
      await account.createRecovery(email, recoveryUrl);
      alert('Check your email for the link to reset your password.');
      setStep(2); // Move to Confirm Email step
    } catch (error) {
      console.error('Error sending recovery email:', error);
      alert('Error sending recovery email. Please try again.');
    }
  };

  const handleSecretSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Move to New Password step
    setStep(3);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Extract USER_ID and SECRET from the URL (you will need to implement this in your redirect page)
    const userId = ''; // Replace with actual user ID extraction from URL
    const secretKey = secret; // Use the secret key from the input

    try {
      // Call updateRecovery with only 3 arguments
      await account.updateRecovery(userId, secretKey, newPassword);
      alert('Password updated successfully!');
      // Optionally, redirect to login or home page
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password. Please try again.');
    }
  };

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <h2>Reset Password</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Send Recovery Email</button>
        </form>
      )}
      {step === 2 && (
        <div>
          <h2>Check Your Email</h2>
          <p>Please check your email for the password recovery link.</p>
          <form onSubmit={handleSecretSubmit}>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter secret key from email"
              required
            />
            <button type="submit">Proceed to Set New Password</button>
          </form>
        </div>
      )}
      {step === 3 && (
        <form onSubmit={handlePasswordSubmit}>
          <h2>Set New Password</h2>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
          <button type="submit">Update Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
