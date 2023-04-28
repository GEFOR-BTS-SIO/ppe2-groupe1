type TitreProps = {
  color: "text-red-500" | "text-blue-500";
}

export const Titre = ({color}: TitreProps) => {
    return (
        <h1 className={color}>
      
        Titre hello hello
      </h1>
    );
}