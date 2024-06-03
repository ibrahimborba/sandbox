import { Link } from "react-router-dom";

const Pet = (props) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (props.images.length) {
    hero = props.images[0];
  }
  return (
    <Link to={`/details/${props.petID}`} className="relative block">
      <div className="image-container">
        <img src={hero} alt={props.name} />
      </div>
      <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent">
        <h2>{props.name}</h2>
        <h3>
          {props.animal} - {props.breed} - {props.location}
        </h3>
      </div>
    </Link>
  );
};

export default Pet;
