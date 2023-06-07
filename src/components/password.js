import React, { useEffect, useState } from 'react'
import { LuSaveAll } from "react-icons/lu";
import { FiRotateCw } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

import './password.css'
import "react-toastify/dist/ReactToastify.css";

const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowercaseList = 'abcdefghijklmnopqrstuvwxyz'
const numbersList = '0123456789'
const specialList = '!@#$%^&\*()'

export default function Password() {
    const [widthInput, setWidthInput] = useState(8);
    const [password, setPassword] = useState('');
    const [lowerCase, setLowerCase] = useState(true);
    const [upperCase, setUpperCase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [special, setSpecial] = useState(true);
    const [passwordError, setPasswordError] = useState('')
    const [colorPasswordError, setColorPasswordError] = useState('')
    const [selectedChoices, setSelectedChoices] = useState(['uppercase', 'lowercase', 'numbers', 'special'])

    const regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*[d$!@#$%^&*()]).*$";

    useEffect(() => {
        generatePassword()
    }, [widthInput])

    const changeWidthInput = (event) => {
        setWidthInput(event.target.value);
    };

    const handleCheckbox = (type) => {
        let tempChoices = selectedChoices
        
        if (tempChoices.includes(type)) {
            const index = tempChoices.indexOf(type)
            tempChoices.splice(index, 1)
        }
        
        if (tempChoices.length === 0) {
            setLowerCase(true)
        }

        setSelectedChoices(tempChoices)
    }

    const generatePassword = () => {
        let staticPassword = ''

        if (lowerCase) {
            staticPassword += lowercaseList
        }
        if (upperCase) {
            staticPassword += uppercaseList
        }
        if (numbers) {
            staticPassword += numbersList
        }
        if (special) {
            staticPassword += specialList;
        }

        let tempPassword = "";
        
        for (let i = 0; i < widthInput; i++) {
            tempPassword += staticPassword[Math.floor(Math.random() * staticPassword.length)]
        }

        if (tempPassword.length < 8) {
            setPasswordError("Too short");
            setColorPasswordError("red")
        } else {
            if (tempPassword.match(regex)) {
                setPasswordError("Hard");
                setColorPasswordError("green")
            } else {
                setPasswordError("")
            }

            if (selectedChoices.length === 3) {
                setPasswordError("Medium");
                setColorPasswordError("orange")
            } else if (selectedChoices.length === 2) {
                setPasswordError("Easy");
                setColorPasswordError("red");
            }
        }

        setPassword(tempPassword)
    }

    const copyPassword = async () => {
        const copyText = await navigator.clipboard.readText()
        if (password.length && copyText !== password) {
            navigator.clipboard.writeText(password)
            toast.success('Password Copied', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <>
            <div className="input">
                <input type="text" value={password} disabled />
                <FiRotateCw className='input-icon' onClick={generatePassword} />
                <button onClick={copyPassword}>
                    <LuSaveAll className='button-icon'/>Copy
                </button>
                <ToastContainer />
            </div>
            <span className="strength" style={{color: `${colorPasswordError}`}}>{passwordError}</span>
            <div className="slide">
                <div className="slide-detail">
                    <label>Password Length: </label>
                    <span>{widthInput}</span>
                </div>
                <input
                    type='range'
                    onChange={changeWidthInput}
                    min={1}
                    max={30}
                    step={1}
                    value={widthInput}
                    className="slider"
                ></input>
            </div>
            <div className="settings">
                <ul>
                    <li className="option">
                        <label htmlFor="upper">Uppercase</label>
                        <input 
                            type="checkbox"
                            name="upper" 
                            id="upper"
                            // disabled={selectedChoices.length === 1 && selectedChoices.includes("uppercase")}
                            checked={upperCase}
                            onChange={() => { setUpperCase(!upperCase); handleCheckbox('uppercase') }} 
                        />
                    </li>
                    <li className="option">
                        <label htmlFor="lower">Lowercase</label>
                        <input 
                            type="checkbox" 
                            name="lower"
                            id="lower" 
                            // disabled={selectedChoices.length === 1 && selectedChoices.includes("lowercase")}
                            checked={lowerCase}
                            onChange={() => { setLowerCase(!lowerCase); handleCheckbox('lowercase') }} 
                        />
                    </li>
                    <li className="option">
                        <label htmlFor="numbers">Numbers</label>
                        <input 
                            type="checkbox" 
                            name="numbers"
                            id="numbers" 
                            // disabled={selectedChoices.length === 1 && selectedChoices.includes("numbers")}
                            checked={numbers}
                            onChange={() => { setNumbers(!numbers); handleCheckbox('numbers') }} 
                        />
                    </li>
                    <li className="option">
                        <label htmlFor="special">Special Characters</label>
                        <input 
                            type="checkbox" 
                            name="special"
                            id="special" 
                            // disabled={selectedChoices.length === 1 && selectedChoices.includes("special")}
                            checked={special}
                            onChange={() => { setSpecial(!special); handleCheckbox('special') }} 
                        />
                    </li>
                </ul>
            </div>
        </>
    )
}
