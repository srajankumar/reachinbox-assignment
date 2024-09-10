"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
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
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Baseline, Code, ImageIcon, Link2, Smile, User } from "lucide-react";

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
  const [showReplyDialog, setShowReplyDialog] = useState<boolean>(false); // Reply dialog state
  const [replyBody, setReplyBody] = useState<string>("");

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
      if (event.key === "r" || event.key === "R") {
        if (selectedThreadId !== null) {
          setShowReplyDialog(true);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedThreadId, messages]);

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

  const handleReplySubmit = async () => {
    const apiUrl = `https://hiring.reachinbox.xyz/api/v1/onebox/reply/${selectedThreadId}`;
    const token = localStorage.getItem("jwtToken");
    const selectedEmail = emails[selectedEmailIndex!];

    const body = {
      toName: selectedEmail.toName,
      to: selectedEmail.toEmail,
      from: selectedEmail.fromEmail,
      fromName: selectedEmail.fromName,
      subject: `Re: ${selectedEmail.subject}`,
      body: replyBody,
      references: messages.map((msg) => msg.id),
      inReplyTo: messages[messages.length - 1]?.id,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to send the reply");
      }

      setShowReplyDialog(false);
      setReplyBody("");
    } catch (error) {
      console.log(error);
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
            <ScrollArea className="h-full">
              <div className="space-y-5 pb-20">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="p-4 mb-5 border flex flex-col gap-2 rounded-md bg-card"
                  >
                    <div className="flex justify-between gap-5 flex-wrap">
                      <h1 className="font-semibold text-lg">
                        {message.subject}
                      </h1>
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
            </ScrollArea>
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
        {selectedEmailIndex !== null && !showReplyDialog && (
          <Button
            className="absolute bottom-5 left-5 flex justify-center items-center gap-1 px-5"
            onClick={() => setShowReplyDialog(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10 9V5l-7 7l7 7v-4.1c5 0 8.5 1.6 11 5.1c-1-5-4-10-11-11"
              />
            </svg>
            <p className="text-base">Reply</p>
          </Button>
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

      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Reply to {emails[selectedEmailIndex!]?.fromEmail}
            </DialogTitle>
          </DialogHeader>
          <form>
            <div className="space-y-4">
              <Separator />
              <div className="flex gap-2">
                <div className="text-primary/60 font-medium dark:font-normal">
                  To:{" "}
                </div>
                <div>{emails[selectedEmailIndex!]?.fromEmail}</div>
              </div>
              <Separator />
              <div className="flex gap-2">
                <div className="text-primary/60 font-medium dark:font-normal">
                  From:{" "}
                </div>
                <div>{emails[selectedEmailIndex!]?.toEmail}</div>
              </div>
              <Separator />
              <div className="flex gap-2">
                <div className="text-primary/60 font-medium dark:font-normal">
                  Subject:{" "}
                </div>
                <div>{`Re: ${emails[selectedEmailIndex!]?.subject}`}</div>
              </div>
              <Textarea
                rows={5}
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                placeholder="Write your reply..."
              />
            </div>
          </form>
          <DialogFooter>
            <Button className="flex gap-3" onClick={handleReplySubmit}>
              <div>Send</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 15 15"
              >
                <path fill="currentColor" d="M7.5 12L0 4h15z" />
              </svg>
            </Button>
            <Button variant="ghost" className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z"
                />
              </svg>
              <div>Variables</div>
            </Button>
            <Button variant="ghost" className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.5 133.5 0 0 1 25 128a133.3 133.3 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.5 133.5 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32"
                />
              </svg>
              <div>Preview Email</div>
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <Baseline />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <Link2 />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <ImageIcon />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <Smile />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <User />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <Code />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailList;
