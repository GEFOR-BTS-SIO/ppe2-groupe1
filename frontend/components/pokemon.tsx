import { useState } from "react";
type PokemonProps = {id : string};

export const Pokemon = ({id}:PokemonProps) => {
  const [isFirstImageDisplayed, setIsFirstImageDisplayed] = useState(true);

  const handleButtonClick = () => {
    setIsFirstImageDisplayed(!isFirstImageDisplayed);
  };
  return (
    <div>
      <img className="w-[200px] objectContain" 
      src={
        isFirstImageDisplayed
        ?`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` 
      :
       `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`} 
       />
            <button onClick={handleButtonClick}>change position</button>

     </div>
     
  );
};