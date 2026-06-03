import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="section-label">404</p>
        <h1 className="section-heading">Page Not Found</h1>
        <p className="mt-4 text-industrial-light">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href={`${siteConfig.url}/en`}
          className="mt-8 inline-block border border-accent bg-accent/10 px-6 py-3 text-sm font-semibold text-accent hover:bg-accent hover:text-industrial-dark"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
