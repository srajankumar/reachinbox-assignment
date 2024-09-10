// "use client";
// import React from "react";

// const Inbox = () => {
//   return <div></div>;
// };

// export default Inbox;
"use client";

import { useEffect, useState } from "react";

// Define the structure for the email data
interface Email {
  id: number;
  fromName: string;
  fromEmail: string;
  toName: string;
  toEmail: string;
  subject: string;
  body: string;
  isRead: boolean;
  sentAt: string;
}

const EmailList = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch emails from the API
  useEffect(() => {
    const fetchEmails = async () => {
      const apiUrl = "https://hiring.reachinbox.xyz/api/v1/onebox/list";
      const token = localStorage.getItem("jwtToken"); // Get Bearer token from localStorage (ensure it's stored here)

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch emails");
        }

        const data = await response.json();
        setEmails(data.data); // Set the email data
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">Email List</h2>
      {error && <p className="text-red-500">{error}</p>}
      {emails.length === 0 ? (
        <p>Loading emails...</p>
      ) : (
        <div className="space-y-4">
          {emails.map((email) => (
            <div key={email.id} className="p-4 border rounded-md shadow">
              <h3 className="font-bold text-lg">{email.subject}</h3>
              <p className="text-gray-500">
                From: {email.fromName} ({email.fromEmail})
              </p>
              <p>To: {email.toEmail}</p>
              <p className="mt-2">{email.body}</p>
              <p className="text-sm text-gray-400 mt-1">
                Sent at: {new Date(email.sentAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailList;
