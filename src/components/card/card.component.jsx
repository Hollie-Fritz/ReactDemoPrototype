import './card.styles.css';

const Card = ({restaurant: {resID, Name, Cuisine, Address}}) => {
    return (
        <div className='card-container' key={resID}>
            <h2> {Name} </h2>
            <h2> {Cuisine} </h2>
            <h2> {Address} </h2>
        </div>
    )
}

export default Card;
