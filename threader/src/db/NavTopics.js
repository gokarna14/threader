import { logo } from "./img"

export const NavTopics = [ 
        {
            path: '/',
            label: logo,
            class: "navbar-item",
            DSlass: "nav-link"
        },
        {
            path: '/sa', 
            label: 'Sentiment Analysis', 
            class: "nav-item", 
            DSlass: "nav-link btn btn-outline-danger"
        },
        {
            path: '/pp', 
            label: "Personality Prediction", 
            class: "nav-items", 
            DSlass: "nav-link btn btn-outline-danger"
        },
        {
            path: '/hfg', 
            label: 'Admin', 
            class: "nav-item", 
            DSlass: "nav-link btn btn-outline-danger"
        },
]