import React from "react";
import Advertisements from './Advertisements';
import '../css/Header.css';

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
        window.location.href = "/";
    }

    selectCategory = (e) => {
        console.log("test")
        this.props.onChange(e.target.value);
        /*let target = e.target;
        let selectedCategoryIndex = target.value;
        this.setState({
            selectedCategory: selectedCategoryIndex
        });*/
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
                        <div className="Header-col">
                            <img id="logo" src="/logo.jpg" alt="Logo" onClick={this.handleClick} />
                        </div>
                        <div className="Header-col">
                            <select id="dropdown" name="Categories" onChange={this.selectCategory}>
                                <option value="Empty">

                                </option>
                                {categories.map((item =>
                                    <option >{item.category}</option>
                                ))}
                            </select>
                        </div>
                        <div className="Header-col">
                            <button>
                                Create Add
                            </button>
                        </div>
                        <div className="Header-col">
                            <button>
                                Login
                            </button>
                        </div>
                        <div className="Header-col">
                            <button>
                                Signup
                            </button>
                        </div>
                    </header>
                )
            }
        }
    }
}

export default Header;