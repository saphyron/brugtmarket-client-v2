import React from "react";
import Header from './Header';
import logo from '../logo.jpg';
import SpecificAdvertisement from './SpecificAdvertisement';

class Advertisements extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            allAdvertisements: [],
            advertisementsResults: [],
            selectedAdvertisement: null
        }
    }

    componentDidMount() {
        fetch("http://localhost:8087/categories/"+ this.props.advertisementCategory)
        .then(res => res.json())
        .then((result) => {
            let temp = [];
            console.log("result af specific category: "+result);
            for(let key in result) {
                for(let data in result[key].advertisements) {
                    temp.push(result[key].advertisements[data]);
                }
            }
            console.log("result af looped category: "+temp);
            this.setState({
                isLoaded: true,
                advertisementsResults: temp,
                allAdvertisements: result
            });
        }).catch(error => {
            this.setState({
                isLoaded: true,
                error: error
            })
        })
    }

    handleClick = (e) => {
        let target = e.target;
        console.log("e.target: "+target);
        let selectedAdvertisementIndex = target.parentElement.getAttribute("data-id");
        console.log("Selected target.value: "+ selectedAdvertisementIndex);
        this.setState({
            selectedAdvertisement: selectedAdvertisementIndex
        });
    }

    render() {
        const {isLoaded, error, allAdvertisements, advertisementsResults, selectedAdvertisement} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (selectedAdvertisement !== null){
            return (<SpecificAdvertisement advertisementThatIsSelected={selectedAdvertisement} />)
        } else { return (
            <article id="page">
                <header id="Header">
                    <Header />
                </header>
                <div id="advertisements">
                    <h1>{this.props.advertisementCategory}</h1>
                    
                    {advertisementsResults.map((item => 
                        <div data-id={item.id} >
                            <div>
                                <img src={logo} alt={item.headline} id="logo"></img>
                            </div>
                            <div>
                                <h2 key={item.type} value={item.type}>{item.type}</h2>
                            </div>
                            <div>
                            <h3 id="Headline" key={item.headline} value={item.headline}>{item.headline}</h3>
                            </div>
                            <div key={item.text} value={item.text}>{item.text}</div>
                            <div key={item.price} value={item.price}><h4 bold="true">Price:</h4> {item.price} ,-</div>
                            <button onClick={this.handleClick}>View Advertisement</button>
                        </div>
                        
                    ))}
                </div>
            </article>
        );
    }}
}

export default Advertisements;