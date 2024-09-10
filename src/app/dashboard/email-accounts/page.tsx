"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Ellipsis, Flame } from "lucide-react";

interface EmailAccount {
  name: string;
  emails_sent: string;
  warmup_emails: string;
  health_score: string;
}

interface DecodedToken {
  user: {
    email: string;
    id: number;
    firstName: string;
    lastName: string;
  };
  iat: number;
  exp: number;
}

const dummyEmails: Omit<EmailAccount, "name">[] = [
  {
    emails_sent: "0 of 50",
    warmup_emails: "7",
    health_score: "100%",
  },
];

const EmailAccounts = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredEmails, setFilteredEmails] = useState<EmailAccount[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const { email } = decoded.user;
        setEmail(email);
      } catch (error) {
        console.error("Failed to decode JWT token", error);
      }
    }
  }, []);

  useEffect(() => {
    if (email) {
      const combinedEmails = dummyEmails.map((account) => ({
        name: email, // Use email from JWT token
        ...account,
      }));
      setFilteredEmails(combinedEmails);
    }
  }, [email]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handleSearch = () => {
    const filtered = filteredEmails.filter((emailAccount) =>
      emailAccount.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEmails(filtered);
  };

  const totalCount = filteredEmails.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredEmails.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (endIndex < totalCount) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pt-2">
      <div>
        <div className="flex w-full items-center pb-10">
          <Input
            placeholder="Search"
            className="max-w-sm"
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button className="ml-4" onClick={handleSearch}>
            Search
          </Button>
        </div>

        <div className="rounded-md border w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Emails Sent</TableHead>
                <TableHead>Warmup Emails</TableHead>
                <TableHead>Health Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((track, index) => (
                <TableRow key={index}>
                  <TableCell>{track.name}</TableCell>
                  <TableCell>{track.emails_sent}</TableCell>
                  <TableCell>{track.warmup_emails}</TableCell>
                  <TableCell>{track.health_score}</TableCell>
                  <TableCell className="flex justify-center items-center gap-2">
                    <Flame className="w-5 h-5 text-[#00e09d]" />
                    <Ellipsis className="w-5 h-5" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between w-full space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {startIndex + 1} - {Math.min(endIndex, totalCount)} of{" "}
            {totalCount} Accounts
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={endIndex >= totalCount}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailAccounts;
