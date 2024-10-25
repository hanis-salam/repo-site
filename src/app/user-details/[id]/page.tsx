"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams
import { Owner } from "@/types/Owner";
import FollowerList from "@/components/FollowerList";

const UserDetails = () => {
  const [user, setUser] = useState<Owner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams(); // Use useParams to extract the dynamic id from the URL

  useEffect(() => {
    if (id) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`https://api.github.com/users/${id}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          setUser(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-6 font-mono">
      {user ? (
        <div>
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.login}</h1>
              <p>{user.email}</p>
              <p>
                <a href={user.blog} target="_blank">
                  View Blog
                </a>
              </p>
            </div>
          </div>
          <FollowerList followersUrl={user.followers_url} />
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserDetails;
