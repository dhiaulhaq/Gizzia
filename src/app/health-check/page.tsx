"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stethoscope, Heart, Apple, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function HealthCheck() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    physicalParameters: {
      bodyWeight: 0,
      bodyHeight: 0,
      bloodPressure: "",
      heartRate: 0,
      exerciseHabit: {
        name: "",
        interval: 0,
        duration: 0,
      },
    },
    medicalHistory: {
      medicalHistory: "",
      mentalHealth: "",
    },
    eatingHabit: {
      foodConsumption: {
        interval: 3,
        portion: "sedang",
        food: "",
      },
      eatingHabits: {
        breakfast: true,
        lunch: true,
        dinner: true,
      },
      hydration: 2,
    },
    lifeStyle: {
      sleep: 7,
      smoking: false,
      alcohol: "tidak ada",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/healths", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit health data");

      const result = await response.json();

      // Store both the form data and the result
      localStorage.setItem("healthData", JSON.stringify(formData));
      localStorage.setItem("healthResult", JSON.stringify(result.data));
      localStorage.setItem("healthSummary", result.data.summary);

      router.push("/health-check/result");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit health data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  type SectionKey = keyof typeof formData;
  type PhysicalParametersKey = keyof typeof formData.physicalParameters;
  type MedicalHistoryKey = keyof typeof formData.medicalHistory;
  type EatingHabitKey = keyof typeof formData.eatingHabit;
  type LifeStyleKey = keyof typeof formData.lifeStyle;

  const handleInputChange = (
    section: SectionKey,
    field:
      | PhysicalParametersKey
      | MedicalHistoryKey
      | EatingHabitKey
      | LifeStyleKey,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <main className="min-h-screen bg-[#f8ffe6] from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="h-12 w-12 text-black" />
          </div>
          <div className="text-center">
            <span className="text-4xl font-bold text-black">Health </span>
            <span className="text-4xl font-bold text-[#bcd374]">Check</span>
          </div>
          <p className="text-lg text-gray-600">
            Fill in your health details for a personalized analysis
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Physical Parameters */}
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-6 w-6 text-gray-600" />
              <h2 className="text-2xl text-gray-800 font-semibold">
                Physical Parameters
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="weight">Body Weight (kg)</Label>
                <Input
                  className="bg-white text-black"
                  id="weight"
                  type="number"
                  value={formData.physicalParameters.bodyWeight}
                  onChange={(e) =>
                    handleInputChange(
                      "physicalParameters",
                      "bodyWeight",
                      Number(e.target.value)
                    )
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="height">Body Height (cm)</Label>
                <Input
                  className="bg-white text-black"
                  id="height"
                  type="number"
                  value={formData.physicalParameters.bodyHeight}
                  onChange={(e) =>
                    handleInputChange(
                      "physicalParameters",
                      "bodyHeight",
                      Number(e.target.value)
                    )
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                <Input
                  className="bg-white text-black"
                  id="bloodPressure"
                  placeholder="e.g., 120/80"
                  value={formData.physicalParameters.bloodPressure}
                  onChange={(e) =>
                    handleInputChange(
                      "physicalParameters",
                      "bloodPressure",
                      e.target.value
                    )
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input
                  className="bg-white text-black"
                  id="heartRate"
                  type="number"
                  value={formData.physicalParameters.heartRate}
                  onChange={(e) =>
                    handleInputChange(
                      "physicalParameters",
                      "heartRate",
                      Number(e.target.value)
                    )
                  }
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg text-gray-700 font-medium mb-4">
                Exercise Habits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="exerciseName">Type of Exercise</Label>
                  <Input
                    className="bg-white text-black"
                    id="exerciseName"
                    value={formData.physicalParameters.exerciseHabit.name}
                    onChange={(e) =>
                      handleInputChange("physicalParameters", "exerciseHabit", {
                        ...formData.physicalParameters.exerciseHabit,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="exerciseInterval">Times per Week</Label>
                  <Input
                    className="bg-white text-black"
                    id="exerciseInterval"
                    type="number"
                    value={formData.physicalParameters.exerciseHabit.interval}
                    onChange={(e) =>
                      handleInputChange("physicalParameters", "exerciseHabit", {
                        ...formData.physicalParameters.exerciseHabit,
                        interval: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="exerciseDuration">Duration (minutes)</Label>
                  <Input
                    className="bg-white text-black"
                    id="exerciseDuration"
                    type="number"
                    value={formData.physicalParameters.exerciseHabit.duration}
                    onChange={(e) =>
                      handleInputChange("physicalParameters", "exerciseHabit", {
                        ...formData.physicalParameters.exerciseHabit,
                        duration: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Medical History */}
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-2 mb-6">
              <Coffee className="h-6 w-6 text-gray-600" />
              <h2 className="text-2xl text-gray-800 font-semibold">
                Medical History
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Input
                  className="bg-white text-black"
                  id="medicalHistory"
                  placeholder="List any significant medical conditions"
                  value={formData.medicalHistory.medicalHistory}
                  onChange={(e) =>
                    handleInputChange(
                      "medicalHistory",
                      "medicalHistory",
                      e.target.value
                    )
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="mentalHealth">Mental Health</Label>
                <Input
                  className="bg-white text-black"
                  id="mentalHealth"
                  placeholder="Describe your mental health condition"
                  value={formData.medicalHistory.mentalHealth}
                  onChange={(e) =>
                    handleInputChange(
                      "medicalHistory",
                      "mentalHealth",
                      e.target.value
                    )
                  }
                  required
                />
              </div>
            </div>
          </Card>

          {/* Eating Habits */}
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-2 mb-6">
              <Apple className="h-6 w-6 text-gray-600" />
              <h2 className="text-2xl text-gray-800 font-semibold">
                Eating Habits
              </h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="mealsPerDay">Meals per Day</Label>
                  <Input
                    className="bg-white text-black"
                    id="mealsPerDay"
                    type="number"
                    value={formData.eatingHabit.foodConsumption.interval}
                    onChange={(e) =>
                      handleInputChange("eatingHabit", "foodConsumption", {
                        ...formData.eatingHabit.foodConsumption,
                        interval: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="portion">Portion Size</Label>
                  <RadioGroup
                    value={formData.eatingHabit.foodConsumption.portion}
                    onValueChange={(value) =>
                      handleInputChange("eatingHabit", "foodConsumption", {
                        ...formData.eatingHabit.foodConsumption,
                        portion: value,
                      })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="small" id="small" />
                      <Label htmlFor="small">Small</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="large" />
                      <Label htmlFor="large">Large</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="hydration">Water Intake (L/day)</Label>
                  <Input
                    className="bg-white text-black"
                    id="hydration"
                    type="number"
                    step="0.1"
                    value={formData.eatingHabit.hydration}
                    onChange={(e) =>
                      handleInputChange(
                        "eatingHabit",
                        "hydration",
                        Number(e.target.value)
                      )
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="typicalFood">Typical Foods</Label>
                <Input
                  className="bg-white text-black"
                  id="typicalFood"
                  placeholder="Describe your typical daily meals"
                  value={formData.eatingHabit.foodConsumption.food}
                  onChange={(e) =>
                    handleInputChange("eatingHabit", "foodConsumption", {
                      ...formData.eatingHabit.foodConsumption,
                      food: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-4">
                <Label>Regular Meals</Label>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="breakfast">Breakfast</Label>
                    <Switch
                      id="breakfast"
                      checked={formData.eatingHabit.eatingHabits.breakfast}
                      onCheckedChange={(checked) =>
                        handleInputChange("eatingHabit", "eatingHabits", {
                          ...formData.eatingHabit.eatingHabits,
                          breakfast: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="lunch">Lunch</Label>
                    <Switch
                      id="lunch"
                      checked={formData.eatingHabit.eatingHabits.lunch}
                      onCheckedChange={(checked) =>
                        handleInputChange("eatingHabit", "eatingHabits", {
                          ...formData.eatingHabit.eatingHabits,
                          lunch: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dinner">Dinner</Label>
                    <Switch
                      id="dinner"
                      checked={formData.eatingHabit.eatingHabits.dinner}
                      onCheckedChange={(checked) =>
                        handleInputChange("eatingHabit", "eatingHabits", {
                          ...formData.eatingHabit.eatingHabits,
                          dinner: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Lifestyle */}
          <Card className="p-6 bg-white">
            <h2 className="text-2xl text-gray-800 font-semibold mb-6">
              Lifestyle
            </h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="sleep">Sleep Duration (hours/day)</Label>
                <Input
                  className="bg-white text-black"
                  id="sleep"
                  type="number"
                  value={formData.lifeStyle.sleep}
                  onChange={(e) =>
                    handleInputChange(
                      "lifeStyle",
                      "sleep",
                      Number(e.target.value)
                    )
                  }
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="smoking">Smoking</Label>
                <Switch
                  id="smoking"
                  checked={formData.lifeStyle.smoking}
                  onCheckedChange={(checked) =>
                    handleInputChange("lifeStyle", "smoking", checked)
                  }
                />
              </div>

              <div>
                <Label htmlFor="alcohol">Alcohol Consumption</Label>
                <RadioGroup
                  value={formData.lifeStyle.alcohol}
                  onValueChange={(value) =>
                    handleInputChange("lifeStyle", "alcohol", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none">None</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate">Moderate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="heavy" id="heavy" />
                    <Label htmlFor="heavy">Heavy</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Card>

          <div className="flex justify-center">
            <Button
              type="submit"
              className={`w-full md:w-auto text-white bg-[#1B2E20] hover:bg-green-800 transition duration-300 ease-in-out`}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Get Health Analysis"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
