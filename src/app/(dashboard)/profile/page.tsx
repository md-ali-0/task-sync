import PersonalInformation from "@/components/profile/personal-information";
import Security from "@/components/profile/security";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile",
    description: "Manage your profile settings",
};

export default function ProfilePage() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <PersonalInformation />
                </div>
                <div className="space-y-8">
                    <Security />
                </div>
            </div>
        </div>
    );
}
