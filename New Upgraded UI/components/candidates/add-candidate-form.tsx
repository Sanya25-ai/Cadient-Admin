"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronUp } from "lucide-react"
import parse from "node-html-parser"

interface Option {
  value: string;
  label: string;
}

interface FormField {
  name: string;
  id: string;
  label: string;
  type: string;
  required: boolean;
  value: string;
  options?: Option[];
}

export function AddCandidateForm() {
  const [resumeExpanded, setResumeExpanded] = useState(true)
  const [contactExpanded, setContactExpanded] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadedResume, setUploadedResume] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  // Dynamic field options
  const [countryOptions, setCountryOptions] = useState<Option[]>([])
  const [stateOptions, setStateOptions] = useState<Option[]>([])
  const [applicationOptions, setApplicationOptions] = useState<Option[]>([])
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    homePhone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Countries.USA",
    seekerSite: ""
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Function to extract fields from HTML
  const extractFieldsFromHtml = (html: string) => {
    const root = parse(html);
    
    // Extract select fields
    const selects = root.querySelectorAll("select");
    const selectFields = selects.map(select => ({
      name: select.getAttribute("name") || "",
      id: select.getAttribute("id") || "",
      label: select.parentNode?.querySelector("label")?.textContent?.trim() || "",
      type: "select",
      required: select.classNames.includes("isRequired") || select.getAttribute("aria-required") === "true",
      value: select.getAttribute("value") || "",
      options: select.querySelectorAll("option").map(option => ({
        value: option.getAttribute("value") || "",
        label: option.textContent.trim()
      }))
    }));

    return { selectFields };
  };

  // Fetch form data on component mount
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch('/api/candidates/get-form-data');
        const html = await response.text();
        const { selectFields } = extractFieldsFromHtml(html);
        
        // Update options for each select field
        const countryField = selectFields.find(f => f.name === "TAOO_PersonContact_country");
        const stateField = selectFields.find(f => f.name === "TAOO_PersonContact_state_#$#_43");
        const applicationField = selectFields.find(f => f.name === "applicationLocator");
        
        if (countryField?.options) setCountryOptions(countryField.options);
        if (stateField?.options) setStateOptions(stateField.options);
        if (applicationField?.options) setApplicationOptions(applicationField.options);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching form data:', error);
        setIsLoading(false);
      }
    };

    fetchFormData();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
  }

  const handleDeleteFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDeleteResume = async () => {
    if (!uploadedResume) return;

    // Show confirmation dialog with warning
    const confirmDelete = window.confirm(
      "Please note this action will also delete all the auto populated or manually modified data in the Contact Info section. Are you sure that you want to delete the uploaded resume?"
    );

    if (!confirmDelete) {
      return;
    }

    setIsDeleting(true);
    
    try {
      const startTime = Date.now();
      
      // Try ultra-fast endpoint first
      let response = await fetch("/api/candidates/delete-resume-ultra", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: uploadedResume
        }),
      });

      // If ultra fails, fallback to original endpoint
      if (!response.ok && response.status >= 500) {
        console.log(`Ultra delete failed in ${Date.now() - startTime}ms, falling back to original...`);
        response = await fetch("/api/candidates/delete-resume", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: uploadedResume,
            formData: formData
          }),
        });
      }
      
      console.log(`Total delete time: ${Date.now() - startTime}ms`);

      if (response.ok) {
        try {
          const result = await response.json();
          console.log(result);
        } catch {
          console.log("Delete successful (non-JSON response)");
        }
        
        setUploadedResume(null);
        
        // Clear all form data as well
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          homePhone: "",
          address: "",
          apartment: "",
          city: "",
          state: "",
          zipCode: "",
          country: "Countries.USA",
          seekerSite: ""
        });
        
        alert("Resume deleted successfully!");
      } else {
        try {
          const error = await response.json();
          alert("Failed to delete resume: " + (error.message || error.error));
        } catch {
          alert("Failed to delete resume");
        }
      }
    } catch (error) {
      console.error('Delete resume error:', error);
      alert("Error occurred while deleting resume");
    } finally {
      setIsDeleting(false);
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("AnchorName_addCandidateForm", "");
    uploadFormData.append("seq", "addCandidate");
    uploadFormData.append("relayData", "<your relayData value here>");
    uploadFormData.append("event", "com.deploy.application.hmc.plugin.AddCandidate.uploadResume");
    uploadFormData.append("validateData", "false");
    uploadFormData.append("skipRequiredCheck", "true");
    uploadFormData.append("resumeFile", selectedFile.name);
    uploadFormData.append("fileName", "");
    uploadFormData.append("resumeDoc", "");
    uploadFormData.append("selectResume", selectedFile, selectedFile.name);
    uploadFormData.append("TAOO_PersonContact_firstName", formData.firstName);
    uploadFormData.append("TAOO_PersonContact_lastName", formData.lastName);
    uploadFormData.append("TAOO_PersonContact_emailAddress", formData.email);
    uploadFormData.append("TAOO_PersonContact_address1", formData.address);
    uploadFormData.append("TAOO_PersonContact_address2", formData.apartment);
    uploadFormData.append("TAOO_PersonContact_country", formData.country);
    uploadFormData.append("TAOO_PersonContact_city", formData.city);
    uploadFormData.append("TAOO_PersonContact_state_#$#_34", formData.state);
    uploadFormData.append("TAOO_PersonContact_zipCode", formData.zipCode);
    uploadFormData.append("TAOO_PersonContact_homePhone", formData.homePhone);

    try {
      const startTime = Date.now();
      
      // Try ultra-fast endpoint first (most optimized)
      let response = await fetch("/api/candidates/upload-resume-ultra", {
        method: "POST",
        body: uploadFormData,
      });
      
      // If ultra fails, fallback to original endpoint
      if (!response.ok && response.status >= 500) {
        console.log(`Ultra endpoint failed in ${Date.now() - startTime}ms, falling back to original...`);
        response = await fetch("/api/candidates/upload-resume", {
          method: "POST",
          body: uploadFormData,
        });
      }
      
      console.log(`Total upload time: ${Date.now() - startTime}ms`);
        
      if (response.ok) {
        // Handle both JSON and HTML responses
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          console.log(result);
        } else {
          const text = await response.text();
          console.log("HTML response received");
        }
        
        setUploadedResume(selectedFile.name);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        alert("Resume uploaded successfully!");
      } else {
        try {
          const error = await response.json();
          alert("File upload failed: " + (error.message || error.error));
        } catch {
          alert("File upload failed");
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/candidates/add-candidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          seq: 'addCandidate',
          applicationName: 'ConsolidatedJAFTestClientdsiRAT',
          locale: 'en_US'
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Candidate added successfully:', result)
        alert('Candidate added successfully!')
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          homePhone: "",
          address: "",
          apartment: "",
          city: "",
          state: "",
          zipCode: "",
          country: "Countries.USA",
          seekerSite: ""
        })
        setSelectedFile(null)
        setUploadedResume(null)
        setTimeout(() => {
          window.location.href = `/applicant?id=${result.applicantId}`
        }, 1000)
      } else {
        const error = await response.json()
        console.error('Error adding candidate:', error)
        alert('Error adding candidate: ' + error.message)
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('Network error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#EE5A37] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-6">
      {/* Resume Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer border-b border-gray-200"
          onClick={() => setResumeExpanded(!resumeExpanded)}
        >
          <h2 className="text-lg font-medium text-[#EE5A37]">Resume</h2>
          {resumeExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
        
        {resumeExpanded && (
          <div className="p-6">
            <div className="space-y-4">
              {uploadedResume ? (
                // Show uploaded resume with delete option
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{uploadedResume}</p>
                        <p className="text-xs text-gray-500">Resume uploaded successfully</p>
                      </div>
                    </div>
                                         <Button
                       type="button"
                       variant="outline"
                       size="sm"
                       onClick={handleDeleteResume}
                       disabled={isDeleting}
                       className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                     >
                       {isDeleting ? (
                         <>
                           <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                           Deleting...
                         </>
                       ) : (
                         'Delete'
                       )}
                     </Button>
                  </div>
                </div>
              ) : (
                // Show upload form
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Upload Resume <span className="text-gray-500">(.doc, .docx, PDF, HTML, .txt | Max 500KB)</span>
                  </Label>
                  <div className="flex items-center space-x-3 mt-2 relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".doc,.docx,.pdf,.html,.txt"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                      ref={fileInputRef}
                      style={{cursor: 'pointer'}}
                    />
                    {selectedFile && (
                      <button
                        type="button"
                        onClick={handleDeleteFile}
                        className="absolute right-32 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 bg-white p-1 rounded-full"
                        style={{ outline: 'none' }}
                        tabIndex={0}
                        aria-label="Remove file"
                      >
                        ✕
                      </button>
                    )}
                    <Button 
                      onClick={handleUpload}
                      disabled={!selectedFile || isUploading}
                      className="bg-[#EE5A37] hover:bg-[#d14928] text-white px-6"
                    >
                      {isUploading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Uploading...
                        </>
                      ) : (
                        'Upload'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Contact Info Section */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer border-b border-gray-200"
          onClick={() => setContactExpanded(!contactExpanded)}
        >
          <h2 className="text-lg font-medium text-[#EE5A37]">Contact Info</h2>
          {contactExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
        
        {contactExpanded && (
          <div className="p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> First Name:
                  </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="mt-1"
                  required
                />
              </div>
              <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> Last Name:
                  </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="mt-1"
                  required
                />
              </div>
            </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> Email Address:
                  </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1"
                  required
                />
              </div>
              <div>
                  <Label htmlFor="homePhone" className="text-sm font-medium text-gray-700">
                    Home Phone:
                  </Label>
                <Input
                    id="homePhone"
                    value={formData.homePhone}
                    onChange={(e) => handleInputChange("homePhone", e.target.value)}
                    className="mt-1"
                    placeholder="555-555-5555"
                />
              </div>
            </div>

            <div>
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                  Address:
                </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                  className="mt-1"
              />
            </div>

              <div>
                <Label htmlFor="apartment" className="text-sm font-medium text-gray-700">
                  Apartment, suite, etc. (optional)
                </Label>
                <Input
                  id="apartment"
                  value={formData.apartment}
                  onChange={(e) => handleInputChange("apartment", e.target.value)}
                  className="mt-1"
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                    City:
                  </Label>
                <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> State:
                  </Label>
                  <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="choose one..." />
                    </SelectTrigger>
                    <SelectContent>
                      {stateOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> Zip/Postal Code:
                  </Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    className="mt-1"
                    required
                />
            </div>
            <div>
                  <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                    <span className="text-red-500">*</span> Country:
                  </Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                      {countryOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>
              </div>

              {/* Seeker Site Section */}
              <div className="pt-6 border-t border-gray-200">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Seeker Site</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Please select a seeker site to which you want to add this candidate.
                    </p>
                  </div>
                  
              <div>
                    <Label htmlFor="seekerSite" className="text-sm font-medium text-gray-700">
                      <span className="text-red-500">*</span> Select an application:
                    </Label>
                    <Select value={formData.seekerSite} onValueChange={(value) => handleInputChange("seekerSite", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="choose one..." />
                  </SelectTrigger>
                  <SelectContent>
                        {applicationOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            </div>

              <div className="flex justify-start space-x-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="px-6"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#EE5A37] hover:bg-[#d14928] text-white px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Adding Candidate...
                    </>
                  ) : (
                    'Add Candidate'
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
