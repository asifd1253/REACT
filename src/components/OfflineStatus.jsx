import React from "react";

const OfflineStatus = () => {
  return (
    <div className="m-4 flex min-h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-lg">
        {/* Offline Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">
          📡
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-2xl font-extrabold text-slate-900">
          You are offline
        </h1>

        {/* Message */}
        <p className="mt-3 text-sm leading-6 text-slate-500">
          It looks like you are not connected to the internet. Please check your
          network connection and try again.
        </p>

        {/* Status */}
        <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-sm font-semibold text-red-600">Offline</span>
        </div>

        {/* Refresh */}
        <button
          onClick={() => window.location.reload()}
          className="mt-6 cursor-pointer rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default OfflineStatus;
