/*import React from "react";
import { NavLink } from "react-router";

export default function MotorList(){


    return(
        <div className="w-screen h-screen">
            <div className="py-2 px-2 bg-blue-900 w-35 text-white text-center rounded-xl">
                <NavLink to="/AddMotor">Tambah Motor</NavLink>
            </div>
            <div className="px-10 py-20 overflow-x-auto">
                <table className="w-full text-white shadow-xl">
                    <thead>
                        <tr className="p-2 bg-gray-700 rounded-t-xl -none">
                            <th className="p-2 rounded-tl-xl">Kode</th>
                            <th className="p-2">Pemilik</th>
                            <th className="p-2">Jenis</th>
                            <th className="p-2">Merk</th>
                            <th className="p-2">Seri</th>
                            <th className="p-2">Tipe</th>
                            <th className="p-2 rounded-tr-xl">No Polisi</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                    {motor.map((item, index) => (
                    <tr key={item.id}>
                        <td className="p-2 text-center">{item.kode}</td>
                        <td className="p-2 text-center">{item.pemilik}</td>
                        <td className="p-2 text-center">{item.jenis}</td>
                        <td className="p-2 text-center">{item.merk}</td>
                        <td className="p-2 text-center">{item.seri}</td>
                        <td className="p-2 text-center">{item.tipe}</td>
                        <td className="p-2 text-center">{item.no_plat}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
*/
/*import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function MotorList() {
  const [motor, setMotor] = useState([]);

  // Ambil data motor dari backend saat component mount
  useEffect(() => {
    fetch("http://localhost:5000/api/motor")
      .then((res) => res.json())
      .then((data) => setMotor(data))
      .catch((err) => console.error("Error fetching motors:", err));
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="py-2 px-2 bg-blue-900 w-35 text-white text-center rounded-xl">
        <NavLink to="/AddMotor">Tambah Motor</NavLink>
      </div>
      <div className="px-10 py-20 overflow-x-auto">
        <table className="w-full text-white shadow-xl">
          <thead>
            <tr className="p-2 bg-gray-700 rounded-t-xl">
              <th className="p-2 rounded-tl-xl">Kode</th>
              <th className="p-2">Pemilik</th>
              <th className="p-2">Jenis</th>
              <th className="p-2">Merk</th>
              <th className="p-2">Seri</th>
              <th className="p-2">Tipe</th>
              <th className="p-2 rounded-tr-xl">No Polisi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {motor.length > 0 ? (
              motor.map((item, index) => (
                <tr key={item.id}>
                  <td className="p-2 text-center">{item.kode || "-"}</td>
                  <td className="p-2 text-center">{item.pemilik || "-"}</td>
                  <td className="p-2 text-center">{item.jenis}</td>
                  <td className="p-2 text-center">{item.merk}</td>
                  <td className="p-2 text-center">{item.seri}</td>
                  <td className="p-2 text-center">{item.tipe}</td>
                  <td className="p-2 text-center">{item.nopol}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-4 text-gray-400">
                  Tidak ada data motor
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

*/

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function MotorList() {
  const [motor, setMotor] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    merk: "",
    jenis: "",
    tipe: "",
    seri: "",
    nopol: "",
    status: "",
  });

  // Fetch data motor
  const fetchMotor = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/motor");
      const data = await res.json();
      setMotor(data);
    } catch (err) {
      console.error("Error fetching motors:", err);
    }
  };

  useEffect(() => {
    fetchMotor();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Edit motor
  const handleEdit = (m) => {
    setEditingId(m.id);
    setFormData({
      merk: m.merk,
      jenis: m.jenis,
      tipe: m.tipe,
      seri: m.seri,
      nopol: m.nopol,
      status: m.status,
    });
  };

  // Update motor
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/motor/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchMotor();
        setEditingId(null);
        setFormData({ merk: "", jenis: "", tipe: "", seri: "", nopol: "", status: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete motor
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus motor ini?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/motor/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchMotor();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-5">
      <div className="py-2 px-2 bg-blue-900 w-35 text-white text-center rounded-xl mb-5">
        <NavLink to="/AddMotor">Tambah Motor</NavLink>
      </div>

      {editingId && (
        <form onSubmit={handleUpdate} className="mb-5 p-3 bg-gray-700 text-white rounded-lg">
          <h2 className="mb-3">Update Motor</h2>
          {["merk","jenis","tipe","seri","nopol","status"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              value={formData[field]}
              onChange={handleChange}
              className="p-1 m-1 rounded bg-white text-gray-700"
            />
          ))}
          <button type="submit" className="bg-blue-800 px-3 py-1 rounded ml-2 text-white">Update</button>
          <button type="button" className="bg-blue-500 px-3 py-1 rounded ml-2 text-white" onClick={() => setEditingId(null)}>Cancel</button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-white shadow-xl">
          <thead>
            <tr className="p-2 bg-gray-700">
              <th className="p-2 rounded-tl-xl">Merk</th>
              <th className="p-2">Jenis</th>
              <th className="p-2">Tipe</th>
              <th className="p-2">Seri</th>
              <th className="p-2">No Polisi</th>
              <th className="p-2">Status</th>
              <th className="p-2 rounded-tr-xl">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {motor.map((m) => (
              <tr key={m.id}>
                <td className="p-2 text-center">{m.merk}</td>
                <td className="p-2 text-center">{m.jenis}</td>
                <td className="p-2 text-center">{m.tipe}</td>
                <td className="p-2 text-center">{m.seri}</td>
                <td className="p-2 text-center">{m.nopol}</td>
                <td className="p-2 text-center">{m.status}</td>
                <td className="p-2 text-center">
                  <button className="bg-blue-800 px-2 py-1 rounded mr-2 text-white" onClick={() => handleEdit(m)}>Edit</button>
                  <button className="bg-blue-500 px-2 py-1 rounded text-white" onClick={() => handleDelete(m.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
