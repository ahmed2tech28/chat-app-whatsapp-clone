import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function SendMessageContainer() {
  return (
    <form className="h-[7%] w-full flex justify-center items-center">
      <Button
        variant={"link"}
        className="rounded-full py-7 inline-flex justify-center items-center"
      >
        <AddIcon />
      </Button>
      <Input className="border-black rounded-md h-12 active:outline-none focus:outline-none text-xl" />
      <Button
        variant={"link"}
        className="rounded-full py-7 inline-flex justify-center items-center"
      >
        <SendIcon />
      </Button>
    </form>
  );
}

export default SendMessageContainer;
