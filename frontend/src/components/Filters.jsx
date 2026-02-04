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
        <div className="filters-panel" style={{ display: (show === false ? "none" : "block") }}>
            <h2>Filters</h2>
            
            <div className="filter-group">
                <label>Rooms</label>
                <input
                    onChange={e => setRooms(e.target.value)}
                    value={rooms}
                    type="number"
                    placeholder="Number of rooms"
                />
            </div>
            
            <div className="filter-group">
                <label>District</label>
                <select onChange={e => setDistrict(e.target.value)} value={district}>
                    <option value="none">All</option>
                    <option value="centr">Center</option>
                    <option value="zapad">West</option>
                </select>
            </div>
            
            <div className="filter-group">
                <label>Price Range</label>
                <input 
                    type="number"
                    value={costMin}
                    onChange={e => setCostMin(e.target.value)}
                    placeholder="Min price"
                />
                <input
                    type="number"
                    value={costMax}
                    onChange={e => setCostMax(e.target.value)}
                    placeholder="Max price"
                    style={{marginTop: '0.5rem'}}
                />
            </div>
            
            <div className="filter-group">
                <label>Total Area (m²)</label>
                <input
                    onChange={e => setAreaMin(e.target.value)}
                    value={areaMin}
                    type="number"
                    placeholder="Min area"
                />
                <input
                    onChange={e => setAreaMax(e.target.value)}
                    value={areaMax}
                    type="number"
                    placeholder="Max area"
                    style={{marginTop: '0.5rem'}}
                />
            </div>
            
            <div className="filter-group">
                <label>Living Area (m²)</label>
                <input
                    onChange={e => setLivingMin(e.target.value)}
                    value={livingMin}
                    type="number"
                    placeholder="Min area"
                />
                <input
                    onChange={e => setLivingMax(e.target.value)}
                    value={livingMax}
                    type="number"
                    placeholder="Max area"
                    style={{marginTop: '0.5rem'}}
                />
            </div>
            
            <div className="filter-group">
                <label>Kitchen Area (m²)</label>
                <input
                    onChange={e => setKitchenMin(e.target.value)}
                    value={kitchenMin}
                    type="number"
                    placeholder="Min area"
                />
                <input
                    onChange={e => setKitchenMax(e.target.value)}
                    value={KitchenMax}
                    type="number"
                    placeholder="Max area"
                    style={{marginTop: '0.5rem'}}
                />
            </div>
            
            <div className="filter-group">
                <label>Floor Range</label>
                <input 
                    type="number"
                    value={floorMin}
                    onChange={e => setFloorMin(e.target.value)}
                    placeholder="Min floor"
                />
                <input
                    type="number"
                    value={floorMax}
                    onChange={e => setFloorMax(e.target.value)}
                    placeholder="Max floor"
                    style={{marginTop: '0.5rem'}}
                />
            </div>
            
            <div className="filter-buttons">
                <button onClick={Submit}>Apply Filters</button>
                <button onClick={ResetFilters} className="reset">Reset All</button>
            </div>
        </div>
    )
}