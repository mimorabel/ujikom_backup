import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, Bike, File} from "lucide-react";

const menu = [
    {name: "Dashboard", icon: <LayoutDashboard/>, path: "/Dashboard"},
    {name: "Motor", icon: <Bike />, path: "/MotorList"},
    {name: "Add Motor", icon: <File />, path: "AddMotor"}
]

export default function Sidebar(){
    return(
        <div className="w-m p-5">
            <div className="">
                <h2 className="font-jersey">motorocky</h2>
                <p>Rental Motor</p>
            </div>
            <ul className="flex flex-col gap-3 px-5">
                    {menu.map((item, index)=> (
                    <li key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
                        <span>{item.icon}</span>
                        <NavLink to={item.path} className="text-gray-800">
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}