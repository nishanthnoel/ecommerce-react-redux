import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/userProfile";

function UserProfilePage() {
  return (
    <>
      <Navbar>
        <h1 className="text-2xl font-bold tracking-tight text-black text-left">
          My Profile
        </h1>

        <UserProfile></UserProfile>
      </Navbar>
    </>
  );
}

export default UserProfilePage;
