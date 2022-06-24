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
        font-family: "mabinogi";
    }
    body{
        max-width:1380px;
        margin:0 auto;
        padding-top: 80px;
    }
`;

export default GlobalStyles;
