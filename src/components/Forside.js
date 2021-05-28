import React from "react";
import Header from './Header';
import '../css/Forside.css'
import Advertisements from './Advertisements';

class Forside extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            categories: [],
            selectedCategory: null
        }
    }

    componentDidMount() {
        fetch("http://localhost:8087/categories/count")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    categories: result
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
        let selectedCategoryIndex = target.parentElement.getAttribute("data-id");
        this.setState({
            selectedCategory: selectedCategoryIndex
        });
    }

    changedCategory = (category) => {
        this.setState({selectedCategory: category})
    }

    render() {
        const { isLoaded, error, categories, selectedCategory } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (selectedCategory !== null) {
            return (<Advertisements advertisementCategory={selectedCategory} />)
        } else {
            return (
                <article id="page">
                    <Header onChange = {this.changedCategory}/>
                    {categories.map((item =>
                        <div className="Categories">
                            <div className="forside-row" data-id={item.category}>
                                
                                <p>{item.category}</p>
                                <p>{item.count}</p>
                                <button onClick={this.handleClick}>View Category</button>
                            </div>
                        </div>
                    ))}

                </article>
            )
        }
    }

}

export default Forside;