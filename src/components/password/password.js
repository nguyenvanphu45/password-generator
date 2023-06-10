import React, { useEffect, useState } from 'react';
import { LuSaveAll } from 'react-icons/lu';
import { FiRotateCw } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';

import './password.css';
import 'react-toastify/dist/ReactToastify.css';

const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
const numbersList = '0123456789';
const specialList = '!@#$%^&*()';

export default function Password() {
    const [widthInput, setWidthInput] = useState(8);
    const [password, setPassword] = useState('');
    const [lowerCase, setLowerCase] = useState(true);
    const [upperCase, setUpperCase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [special, setSpecial] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const [colorPasswordError, setColorPasswordError] = useState('');
    const [selectedChoices, setSelectedChoices] = useState(['uppercase', 'lowercase', 'numbers', 'special']);

    const regex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9]).*$';
    const strongRegex = '^(?=.*[d$!@#$%^&*()]).*$';

    useEffect(() => {
        generatePassword();
    }, [widthInput]);

    const changeWidthInput = (event) => {
        setWidthInput(event.target.value);
    };

    const handleCheckbox = (type) => {
        let tempChoices = selectedChoices;

        if (tempChoices.includes(type)) {
            const index = tempChoices.indexOf(type);
            tempChoices.splice(index, 1);
        } else {
            tempChoices.push(type);
        }

        if (tempChoices.length === 0) {
            setLowerCase(true);
            tempChoices.push('lowercase');
        }

        setSelectedChoices(tempChoices);
    };

    const generatePassword = () => {
        let staticPassword = [];
        if (lowerCase) {
            staticPassword.push(lowercaseList);
        }
        if (upperCase) {
            staticPassword.push(uppercaseList);
        }
        if (numbers) {
            staticPassword.push(numbersList);
        }
        if (special) {
            staticPassword.push(specialList);
        }

        if (widthInput >= selectedChoices.length) {
            const allChars = staticPassword.join('');
            for (let i = 0; i < widthInput - selectedChoices.length; i++) {
                staticPassword.push(allChars);
            }

            let tempPassword = [];

            staticPassword.map((pass) => {
                return tempPassword.push(pass[Math.floor(Math.random() * pass.length)]);
            });

            for (var i = tempPassword.length - 1; i > 0; i--) {
                var randomPosition = Math.floor(Math.random() * i);
                var temp = tempPassword[i];
                tempPassword[i] = tempPassword[randomPosition];
                tempPassword[randomPosition] = temp;
            }

            let passwordGenerate = tempPassword.join('');

            if (passwordGenerate.length < 8) {
                setPasswordError('Too short');
                setColorPasswordError('red');
            } else {
                if (passwordGenerate.match(regex) && passwordGenerate.match(strongRegex)) {
                    setPasswordError('Hard');
                    setColorPasswordError('green');
                } else if (passwordGenerate.match(strongRegex) || selectedChoices.length === 3) {
                    setPasswordError('Medium');
                    setColorPasswordError('orange');
                } else {
                    setPasswordError('Weak');
                    setColorPasswordError('red');
                }

                if (selectedChoices.length === 2) {
                    setPasswordError('Easy');
                    setColorPasswordError('red');
                }
            }

            setPassword(passwordGenerate);
        } else {
            let shortPassword = ''
            for (let i = 0; i < widthInput; i++) {
                const random = staticPassword[Math.floor(Math.random() * staticPassword.length)];
                const randomPassword = random.charAt(Math.floor(Math.random() * random.length));

                shortPassword += randomPassword;
            }

            setPasswordError('Too short');
            setColorPasswordError('red');
            setPassword(shortPassword);
        }
    };

    const copyPassword = async () => {
        const copyText = await navigator.clipboard.readText();
        if (password.length && copyText !== password) {
            navigator.clipboard.writeText(password);
            toast.success('Password Copied', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    return (
        <>
            <div className="input">
                <input type="text" value={password} disabled />
                <FiRotateCw className="input-icon" onClick={generatePassword} />
                <button onClick={copyPassword}>
                    <LuSaveAll className="button-icon" />
                    Copy
                </button>
                <ToastContainer />
            </div>
            <span className="strength" style={{ color: `${colorPasswordError}` }}>
                {passwordError}
            </span>
            <div className="slide">
                <div className="slide-detail">
                    <label>Password Length: </label>
                    <span>{widthInput}</span>
                </div>
                <input
                    type="range"
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
                            checked={upperCase}
                            onChange={() => {
                                setUpperCase(!upperCase);
                                handleCheckbox('uppercase');
                            }}
                        />
                    </li>
                    <li className="option">
                        <label htmlFor="lower">Lowercase</label>
                        <input
                            type="checkbox"
                            name="lower"
                            id="lower"
                            checked={lowerCase}
                            onChange={() => {
                                setLowerCase(!lowerCase);
                                handleCheckbox('lowercase');
                            }}
                        />
                    </li>
                    <li className="option">
                        <label htmlFor="numbers">Numbers</label>
                        <input
                            type="checkbox"
                            name="numbers"
                            id="numbers"
                            checked={numbers}
                            onChange={() => {
                                setNumbers(!numbers);
                                handleCheckbox('numbers');
                            }}
                        />
                    </li>
                    <li className="option">
                        <label htmlFor="special">Special Characters</label>
                        <input
                            type="checkbox"
                            name="special"
                            id="special"
                            checked={special}
                            onChange={() => {
                                setSpecial(!special);
                                handleCheckbox('special');
                            }}
                        />
                    </li>
                </ul>
            </div>
        </>
    );
}
