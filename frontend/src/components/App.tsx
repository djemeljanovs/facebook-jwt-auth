import * as React from 'react';
import FacebookLogin, {ReactFacebookLoginInfo} from 'react-facebook-login';
import UserConnected from "../containers/UserConnected";
import styled, { injectGlobal } from 'styled-components';

const DINProRegularFont = require('../../public/fonts/DINPro-Regular.otf');
const DINProBoldFont = require('../../public/fonts/DINPro-Bold.otf');

injectGlobal`
    @font-face {
        font-family: DinProRegular;
        src: url(${DINProRegularFont})
    }
    
     @font-face {
        font-family: DinProBold;
        src: url(${DINProBoldFont})
    }
`;


const Wrapper = styled.div`
    text-align: center;
    margin: auto;
    width: 80%;
    
    font-size: 24px;
    font-family: DinProRegular, Arial, sans-serif;
`;

export interface AppProps {
    isAuthorized: boolean;
    handleFacebookLoginSuccess: (facebookUser: ReactFacebookLoginInfo) => void;
}

const LoginView = styled.div`

`;
class App extends React.Component<AppProps> {
    public render() {
        return (<Wrapper>
            {this.props.isAuthorized
                ? <UserConnected />
                : <LoginView>
                    <p>Please login:</p>
                    <FacebookLogin
                        appId="252165875435582"
                        buttonStyle={{
                            fontFamily: 'DinProRegular, Arial, sans-serif'
                        }}
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.props.handleFacebookLoginSuccess}/>
                  </LoginView>
            }
        </Wrapper>);
    }
}

export { App };
