import { Card, CardTitle } from 'reactstrap';
import monsieur from './monsieur-lefry-t-shirt.png';
import cap from './black-cap.png';
import monk from './fry-monk-black-t-shirt.png';

const StoreItems = () => {

    const items = [
        {
            name: 'Monsieur LeFry T-Shirt',
            image: monsieur,
            link: 'https://www.etsy.com/listing/1795875850/monsieur-le-fry-the-french-fry'
        },
        {
            name: 'Fry Monk T-Shirt',
            image: monk,
            link: 'https://www.etsy.com/listing/1796245424/fry-monk-t-shirt'
        },
        {
            name: 'FryRank Corduroy Cap',
            image: cap,
            link: 'https://www.etsy.com/listing/1796154532/fry-ranker-vintage-corduroy-cap'
        }
    ]

    return (
        <>
            <div className="center">
                <h5><a href="https://fryrank.etsy.com/" target="_blank">SEE ALL</a></h5>
            </div>
            <div className="store-items">
                {items.map(item => (
                    <Card
                        className="inline mx-2 my-2"
                        style={{
                            width: '15rem'
                        }}
                    >
                        <a href={item.link} target="_blank">
                            <img src={item.image} style={{"width": "100%"}} alt={item.name} />
                        </a>
                        <CardTitle tag="h5" className="px-2">
                            <a href={item.link} target="_blank">{item.name}</a>
                        </CardTitle>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default StoreItems;