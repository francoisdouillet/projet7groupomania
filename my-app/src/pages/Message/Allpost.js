import React from 'react';
import axios from "axios";

const Allpost = () => {
    axios.get("http://localhost:3001/api/posts",{ headers: { "Authorization":"Bearer " + localStorage.getItem("token")}}).then(res => console.log(res)).catch(err => console.log(err))
    return (
        <div className="card">
            <div className="card__head">
                <p className="card__head--name">Fralebougre</p>
                <p className="card__head--date">16 octobre 2022</p>  
            </div>
            <div className="card__image">
                <img className="card__image--img" src="http://localhost:3001/images/198728047_1164302447326938_5991499392315109451_n.jpg1628181712884.jpg"/>
            </div>
            <div>
                <p>Lorem ipsum eajeoeazazLorem ipsum eajeoeazazLorem ipsum eajeoeazazLorem ipsum eajeoeazazLorem ipsum eajeoeazazLorem ipsum eajeoeazazLorem ipsum eajeoeazazLorem ipsum eajeoeazazLorem ipsum eajeoeazazLorem ipsum eajeoeazazLorem ipsum eajeoeazazLorem ipsum eajeoeazazLorem ipsum eajeoeazazLorem ipsum eajeoeazazLorem ipsum eajeoeazazLorem ipsum eajeoeazaz</p>
            </div>
        </div>
    )
}

export default Allpost;