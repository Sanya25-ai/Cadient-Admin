"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);

  // Change password form states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  // Forgot password form states
  const [username, setUsername] = useState("");
  const [securityAnswer1, setSecurityAnswer1] = useState("");
  const [securityAnswer2, setSecurityAnswer2] = useState("");
  const [showIncorrectAnswers, setShowIncorrectAnswers] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate login process
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Show change password screen instead of logging in
      setShowChangePassword(true);
      toast({ title: "Please change your password to continue" });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login error",
        description: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    setChangePasswordLoading(true);
    setErrorMessage(""); // Clear previous errors

    try {
      console.log("Save button clicked - Processing password change...");

      // Simulate password change
      await new Promise((resolve) => {
        setTimeout(() => {
          console.log("Password change successful");
          resolve(true);
        }, 1000);
      });

      toast({
        title: "Password Changed Successfully!",
        description: "You will now be redirected to the dashboard.",
      });

      // Set a default user in auth context
      login({
        id: "bypass-user-1",
        name: "Bypass User",
        email: "user@example.com",
      });

      // Small delay to ensure toast is visible, then redirect to dashboard
      setTimeout(() => {
        console.log("Redirecting to dashboard...");
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Password change error:", error);
      toast({
        variant: "destructive",
        title: "Password Change Failed",
        description: "Please try again.",
      });
    } finally {
      setChangePasswordLoading(false);
    }
  }

  console.log("Login page rendered (authentication bypassed)");

  return (
    <div className="relative h-screen w-full overflow-hidden flex">
      {/* Left side - Login Card Area */}
      <div className="flex-1 relative flex items-center justify-end pr-16">
        {/* Login Card - Positioned 30% from right */}
        <div
          className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl"
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 -10px 25px -5px rgba(0, 0, 0, 0.1)",
            height: showChangePassword ? "650px" : "auto",
          }}
        >
          {!showChangePassword && !showForgotPassword ? (
            // Login Form
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                  <img
                    src="/static/images/cadient-logo.png"
                    alt="Cadient Logo"
                    width={200}
                    height={60}
                    style={{ objectFit: "contain" }}
                  />
                </div>

                {/* Welcome Text */}
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-semibold text-orange-500 mb-2">
                    Welcome back!
                  </h1>
                  <p className="text-gray-600">
                    Please login enter your details.
                  </p>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 px-4 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="**********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 px-4 pr-12 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5 text-gray-400 hover:text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-gray-400 hover:text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked === true)
                      }
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-orange-500 hover:text-orange-600"
                  >
                    Forgot password
                  </button>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              {/* Footer Text */}
              <div className="mt-6 text-xs text-gray-500 text-center leading-relaxed">
                You are accessing the Cadient Talent Acquisition application
                hosted by Cadient LLC. Access to this environment is limited to
                authorized support staff. All data within this environment is
                classified as confidential. You are required to maintain the
                security, availability and confidentiality of this information
                and system when accessing this information. In the event you
                identify an issue related to security, availability or
                confidentiality of the system, please notify your help desk /
                system administrator. Thank you.
              </div>

              {/* Footer Links */}
              <div className="mt-4 text-center">
                <a
                  href="#"
                  className="text-sm text-orange-500 hover:text-orange-600 mr-4"
                >
                  About Cadient Talent
                </a>
                <span className="text-gray-400">|</span>
                <a
                  href="#"
                  className="text-sm text-orange-500 hover:text-orange-600 ml-4"
                >
                  Privacy Policy
                </a>
              </div>
            </>
          ) : showChangePassword ? (
            // Change Password Form
            <div className="flex flex-col h-full">
              {/* Header - Fixed */}
              <div className="text-center mb-6 flex-shrink-0">
                <h1 className="text-3xl font-semibold text-gray-800">
                  Change Password
                </h1>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="space-y-4 pb-4">
                  {/* Password Expired Alert */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Password Expired
                        </h3>
                        <p className="mt-1 text-sm text-yellow-700">
                          Your password has expired. Please enter a new
                          password.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Error Message Alert */}
                  {errorMessage && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-red-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            Validation Error
                          </h3>
                          <p className="mt-1 text-sm text-red-700">
                            {errorMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Current Password */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="currentPassword"
                      className="text-gray-700 font-medium"
                    >
                      * Current Password:
                    </Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="h-12 px-4 pr-12 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showCurrentPassword ? (
                          <svg
                            className="h-5 w-5 text-gray-400 hover:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5 text-gray-400 hover:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="newPassword"
                      className="text-gray-700 font-medium"
                    >
                      * New Password:
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="h-12 px-4 pr-12 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showNewPassword ? (
                          <svg
                            className="h-5 w-5 text-gray-400 hover:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5 text-gray-400 hover:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Re-Type New Password */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="retypePassword"
                      className="text-gray-700 font-medium"
                    >
                      * Re-Type New Password:
                    </Label>
                    <div className="relative">
                      <Input
                        id="retypePassword"
                        type={showRetypePassword ? "text" : "password"}
                        value={retypePassword}
                        onChange={(e) => setRetypePassword(e.target.value)}
                        className="h-12 px-4 pr-12 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowRetypePassword(!showRetypePassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showRetypePassword ? (
                          <svg
                            className="h-5 w-5 text-gray-400 hover:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5 text-gray-400 hover:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">
                      Password must meet the following:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Minimum length is 8</li>
                      <li>
                        • Must contain at least 1 special character (e.g., ! @ #
                        $ % ^ & * )
                      </li>
                      <li>• Must contain at least 1 numeric character(s)</li>
                      <li>• Must contain at least 1 uppercase character(s)</li>
                      <li>
                        • Cannot contain more than 3 of the same character in a
                        row
                      </li>
                      <li>• Maximum length is 50</li>
                      <li>• Cannot be the same as the username</li>
                      <li>
                        • Cannot be the same as any of your location numbers
                      </li>
                      <li>• Cannot be reused within 10 password changes</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Fixed Footer with Save Button */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
                <form onSubmit={handleChangePassword}>
                  <Button
                    type="submit"
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-8 py-2 rounded-lg"
                    disabled={changePasswordLoading}
                  >
                    {changePasswordLoading ? "Saving..." : "Save"}
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            // Forgot Password Form
            <div className="space-y-6">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <img
                  src="/static/images/cadient-logo.png"
                  alt="Cadient Logo"
                  width={200}
                  height={60}
                  style={{ objectFit: "contain" }}
                />
              </div>

              {/* Welcome Text */}
              <div className="text-center mb-6">
                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: "rgba(249, 115, 22, 0.08)" }}
                >
                  <h1 className="text-xl font-semibold text-orange-500 mb-2">
                    Forgot your password?
                  </h1>
                  <p className="text-gray-600">
                    Don't worry, we'll help you reset it
                  </p>
                </div>
              </div>

              {/* Content based on step */}
              {forgotPasswordStep === 1 ? (
                // Step 1: Username Entry
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm">
                    We can reset your password for you in a few easy steps.
                  </p>
                  <p className="text-gray-700 text-sm">
                    Step 1: Enter the username associated with your account
                  </p>

                  <div className="space-y-2">
                    <Label
                      htmlFor="username"
                      className="text-gray-700 font-medium"
                    >
                      Username:
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-12 px-4 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <Button
                    onClick={() => setForgotPasswordStep(2)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg"
                  >
                    Submit
                  </Button>
                </div>
              ) : (
                // Step 2: Security Questions
                <div className="space-y-4">
                  {showIncorrectAnswers && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            Incorrect Answers
                          </h3>
                          <p className="mt-1 text-sm text-yellow-700">
                            The answers you provided do not match the responses
                            on record. Please try again.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-gray-700 text-sm">
                    We can reset your password for you in a few easy steps.
                  </p>
                  <p className="text-gray-700 text-sm">
                    Step 2: Answer the following security questions (answers are
                    not case-sensitive)
                  </p>

                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">
                      Security Questions
                    </Label>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-700 text-sm mb-2">
                        What is the name of a college you applied to but didn't
                        attend?
                      </p>
                      <Input
                        type="text"
                        value={securityAnswer1}
                        onChange={(e) => setSecurityAnswer1(e.target.value)}
                        className="h-12 px-4 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <p className="text-gray-700 text-sm mb-2">
                        In what city or town did your mother and father meet?
                      </p>
                      <Input
                        type="text"
                        value={securityAnswer2}
                        onChange={(e) => setSecurityAnswer2(e.target.value)}
                        className="h-12 px-4 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      // Reset all states and go back to login
                      setShowForgotPassword(false);
                      setForgotPasswordStep(1);
                      setUsername("");
                      setSecurityAnswer1("");
                      setSecurityAnswer2("");
                      setShowIncorrectAnswers(false);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg"
                  >
                    Login &gt;
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right side - Background Image (Half screen) */}
      <div className="flex-1 relative p-8">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat rounded-3xl"
          style={{
            backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjNmNGY2O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlNWU3ZWI7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2JnKSIvPgogIDwhLS0gSGlyaW5nIFRoZW1lZCBJbGx1c3RyYXRpb24gLS0+CiAgPCEtLSBDb25mZXJlbmNlIFRhYmxlIC0tPgogIDxlbGxpcHNlIGN4PSI0MDAiIGN5PSI0NTAiIHJ4PSIzMDAiIHJ5PSI4MCIgZmlsbD0iIzM3NDE1MSIgb3BhY2l0eT0iMC4xIi8+CiAgPGVsbGlwc2UgY3g9IjQwMCIgY3k9IjQ0MCIgcng9IjI4MCIgcnk9IjcwIiBmaWxsPSIjNjY2NjY2Ii8+CiAgCiAgPCEtLSBQZW9wbGUgaW4gSW50ZXJ2aWV3IC0tPgogIDwhLS0gSW50ZXJ2aWV3ZXIgLS0+CiAgPGVsbGlwc2UgY3g9IjMwMCIgY3k9IjM4MCIgcng9IjQwIiByeT0iNjAiIGZpbGw9IiNmOTczMTYiLz4KICA8Y2lyY2xlIGN4PSIzMDAiIGN5PSIzNDAiIHI9IjMwIiBmaWxsPSIjZmZkYmI4Ii8+CiAgPCEtLSBJbnRlcnZpZXdlZSAtLT4KICA8ZWxsaXBzZSBjeD0iNTAwIiBjeT0iMzgwIiByeD0iNDAiIHJ5PSI2MCIgZmlsbD0iIzYzNjZmMSIvPgogIDxjaXJjbGUgY3g9IjUwMCIgY3k9IjM0MCIgcj0iMzAiIGZpbGw9IiNmZmRiYjgiLz4KICA8IS0tIEhSIE1hbmFnZXIgLS0+CiAgPGVsbGlwc2UgY3g9IjQwMCIgY3k9IjM3MCIgcng9IjM1IiByeT0iNTUiIGZpbGw9IiNmOTczMTYiLz4KICA8Y2lyY2xlIGN4PSI0MDAiIGN5PSIzMzAiIHI9IjI4IiBmaWxsPSIjZmZkYmI4Ii8+CiAgCiAgPCEtLSBSZXN1bWVzIC0tPgogIDxyZWN0IHg9IjI1MCIgeT0iNDEwIiB3aWR0aD0iNDAiIGhlaWdodD0iNTAiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxyZWN0IHg9IjMxMCIgeT0iNDE1IiB3aWR0aD0iNDAiIGhlaWdodD0iNTAiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxyZWN0IHg9IjQ1MCIgeT0iNDEwIiB3aWR0aD0iNDAiIGhlaWdodD0iNTAiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxyZWN0IHg9IjUxMCIgeT0iNDE1IiB3aWR0aD0iNDAiIGhlaWdodD0iNTAiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMiIvPgogIAogIDwhLS0gSm9iIFBvc3RpbmdzIC0tPgogIDxyZWN0IHg9IjEwMCIgeT0iMTAwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZjk3MzE2IiBvcGFjaXR5PSIwLjgiIHJ4PSI4Ii8+CiAgPHRleHQgeD0iMTYwIiB5PSIxMzAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0iQXJpYWwiPkpPQiBQT1NUSU5HPC90ZXh0PgogIDx0ZXh0IHg9IjE2MCIgeT0iMTUwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5Tb2Z0d2FyZSBEZXZlbG9wZXI8L3RleHQ+CiAgPHRleHQgeD0iMTYwIiB5PSIxNjUiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmb250LWZhbWlseT0iQXJpYWwiPiQ4MEstJDEyMEs8L3RleHQ+CiAgCiAgPHJlY3QgeD0iMjUwIiB5PSIxMDAiIHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiM2MzY2ZjEiIG9wYWNpdHk9IjAuOCIgcng9IjgiLz4KICA8dGV4dCB4PSIzMTAiIHk9IjEzMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtZmFtaWx5PSJBcmlhbCI+Sk9CIFBPU1RJTkc8L3RleHQ+CiAgPHRleHQgeD0iMzEwIiB5PSIxNTAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmb250LWZhbWlseT0iQXJpYWwiPk1hcmtldGluZyBNYW5hZ2VyPC90ZXh0PgogIDx0ZXh0IHg9IjMxMCIgeT0iMTY1IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZm9udC1mYW1pbHk9IkFyaWFsIj4kNzBLLSQ5NUs8L3RleHQ+CiAgCiAgPHJlY3QgeD0iNTAwIiB5PSIxMDAiIHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiNmOTczMTYiIG9wYWNpdHk9IjAuOCIgcng9IjgiLz4KICA8dGV4dCB4PSI1NjAiIHk9IjEzMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtZmFtaWx5PSJBcmlhbCI+Sk9CIFBPU1RJTkc8L3RleHQ+CiAgPHRleHQgeD0iNTYwIiB5PSIxNTAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmb250LWZhbWlseT0iQXJpYWwiPkRhdGEgQW5hbHlzdDwvdGV4dD4KICA8dGV4dCB4PSI1NjAiIHk9IjE2NSIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiIGZvbnQtZmFtaWx5PSJBcmlhbCI+JDYwSy0kODBLPC90ZXh0PgogIAogIDwhLS0gSGlyaW5nIEljb25zIC0tPgogIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjI1MCIgcj0iMjAiIGZpbGw9IiNmOTczMTYiLz4KICA8dGV4dCB4PSIxNTAiIHk9IjI1NSIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtZmFtaWx5PSJBcmlhbCI+4pyTPC90ZXh0PgogIAogIDxjaXJjbGUgY3g9IjY1MCIgY3k9IjI1MCIgcj0iMjAiIGZpbGw9IiM2MzY2ZjEiLz4KICA8dGV4dCB4PSI2NTAiIHk9IjI1NSIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtZmFtaWx5PSJBcmlhbCI+4p2MPC90ZXh0PgogIAogIDwhLS0gSGlyaW5nIFRleHQgLS0+CiAgPHRleHQgeD0iNDAwIiB5PSI1MCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXdlaWdodD0iYm9sZCI+VGFsZW50IEFjcXVpc2l0aW9uPC90ZXh0PgogIDx0ZXh0IHg9IjQwMCIgeT0iNzUiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCI+RmluZCB0aGUgcmlnaHQgdGFsZW50IGZvciB5b3VyIHRlYW08L3RleHQ+Cjwvc3ZnPg==')`,
          }}
        ></div>
      </div>
    </div>
  );
}
