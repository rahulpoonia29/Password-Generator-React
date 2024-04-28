import { useState, useCallback, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import SavePass from "./SavePass";

function App() {
    const [length, setLength] = useState(12);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
    const [password, setPassword] = useState("");
    const [display, setDisplay] = useState("none");
    let passwordRef = useRef(null);
    let strength = 0;
    let passwordStrengthRef = useRef(null);
    let savePassRef = useRef(null);

    const generatePassword = useCallback(() => {
        const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
        const uppercaseLetters = lowercaseLetters.toUpperCase();
        const numbers = "0123456789";
        const specialChars = "!@#$%^&*()-_=+";

        let chars = lowercaseLetters + uppercaseLetters;
        if (includeNumbers) chars += numbers;
        if (includeSpecialChars) chars += specialChars;

        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        console.log(Math.log2(chars.length) * length);
        strength = ((Math.log2(chars.length) * length) / 170) * 100;
        passwordStrengthRef.current.style.width = strength + "%";
        setPassword(password);
    }, [length, includeNumbers, includeSpecialChars]);

    useEffect(generatePassword, [length, includeNumbers, includeSpecialChars]);

    return (
        <>
            {/* <SavePass savePassRef={savePassRef}></SavePass> */}
            <div
                style={{ backgroundImage: "url(./bg.png)" }}
                className="bg-cover w-full flex flex-col items-center justify-center"
            >
                <div className="px-10 py-6 pb-10 flex flex-col items-center gap-8 bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 border border-gray-100">
                    <div className="text-2xl text-gray-900 dark:text-gray-300 w-full flex justify-center">
                        <span>Password Generator</span>
                        {/* <label className="inline-flex items-center cursor-pointer">
                            <span className="me-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Dark Mode
                            </span>
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label> */}
                    </div>
                    <div className="flex justify-center gap-4 mt-4 text-gray-900 dark:text-gray-300">
                        <div className="rounded-md pb-2 bg-slate-700 gap-0 relative ">
                            <input
                                className="bg-slate-800 rounded-t-md w-full py-2 px-3"
                                type="text"
                                value={password}
                                ref={passwordRef}
                                spellCheck="false"
                            />
                            <div className="absolute bottom-0 left-0 right-0 w-full  overflow-hidden h-2 text-xs flex rounded bg-gray-500">
                                <div
                                    style={{
                                        width: strength + "%",
                                    }}
                                    ref={passwordStrengthRef}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-emerald-600"
                                ></div>
                            </div>
                        </div>
                        <span
                            className="h-full px-4 cursor-pointer rounded-md bg-purple-700 flex items-center"
                            onClick={() => {
                                toast.success("Password successfully copied");
                                passwordRef.current?.select();
                                window.navigator.clipboard.writeText(password);
                            }}
                        >
                            Copy
                        </span>
                        <span
                            className=" px-4 h-full cursor-pointer rounded-md bg-purple-700 flex items-center"
                            onClick={() => generatePassword()}
                        >
                            Refresh
                        </span>
                        {/* <span
                        className=" px-4 h-full cursor-pointer rounded-md bg-blue-500 flex items-center"
                        onClick={() => {
                            // savePassRef.current?.style.display = "flex"
                        }}
                    >
                        Save
                    </span> */}
                    </div>
                    {/* <span>Password Length</span> */}
                    <div className="w-3/4 py-3 flex justify-center items-center gap-2 rounded-lg text-gray-900 dark:text-gray-300 bg-purple-700">
                        <label htmlFor="passwordLength" className="mr-8 ">
                            Length [{length}]
                        </label>
                        <input
                            type="range"
                            min={4}
                            max={30}
                            defaultValue={12}
                            step={0.01}
                            readOnly
                            // className="bg-green-900 text-white rounded-lg cursor-pointer"
                            className=" h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            onChange={(event) => {
                                setLength(parseInt(event.target.value));
                            }}
                        />
                    </div>
                    <div className="w-3/4 py-3 flex justify-center items-center gap-2 rounded-lg text-gray-900 dark:text-gray-300 bg-purple-700 ">
                        <input
                            type="checkbox"
                            id="includeNumbers"
                            onChange={(event) => {
                                setIncludeNumbers(event.target.checked);
                            }}
                        />
                        <label htmlFor="includeNumbers" className="mr-8">
                            Numbers
                        </label>

                        <input
                            type="checkbox"
                            id="includeSpecialChars"
                            onChange={(event) => {
                                setIncludeSpecialChars(event.target.checked);
                            }}
                        />
                        <label htmlFor="includeSpecialChars">Characters</label>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
}

export default App;
