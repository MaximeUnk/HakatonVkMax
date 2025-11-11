import React from "react";
import Link from "next/link";
import ProfileComponent from "../components/Profile";
import BottomBar from "../components/BottomBar";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background md:bg-black relative">
      <ProfileComponent />
      <BottomBar />
    </div>
  );
};

export default ProfilePage;
