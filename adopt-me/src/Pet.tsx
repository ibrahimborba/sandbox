export interface IPet {
  name: string;
  animal: string;
  breed: string;
}

const Pet = (props: IPet & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <h3>{props.animal}</h3>
      <h3>{props.breed}</h3>
    </div>
  );
};

export default Pet;
