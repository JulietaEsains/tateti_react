export default function Input(props) {
    return (
        <div>
            <input
                name = {props.name} 
                type = "text"
                defaultValue = {props.value}
                onChange = {props.onChange}
            />
        </div>
    );
}