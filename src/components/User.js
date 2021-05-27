import React from "react";
import Header from './Header';
import logo from '../logo.jpg';

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: true,
            error: null
        }
    }

    render() {
        const { isLoaded, error } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <article id="page">
                    <header id="Header">
                        <Header />
                    </header>

                    <div id="logo">
                        <img src={logo} alt="logo" id="logo"></img>
                    </div>
                    <div id="User Profile">
                        <div>{this.props.userThatIsSelected.companyName}</div>
                        <div>{this.props.userThatIsSelected.firstName} {this.props.userThatIsSelected.lastName}</div>
                        <div><p bold="true">Email: </p>{this.props.userThatIsSelected.email}</div>
                        <div><p bold="true">Phone: </p>{this.props.userThatIsSelected.phoneCode} {this.props.userThatIsSelected.phoneNumber}</div>
                        <div><p bold="true">Member since: </p>{this.props.userThatIsSelected.creation}</div>
                    </div>
                    {this.props.userThatIsSelected.advertisements.map((item =>
                        <div id="advertisements">
                            <img src={logo} alt="logo" id="logo"></img>
                            <h1 key={item.headline} value={item.headline}>value={item.headline}</h1>
                            <div key={item.text} value={item.text}>{item.text}</div>
                            <div key={item.price} value={item.price}><h4 bold="true">Price:</h4> {item.price} ,-</div>
                        </div>
                    ))}
                </article>
            );
        }
    }
}

export default User;