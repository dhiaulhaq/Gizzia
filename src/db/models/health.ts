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

  const prompt = `Tolong cek tingkat kesehatan saya berdasarkan parameter berikut: 1. Parameter Fisik: - Berat Badan: ${health.physicalParameters.bodyWeight} kg, - Tinggi Badan: ${health.physicalParameters.bodyHeight} cm, - Tekanan Darah: ${health.physicalParameters.bloodPressure} mmHg, - Detak Jantung: ${health.physicalParameters.heartRate} bpm, - Kebiasaan Olahraga: ${health.physicalParameters.exerciseHabit.name} ${health.physicalParameters.exerciseHabit.interval} kali seminggu selama ${health.physicalParameters.exerciseHabit.duration} menit. 2. Riwayat Kesehatan: - Riwayat Penyakit: ${health.medicalHistory.medicalHistory}, - Kesehatan Mental: ${health.medicalHistory.mentalHealth}. 3. Pola Makan: - Konsumsi Makanan: Makan ${health.eatingHabit.foodConsumption.interval} kali sehari dengan porsi ${health.eatingHabit.foodConsumption.portion} dan biasanya memakan ${health.eatingHabit.foodConsumption.food}. - Kebiasaan Makan: Sarapan = ${health.eatingHabit.eatingHabits.breakfast}, Makan Siang = ${health.eatingHabit.eatingHabits.lunch}, Makan Malam = ${health.eatingHabit.eatingHabits.dinner}. - Hidrasi: Minum sekitar ${health.eatingHabit.hydration} liter sehari. 4. Gaya Hidup: - Tidur: ${health.lifeStyle.sleep} jam sehari. - Merokok: ${health.lifeStyle.smoking}. - Alkohol: Mengonsumsi alkohol dalam jumlah ${health.lifeStyle.alcohol}. Tolong berikan status kesehatannya (Sehat, Kurang Sehat, Tidak Sehat) beserta kesimpulannya dengan skema ini: {"status": str, "summary": str}`;

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
