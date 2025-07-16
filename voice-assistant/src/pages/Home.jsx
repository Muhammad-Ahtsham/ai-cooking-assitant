import { useParams } from "react-router-dom";
import { Input } from "../components/Input";
import { Messages } from "../components/Messages";
import Navbar from "../components/Navbar";

const Home = () => {
  const { historyId } = useParams();
  return (
    <div className="flex flex-col justify-between items-center h-screen w-dvw">
      <Navbar />
      <Messages historyId={historyId} />
      <div className="flex justify-center items-center">
        <Input historyId={historyId} />
      </div>
    </div>
  );
};

export default Home;
