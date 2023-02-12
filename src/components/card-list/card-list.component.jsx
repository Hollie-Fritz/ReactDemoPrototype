import './card-list.styles.css';
import Card from '../card/card.component';

const CardList = ({ restaurants }) => (
    <div className='card-list'> 
        {restaurants.map((restaurant) => {
            return <Card restaurant={restaurant} />;
        })}
    </div>
);

export default CardList;