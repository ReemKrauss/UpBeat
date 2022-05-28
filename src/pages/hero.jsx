import { sessionService } from '../services/session.service';
import { useState } from 'react';


export const Hero = (props) => {

const windowHeight = window.outerHeight

    return <section className="hero" style={{height:(windowHeight+50)}}>
        <div className="hero-txt-container">
            <img src="../assets/upbeatlogograd.png" alt="" />
            <h1>UpBeat</h1>
            <h3>Feel the beat</h3>
            <p>Here in UpBeat, we believe any song should be just a click away.</p>
            <button onClick={props.onInitialEntry} >Start Listening</button>

        </div>

        <div className="hero-container">
            <ul className="bg-bubbles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </section>
}