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
            <span key={item.id}>
                <div className="images">
                    {item.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt=""
                            style={{ width: "100px", marginRight: "5px" }}
                            onClick={() => setActiveImage(img)}
                        />
                    ))}
                </div>
                <h1>{item.title}</h1>
                <h2>Адрес - {item.address}</h2>
                <h2>Цена -{item.cost}</h2>
                <h2>Комнат - {item.rooms}</h2>
                <h2>Общая площадь - {item.area}</h2>
                <button onClick={handleShow}>{show === false ? 'Показать больше...' : 'Скрыть'}</button>
                
                <div style={{display: (show === false ?"none" : "block")}}>
                    <h3>Район - {item.district}</h3>
                    <h3>Жилая площадь - {item.living}</h3>
                    <h3>Площадь кухни - {item.kitchen}</h3>
                    <h3>Этаж - {item.floor}</h3>
                    <h3>Этажность - {item.totalFloors}</h3>
                    
                    <h4>{item.description}</h4>
                </div>

                {activeImage && (
                    <div
                        onClick={() => setActiveImage(null)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.8)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1000
                        }}
                    >
                        <img
                            src={activeImage}
                            onClick={e => e.stopPropagation()}
                            style={{
                                maxWidth: "90%",
                                maxHeight: "90%",
                                borderRadius: "8px"
                            }}
                        />
                    </div>
                )}
                
            </span>
        </>
    )
}
