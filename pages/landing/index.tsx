'use client'
import { useRouter } from 'next/navigation'
import type { NextPage } from "next";
import Image from "next/image";
import './landing.css';
import cover from '../../public/cover/cover-2.jpg';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Landing:NextPage = () => {

    const router = useRouter();

    const userLogHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        router.push('/Authentication/Login')
    };

    const userRegHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        router.push('/Authentication/Signup')
    };

    const adminLogHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        router.push('/Authentication/AdminLogin')
    };

    const adminRegHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
        router.push('/Authentication/AdminSignup')
    };

    return (
        <>
            <div className="slider">
                <h3>Slider</h3>
            </div>
            <div className="cover">
                <h1 className="coverText">
                    WELCOME TO <br/>
                    TRAIN MANAGEMENT SYSTEM
                </h1>
                <div className="userDiv">
                    <h1>Passenger</h1>
                    <div className="row">
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        <div className="btnSection">
                            <button className="landBtn" onClick={userLogHandler}>Sign In</button>
                            <button className="landBtn" onClick={userRegHandler}>Sign Up</button>
                        </div>
                    </div>
                </div>
                <div className="adminDiv">
                    <h1>Admin</h1>
                    <div className="row">
                        <FontAwesomeIcon icon={faTools} className="icon" />
                        <div className="btnSection">
                            <button className="landBtn" onClick={adminLogHandler}>Sign In</button>
                            <button className="landBtn" onClick={adminRegHandler}>Sign Up</button>
                        </div>
                    </div>
                </div>
                <Image 
                    src={cover}
                    alt="cover image"
                    loading="lazy"
                    className="coverImage"
                />
               
            </div>
            <div className="footer">
                <h1 className="footerText">Developed by Team Leagion</h1>
            </div>
        </>
    )
}

export default Landing;