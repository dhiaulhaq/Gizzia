import { NextResponse } from "next/server";
import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/connection";
import { GoogleGenerativeAI } from "@google/generative-ai";

export type Recommendation = {
  foodName: string;
  nutrition: string;
};

export type HealthModel = {
  _id: ObjectId;
  recommendation: Recommendation;
  userId: ObjectId;
  createdAt?: string;
  updatedAt?: string;
};

export type HealthModelCreateInput = Omit<HealthModel, "_id">;

export type Exercise = {
  name: string;
  interval: number;
  duration: number;
};

export type PhysicalParameters = {
  bodyWeight: number;
  bodyHeight: number;
  bloodPressure: string;
  heartRate: number;
  exerciseHabit: Exercise;
};

export type MedHistoryParameters = {
  medicalHistory: string;
  mentalHealth: string;
};

export type Consumption = {
  interval: number;
  portion: string;
  food: string;
};

export type Habit = {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
};

export type EatingHabit = {
  foodConsumption: Consumption;
  eatingHabits: Habit;
  hydration: number;
};

export type LifeStyle = {
  sleep: number;
  smoking: boolean;
  alcohol: string;
};

export type HealthParameters = {
  physicalParameters: PhysicalParameters;
  medicalHistory: MedHistoryParameters;
  eatingHabit: EatingHabit;
  lifeStyle: LifeStyle;
};

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "gizzia";
const COLLECTION_HEALTH = "Healths";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getHealths = async () => {
  const db = await getDb();

  const healths = (await db
    .collection(COLLECTION_HEALTH)
    .find({})

    .project({ password: 0 })
    .toArray()) as HealthModel[];

  return healths;
};

export const requestHealth = async (health: HealthParameters) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not defined in the environment variables"
    );
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `Please check my health status based on the following parameters:

    1. Physical Parameters:
    - Body Weight: ${health.physicalParameters.bodyWeight} kg.
    - Height: ${health.physicalParameters.bodyHeight} cm.
    - Blood Pressure: ${health.physicalParameters.bloodPressure} mmHg.
    - Heart Rate: ${health.physicalParameters.heartRate} bpm.
    - Exercise Habit: ${health.physicalParameters.exerciseHabit.name}, ${health.physicalParameters.exerciseHabit.interval} times per week for ${health.physicalParameters.exerciseHabit.duration} minutes.

    2. Medical History:
    - Medical Conditions: ${health.medicalHistory.medicalHistory}.
    - Mental Health: ${health.medicalHistory.mentalHealth}.

    3. Eating Pattern:
    - Food Consumption: Eating ${health.eatingHabit.foodConsumption.interval} times a day with portion sizes of ${health.eatingHabit.foodConsumption.portion}, usually including ${health.eatingHabit.foodConsumption.food}.
    - Meal Habits: Breakfast = ${health.eatingHabit.eatingHabits.breakfast}, Lunch = ${health.eatingHabit.eatingHabits.lunch}, Dinner = ${health.eatingHabit.eatingHabits.dinner}.
    - Hydration: Drinking about ${health.eatingHabit.hydration} liters per day.

    4. Lifestyle:
    - Sleep: ${health.lifeStyle.sleep} hours per day.
    - Smoking: ${health.lifeStyle.smoking}.
    - Alcohol: Consumes alcohol in ${health.lifeStyle.alcohol} quantity.
    
    Please provide the health status (Healthy, Less Healthy, Unhealthy) along with a summary following this schema: {"status": str, "summary": str}`;

  const generate = await model.generateContent(prompt);
  const response = await generate.response;
  let result = response.text();

  return result;
};

export const requestRecommendation = async (summary: string) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not defined in the environment variables"
    );
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `Berdasarkan kesimpulan ini: ${summary}, tolong berikan saya rekomendasi makanan bergizi dan pola hidup yang baik untuk saya dengan skema ini: {"foodRecommendations": [{"foodName": str, "nutritions": str, "reason": str}], "lifeStyleRecommendations": [{"activityName": str, "doActivity": str}]}`;

  const generate = await model.generateContent(prompt);
  const response = await generate.response;
  let result = response.text();

  try {
    return JSON.parse(result);
  } catch (error) {
    console.error("Failed to parse JSON:", result);
    throw new Error("Response is not valid JSON.");
  }
};

export const saveRecommendation = async (
  recommendation: HealthModelCreateInput
) => {
  const modifiedRecommendation: HealthModelCreateInput = {
    ...recommendation,
    // password: hashText(user.password),
  };

  const db = await getDb();
  const result = await db
    .collection(COLLECTION_HEALTH)
    .insertOne(modifiedRecommendation);

  return result;
};
