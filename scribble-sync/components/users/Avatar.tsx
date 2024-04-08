import Image from "next/image";
import styles from "./Avatar.module.css";
// import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {
  name: string;
  otherStyles?: string;
};

const Avatar = ({ name, otherStyles }: {otherStyles: string; name:string}) => (
  <>
    {/* <Tooltip>
      <TooltipTrigger> */}
    <div
      className={`${styles.avatar} h-9 w-9 ${otherStyles}`}
      data-tooltip={name}
    >
      <Image
        src={`https://liveblocks.io/avatars/avatar-${Math.floor(
          Math.random() * 30
        )}.png`}
        fill
        sizes="100px"
        
        className={styles.avatar_picture}
        alt={name}
      />
    </div>
    {/* </TooltipTrigger> 
      <TooltipContent className="border-none bg-primary-grey-200 px-2.5 py-1.5 text-xs">
        {name}
      </TooltipContent>
    </Tooltip> */}
  </>
);

export default Avatar;
