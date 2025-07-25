"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth-context";
import { ChevronDown, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showManageBookmarks, setShowManageBookmarks] = useState(false);
  const [showCreateBookmark, setShowCreateBookmark] = useState(false);
  const [showEditBookmark, setShowEditBookmark] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingBookmark, setDeletingBookmark] = useState<any>(null);
  console.log(user);

  async function handleLogout() {
    try {
      await logout();
      router.push("/login");
    } catch (e) {
      console.error("Logout failed", e);
    }
  }

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const userInitials = user?.name ? getInitials(user.name) : "NA";

  // Sample bookmark data
  const [bookmarks, setBookmarks] = useState([
    { id: 1, label: "Aquamarine", color: "bg-orange-500" },
    { id: 2, label: "Senior Developer", color: "bg-pink-500" },
    { id: 3, label: "Marketing Specialist", color: "bg-green-500" },
  ]);

  const handleEditBookmark = (bookmark: any) => {
    setEditingBookmark(bookmark);
    setShowEditBookmark(true);
  };

  const handleDeleteBookmark = (bookmark: any) => {
    setDeletingBookmark(bookmark);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deletingBookmark) {
      setBookmarks(bookmarks.filter((b) => b.id !== deletingBookmark.id));
      setShowDeleteConfirm(false);
      setDeletingBookmark(null);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 h-10 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            style={{
              borderRadius: "20px",
              paddingLeft: "8px",
              paddingRight: "12px",
              paddingTop: "4px",
              paddingBottom: "4px",
            }}
          >
            {/* Initials Circle */}
            <div className="h-8 w-8 bg-pink-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
              {userInitials}
            </div>
            {/* Dropdown Arrow */}
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 py-1">
          {user && (
            <>
              <DropdownMenuLabel className="text-xs py-1.5">
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">
                  {user.email}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            onClick={() => setShowChangePassword(true)}
            className="text-xs py-1.5 cursor-pointer"
          >
            Change Password
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowManageBookmarks(true)}
            className="text-xs py-1.5 cursor-pointer"
          >
            Manage Bookmarks
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-xs py-1.5">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Change Password
            </h3>

            {/* Password Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <p className="text-sm font-medium text-blue-900 mb-2">
                Password must meet the following:
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Minimum length is 8</li>
                <li>• Must contain at least 1 non-alphanumeric character(s)</li>
                <li>• Must contain at least 1 numeric character(s)</li>
                <li>• Must contain at least 1 uppercase character(s)</li>
                <li>
                  • Cannot contain more than 3 of the same character in a row
                </li>
                <li>• Maximum length is 50</li>
                <li>• Cannot be the same as the username</li>
                <li>• Cannot be the same as any of your location numbers</li>
                <li>• Cannot be reused within 10 password changes</li>
              </ul>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  * Current Password:
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  * New Password:
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  * Re-Type New Password:
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-start mt-6">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2">
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowChangePassword(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 border-red-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Bookmarks Drawer */}
      {showManageBookmarks && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowManageBookmarks(false)}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-[70%] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-xl font-semibold text-gray-900">
                  Manage bookmarks
                </h2>
                <div className="flex items-center gap-3">
                  {/* Create Bookmark Button */}
                  <Button
                    onClick={() => setShowCreateBookmark(!showCreateBookmark)}
                    className="bg-orange-500 hover:bg-orange-600 text-white h-8 px-4"
                  >
                    Create a bookmark
                  </Button>

                  {/* Close Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowManageBookmarks(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Create Bookmark Form - At Top of Drawer */}
              {showCreateBookmark && (
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Select bookmark color and assign label:
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Bookmark Color Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        * Bookmark
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-400 rounded-sm"></div>
                        <select className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                          <option value="aquamarine">Aquamarine</option>
                          <option value="blue">Blue</option>
                          <option value="green">Green</option>
                          <option value="purple">Purple</option>
                          <option value="red">Red</option>
                          <option value="yellow">Yellow</option>
                        </select>
                      </div>
                    </div>

                    {/* Bookmark Label */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        * Bookmark label:
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Enter bookmark label"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-start mt-4">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2">
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowCreateBookmark(false)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 border-red-600"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6">
                Bookmarks should be based on bona fide occupational
                qualifications. Please consult your HR professional for
                assistance in determining appropriate use of bookmarks.
                Bookmarks should not be used for ranking candidates.
              </p>

              {/* Table Header */}
              <div className="bg-gray-100 border border-gray-200 rounded-t-md">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-700">
                  <div className="col-span-1">Bookmark</div>
                  <div className="col-span-9">Bookmark label</div>
                  <div className="col-span-2"></div>
                </div>
              </div>

              {/* Table Content */}
              <div className="border-l border-r border-b border-gray-200 rounded-b-md">
                {bookmarks.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                  >
                    <div className="col-span-1 flex items-center">
                      <svg
                        className={`w-4 h-6 ${bookmark.color.replace(
                          "bg-",
                          "text-"
                        )}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                      </svg>
                    </div>
                    <div className="col-span-9 flex items-center">
                      <span className="text-sm text-gray-900">
                        {bookmark.label}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditBookmark(bookmark)}
                      >
                        <svg
                          className="h-4 w-4 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDeleteBookmark(bookmark)}
                      >
                        <svg
                          className="h-4 w-4 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && deletingBookmark && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70]">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Confirm Delete
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteConfirm(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete the bookmark "
              {deletingBookmark.label}"? This action cannot be undone.
            </p>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Bookmark Modal */}
      {showEditBookmark && editingBookmark && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Select bookmark color and assign label:
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEditBookmark(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Bookmark Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  * Bookmark
                </label>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 ${editingBookmark.color} rounded-sm`}
                  ></div>
                  <select
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    defaultValue={editingBookmark.label}
                  >
                    <option value="Aquamarine">Aquamarine</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                    <option value="red">Red</option>
                    <option value="yellow">Yellow</option>
                  </select>
                </div>
              </div>

              {/* Bookmark Label */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  * Bookmark label:
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  defaultValue={editingBookmark.label}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-start mt-8">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2">
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowEditBookmark(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 border-red-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
