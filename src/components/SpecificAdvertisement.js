import React from "react";
import Header from './Header';
import User from './User';
import '../css/SpecificAdvertisement.css';

class SpecificAdvertisement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            advertisementResult: [],
            specificAdvertisementRow: null,
            userResultSet: [],
            selectedUser: null
        }
    }

    handleClick = (e) => {
        this.setState({
            selectedUser: this.state.userResultSet
        })
    }

    dateConverter(timestamp) {
        let dateTime = new Date(timestamp);
        let result = dateTime.getFullYear() + "-" +
            dateTime.getMonth() + "-" + dateTime.getDay();
        return result;
    }

    componentDidMount() {
        fetch("http://localhost:8087/users")
            .then(userres => userres.json())
            .then((userResult => {
                let user;
                let advertisement;
                for (let key in userResult) {
                    let userRow = userResult[key]
                    for (let data in userRow.advertisements) {
                        let advertisementRow = userRow.advertisements[data]
                        if (advertisementRow.id.localeCompare(this.props.advertisementThatIsSelected) === 0) {
                            user = userRow;
                            advertisement = advertisementRow;
                        }
                    }
                }
                for (let textlength in advertisement) {
                    if (advertisement.text.length > 60) {
                        advertisement.shorterText = advertisement.text.substring(0, 60);
                    } else {
                        advertisement.shorterText = advertisement.text;
                    }
                }
                this.setState({
                    isLoaded: true,
                    advertisementResult: user.advertisements,
                    specificAdvertisementRow: advertisement,
                    userResultSet: user,
                });
            }))
    }

    changedCategory = (category) => {
        this.setState({ selectedCategory: category })
    }

    render() {
        const { isLoaded, error, advertisementResult, selectedUser, userResultSet, specificAdvertisementRow } = this.state;


        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } if (selectedUser !== null) {
            return (<User userThatIsSelected={selectedUser} />)
        } else {
            return (
                <article className="page">
                    <Header onChange={this.changedCategory} />
                    <div className="bodypage">
                        <div className="User_Profile">
                            <div className="user-row">{userResultSet.companyName}</div>
                            <div className="user-row">{userResultSet.firstName} {userResultSet.lastName}</div>
                            <div className="user-row">Email: {userResultSet.email}</div>
                            <div className="user-row">Phone: {userResultSet.phoneCode} {userResultSet.phoneNumber}</div>
                            <button className="user-row" data-id={userResultSet} onClick={this.handleClick}>View User</button>
                        </div>
                        <div className="Advertisement">
                            <div className="logo">
                                <img src="/download.jpeg" alt="logo" id="mc"></img>
                            </div>
                            <h1 className="adver-row">{specificAdvertisementRow.type}</h1>
                            <p className="adver-row">{this.dateConverter(specificAdvertisementRow.creation)}</p>
                            <h1 className="adver-row">{specificAdvertisementRow.headline}</h1>
                            <div className="adver-row">{specificAdvertisementRow.shorterText}</div>
                            <div className="adver-row">Price: {specificAdvertisementRow.price} ,-</div>
                        </div>
                    </div>
                </article>
            );
        }
    }
}

export default SpecificAdvertisement;