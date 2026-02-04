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
    const [district, setDistrict] = useState("");
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
    
    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
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
            <div className="app-header">
                <h1>➕ Add New Property</h1>
                <div className="nav-buttons">
                    <a href="/" style={{display: 'inline-block', width: '100%'}}>
                        <button style={{width: '100%', margin: 0}}>← Back to Listings</button>
                    </a>
                </div>
            </div>
            
            <div className="add-object-container">
                <div className="form-grid full">
                    <div className="form-group full-width">
                        <label>Property Title *</label>
                        <input 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Beautiful 2-room apartment in the center"
                        />
                    </div>
                    
                    <div className="form-group full-width">
                        <label>Address *</label>
                        <input
                            type="text" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter full address"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Rooms *</label>
                        <select onChange={(e) => setRooms(e.target.value)} value={rooms}>
                            <option value="-1">Select...</option>
                            <option value="0">Studio</option>
                            <option value="1">1 Room</option>
                            <option value="2">2 Rooms</option>
                            <option value="3">3 Rooms</option>
                            <option value="4">4 Rooms</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>District *</label>
                        <select onChange={(e) => setDistrict(e.target.value)} value={district}>
                            <option value="">Select...</option>
                            <option value="centr">Center</option>
                            <option value="zapad">West</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Total Area (m²) *</label>
                        <input 
                            type="text"
                            value={area}
                            onChange={(e) => {setArea(e.target.value)}}
                            placeholder="0"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Living Area (m²) *</label>
                        <input
                            type="text"
                            value={living}
                            onChange={(e) => {setLiving(e.target.value)}}
                            placeholder="0"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Kitchen Area (m²) *</label>
                        <input 
                            type="text"
                            value={kitchen}
                            onChange={(e) => {setKitchen(e.target.value)}}
                            placeholder="0"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Price ($) *</label>
                        <input
                            type={"text"}
                            value={cost}
                            onChange={(e) => {setCost(e.target.value)}}
                            placeholder="0"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Floor *</label>
                        <input 
                            type="text"
                            value={floor}
                            onChange={(e) => {setFloor(e.target.value)}}
                            placeholder="0"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Total Floors *</label>
                        <input 
                            type="text"
                            value={totalFloors}
                            onChange={(e) => {setTotalFloors(e.target.value)}}
                            placeholder="0"
                        />
                    </div>
                    
                    <div className="form-group full-width">
                        <label>Description *</label>
                        <textarea 
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)}}
                            placeholder="Describe the property..."
                        />
                    </div>
                    
                    <div className="image-upload-section">
                        <label className="image-upload-label" htmlFor="image-input">
                            📷 Select Images
                        </label>
                        <input
                            id="image-input"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        <p style={{marginBottom: 0, color: 'var(--text-secondary)', fontSize: '0.9em'}}>
                            Select one or more images for your property
                        </p>
                    </div>
                    
                    {images.length > 0 && (
                        <div className="image-preview-container">
                            {images.map((img, i) => (
                                <div key={i} className="image-preview-item">
                                    <img src={img} alt={`Preview ${i + 1}`} />
                                    <button type="button" className="image-remove-btn" onClick={() => removeImage(i)}>✕</button>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <div className="form-buttons">
                        <button onClick={resetForm} className="reset">Reset Form</button>
                        <button onClick={handleSubmit} className="submit">✓ Add Property</button>
                    </div>
                </div>
            </div>
        </>
    )

}