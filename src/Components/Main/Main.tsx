import React from 'react';
import './Main.css';
// import moon from '../../images/';
import { useState } from 'react';
import cross from '../../images/icon-cross.svg';


interface MainProps {
    propsObj: {
        handler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
        changehandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
        singlerCheckBoxHandler: () => void;
        checkBoxHandler: (id: number) => void;
        deleteHandler: (id: number) => void;
        clearCompleted: () => void;
        completedHandler: () => void;
        allHandler: () => void;
        name: () => void;
        complatedTodo: Todo[];
        newTodo: string;
        activeStatus: string;
        count: number;
        changeLightModeHandler: () => void;
        lightMode: boolean;

    };
}

export default function Main(props: MainProps) {
    const {
        handler,
        changehandler,
        singlerCheckBoxHandler,
        checkBoxHandler,
        deleteHandler,
        clearCompleted,
        completedHandler,
        allHandler,
        name,
        complatedTodo,
        newTodo,
        activeStatus,
        count,
        changeLightModeHandler,
        lightMode,
    } = props.propsObj;

    const [isHovered, setIsHovered] = useState<number | null>(null);
    return (
        <div className='infoContainer'>
            <div className='headerTitle'>
                <h1 className='Title'>T O D O</h1>
                <button
                    className={lightMode ? 'lightModeButtonMoon' : 'darkModeButtonSun'}
                    onClick={changeLightModeHandler}>
                </button>
            </div>
            <div className={lightMode ? 'inputsBox' : 'inputsBox inputsBoxDark'}>
                <input type='checkbox' className='checkBox' onClick={singlerCheckBoxHandler} />
                <input type='text' className={lightMode ? 'mainInputTextBox' : 'mainInputTextBox inputsBoxDark darkModeText'}
                    placeholder="Create a new todo…" onKeyDown={handler} onChange={changehandler} value={newTodo} />
            </div>
            {
                complatedTodo.map((item: Todo, index: number) => {
                    console.log('uneiqueKey: ', index);
                    return (
                        <div className={lightMode ? 'checkBoxTextAndDeleteBox' : 'checkBoxTextAndDeleteBox inputsBoxDark'}
                            key={index}
                            onMouseEnter={() => { setIsHovered(item.id) }}
                            onMouseLeave={() => { setIsHovered(null) }}
                        >
                            <div className={`checkBoxAndTextBox ${lightMode ? 'colorsP' : 'colorsPDark'}`}>
                                <input type='checkbox' className='checkBox' onChange={() => checkBoxHandler(item.id)} checked={item.checked} />
                                <p className={`newTaskTextClass ${item.checked ? 'textActive colorsActP' : 'textNoActive'}`} >{item.text}</p>
                            </div>
                            {
                                isHovered === item.id &&
                                <button className='delete' onClick={() => deleteHandler(item.id)}><img src={cross} alt='cross' className={lightMode ? 'crossImage' : ' inputsBoxDark'} /></button>
                            }
                        </div>
                    )
                })
            }
            <div className={lightMode ? 'itemsLeftBox' : 'itemsLeftBox inputsBoxDark'}>

                <p className={lightMode ? 'buttonText' : 'buttonText inputsBoxDark'}>
                    {count} items left
                </p>
                <button onClick={clearCompleted} className={lightMode ? 'buttonText' : 'buttonText inputsBoxDark'}>Clear Completed</button>
            </div>
            <div className={lightMode ? 'footerButtons' : 'footerButtons inputsBoxDark'}>
                <div className='footerButtonInsideBox'>
                    <button onClick={allHandler} className={`${lightMode ? 'buttonText' : 'buttonText inputsBoxDark'} ${activeStatus === 'All' ? 'buttonTextActiveStatus' : ''} `}>All</button>
                    <button onClick={name} className={`${lightMode ? 'buttonText' : 'buttonText inputsBoxDark'} ${activeStatus === 'Active' ? 'buttonTextActiveStatus' : ''}`}>Active</button>
                    <button onClick={completedHandler} className={`${lightMode ? 'buttonText' : 'buttonText inputsBoxDark'} ${activeStatus === 'Completed' ? 'buttonTextActiveStatus' : ''}`}>Completed</button>
                </div>
            </div>
        </div >
    )
}