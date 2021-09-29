import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    a{
        text-decoration:none;
        color:inherit;
        cursor:pointer;
    }
    *{
        box-sizing:border-box;
    }
    html{
        font-family: "Do Hyeon";
    }
    body{
        max-width:1380px;
        margin:0 auto;
        padding:10px;
    }
    select {
    -o-appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    width: 120px;
    height: 35px;
    background: url("https://freepikpsd.com/media/2019/10/down-arrow-icon-png-7-Transparent-Images.png")
        calc(100% - 5px) center no-repeat;
    background-size: 20px;
    padding: 5px 30px 5px 10px;
    border-radius: 4px;
    outline: 0 none;
    font-family: "Do Hyeon";
    font-size: 16px;
    cursor: pointer;
    &::-webkit-scrollbar{
        display: none;
    }
    &::-ms-expand {
    display: none;
    }
}

`;

export default GlobalStyles;
