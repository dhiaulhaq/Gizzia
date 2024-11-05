"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  Utensils,
  AlertCircle,
  Flame,
  Apple,
  Activity,
  Heart,
  AlertTriangle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type NutritionResult = {
  calories: string;
  macronutrients: string;
  vitamins: string;
  healthBenefit: string;
  concerns: string;
};

export default function Identification() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    labels: string;
    nutrition: string;
  } | null>(null);
  const { toast } = useToast();

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setImage(URL.createObjectURL(file));
    setAnalyzing(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to analyze image");

      const data = await response.json();
      setResult(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
  });

  const getNutritionData = (): NutritionResult | null => {
    if (!result?.nutrition) return null;
    try {
      return JSON.parse(result.nutrition);
    } catch {
      return null;
    }
  };

  const nutritionData = getNutritionData();

  return (
    <main className="min-h-screen bg-[#f8ffe6] p-10 flex justify-center">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Utensils className="h-12 w-12 text-black" />
          </div>
          <div className="text-center">
            <span className="text-4xl font-bold text-black">Food </span>
            <span className="text-4xl font-bold text-[#bcd374]">Check</span>
          </div>
          <p className="text-lg text-gray-600">
            Upload a food image to get detailed nutritional information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 bg-white">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 hover:border-gray-400"
                }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">
                {isDragActive
                  ? "Drop the image here"
                  : "Drag & drop an image here, or click to select"}
              </p>
            </div>

            {image && (
              <div className="mt-6">
                <img
                  src={image}
                  alt="Uploaded food"
                  className="rounded-lg w-full object-cover"
                  style={{ maxHeight: "300px" }}
                />
              </div>
            )}

            {result?.labels && (
              <div className="mt-4">
                <h3 className="text-lg text-gray-900 font-semibold mb-2">
                  Detected Foods
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.labels.split(",").map((label, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-600/10 text-gray-600 rounded-full text-sm"
                    >
                      {label.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>

          <Card className="p-6 bg-white">
            {analyzing ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
              </div>
            ) : nutritionData ? (
              <div className="space-y-6">
                <div className="grid gap-6">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="h-5 w-5 text-black" />
                      <h3 className="font-semibold text-black">Calories</h3>
                    </div>
                    <p className="text-gray-700">{nutritionData.calories}</p>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Apple className="h-5 w-5 text-black" />
                      <h3 className="font-semibold text-black">
                        Macronutrients
                      </h3>
                    </div>
                    <p className="text-gray-700">
                      {nutritionData.macronutrients}
                    </p>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-5 w-5 text-black" />
                      <h3 className="font-semibold text-black">
                        Vitamins & Minerals
                      </h3>
                    </div>
                    <p className="text-gray-700">{nutritionData.vitamins}</p>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-5 w-5 text-black" />
                      <h3 className="font-semibold text-black">
                        Health Benefits
                      </h3>
                    </div>
                    <p className="text-gray-700">
                      {nutritionData.healthBenefit}
                    </p>
                  </div>

                  {nutritionData.concerns && (
                    <div className="p-4 bg-destructive/10 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-black text-destructive" />
                        <h3 className="font-semibold text-black text-destructive">
                          Concerns & Allergens
                        </h3>
                      </div>
                      <p className="text-gray-700">{nutritionData.concerns}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <AlertCircle className="h-12 w-12 mb-4" />
                <p>Upload an image to see the analysis</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}
