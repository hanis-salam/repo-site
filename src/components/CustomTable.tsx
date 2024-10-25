import { Repo } from "@/types/Repo";
import Link from "next/link";
import { FC } from "react";

interface RepositoriesTableProps {
  repositories: Repo[];
}

const CustomTable: FC<RepositoriesTableProps> = ({ repositories }) => {
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-2 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Owner Name</th>
                <th className="px-4 py-3">Repo URL</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {repositories.map((repo) => (
                <tr key={repo.id} className="text-gray-700">
                  <td className="px-4 py-2 border">
                    <div className="flex items-center text-sm">
                      <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={repo.owner.avatar_url}
                          alt={repo.owner.login}
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <Link
                          href={`/user-details/${repo.owner.login}`}
                          passHref
                        >
                          <p className="font-semibold text-black cursor-pointer">
                            {repo.owner.login}
                          </p>
                        </Link>
                        <p className="text-xs text-gray-600">
                          Repo: {repo.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.html_url}
                    </a>
                  </td>

                  <td className="px-4 py-3 text-sm border">
                    {repo.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CustomTable;
