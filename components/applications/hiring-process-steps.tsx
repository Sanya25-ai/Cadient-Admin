"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Application } from "@/lib/types"

interface HiringProcessStepsProps {
  application: Application
}

export default function HiringProcessSteps({ application }: HiringProcessStepsProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps = [
    { id: 1, name: "SmartScreen", status: "completed" },
    { id: 2, name: "Interview", status: "current" },
    { id: 3, name: "Assessment", status: "upcoming" },
    { id: 4, name: "Background Check", status: "upcoming" },
    { id: 5, name: "Offer", status: "upcoming" },
  ]

  const completeStep = (stepId: number) => {
    setCompletedSteps([...completedSteps, stepId])
    setCurrentStep(stepId + 1)
  }

  return (
    <div className="space-y-8">
      <div className="border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">HIRING PROCESS</h3>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {steps.map((step, index) => (
            <div key={step.id} className="relative mb-8 last:mb-0">
              <div className="flex items-start">
                <div
                  className={`
                  w-16 h-16 rounded-full flex items-center justify-center z-10
                  ${
                    completedSteps.includes(step.id)
                      ? "bg-green-100 text-green-600"
                      : currentStep === step.id
                        ? "bg-orange-100 text-orange-600"
                        : "bg-gray-100 text-gray-400"
                  }
                `}
                >
                  {completedSteps.includes(step.id) ? (
                    <Check className="h-8 w-8" />
                  ) : (
                    <span className="text-xl font-medium">{step.id}</span>
                  )}
                </div>

                <div className="ml-6">
                  <h4 className="text-lg font-medium">{step.name}</h4>

                  {currentStep === step.id && step.id === 2 && (
                    <div className="mt-4 border rounded-lg p-4">
                      <h5 className="font-medium mb-2">INTERVIEW</h5>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm">Interview Scheduled</span>
                        </div>

                        <div className="ml-6 space-y-2">
                          <div className="flex items-center">
                            <input type="radio" id="favorable" name="interview-result" className="mr-2" />
                            <label htmlFor="favorable" className="text-sm">
                              Favorable Interview Results
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="unfavorable" name="interview-result" className="mr-2" />
                            <label htmlFor="unfavorable" className="text-sm">
                              Unfavorable Interview Results
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">CADIENT SMARTTENURE RECOMMENDATION</h3>

        <div className="border rounded-lg p-4 bg-orange-50">
          <h4 className="font-medium text-orange-800">More Likely to Have Long Tenure</h4>
          <p className="text-sm mt-2">
            Based on the SmartTenure results, this person is more likely to stay on the job long-term.
          </p>
        </div>
      </div>

      {currentStep === 2 && (
        <div className="flex justify-end">
          <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => completeStep(2)}>
            Complete Interview
          </Button>
        </div>
      )}
    </div>
  )
}
