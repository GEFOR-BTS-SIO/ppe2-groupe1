import { useState } from "react";
import { Titre } from "../../components/Titre";
import { ButtonTp5 } from "../../components/buttonTp5";

export default function Tp5() {
        
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);

  };
  return (
    <div>
      <Titre color={clicked? "text-red-500" : "text-blue-500"}/>
      <ButtonTp5 onClickFunction={handleClick}/>
    </div>
  );
}
