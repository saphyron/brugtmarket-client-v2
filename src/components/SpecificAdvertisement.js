import React from "react";
import Header from './Header';
import logo from '../logo.jpg';
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
                console.log(advertisement, user)
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
                <article id="page">
                    <header id="Header">
                        <Header />
                    </header>

                    <div id="logo">
                        <img src={logo} alt="logo" id="logo"></img>
                    </div>
                        <div id="User Profile">
                            <div>{userResultSet.companyName}</div>
                            <div>{userResultSet.firstName} {userResultSet.lastName}</div>
                            <div><p bold="true">Email: </p>{userResultSet.email}</div>
                            <div><p bold="true">Phone: </p>{userResultSet.phoneCode} {userResultSet.phoneNumber}</div>
                            <button data-id={userResultSet} onClick={this.handleClick}>View User</button>
                        </div>
                    {advertisementResult.map((item =>
                        <div id="Advertisement">
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

export default SpecificAdvertisement;