import React from "react";
import { useState } from "react";

export default function AddMotor(){
    const [formData, setFormData] = useState({
        pemilik_id: "",
        merk: "", 
        jenis: "",
        tipe: "",
        seri: "",
        nopol: "",
});

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate("/LoginPage");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to register");
    }
};

const handleChange = (e) => {
    setFormData({
        ...formData, [e.target.name]: e.target.value,
    });
};

    return(
        <div className="w-screen h-screen">
            <div className="">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-row gap-3">
                        <div className="flex flex-col">
                        <label htmlFor="merk">Merk</label>
                        <input type="text" name="merk" value={formData.merk}
                            onChange={handleChange} className="h-md w-xs px-2 py-1 border-1 rounded-md" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="merk">Merk</label>
                        <input type="text" name="merk" value={formData.merk}
                            onChange={handleChange} className="h-md w-xs px-2 py-1 border-1 rounded-md" />
                    </div>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}