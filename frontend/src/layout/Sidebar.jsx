import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { MdDashboard } from "react-icons/md";
import { FaBoxes, FaCreditCard, FaListAlt } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './sidebar.css'

export default function Sidebar() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const handleToggle = expanded => {
        setIsVisible(expanded);
    };
    return (
        <SideNav
            expanded={isVisible}
            onToggle={handleToggle}
            style={{ position: "fixed", height: "100%" }}
            onSelect={(selected) => {
                const to = "/" + selected;
                if (window.location.pathname !== to) {
                    navigate(to);
                }
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav>
                <NavItem eventKey="dashboard">
                    <NavIcon>
                        <MdDashboard />
                    </NavIcon>
                    <NavText>Dashboard</NavText>
                </NavItem>
                <NavItem eventKey="manajemen">
                    <NavIcon>
                        <FaBoxes />
                    </NavIcon>
                    <NavText>Manajemen</NavText>
                </NavItem>
                <NavItem eventKey="riwayat">
                    <NavIcon>
                        <FaListAlt />
                    </NavIcon>
                    <NavText>Riwayat</NavText>
                </NavItem>
                <NavItem eventKey="saldo">
                    <NavIcon>
                        <FaCreditCard />
                    </NavIcon>
                    <NavText>Saldo</NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    )
}