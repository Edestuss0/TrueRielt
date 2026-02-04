import React, {useState} from 'react';
import ReactDOM from 'react-dom';

export function ObjectCard({ item }) {
    const [show, setShow] = useState(false);
    const [activeImage, setActiveImage] = useState(null);
    
    function handleShow() {
        if (show === false) {
            setShow(true);
        } else {
            setShow(false);
        }
    }
    
    
    return (
        <>
            <div className="object-card">
                <div className="object-images">
                    {item.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="Property image"
                            onClick={() => setActiveImage(img)}
                        />
                    ))}
                </div>
                
                <div className="object-content">
                    <h1>{item.title}</h1>
                    
                    <div className="object-price">
                        ₽{item.cost.toLocaleString()}
                    </div>
                    
                    <div className="object-info">
                        <div className="object-info-item">
                            <label>Address</label>
                            <div className="value">{item.address}</div>
                        </div>
                        <div className="object-info-item">
                            <label>Rooms</label>
                            <div className="value">{item.rooms}</div>
                        </div>
                        <div className="object-info-item">
                            <label>Area</label>
                            <div className="value">{item.area} m²</div>
                        </div>
                        <div className="object-info-item">
                            <label>District</label>
                            <div className="value">{item.district}</div>
                        </div>
                    </div>
                    
                    <div className="object-actions">
                        <button onClick={handleShow} className="secondary">
                            {show === false ? 'Show More' : 'Hide'}
                        </button>
                    </div>
                    
                    {show && (
                        <div className="object-details">
                            <h3>Living Area: <span style={{color: 'var(--accent)'}}>{item.living} m²</span></h3>
                            <h3>Kitchen Area: <span style={{color: 'var(--accent)'}}>{item.kitchen} m²</span></h3>
                            <h3>Floor: <span style={{color: 'var(--accent)'}}>{item.floor}/{item.totalFloors}</span></h3>
                            <h3>Phone: <span style={{color: 'var(--accent'}}>{item.phone}</span></h3>
                            <h4>{item.description}</h4>
                        </div>
                    )}
                </div>
            </div>

            {activeImage && (
                <div className="modal-overlay" onClick={() => setActiveImage(null)}>
                    <img
                        src={activeImage}
                        onClick={e => e.stopPropagation()}
                        alt="Full size property image"
                    />
                </div>
            )}
            
        </>
    )
}
