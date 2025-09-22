import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, PersonStanding, Paperclip, DoorOpen, User } from "lucide-react";

const menu = [
    {name: "Dashboard", icon: <LayoutDashboard/>, path: "/Dashboard"},
    {name: "Login", icon: <DoorOpen/>, path: "/LoginPage"},
    {name: "Register", icon: <User/>, path: "/Register"},
    
]

export default function Sidebar(){
    return(
        <div className="w-m p-5">
            <div className="">
                <h2 className="mb-5">Sidebar</h2>
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