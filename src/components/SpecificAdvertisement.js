import React from "react";
import Header from './Header';
import User from './User';

class SpecificAdvertisement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            advertisementResult: [],
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
                    userResultSet: user,
                });
            }))
    }

    render() {
        const { isLoaded, error, advertisementResult, selectedUser, userResultSet } = this.state;


        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } if (selectedUser !== null) {
            return (<User userThatIsSelected={selectedUser} />)
        } else {
            return (
                <article className="page">
                        <Header />

                    <div className="logo">
                        <img src="/download.jpeg" alt="logo" id="mc"></img>
                    </div>
                        <div className="User_Profile">
                            <div className="user-row">{userResultSet.companyName}</div>
                            <div className="user-row">{userResultSet.firstName} {userResultSet.lastName}</div>
                            <div className="user-row"><p bold="true">Email: </p><p>{userResultSet.email}</p></div>
                            <div className="user-row"><p bold="true">Phone: </p><p>{userResultSet.phoneCode} {userResultSet.phoneNumber}</p></div>
                            <button className="user-row" data-id={userResultSet} onClick={this.handleClick}>View User</button>
                        </div>
                    {advertisementResult.map((item =>
                        <div className="Advertisement">
                            <h1>{item.type}</h1>
                            <p>{this.dateConverter(item.creation)}</p>
                            <h1>{item.headline}</h1>
                            <div className="text">{item.shorterText}</div>
                            <div><h4 bold="true">Price:</h4> {item.price} ,-</div>
                        </div>
                    ))}
                </article>
            );
        }
    }
}

export default SpecificAdvertisement;