import "./style.css";
import { render } from "vdom3r";

const App = () => {
    const handleClick = () => {
        alert("Hello from dom4t!");
    };
    return (
        <div className="app">
            <h1
                style={{
                    color: "blue",
                }}
            >
                DOM4T Example
            </h1>
            <div className="card">
                <button onClick={handleClick}>Click me</button>
                <p>
                    Edit <code>src/main.tsx</code> and save to test HMR
                </p>
            </div>
        </div>
    );
};

render(<App />, document.body);
