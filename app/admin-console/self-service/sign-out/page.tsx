"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SignOutPage() {
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRedirecting(true);
          // Simulate redirect after countdown
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/admin-console/self-service">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-gray-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Self Service
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-[#EE5A37]">Sign Out</h1>
            <p className="text-sm text-gray-600 mt-1">
              Securely signing you out of the system
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Sign Out Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Sign Out Status */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#EE5A37] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <LogOut className="h-6 w-6 text-[#EE5A37]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Signing Out
                    </h2>
                    <p className="text-sm text-gray-600">
                      Please wait while we securely log you out
                    </p>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      Session data cleared
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      Authentication tokens revoked
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      Security cleanup completed
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {isRedirecting ? (
                      <svg
                        className="h-5 w-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-[#EE5A37] animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    <span className="text-sm text-gray-700">
                      {isRedirecting
                        ? "Redirecting to login page..."
                        : "Preparing redirect..."}
                    </span>
                  </div>
                </div>
              </div>

              {/* Countdown Card */}
              <div className="bg-[#EE5A37] bg-opacity-5 rounded-lg border border-[#EE5A37] border-opacity-20 p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#EE5A37] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-[#EE5A37]">
                      {countdown}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Automatic Redirect
                  </h3>
                  <p className="text-sm text-gray-600">
                    You will be redirected to the login page in{" "}
                    <span className="font-semibold text-[#EE5A37]">
                      {countdown}
                    </span>{" "}
                    {countdown === 1 ? "second" : "seconds"}
                  </p>
                </div>
              </div>

              {/* Manual Actions */}
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link href="/login" className="block">
                    <Button className="w-full bg-[#EE5A37] hover:bg-[#d14d2a] text-white">
                      Go to Login Page Now
                    </Button>
                  </Link>
                  <Link href="/admin-console/self-service" className="block">
                    <Button variant="outline" className="w-full">
                      Return to Self Service Console
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Information */}
            <div className="space-y-6">
              {/* Security Information */}
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Security Information
                </h3>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="h-5 w-5 text-green-600 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <h4 className="font-medium text-green-800">
                          Secure Sign Out
                        </h4>
                        <p className="text-sm text-green-700 mt-1">
                          Your session has been securely terminated and all
                          authentication tokens have been revoked.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs font-bold">i</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800">
                          Data Protection
                        </h4>
                        <p className="text-sm text-blue-700 mt-1">
                          All sensitive data has been cleared from your browser
                          session for your security.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session Summary */}
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Session Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">User:</span>
                    <span className="text-sm font-medium text-gray-900">
                      Pratham Jain
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Last Access:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">
                      Session Duration:
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      2h 34m
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">
                      Sign Out Time:
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Help & Support */}
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Need Help?
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    If you're experiencing issues with signing out or need
                    assistance, please contact support.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Contact Support
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Help Documentation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">
                SECURITY NOTICE
              </h4>
              <p className="text-sm text-yellow-700 leading-relaxed">
                For your security, please ensure you have completely signed out
                before leaving this computer. If you are using a shared or
                public computer, consider clearing your browser's cache and
                cookies.
              </p>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="text-xs text-gray-500">
                <p>
                  Copyright © 2000 - 2025 by Cadient LLC. All rights reserved.
                </p>
                <p className="mt-1">
                  U. S. Patents 7,080,057; 7,310,626; 7,558,767; 7,562,059;
                  7,472,097; 7,606,778; 8,086,558 and 8,046,251.
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">
                  Secure Sign Out Process v2.1
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
