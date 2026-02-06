import { supabase } from "../supabase/createClient";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error signing out: " + error.message);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      This is the home page<button onClick={handleSignOut}>Log out</button>
    </div>
  );
};
export default HomePage;
