import React from "react";
import logo from '../logo.jpg';
import Advertisements from './Advertisements';
import '../css/Header.css'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            categories: [],
            selectedCategory: null
        }
    }



    handleClick = (e) => {
        window.location.href="/";
    }

    selectCategory = (e) => {
        let target = e.target;
        console.log(e.target);
        let selectedCategoryIndex = target.value;
        console.log(selectedCategoryIndex)
        this.setState({
            selectedCategory: selectedCategoryIndex
        });
    }


    componentDidMount() {
        fetch("http://localhost:8087/categories")
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

    render() {
        const { isLoaded, error, categories, selectedCategory } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            if (selectedCategory !== null) {
                return (<Advertisements advertisementCategory={selectedCategory} />);
            } else {
            return (
                <header id="Header">
                    <img src={logo} alt="Logo"  onClick={this.handleClick} />
                    <select name="Categories" onChange={this.selectCategory}>
                        <option value="Empty">
                            
                        </option>
                        {categories.map((item =>
                        <option key={item.category} value={item.category} >{item.category}</option>
                    ))}
                    </select>
                <button>
                    Create Add
                </button>
                <button>
                    Login
                </button>
                <button>
                    Signup
                </button>
                </header>
            )
        }}
    }
}

export default Header;