import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AddMotor(){
    const [formData, setFormData] = useState({
        merk: "", 
        jenis: "",
        tipe: "",
        seri: "",
        nopol: "",
        status: "",
});

const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/motor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate("/MotorList");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to add Motor");
    }
};

const handleChange = (e) => {
    setFormData({
        ...formData, [e.target.name]: e.target.value,
    });
};

    return(
        <div className="w-screen h-screen">
            <div className="mt-15 ml-15">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-3 space-y-5">
                            <div className="flex flex-col">
                                <label htmlFor="merk">Merk</label>
                                <input type="text" name="merk" value={formData.merk}
                                    onChange={handleChange} className="h-md w-50 px-2 py-1 border-1 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="jenis">Jenis</label>
                                <select name="jenis" value={formData.jenis}
                                    onChange={handleChange} className="h-md w-35 px-2 py-1 border-1 rounded-md" >
                                    <option value="" disabled>--Pilih Jenis--</option>
                                    <option value="Matic">Matic</option>
                                    <option value="Manual">Manual</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="tipe">Tipe</label>
                                <select name="tipe" value={formData.tipe}
                                    onChange={handleChange} className="h-md w-35 px-2 py-1 border-1 rounded-md" >
                                        <option value="" disabled>--Pilih Tipe--</option>
                                        <option value="100cc">100cc</option>
                                        <option value="125cc">125cc</option>
                                        <option value="150cc">150cc</option>
                                        <option value="175cc">175cc</option>
                                        <option value="200cc">200cc</option>
                                        <option value="250cc">250cc</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-row gap-3">
                            <div className="flex flex-col">
                                <label htmlFor="seri">Seri</label>
                                <input type="text" name="seri" value={formData.seri}
                                    onChange={handleChange} className="h-md w-50 px-2 py-1 border-1 rounded-md"
                                />
                            </div> 
                            <div className="flex flex-col">
                                <label htmlFor="nopol">Plat Nomor</label>
                                <input type="text" name="nopol" value={formData.nopol}
                                    onChange={handleChange} className="h-md w-50 px-2 py-1 border-1 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="status">Status</label>
                                <select name="status" value={formData.status}
                                    onChange={handleChange} className="h-md w-50 px-2 py-1 border-1 rounded-md">
                                    <option value="" disabled>--Pilih Status--</option>
                                    <option value="Siap pakai">Siap Pakai</option>
                                    <option value="Dalam perbaikan">Dalam Perbaikan</option>
                                    <option value="Sedang Disewa">Sedang Disewa</option>
                                </select>
                            </div>
                        </div>
                        
                        
                    </div> 
                <button type="submit" className=" mt-5 py-2 px-3 bg-blue-800 text-white rounded-xl">Tambah Data</button>
                </form>
            </div>
        </div>
    )
}