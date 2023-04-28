type TestProps = {
    test: string;
    soustest: string;
   };
   
   export const Test = ({
    test, soustest
   }: TestProps) => {
    return (
        <div>
        <h1>
          {test}
        </h1>
        <h2>{soustest}</h2>
        </div>
    );
   };