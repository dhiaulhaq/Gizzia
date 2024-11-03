"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Cloud } from "lucide-react"
import { useState } from "react"

export default function Component() {
    const [dragActive, setDragActive] = useState(false)
    const [fileUrl, setFileUrl] = useState("")

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const files = Array.from(e.dataTransfer.files)
        if (files?.[0]) {
            // Handle file upload here
            console.log("Dropped files:", files)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files?.[0]) {
            // Handle file upload here
            console.log("Selected files:", files)
        }
    }

    const handleUrlUpload = () => {
        if (fileUrl) {
            // Handle URL upload here
            console.log("URL to upload:", fileUrl)
        }
    }

    return (
        <div className="min-h-screen bg-[#f8ffe6] p-4 flex items-center justify-center">
            <Card className="w-full max-w-2xl bg-white">
                <CardHeader className="relative">
                    <button
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                        onClick={() => console.log("Close modal")}
                    >
                        <a href="/">
                            <X className="h-5 w-5" />
                        </a>
                    </button>
                    <CardTitle className="text-center">
                        <span className="text-3xl">Food </span>
                        <span className="text-3xl text-[#bcd374]">Check</span>
                    </CardTitle>
                    <p className="text-center text-gray-600">Upload photos of your food here</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Drag & Drop Zone */}
                    <div
                        className={`relative rounded-lg border-2 border-dashed p-8 text-center ${dragActive ? "border-[#bcd374] bg-[#f8ffe6]" : "border-gray-300"
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            accept=".jpg,.png,.svg,.zip"
                            className="absolute inset-0 w-full opacity-0 cursor-pointer"
                            type="file"
                            onChange={handleFileChange}
                            multiple
                        />
                        <div className="space-y-4">
                            <Cloud className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    Drag your file(s) or{" "}
                                    <span className="text-blue-500 hover:underline">browse</span>
                                </p>
                                <p className="text-sm text-gray-500">Max 10 MB files are allowed</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500">Only support .jpg, .png and .svg and zip files</p>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-4 text-sm text-gray-500">OR</span>
                        </div>
                    </div>

                    {/* URL Upload */}
                    <div className="space-y-2">
                        <h3 className="font-medium">Upload from URL</h3>
                        <div className="flex gap-2">
                            <Input
                                className="flex-1"
                                placeholder="Add file URL"
                                type="url"
                                value={fileUrl}
                                onChange={(e) => setFileUrl(e.target.value)}
                            />
                            <Button
                                className="bg-[#bcd374] hover:bg-[#a8bf60] text-white"
                                onClick={handleUrlUpload}
                            >
                                Upload
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}