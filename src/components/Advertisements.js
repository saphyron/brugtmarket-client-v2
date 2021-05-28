import React from "react";
import Header from './Header';
import SpecificAdvertisement from './SpecificAdvertisement';
import '../css/Advertisements.css';

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
        fetch("http://localhost:8087/categories/" + this.props.advertisementCategory)
            .then(res => res.json())
            .then((result) => {
                let temp = [];
                for (let key in result) {
                    for (let data in result[key].advertisements) {
                        temp.push(result[key].advertisements[data]);
                    }
                }
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
        let selectedAdvertisementIndex = target.parentElement.getAttribute("data-id");
        this.setState({
            selectedAdvertisement: selectedAdvertisementIndex
        });
    }

    changedCategory = (category) => {
        this.setState({ selectedCategory: category })
    }

    render() {
        const { isLoaded, error, allAdvertisements, advertisementsResults, selectedAdvertisement } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (selectedAdvertisement !== null) {
            return (<SpecificAdvertisement advertisementThatIsSelected={selectedAdvertisement} />)
        } else {
            return (
                <article id="page">
                    <Header onChange={this.changedCategory} />
                    <h1 className="title-profile">{this.props.advertisementCategory}</h1>
                    {advertisementsResults.map((item =>
                        <div className="advertisement-row" data-id={item.id} >
                            <img src="/download.jpeg" alt="logo" id="mc"></img>
                            <h2 className="adver-row">{item.type}</h2>
                            <h4 className="adver-row"> {item.headline}</h4>
                            <div className="adver-row">{item.text}</div>
                            <div className="adver-row">Price: {item.price} ,-</div>
                            <button onClick={this.handleClick}>View Advertisement</button>
                        </div>
                    ))}
                </article>
            );
        }
    }
}

export default Advertisements;