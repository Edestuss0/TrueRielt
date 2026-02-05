import React, {use, useEffect, useState} from "react";
import ReactDOM from "react-dom";
// import { API_URL } from "../config.js";

export function AddObjectPage() {

    const API_URL = "http://localhost:3001/api/data";
    
    const [rooms, setRooms] = useState(-1);
    const [area, setArea] = useState(0);
    const [living, setLiving] = useState(0);
    const [kitchen, setKitchen] = useState(0);
    const [floor, setFloor] = useState(0);
    const [totalFloors, setTotalFloors] = useState(0);
    const [district, setDistrict] = useState(0);
    const [address, setAddress] = useState("");
    const [cost, setCost] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);


    //Картинки в base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    
    //Обработка картинок
    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);

        const base64Images = await Promise.all(
            files.map(file => fileToBase64(file))
        );

        setImages(base64Images);
    };
    
    const resetForm = async () => {
        setRooms(0);
        setArea(0);
        setLiving(0);
        setKitchen(0);
        setFloor(0);
        setTotalFloors(0);
        setDistrict(undefined);
        setAddress("");
        setCost(0);
        setTitle("");
        setDescription("");
        setImages([]);
    }
    
    
    //Добавление обьекта
    const handleSubmit = async () => {
        
        if (Number(rooms) >= 0 && area > 0 && living > 0 && kitchen > 0 && floor > 0 && totalFloors >= floor && 
            district !== "" && cost > 0 && title !== "" && description !== "" && images !== [] && address !== "") {
            
            const newObject = {
                id: Date.now(),
                rooms: Number(rooms),
                area: Number(area),
                living: Number(living),
                kitchen: Number(kitchen),
                floor: Number(floor),
                totalFloors: Number(totalFloors),
                district: district,
                address: address,
                cost: Number(cost),
                title: title,
                description: description,
                images: images
            };
    
            try {
                const res = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newObject)
                });
    
                if (!res.ok) throw new Error("Ошибка запроса");
                
                
            } catch (err) {
                console.error(err);
            }
            
            await resetForm();
        
        } else {
            alert("Fill form, pidoras");
        }
        
    };
    

    return (
        <>
            <label>Address</label>
            <input
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <label>Rooms</label>
            <select onChange={(e) => setRooms(e.target.value)}>
                <option value="-1">Non select</option>
                <option value="0">Studio</option>
                <option value="1">1 Room</option>
                <option value="2">2 Rooms</option>
                <option value="3">3 Rooms</option>
                <option value="4">4 Rooms</option>
            </select>
            <label>Area</label>
            <input 
                type="text"
                value={area}
                onChange={(e) => {setArea(e.target.value)}}
            />
            <label>Price</label>
            <input
                type={"text"}
                value={cost}
                onChange={(e) => {setCost(e.target.value)}}
            />
            <label>District</label>
            <select onChange={(e) => setDistrict(e.target.value)}>
                <option value="centr">Center</option>
                <option value="zapad">West</option>
            </select>
            <label>Living Area</label>
            <input
                type="text"
                value={living}
                onChange={(e) => {setLiving(e.target.value)}}           
            />
            <label>Kitchen Area</label>
            <input 
                type="text"
                value={kitchen}
                onChange={(e) => {setKitchen(e.target.value)}}
            />
            <label>Floor</label>
            <input 
                type="text"
                value={floor}
                onChange={(e) => {setFloor(e.target.value)}}
            />
            <label>Total Floors</label>
            <input 
                type="text"
                value={totalFloors}
                onChange={(e) => {setTotalFloors(e.target.value)}}
            />
            <label>Title</label>
            <input 
                type="text"
                value={title}
                onChange={(e) => {setTitle(e.target.value)}}
            />
            <label>Description</label>
            <textarea 
                value={description}
                onChange={(e) => {setDescription(e.target.value)}}
            />
            <label>Images</label>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
            />
            <button onClick={resetForm}>Reset</button>
            <button onClick={handleSubmit}>Add Object</button>
        </>
    )

}