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

    render() {
        const { isLoaded, error } = this.state;

        

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <article id="page">
                        <Header />
                    <div id="user-logo">
                        <img src="/userlogo.jpg" alt="logo" id="user-logo"></img>
                    </div>
                    <div id="User_Profile">
                        <div className="user-row">{this.props.userThatIsSelected.companyName}</div>
                        <div className="user-row">{this.props.userThatIsSelected.firstName} {this.props.userThatIsSelected.lastName}</div>
                        <div className="user-row"><p bold="true">Email: </p>{this.props.userThatIsSelected.email}</div>
                        <div className="user-row"><p bold="true">Phone: </p>{this.props.userThatIsSelected.phoneCode} {this.props.userThatIsSelected.phoneNumber}</div>
                        <div className="user-row"><p bold="true">Member since: </p>{this.dateConverter(this.props.userThatIsSelected.creation)}</div>
                    </div>
                    {this.props.userThatIsSelected.advertisements.map((item =>
                        <div id="advertisements">
                            <img src="/download.jpeg" alt="logo" id="mc"></img>
                            <h1 className="adver-row">{item.headline}</h1>
                            <div className="adver-row">{item.text}</div>
                            <div className="adver-row"><h4 bold="true">Price:</h4> {item.price} ,-</div>
                        </div>
                    ))}
                </article>
            );
        }
    }
}

export default User;