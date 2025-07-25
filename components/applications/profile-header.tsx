import Link from "next/link"
import { ChevronLeft, Bookmark, Phone, Mail, FileText, Printer, Share2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Application } from "@/lib/types"

interface ProfileHeaderProps {
  application: Application
}

export default function ProfileHeader({ application }: ProfileHeaderProps) {
  return (
    <div className="border-b border-border bg-card">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link href="/applications" className="flex items-center text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="text-sm">Go Back to Results</span>
          </Link>
          <span className="text-muted-foreground mx-2">to see applications table</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                {application.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div className="ml-4">
                <h1 className="text-xl font-semibold text-foreground">{application.name}</h1>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{application.position}</span>
                  <span className="mx-2">•</span>
                  <Badge variant="secondary">
                    {application.status}
                  </Badge>
                  <Badge variant="secondary" className="ml-2">
                    Application Pool
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <FileText className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <div className="mr-8">
            <div className="text-muted-foreground">Source: Web Site</div>
            <div>Address</div>
          </div>
          <div className="mr-8">
            <div>Phone: {application.phone}</div>
            <div>SSN: {application.ssn}</div>
          </div>
          <div>
            <div>Email: {application.email}</div>
          </div>
        </div>
      </div>

      <Button className="ml-auto mr-4 mb-4">Start Hiring Process</Button>
    </div>
  )
}
