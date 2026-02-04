import React, {use, useEffect, useState} from "react";
import { API_URL } from "../config.js";
import { ObjectCard } from "../components/ObjectCard.jsx";
import { Filters } from "../components/Filters.jsx";

export function MainPage() {
    const [Objects, setObjects] = useState([]); // стейт для хранения JSON
    const [rooms, setRooms] = useState(0);
    const [areaMax, setAreaMax] = useState(0)
    const [areaMin, setAreaMin] = useState(0)
    const [district, setDistrict] = useState('none')
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(0);
    const [floorMin, setFloorMin] = useState(0)
    const [floorMax, setFloorMax] = useState(0)
    const [livingAreaMax, setLivingAreaMax] = useState(0)
    const [livingAreaMin, setLivingAreaMin] = useState(0)
    const [kitchenAreaMax, setKitchenAreaMax] = useState(0)
    const [kitchenAreaMin, setKitchenAreaMin] = useState(0)
    const [filteredObjects, setFilteredObjects] = useState([])
    const [show, setShow] = useState(true)
    
    
    // Подгрузка обьектов с сервера
    useEffect(() => {
        fetch(API_URL + "/api/data")
            .then(res => {
                if (!res.ok) throw new Error("Ошибка сети");
                return res.json();
            })
            .then(json => setObjects(json))
            .catch(err => console.error("Fetch error:", err));
    }, []);
    
    // Начальный показ всех обьектов
    useEffect(() => {
        setFilteredObjects(Objects)
        console.log(2)
    }, [Objects])
    const [, set] = useState();


    // Скрыть/Показать фильтры
    function ShowFilters()  {
        if (show === true) {
            setShow(false);
        } else {
            setShow(true);
        }
    }
    
    // Применить фильтры
    function SubmitFilters()  {
        setFilteredObjects(Objects.filter(obj => {
            return (rooms > 0 ? obj.rooms === Number(rooms) : obj.rooms > rooms) &&
                (areaMax > 0 ? obj.area <= areaMax : obj.area > areaMax) &&
                (areaMin > 0 ? obj.area >= areaMin : obj.area > areaMin) &&
                (district !== 'none' ? obj.district === district : true) &&
                (floorMin > 0 ? obj.floor >= floorMin : true) &&
                (floorMax > 0 ? obj.floor <= floorMax : true) &&
                (livingAreaMin > 0 ? obj.living >= livingAreaMin : true) &&
                (livingAreaMax > 0 ? obj.living <= livingAreaMax : true) &&
                (kitchenAreaMin > 0 ? obj.kitchen >= kitchenAreaMin : true) &&
                (kitchenAreaMax > 0 ? obj.kitchen <= kitchenAreaMax : true) &&
                (priceMin > 0 ? obj.cost >= priceMin : true) &&
                (priceMax > 0 ? obj.cost <= priceMax : true)
        }))
    }
    
    
    
    
    return (
        <>
            <div className="app-header">
                <h1>🏠 RealEstate</h1>
                <div className="nav-buttons">
                    <a href="/add" style={{display: 'inline-block', width: '100%'}}>
                        <button style={{width: '100%', margin: 0}}>+ Add Object</button>
                    </a>
                </div>
            </div>
            
            <div className="main-container">
                <div className="content-wrapper">
                    <Filters 
                        rooms={rooms} 
                        setRooms={setRooms} 
                        areaMax={areaMax} 
                        setAreaMax={setAreaMax} 
                        areaMin={areaMin} 
                        setAreaMin={setAreaMin}
                        district={district}
                        setDistrict={setDistrict}
                        floorMin={floorMin}
                        floorMax={floorMax}
                        setFloorMin={setFloorMin}
                        setFloorMax={setFloorMax}
                        livingMin={livingAreaMin}
                        setLivingMin={setLivingAreaMin}
                        livingMax={livingAreaMax}
                        setLivingMax={setLivingAreaMax}
                        kitchenMin={kitchenAreaMin}
                        setKitchenMin={setKitchenAreaMin}
                        KitchenMax={kitchenAreaMax}
                        setKitchenMax={setKitchenAreaMax}
                        costMin={priceMin}
                        costMax={priceMax}
                        setCostMax={setPriceMax}
                        setCostMin={setPriceMin}
                        Submit={SubmitFilters}
                        show={show}
                    />
                    
                    <div className="objects-container">
                        <ul className="objects-list">
                            {filteredObjects.map(obj => (
                                <ObjectCard
                                    key={obj.id}
                                    item={obj}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
