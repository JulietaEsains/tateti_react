export default function Cell(props) {
    return (
        <button
            className = "cell"
            onClick = {props.onClick}
        >
            {props.value}
        </button>
    );
}