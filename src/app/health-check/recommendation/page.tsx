"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Salad, Activity, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
// import { useToast } from "@/components/ui/use-toast";

type FoodRecommendation = {
  foodName: string;
  nutritions: string;
  reason: string;
};

type LifeStyleRecommendation = {
  activityName: string;
  doActivity: string;
};

type Recommendations = {
  foodRecommendations: FoodRecommendation[];
  lifeStyleRecommendations: LifeStyleRecommendation[];
};

export default function Recommendation() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] =
    useState<Recommendations | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const summary = localStorage.getItem("healthSummary");

      if (!summary) {
        toast({
          title: "Error",
          description:
            "No health data found. Please complete the health check first.",
          variant: "destructive",
        });
        router.push("/health-check");
        return;
      }

      try {
        const response = await fetch("/api/healths/recommendation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ summary }),
        });

        if (!response.ok) throw new Error("Failed to fetch recommendations");

        const result = await response.json();
        setRecommendations(result.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch recommendations. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [router, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black from-gray-50 to-gray-100 flex items-center justify-center">
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
          <div className="text-center">
            <span className="text-4xl font-bold text-black">Your </span>
            <span className="text-4xl font-bold text-[#bcd374]">Health </span>
            <span className="text-4xl font-bold text-black">
              Recommendations
            </span>
          </div>
          <p className="text-lg text-gray-600">
            Personalized nutrition and lifestyle suggestions for better health
          </p>
        </div>

        <div className="space-y-8">
          {/* Food Recommendations */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Salad className="h-8 w-8 text-gray-800" />
              <h2 className="text-2xl text-gray-800 text-gray-800 font-semibold">
                Food Recommendations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations?.foodRecommendations.map((food, index) => (
                <Card key={index} className="p-6 bg-white">
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    {food.foodName}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700">Nutrition</h4>
                      <p className="text-gray-600">{food.nutritions}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">
                        Why This Food?
                      </h4>
                      <p className="text-gray-600">{food.reason}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Lifestyle Recommendations */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Activity className="h-8 w-8 text-gray-800" />
              <h2 className="text-2xl text-gray-800 font-semibold">
                Lifestyle Recommendations
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {recommendations?.lifeStyleRecommendations.map(
                (activity, index) => (
                  <Card key={index} className="p-6 bg-white">
                    <h3 className="text-xl text-gray-700 font-semibold mb-3">
                      {activity.activityName}
                    </h3>
                    <p className="text-gray-600">{activity.doActivity}</p>
                  </Card>
                )
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
