"use client";
import CustomTable from "@/components/CustomTable";
import { Repo } from "@/types/Repo";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [repositories, setRepositories] = useState<Repo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10; // depends how many repos per page

  useEffect(() => {
    const fetchRepositories = async () => {
      setLoading(true);
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const res = await fetch(`https://api.github.com/repositories`, {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        const data = await res.json();
        setRepositories(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepositories();
  }, []);

  // Handle pagination
  const paginatedRepositories = repositories
    .filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.owner.login.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <>
      <div className="flex flex-wrap justify-between items-center">
        <div className="min-w-full mb-2 ">
          <p className="font-semibold text-2xl ">List of User</p>
        </div>

        {/* Search Bar */}
        <input
          className="h-full w-full  text-gray-700 p-2 border-gray-300 border-2 rounded-xl"
          type="text"
          placeholder="Search by repo name or owner..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          {/* Table */}
          <CustomTable repositories={paginatedRepositories} />

          {/* Pagination */}
          <div className="flex flex-wrap justify-between items-center px-6 text-gray-500">
            <span>Showing {`Page ${currentPage} of ${totalPages}`}</span>
            <div>
              {currentPage === 1 ? (
                ""
              ) : (
                <button
                  onClick={handlePreviousPage}
                  className="hover:text-black p-4"
                >
                  Previous
                </button>
              )}
              {currentPage === totalPages ? (
                ""
              ) : (
                <button
                  onClick={handleNextPage}
                  className="hover:text-black p-4"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
