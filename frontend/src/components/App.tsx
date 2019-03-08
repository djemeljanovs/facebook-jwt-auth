import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';
import Streamer from "./Streamer";
import {ReactFacebookLoginInfo} from "react-facebook-login";

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

class App extends React.Component<AppProps> {
    public render() {
        return (
            <Wrapper>
                <Streamer/>
            </Wrapper>
        );
    }
}

export { App };
