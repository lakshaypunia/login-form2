import React from "react";
import { Camera, User } from "lucide-react";

interface ProfileProps {
  name: string;
  email: string;
}

const ProfilePage: React.FC<ProfileProps> = ({ name, email }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 ">
      <div className="w-full h-[68px] bg-white p-6">
      <h2 className="text-[18px] text-[#1D2226] font-semibold  mb-6">Account Settings</h2>
      </div>
      <div className="bg-gray-200 p-6">
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Profile section */}
        <div className="flex items-center gap-4">
          {/* Profile Image Circle */}
          <div className="relative w-20 h-20">
            <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden bg-gray-400">
              <User className="w-full h-full" />
            </div>

            {/* Camera icon overlay */}
            <div className="absolute bottom-0 right-0 bg-purple-600 p-1 rounded-full cursor-pointer">
              <Camera size={16} color="white" />
            </div>
          </div>

          {/* Name and email */}
          <div className="md:hidden flex flex-col">
            <h3 className="font-semibold text-base text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{email}</p>
          </div>
        </div>

        {/* Text content (Name, Email, Bio) */}
        <div className="hidden md:flex flex-col">
          <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mb-3">{email}</p>
          <p className="text-sm text-gray-500 max-w-md">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam.
          </p>
        </div>
      </div>

      {/* Mobile bio shown separately */}
      <div className="md:hidden mt-4 text-sm text-gray-500">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam.
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;
