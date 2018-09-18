import * as React from 'react';
import styled from 'styled-components';

const UserView = styled.div`
  margin: 0 auto;
`;

const LogoutButton = styled.div`
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: calc(.27548vw + 12.71074px);
    text-decoration: none;
    text-transform: uppercase;
    transition: background-color .3s,border-color .3s;
    background-color: #FF8E14;
    padding: calc(.34435vw + 13.38843px) calc(.34435vw + 18.38843px);
`;

export interface UserProps {
    displayName: string;
    familyName: string;
    givenName: string;
    profileImage: string;
    email?: string;

    logoutHandler: () => void;
}

const Email = styled.div`
    background: red;
    background: -webkit-linear-gradient(left, orange , yellow, green, cyan, blue, violet);
    background: -o-linear-gradient(right, orange, yellow, green, cyan, blue, violet);
    background: -moz-linear-gradient(right, orange, yellow, green, cyan, blue, violet);
    background: linear-gradient(to right, orange , yellow, green, cyan, blue, violet);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 5vw;
    paddng: 0;
    margin: 0;
`;

class User extends React.Component<UserProps> {
    public render() {
        return <UserView>
            <p>Welcome, {this.props.givenName}!</p>
            {this.props.email ? <p>Your email is shiny:</p> : null}
            <Email>{this.props.email}</Email>
            <p>You look great today:</p>
            <img src={this.props.profileImage} />
            <p>Keep smiling!</p>
            <br/>
            <LogoutButton onClick={this.props.logoutHandler}>
                Logout
            </LogoutButton>
        </UserView>;
    }
}

export { User };
