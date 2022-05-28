// Input donde el jugador se identifica

export default function Player(props) {
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