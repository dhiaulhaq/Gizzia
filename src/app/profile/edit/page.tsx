import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'

export default function EditProfile() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
                </header>

                <Card>
                    <CardHeader className="flex flex-col items-center">
                        <Avatar className="h-24 w-24 mb-4 relative overflow-hidden rounded-full shadow-lg border-4 border-gradient-to-r from-blue-500 to-purple-500 transition-transform transform hover:scale-105">
                            <AvatarImage
                                src="/placeholder.svg?height=96&width=96"
                                alt="Profile picture"
                                className="object-cover"
                            />
                            <AvatarFallback className="flex items-center justify-center text-lg font-bold text-white bg-[#113d1e]">
                                JD
                            </AvatarFallback>
                        </Avatar>

                        <CardTitle className="text-2xl  text-black font-bold">John Doe</CardTitle>
                        <Button variant="outline"
                            className="bg-[#fefefe] text-black border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-opacity-50"
                        >
                            Change Profile Picture
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-900">Name</p>
                            <Input id="name" defaultValue="John Doe" className="bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-900">Username</p>
                            <Input id="username" defaultValue="johndoe123" className="bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-900">Email</p>
                            <Input id="email" type="email" defaultValue="john.doe@example.com" className="bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-900">Gender</p>
                            <Input id="gender" defaultValue="Male" className="bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-900">Date of Birth</p>
                            <Input id="dob" type="date" defaultValue="1990-01-15" className="bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
                        </div>

                    </CardContent>

                    <CardFooter className="flex justify-end space-x-2">
                        <Link href="/profile" passHref>
                            <Button className="text-gray-900">Cancel</Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="bg-white text-black border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Save Changes
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}