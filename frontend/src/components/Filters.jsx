import React from "react";
import ReactDOM from "react-dom";

export function Filters({ Submit, rooms, setRooms, areaMax, setAreaMax, areaMin, setAreaMin, 
                            show, district, setDistrict, floorMin, setFloorMin, floorMax, setFloorMax,
                        livingMin, setLivingMin, livingMax, setLivingMax,
                        kitchenMin, setKitchenMin, KitchenMax, setKitchenMax,
                        costMin, setCostMin, costMax, setCostMax,}) {
    
    function ResetFilters() {
        setRooms(0)
        setAreaMax(0)
        setAreaMin(0)
        setDistrict('none')
        setFloorMin(0)
        setFloorMax(0)
        setLivingMin(0)
        setLivingMax(0)
        setKitchenMin(0)
        setKitchenMax(0)
        
        Submit
    }
    
    return (
        <div style={{ display: (show === false ? "none" : "block") }}>
            <label>Rooms</label>
            <input
                onChange={e => setRooms(e.target.value)}
                value={rooms}
                type="number"
            />
            <label>Price Min</label>
            <input 
                type="number"
                value={costMin}
                onChange={e => setCostMin(e.target.value)}
            />
            <label>Price Max</label>
            <input
                type="number"
                value={costMax}
                onChange={e => setCostMax(e.target.value)}
            />
            <label>District</label>
            <select onChange={e => setDistrict(e.target.value)}>
                <option value="none">Не выбран</option>
                <option value="centr">Центр</option>
                <option value="zapad">Запад</option>
            </select>
            <label>Area Max</label>
            <input
                onChange={e => setAreaMax(e.target.value)}
                value={areaMax}
                type="number"
            />
            <label>Area Min</label>
            <input
                onChange={e => setAreaMin(e.target.value)}
                value={areaMin}
                type="number"
            />
            <label>Living Area Max</label>
            <input
                onChange={e => setLivingMax(e.target.value)}
                value={livingMax}
                type="number"
            />
            <label>Living Area Min</label>
            <input
                onChange={e => setLivingMin(e.target.value)}
                value={livingMin}
                type="number"
            />
            <label>Kitchen Area Max</label>
            <input
                onChange={e => setKitchenMax(e.target.value)}
                value={KitchenMax}
                type="number"
            />
            <label>Kitchen Area Min</label>
            <input
                onChange={e => setKitchenMin(e.target.value)}
                value={kitchenMin}
                type="number"
            />
            <label>Min Floor</label>
            <input 
                type="number"
                value={floorMin}
                onChange={e => setFloorMin(e.target.value)}
            />
            <label>Max Floor</label>
            <input
                type="number"
                value={floorMax}
                onChange={e => setFloorMax(e.target.value)}
            />
            
            <button onClick={ResetFilters}>Reset Filters</button>
            <button onClick={Submit}>Submit</button>
        </div>
    )
}