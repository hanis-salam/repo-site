import React, { useEffect, useState } from "react";
import { Follower } from "@/types/Follower";

interface FollowerListProps {
  followersUrl: string;
}

const FollowerList: React.FC<FollowerListProps> = ({ followersUrl }) => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchFollowers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${followersUrl}?page=${page}&per_page=30`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data: Follower[] = await response.json();

      if (data.length < 30) {
        setHasMore(false);
      }

      setFollowers((prevFollowers) => {
        const uniqueFollowers = data.filter(
          (follower) => !prevFollowers.some((prev) => prev.id === follower.id)
        );
        return [...prevFollowers, ...uniqueFollowers];
      });

      console.log("Fetched page:", page, "Data length:", data.length); // Log page and data length for debugging
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchFollowers();
    }
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        if (hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loading]);

  if (loading && page === 1) {
    return <p>Loading followers...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-bold">Followers</h2>
      <ul>
        {followers.map((follower, index) => (
          <li key={index} className="flex flex-wrap items-center space-x-2 p-2">
            <img
              src={follower.avatar_url}
              alt={follower.login}
              className="w-16 h-16 rounded-full"
            />
            <div className="text-wrap ">
              <p>{follower.login}</p>
              <p className="break-all">{follower.repos_url}</p>
            </div>
          </li>
        ))}
      </ul>
      {loading && <p>Loading more followers...</p>}
      {!hasMore && !loading && <p className="text-gray-500">End of data.</p>}
    </div>
  );
};

export default FollowerList;
