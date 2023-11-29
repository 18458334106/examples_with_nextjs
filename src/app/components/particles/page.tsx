"use client"
import { Component, ReactNode } from 'react'
import Particles from 'react-particles'
import { loadSlim } from 'tsparticles-slim'
const params = {
    background: {
        color: {
            value: "#999",
        },
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
            onHover: {
                enable: true,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: false,
            speed: 6,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 80,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 5 },
        },
    },
    detectRetina: true
}

export default class ParticlesDemo extends Component{

    particlesInit = async (engine:any) => {
        console.log(engine);
        await loadSlim(engine);
    };

    particlesLoaded = async (container:any) => {
        await console.log(container);
    };

    render(){
        return (
            <div className='container'>
                <Particles
                    //@ts-ignore
                    id="particles"
                    //@ts-ignore
                    options={params}
                    init={this.particlesInit}
                    loaded={this.particlesLoaded}
                />
            </div>
        )
    }
}