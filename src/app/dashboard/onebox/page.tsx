// "use client";

// import { Input } from "@/components/ui/input";
// import { useEffect, useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import Image from "next/image";
// interface Email {
//   id: number;
//   fromName: string;
//   fromEmail: string;
//   toName: string;
//   toEmail: string;
//   subject: string;
//   body: string;
//   isRead: boolean;
//   sentAt: string;
//   threadId: number;
//   status: string;
//   campaignName: string;
// }

// interface Message {
//   id: number;
//   fromName: string;
//   fromEmail: string;
//   toEmail: string;
//   subject: string;
//   body: string;
//   sentAt: string;
//   cc: string;
// }

// const EmailList = () => {
//   const [emails, setEmails] = useState<Email[]>([]);
//   const [selectedThreadId, setSelectedThreadId] = useState<number | null>(null);
//   const [selectedEmailIndex, setSelectedEmailIndex] = useState<number | null>(
//     null
//   );
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [, setFilteredEmails] = useState<Email[]>([]);

//   useEffect(() => {
//     const fetchEmails = async () => {
//       const apiUrl = "https://hiring.reachinbox.xyz/api/v1/onebox/list";
//       const token = localStorage.getItem("jwtToken");

//       try {
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch emails");
//         }

//         const data = await response.json();
//         setEmails(data.data);
//         setFilteredEmails(data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchEmails();
//   }, []);

//   const fetchMessages = async (threadId: number) => {
//     setLoadingMessages(true);
//     const apiUrl = `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`;
//     const token = localStorage.getItem("jwtToken");

//     try {
//       const response = await fetch(apiUrl, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch messages");
//       }

//       const data = await response.json();
//       setMessages(data.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoadingMessages(false);
//     }
//   };

//   const handleEmailClick = (index: number, threadId: number) => {
//     setSelectedEmailIndex(index);
//     setSelectedThreadId(threadId);
//     fetchMessages(threadId);
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     const filtered = emails.filter(
//       (email) =>
//         email.fromEmail.toLowerCase().includes(query) ||
//         email.subject.toLowerCase().includes(query) ||
//         email.body.toLowerCase().includes(query)
//     );
//     setFilteredEmails(filtered);
//   };

//   return (
//     <div>
//       <div className="absolute dark:bg-background bg-card top-0 left-0 pl-20 pt-20 border-r xl:w-1/4 lg:w-1/3 md:w-1/2 w-full h-full pr-4">
//         <h2 className="text-2xl pt-4 pb-2 text-blue-500 font-semibold">
//           All Inbox(s)
//         </h2>
//         <div className="pb-5 flex items-center gap-1">
//           <p className="font-bold">
//             {selectedEmailIndex !== null
//               ? `${selectedEmailIndex + 1}/${emails.length}`
//               : `0/${emails.length}`}
//           </p>
//           <p className="text-primary/60">Inboxes selected</p>
//         </div>

//         <Input
//           type="text"
//           placeholder="Search"
//           value={searchQuery}
//           onChange={handleSearch}
//           className="mb-4"
//         />

//         {emails.length === 0 ? (
//           <div className={`hover:bg-secondary border-b cursor-pointer`}>
//             <div className="flex flex-wrap gap-3 px-3 pt-4 pb-1 justify-between items-center">
//               <Skeleton className="w-[100px] h-5 rounded-full" />
//               <Skeleton className="w-[200px] h-5 rounded-full" />
//               <Skeleton className="w-[100px] h-5 rounded-full mb-4" />
//             </div>
//           </div>
//         ) : (
//           <>
//             {emails.map((email, index) => (
//               <div
//                 key={email.id}
//                 onClick={() => handleEmailClick(index, email.threadId)}
//                 className={`${
//                   selectedThreadId === email.threadId
//                     ? "border-l-2 md:border-l-blue-500 border-l-transparent"
//                     : "border-l-2 border-l-transparent"
//                 } hover:bg-secondary border-b cursor-pointer`}
//               >
//                 <div className="flex flex-wrap px-3 pt-4 pb-1 justify-between items-center">
//                   <h1 className="font-medium">{email.fromEmail}</h1>
//                   <div className="text-primary/50 text-sm font-medium dark:font-normal">
//                     {new Date(email.sentAt).toLocaleDateString("en-US", {
//                       day: "numeric",
//                       month: "short",
//                     })}
//                   </div>
//                 </div>
//                 <p className="truncate font-medium dark:font-normal px-3 text-sm text-primary/60">
//                   {email.subject}
//                 </p>
//                 <div className="pb-5 px-3 pt-2">
//                   <Badge variant="secondary">
//                     <div className="w-3.5 h-3.5 bg-[#57E0A6]/20 mr-1 rounded-full flex justify-center items-center">
//                       <div className="w-1.5 h-1.5 bg-[#57E0A6] rounded-full"></div>
//                     </div>
//                     Interested
//                   </Badge>
//                 </div>
//               </div>
//             ))}
//           </>
//         )}
//       </div>
//       <div className="absolute dark:bg-background bg-secondary h-full pt-24 px-5 top-0 right-0 xl:w-3/4 lg:w-2/3 md:w-1/2 md:grid hidden">
//         {selectedThreadId ? (
//           loadingMessages ? (
//             <div className="p-4 border flex flex-col gap-3 rounded-md shadow bg-card h-fit">
//               <Skeleton className="w-[300px] h-5 rounded-full mb-2" />
//               <Skeleton className="w-[120px] h-5 rounded-full" />
//               <Skeleton className="w-[140px] h-5 rounded-full" />
//               <div className="mt-3 flex flex-col gap-2">
//                 <Skeleton className="w-[400px] h-5 rounded-full" />
//                 <Skeleton className="w-[350px] h-5 rounded-full" />
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-5">
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className="p-4 border flex flex-col gap-2 rounded-md shadow bg-card"
//                 >
//                   <div className="flex justify-between gap-5 flex-wrap">
//                     <h1 className="font-semibold text-lg">{message.subject}</h1>
//                     <p className="text-sm tracking-wide text-primary/60 font-medium dark:font-normal">
//                       {new Date(message.sentAt).toLocaleDateString("en-US", {
//                         day: "numeric",
//                         month: "long",
//                         year: "numeric",
//                       })}{" "}
//                       :{" "}
//                       {new Date(message.sentAt).toLocaleTimeString("en-US", {
//                         hour: "numeric",
//                         minute: "numeric",
//                         hour12: true,
//                       })}
//                     </p>
//                   </div>
//                   <p className="text-primary/60 font-medium dark:font-normal">
//                     From: {message.fromEmail}
//                   </p>
//                   <p className="text-primary/60 font-medium dark:font-normal">
//                     To: {message.toEmail}
//                   </p>
//                   <div
//                     className="mt-3 text-sm leading-6 tracking-wide text-primary/85 font-medium dark:font-normal"
//                     dangerouslySetInnerHTML={{ __html: message.body }}
//                   />
//                 </div>
//               ))}
//             </div>
//           )
//         ) : (
//           <div className="flex justify-center items-center min-h-[85dvh] w-full">
//             <div className="flex justify-center items-center flex-col w-full gap-9">
//               <Image
//                 src={"/images/mail.svg"}
//                 className="w-60 md:w-80 h-48 md:h-60 rounded-sm"
//                 alt="logo"
//                 width={500}
//                 height={500}
//               />
//               <h1 className="md:text-2xl text-xl text-center font-semibold">
//                 It&apos;s the beginning of a legendary sales pipeline
//               </h1>
//               <div className="md:text-lg text-base text-center text-primary/50">
//                 <p>Select an email to view</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmailList;

// "use client";

// import { Input } from "@/components/ui/input";
// import { useEffect, useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import Image from "next/image";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { MailX } from "lucide-react";

// interface Email {
//   id: number;
//   fromName: string;
//   fromEmail: string;
//   toName: string;
//   toEmail: string;
//   subject: string;
//   body: string;
//   isRead: boolean;
//   sentAt: string;
//   threadId: number;
//   status: string;
//   campaignName: string;
// }

// interface Message {
//   id: number;
//   fromName: string;
//   fromEmail: string;
//   toEmail: string;
//   subject: string;
//   body: string;
//   sentAt: string;
//   cc: string;
// }

// const EmailList = () => {
//   const [emails, setEmails] = useState<Email[]>([]);
//   const [selectedThreadId, setSelectedThreadId] = useState<number | null>(null);
//   const [selectedEmailIndex, setSelectedEmailIndex] = useState<number | null>(
//     null
//   );
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [, setFilteredEmails] = useState<Email[]>([]);

//   useEffect(() => {
//     const fetchEmails = async () => {
//       const apiUrl = "https://hiring.reachinbox.xyz/api/v1/onebox/list";
//       const token = localStorage.getItem("jwtToken");

//       try {
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch emails");
//         }

//         const data = await response.json();
//         setEmails(data.data);
//         setFilteredEmails(data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchEmails();
//   }, []);

//   const fetchMessages = async (threadId: number) => {
//     setLoadingMessages(true);
//     const apiUrl = `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`;
//     const token = localStorage.getItem("jwtToken");

//     try {
//       const response = await fetch(apiUrl, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch messages");
//       }

//       const data = await response.json();
//       setMessages(data.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoadingMessages(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!selectedThreadId) return;
//     const apiUrl = `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${selectedThreadId}`;
//     const token = localStorage.getItem("jwtToken");

//     try {
//       const response = await fetch(apiUrl, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete the email.");
//       }

//       setEmails((prevEmails) =>
//         prevEmails.filter((email) => email.threadId !== selectedThreadId)
//       );
//       setSelectedThreadId(null);
//       setMessages([]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleEmailClick = (index: number, threadId: number) => {
//     setSelectedEmailIndex(index);
//     setSelectedThreadId(threadId);
//     fetchMessages(threadId);
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     const filtered = emails.filter(
//       (email) =>
//         email.fromEmail.toLowerCase().includes(query) ||
//         email.subject.toLowerCase().includes(query) ||
//         email.body.toLowerCase().includes(query)
//     );
//     setFilteredEmails(filtered);
//   };

//   return (
//     <div>
//       <div className="absolute dark:bg-background bg-card top-0 left-0 pl-20 pt-20 border-r xl:w-1/4 lg:w-1/3 md:w-1/2 w-full h-full pr-4">
//         <h2 className="text-2xl pt-4 pb-2 text-blue-500 font-semibold">
//           All Inbox(s)
//         </h2>
//         <div className="pb-5 flex items-center gap-1">
//           <p className="font-bold">
//             {selectedEmailIndex !== null
//               ? `${selectedEmailIndex + 1}/${emails.length}`
//               : `0/${emails.length}`}
//           </p>
//           <p className="text-primary/60">Inboxes selected</p>
//         </div>

//         <Input
//           type="text"
//           placeholder="Search"
//           value={searchQuery}
//           onChange={handleSearch}
//           className="mb-4"
//         />

//         {emails.length === 0 ? (
//           <div className={`hover:bg-secondary border-b cursor-pointer`}>
//             <div className="flex flex-wrap gap-3 px-3 pt-4 pb-1 justify-between items-center">
//               <Skeleton className="w-[100px] h-5 rounded-full" />
//               <Skeleton className="w-[200px] h-5 rounded-full" />
//               <Skeleton className="w-[100px] h-5 rounded-full mb-4" />
//             </div>
//           </div>
//         ) : (
//           <>
//             {emails.map((email, index) => (
//               <div
//                 key={email.id}
//                 onClick={() => handleEmailClick(index, email.threadId)}
//                 className={`${
//                   selectedThreadId === email.threadId
//                     ? "border-l-2 md:border-l-blue-500 border-l-transparent"
//                     : "border-l-2 border-l-transparent"
//                 } hover:bg-secondary border-b cursor-pointer`}
//               >
//                 <div className="flex flex-wrap px-3 pt-4 pb-1 justify-between items-center">
//                   <h1 className="font-medium">{email.fromEmail}</h1>
//                   <div className="text-primary/50 text-sm font-medium dark:font-normal">
//                     {new Date(email.sentAt).toLocaleDateString("en-US", {
//                       day: "numeric",
//                       month: "short",
//                     })}
//                   </div>
//                 </div>
//                 <p className="truncate font-medium dark:font-normal px-3 text-sm text-primary/60">
//                   {email.subject}
//                 </p>
//                 <div className="pb-5 p-3 flex justify-between">
//                   <Badge variant="secondary">
//                     <div className="w-3.5 h-3.5 bg-[#57E0A6]/20 mr-1 rounded-full flex justify-center items-center">
//                       <div className="w-1.5 h-1.5 bg-[#57E0A6] rounded-full"></div>
//                     </div>
//                     Interested
//                   </Badge>
//                   {selectedThreadId !== null && (
//                     <AlertDialog>
//                       <AlertDialogTrigger asChild>
//                         <button className="text-red-600">
//                           <MailX className="w-5 h-5" />
//                         </button>
//                       </AlertDialogTrigger>
//                       <AlertDialogContent>
//                         <AlertDialogHeader>
//                           <AlertDialogTitle>
//                             Are you absolutely sure?
//                           </AlertDialogTitle>
//                           <AlertDialogDescription>
//                             This action cannot be undone. This will permanently
//                             delete the selected email and remove it from the
//                             list.
//                           </AlertDialogDescription>
//                         </AlertDialogHeader>
//                         <AlertDialogFooter>
//                           <AlertDialogCancel>Cancel</AlertDialogCancel>
//                           <AlertDialogAction onClick={handleDelete}>
//                             Continue
//                           </AlertDialogAction>
//                         </AlertDialogFooter>
//                       </AlertDialogContent>
//                     </AlertDialog>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </>
//         )}
//       </div>
//       <div className="absolute dark:bg-background bg-secondary h-full pt-24 px-5 top-0 right-0 xl:w-3/4 lg:w-2/3 md:w-1/2 md:grid hidden">
//         {selectedThreadId ? (
//           loadingMessages ? (
//             <div className="p-4 border flex flex-col gap-3 rounded-md shadow bg-card h-fit">
//               <Skeleton className="w-[300px] h-5 rounded-full mb-2" />
//               <Skeleton className="w-[120px] h-5 rounded-full" />
//               <Skeleton className="w-[140px] h-5 rounded-full" />
//               <div className="mt-3 flex flex-col gap-2">
//                 <Skeleton className="w-[400px] h-5 rounded-full" />
//                 <Skeleton className="w-[350px] h-5 rounded-full" />
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-5">
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className="p-4 border flex flex-col gap-2 rounded-md shadow bg-card"
//                 >
//                   <div className="flex justify-between gap-5 flex-wrap">
//                     <h1 className="font-semibold text-lg">{message.subject}</h1>
//                     <p className="text-sm tracking-wide text-primary/60 font-medium dark:font-normal">
//                       {new Date(message.sentAt).toLocaleDateString("en-US", {
//                         day: "numeric",
//                         month: "long",
//                         year: "numeric",
//                       })}{" "}
//                       :{" "}
//                       {new Date(message.sentAt).toLocaleTimeString("en-US", {
//                         hour: "numeric",
//                         minute: "numeric",
//                         hour12: true,
//                       })}
//                     </p>
//                   </div>
//                   <p className="text-primary/60 font-medium dark:font-normal">
//                     From: {message.fromEmail}
//                   </p>
//                   <p className="text-primary/60 font-medium dark:font-normal">
//                     To: {message.toEmail}
//                   </p>
//                   <div
//                     className="mt-3 text-sm leading-6 tracking-wide text-primary/85 font-medium dark:font-normal"
//                     dangerouslySetInnerHTML={{ __html: message.body }}
//                   />
//                 </div>
//               ))}
//             </div>
//           )
//         ) : (
//           <div className="flex justify-center items-center min-h-[85dvh] w-full">
//             <div className="flex justify-center items-center flex-col w-full gap-9">
//               <Image
//                 src={"/images/mail.svg"}
//                 className="w-60 md:w-80 h-48 md:h-60 rounded-sm"
//                 alt="logo"
//                 width={500}
//                 height={500}
//               />
//               <h1 className="md:text-2xl text-xl text-center font-semibold">
//                 It&apos;s the beginning of a legendary sales pipeline
//               </h1>
//               <div className="md:text-lg text-base text-center text-primary/50">
//                 <p>Select an email to view</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmailList;

"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

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
  threadId: number;
  status: string;
  campaignName: string;
}

interface Message {
  id: number;
  fromName: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  body: string;
  sentAt: string;
  cc: string;
}

const EmailList = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<number | null>(null);
  const [selectedEmailIndex, setSelectedEmailIndex] = useState<number | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [, setFilteredEmails] = useState<Email[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmails = async () => {
      const apiUrl = "https://hiring.reachinbox.xyz/api/v1/onebox/list";
      const token = localStorage.getItem("jwtToken");

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch emails");
        }

        const data = await response.json();
        setEmails(data.data);
        setFilteredEmails(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmails();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "d" || event.key === "D") {
        if (selectedThreadId !== null) {
          setShowDeleteDialog(true);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedThreadId]);

  const fetchMessages = async (threadId: number) => {
    setLoadingMessages(true);
    const apiUrl = `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`;
    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleEmailClick = (index: number, threadId: number) => {
    setSelectedEmailIndex(index);
    setSelectedThreadId(threadId);
    fetchMessages(threadId);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = emails.filter(
      (email) =>
        email.fromEmail.toLowerCase().includes(query) ||
        email.subject.toLowerCase().includes(query) ||
        email.body.toLowerCase().includes(query)
    );
    setFilteredEmails(filtered);
  };

  const handleDeleteEmail = async () => {
    if (selectedThreadId === null) return;

    const apiUrl = `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${selectedThreadId}`;
    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the email");
      }

      setEmails(emails.filter((email) => email.threadId !== selectedThreadId));
      setSelectedThreadId(null);
    } catch (error) {
      console.log(error);
    } finally {
      setShowDeleteDialog(false);
    }
  };

  return (
    <div>
      <div className="absolute dark:bg-background bg-card top-0 left-0 pl-20 pt-20 border-r xl:w-1/4 lg:w-1/3 md:w-1/2 w-full h-full pr-4">
        <h2 className="text-2xl pt-4 pb-2 text-blue-500 font-semibold">
          All Inbox(s)
        </h2>
        <div className="pb-5 flex items-center gap-1">
          <p className="font-bold">
            {selectedEmailIndex !== null
              ? `${selectedEmailIndex + 1}/${emails.length}`
              : `0/${emails.length}`}
          </p>
          <p className="text-primary/60">Inboxes selected</p>
        </div>

        <Input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="mb-4"
        />

        {emails.length === 0 ? (
          <div className={`hover:bg-secondary border-b cursor-pointer`}>
            <div className="flex flex-wrap gap-3 px-3 pt-4 pb-1 justify-between items-center">
              <Skeleton className="w-[100px] h-5 rounded-full" />
              <Skeleton className="w-[200px] h-5 rounded-full" />
              <Skeleton className="w-[100px] h-5 rounded-full mb-4" />
            </div>
          </div>
        ) : (
          <>
            {emails.map((email, index) => (
              <div
                key={email.id}
                onClick={() => handleEmailClick(index, email.threadId)}
                className={`${
                  selectedThreadId === email.threadId
                    ? "border-l-2 md:border-l-blue-500 border-l-transparent"
                    : "border-l-2 border-l-transparent"
                } hover:bg-secondary border-b cursor-pointer`}
              >
                <div className="flex flex-wrap px-3 pt-4 pb-1 justify-between items-center">
                  <h1 className="font-medium">{email.fromEmail}</h1>
                  <div className="text-primary/50 text-sm font-medium dark:font-normal">
                    {new Date(email.sentAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                </div>
                <p className="truncate font-medium dark:font-normal px-3 text-sm text-primary/60">
                  {email.subject}
                </p>
                <div className="pb-5 px-3 pt-2">
                  <Badge variant="secondary">
                    <div className="w-3.5 h-3.5 bg-[#57E0A6]/20 mr-1 rounded-full flex justify-center items-center">
                      <div className="w-1.5 h-1.5 bg-[#57E0A6] rounded-full"></div>
                    </div>
                    Interested
                  </Badge>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="absolute dark:bg-background bg-secondary h-full pt-24 px-5 top-0 right-0 xl:w-3/4 lg:w-2/3 md:w-1/2 md:grid hidden">
        {selectedThreadId ? (
          loadingMessages ? (
            <div className="p-4 border flex flex-col gap-3 rounded-md bg-card h-fit">
              <Skeleton className="w-[100px] h-5 rounded-full mb-2" />
              <Skeleton className="w-[120px] h-5 rounded-full" />
              <Skeleton className="w-[140px] h-5 rounded-full" />
              <div className="mt-3 flex flex-col gap-2">
                <Skeleton className="w-[100px] h-5 rounded-full" />
                <Skeleton className="w-[150px] h-5 rounded-full" />
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="p-4 border flex flex-col gap-2 rounded-md bg-card"
                >
                  <div className="flex justify-between gap-5 flex-wrap">
                    <h1 className="font-semibold text-lg">{message.subject}</h1>
                    <p className="text-sm tracking-wide text-primary/60 font-medium dark:font-normal">
                      {new Date(message.sentAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      :{" "}
                      {new Date(message.sentAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </p>
                  </div>
                  <p className="text-primary/60 font-medium dark:font-normal">
                    From: {message.fromEmail}
                  </p>
                  <p className="text-primary/60 font-medium dark:font-normal">
                    To: {message.toEmail}
                  </p>
                  <div
                    className="mt-3 text-sm leading-6 tracking-wide text-primary/85 font-medium dark:font-normal"
                    dangerouslySetInnerHTML={{ __html: message.body }}
                  />
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="flex justify-center items-center min-h-[85dvh] w-full">
            <div className="flex justify-center items-center flex-col w-full gap-9">
              <Image
                src={"/images/mail.svg"}
                className="w-60 md:w-80 h-48 md:h-60 rounded-sm"
                alt="logo"
                width={500}
                height={500}
              />
              <h1 className="md:text-2xl text-xl text-center font-semibold">
                It&apos;s the beginning of a legendary sales pipeline
              </h1>
              <div className="md:text-lg text-base text-center text-primary/50">
                <p>Select an email to view</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="flex flex-col gap-10">
          <AlertDialogHeader className="flex justify-center items-center w-full gap-5">
            <AlertDialogTitle className="text-3xl">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Your selected email will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full text-lg px-10 font-normal bg-secondary text-secondary-foreground hover:bg-secondary/80">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-full text-lg px-10 font-normal bg-gradient-to-tr from-[#FA5252] to-[#A91919] text-white hover:from-[#FA5252]/80 hover:to-[#A91919]/80"
              onClick={handleDeleteEmail}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmailList;
