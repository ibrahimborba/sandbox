interface Pet {
  name: string;
  animal: string;
  breed: string;
}

const Pet = (props: Pet) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <h3>{props.animal}</h3>
      <h3>{props.breed}</h3>
    </div>
  );
};

export default Pet;
