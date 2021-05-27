import React from "react";
import Header from './Header';
import logo from '../logo.jpg';
import '../css/Forside.css'

class Forside extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            categories: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8087/categories/count")
        .then(res => res.json())
        .then((result) => {
            console.log(result)
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

    render() {
        const {isLoaded, error, categories} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else { return (
            <article id="page">
                <header id="Header">
                    <Header />
                </header>
                {categories.map((item => 
                    <div id="Categories">
                        <div>
                            <p key={item.category} value={item.category}>
                                {item.category}
                                <p key={item.count} value={item.count}>
                                    {item.count}
                                </p>
                            </p>
                        </div>
                    </div>
                ))}
                
            </article>
        )}
    }

}

export default Forside;