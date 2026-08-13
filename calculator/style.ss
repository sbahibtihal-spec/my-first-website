* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #141e30, #243b55);
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
}

.calculator {
    width: 330px;
    background: #1c1c1c;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
}

#display {
    width: 100%;
    height: 70px;
    margin-bottom: 15px;

    border: none;
    border-radius: 12px;

    background: #000;
    color: #fff;

    font-size: 30px;
    text-align: right;

    padding: 10px 15px;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

button {
    height: 60px;
    border: none;
    border-radius: 12px;

    background: #333;
    color: white;

    font-size: 22px;
    cursor: pointer;
}

button:hover {
    background: #555;
}

button:active {
    transform: scale(0.95);
}

.zero {
    grid-column: span 2;
}

.equal {
    background: #ff9500;
}

.equal:hover {
    background: #ffad33;
}
