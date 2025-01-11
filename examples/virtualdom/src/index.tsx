import { render } from "./lib/render";

const App = () => {
    return (
        <div>
            <h1>Hello Custom JSX!</h1>
            <button onclick={() => alert("Clicked!")}>Click me</button>
        </div>
    );
};

const root = document.getElementById("root");
if (root) {
    render(<App />, root);
}
