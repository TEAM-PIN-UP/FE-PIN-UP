import { createGlobalStyle } from "styled-components";
import "./font.css";

const GlobalStyle = createGlobalStyle`
    :root{
        // screen width
        --min_width:320px;
        --max_width:440px;

        // font
        --H1 : 'H1';
        --H2 : 'H2';
        --H3 : 'H3';
        --H4 : 'H4';
        --H5 : 'H5';
        --H6 : 'H6';
        --B1 : 'B1';
        --B2 : 'B2';
        --B3 : 'B3';
        --B4 : 'B4';
        --B5 : 'B5';
        --B6 : 'B6';
        --C1 : 'C1';
        --C2 : 'C2';
        --C3 : 'C3';
        --D1 : 'D1';
        --D2 : 'D2';
        
        // size
        --radius_4 : 4px;
        --radius_6 : 6px;
        --radius_8 : 8px;
        --radius_10 : 10px;
        --radius_12: 12px;
        --radius_16 : 16px;
        --radius_20 : 20px;
        --radius_24 : 24px;
        --radius_circle: 9999px;
        
        --spacing_4 : 4px;
        --spacing_6 : 6px;
        --spacing_8 : 8px;
        --spacing_10 : 10px;
        --spacing_12 : 12px;
        --spacing_16 : 16px;
        --spacing_20 : 20px;
        --spacing_24 : 24px;
        --spacing_32 : 32px;
        --spacing_40 : 40px;
        --spacing_48 : 48px;

        // color 
        --neutral_50 : #F7F7F7;
        --neutral_100 : #F3F3F3;
        --neutral_200 : #E2E3E5;
        --neutral_300 : #C2C3C4;
        --neutral_400 : #A0A1A3;
        --neutral_500 : #7C7D7E;
        --neutral_600 : #5F5F60;
        --neutral_700 : #424242;
        --neutral_800 : #1f1f1f;
        --white : #FFFFFF;
        --black : #000000;
        --transparent_15 : rgba(0, 0, 0, 0.15);
        --transparent_25 : rgba(0, 0, 0, 0.25);
        --transparent_50 : rgba(0, 0, 0, 0.50);
        --transparent_70 : rgba(0, 0, 0, 0.70);
        --system_error : #F36C62;
    }
`;

export default GlobalStyle;
