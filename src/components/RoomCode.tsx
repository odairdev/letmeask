import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

type RoomCodeProps = {
    code: string;
}

export function RoomCode({ code }: RoomCodeProps) {

    function copyRoomCodeToClippboard() {
        navigator.clipboard.writeText(code)
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToClippboard}>
            <div><img src={copyImg} alt="Copiar room code" /></div>
            <span>Sala {code}</span>
        </button>
    )
}