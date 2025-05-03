import Lights from './Lights';
import Floor from './Floor';
import Walls from './Walls';

function Room() {

    const roomDimensions = {
        width: 12,
        length: 15,
        height: 5
    }

    return(
        <>
            <Lights />
            <Floor dimensions={roomDimensions} />
            <Walls dimensions={roomDimensions} />
        </>
    );
}

export default Room;