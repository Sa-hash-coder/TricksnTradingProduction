"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

function ApplyRedirector() {
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const jobId = searchParams.get("job_id") || "";
    const country = searchParams.get("country") || "";
    
    // Redirect to home page with query parameters and scroll to lead forms
    window.location.replace(`/?country=${encodeURIComponent(country)}&job_id=${encodeURIComponent(jobId)}#job-seeker`);
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center gap-4 text-center max-w-sm">
      <span className="w-10 h-10 rounded-full border-4 border-[#B89B72] border-t-transparent animate-spin" />
      <h2 className="text-xl font-bold tracking-tight text-[#F4F1EA]">Redirecting to Application Form</h2>
      <p className="text-[#B8B2A7] text-sm">
        Securing your application channel. Please wait while we load the recruitment form...
      </p>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-[#F4F1EA] px-4 font-sans">
      <React.Suspense fallback={
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <span className="w-10 h-10 rounded-full border-4 border-[#B89B72] border-t-transparent animate-spin" />
          <h2 className="text-xl font-bold tracking-tight text-[#F4F1EA]">Loading Secure Portal</h2>
          <p className="text-[#B8B2A7] text-sm">
            Initializing your application connection...
          </p>
        </div>
      }>
        <ApplyRedirector />
      </React.Suspense>
    </div>
  );
}
