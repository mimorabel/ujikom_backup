import React from "react";
import { NavLink } from "react-router";

export default function MotorList(){
const motor = [
    {id: 1, kode: "MTC-YAMAHAARX150-Z0907TAB", pemilik: "Mirabel Edina", jenis:"Matic", merk: "Yamaha", seri: "Aerox", tipe: "150cc", no_plat: "Z0907TAB"},
    {id: 2, kode: "MTC-YAMAHANMX150-Z0707TAB", pemilik: "Mirabel Edina", jenis:"Matic", merk: "Yamaha", seri: "NMAX", tipe: "125cc", no_plat: "Z0707TAB"},
];

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

