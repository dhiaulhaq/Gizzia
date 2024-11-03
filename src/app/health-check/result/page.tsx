"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ActivitySquare, Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type HealthResult = {
  status: string;
  summary: string;
};

export default function HealthResult() {
  const router = useRouter();
  const { toast } = useToast();
  const [result, setResult] = useState<HealthResult | null>(null);

  useEffect(() => {
    const healthData = localStorage.getItem("healthData");
    const healthResult = localStorage.getItem("healthResult");

    if (!healthData) {
      toast({
        title: "Error",
        description:
          "No health data found. Please complete the health check first.",
        variant: "destructive",
      });
      router.push("/health-check");
      return;
    }

    if (healthResult) {
      setResult(JSON.parse(healthResult));
    }
  }, [router, toast]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "healthy":
        return "bg-green-100 text-green-800";
      case "less healthy":
        return "bg-yellow-100 text-yellow-800";
      case "unhealthy":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleGetRecommendations = () => {
    router.push("/health-check/recommendation");
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-[#f8ffe6] from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8ffe6] from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => router.push("/health-check")}
        >
          <ArrowLeft className="mr-2 h-4 w-4 text-gray-900" />
          <p className="text-gray-900">Back to Health Check</p>
        </Button>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-black" />
          </div>
          <div className="text-center">
            <span className="text-4xl font-bold text-black">Your </span>
            <span className="text-4xl font-bold text-[#bcd374]">Health </span>
            <span className="text-4xl font-bold text-black">Analysis</span>
          </div>
          <p className="text-lg text-gray-600">
            Review your health status and get personalized recommendations
          </p>
        </div>

        <Card className="p-8 mb-8">
          <div className="space-y-6">
            <div className="text-center">
              <span
                className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${getStatusColor(
                  result.status
                )}`}
              >
                {result.status}
              </span>
            </div>

            <div className="mt-6">
              <h3 className="text-xl text-gray-800 font-semibold mb-3">
                Health Summary
              </h3>
              <p className="text-gray-600 leading-relaxed">{result.summary}</p>
            </div>
          </div>
        </Card>

        <div className="flex justify-center">
          <Button
            onClick={handleGetRecommendations}
            className="flex items-center gap-2"
            size="lg"
          >
            <ActivitySquare className="h-5 w-5 text-gray-900" />
            <p className="text-gray-900">Get Recommendations</p>
            <ArrowRight className="h-4 w-4 ml-1 text-gray-900" />
          </Button>
        </div>
      </div>
    </main>
  );
}
