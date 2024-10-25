"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Breadcrumb: React.FC = () => {
  const pathname = usePathname(); // Get current path

  // Split pathname into parts
  const pathParts = pathname.split("/").filter(Boolean);

  const getBreadcrumbs = () => {
    if (pathParts.length === 0) {
      return (
        <li>
          <Link href="/" className="p-2 text-white rounded">
            Home
          </Link>
        </li>
      );
    }

    return (
      <>
        {/* Home breadcrumb */}
        <li>
          <Link href="/" className="p-2 text-white rounded">
            Home
          </Link>
          <span className="text-white"> / </span>
        </li>

        {/* Loop through the path parts to generate the breadcrumb trail */}
        {pathParts.map((part, index) => {
          const href = "/" + pathParts.slice(0, index + 1).join("/");

          // Check if it's the last part (current page) and disable the link
          const isLast = index === pathParts.length - 1;

          return (
            <li key={href}>
              {!isLast ? (
                <>
                  <Link href={href} className="p-2 text-white rounded">
                    {part.charAt(0) + part.slice(1)}
                  </Link>
                  <span className="text-white"> / </span>
                </>
              ) : (
                <span className="p-2 text-gray-300">
                  {part.charAt(0).toUpperCase() + part.slice(1)}
                </span>
              )}
            </li>
          );
        })}
      </>
    );
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="text-white flex list-none font-bold">
        {getBreadcrumbs()}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
