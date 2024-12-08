export default function MoveModal({ move, onClose }) {
    if (!move) return null;
    
    return (
        <div className="modal-container">
            <button className="modal-underlay" onClick={onClose}></button>
            <div className="modal-content">
                <h2>{move.name.replaceAll('-', ' ')}</h2>
                <p>{move.description}</p>
            </div>
        </div>
    );
} 