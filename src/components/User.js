import React from "react";
import Header from './Header';
import '../css/User.css';

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: true,
            error: null
        }
    }

    dateConverter(timestamp) {
        let dateTime = new Date(timestamp);
        let result = dateTime.getFullYear() + "-" +
                    dateTime.getMonth() + "-" + dateTime.getDay();
        return result;
    }

    changedCategory = (category) => {
        this.setState({selectedCategory: category})
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
                        <Header onChange = {this.changedCategory} />
                    <div id="user-logo">
                        <img src="/userlogo.jpg" alt="logo" id="user-logo"></img>
                    </div>
                    <div id="User_Profile">
                        <p className="user-row">{this.props.userThatIsSelected.companyName}</p>
                        <p className="user-row">{this.props.userThatIsSelected.firstName} {this.props.userThatIsSelected.lastName}</p>
                        <p className="user-row">Email: {this.props.userThatIsSelected.email}</p>
                        <p className="user-row">Phone: {this.props.userThatIsSelected.phoneCode} {this.props.userThatIsSelected.phoneNumber}</p>
                        <p className="user-row">Member since: {this.dateConverter(this.props.userThatIsSelected.creation)}</p>
                    </div>
                    {this.props.userThatIsSelected.advertisements.map((item =>
                        <div id="advertisements">
                            <img src="/download.jpeg" alt="logo" id="mc"></img>
                            <h1 className="adver-row">{item.headline}</h1>
                            <div className="adver-row">{item.text}</div>
                            <div className="adver-row"><p bold="true">Price: {item.price} ,-</p></div>
                        </div>
                    ))}
                </article>
            );
        }
    }
}

export default User;