import React, { useEffect, useState } from "react";
import axios from "axios";

// Dummy data for testing
const dummyData = {
  menu: [
    { id: 1, name: "Dashboard", link: "/dashboard" },
    { id: 2, name: "Reports", link: "/reports" },
    { id: 3, name: "Settings", link: "/settings" },
  ],
  subMenu: [
    { id: 1, name: "Overview", link: "/reports/overview", parentId: 2 },
    { id: 2, name: "Sales", link: "/reports/sales", parentId: 2 },
    { id: 3, name: "Profile", link: "/settings/profile", parentId: 3 },
    { id: 4, name: "Account", link: "/settings/account", parentId: 3 },
  ],
};

const Sidebar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [subMenuItems, setSubMenuItems] = useState([]);
  const [expandedMenuId, setExpandedMenuId] = useState(null);

  // Fetch menu from API (using dummy data)
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        // Simulate an API call with dummy data
        const response = { data: dummyData };
        setMenuItems(response.data.menu);
        setSubMenuItems(response.data.subMenu);
      } catch (error) {
        console.error("Failed to fetch menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  // Handle menu item click to toggle sub-menu visibility
  const handleMenuItemClick = (id) => {
    setExpandedMenuId(expandedMenuId === id ? null : id);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white w-64">
      {/* Image at the top */}
      <div className="flex items-center justify-center h-32 bg-gray-900">
        <img
          src="your-image-url.jpg" // Replace with your image URL
          alt="Logo"
          className="w-20 h-20 rounded-full"
        />
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-4">
              <a
                href="#"
                onClick={() => handleMenuItemClick(item.id)}
                className="hover:text-gray-400 cursor-pointer"
              >
                {item.name}
              </a>

              {/* Conditional rendering for sub-menu */}
              {expandedMenuId === item.id && (
                <ul className="pl-4 mt-2">
                  {subMenuItems
                    .filter((subItem) => subItem.parentId === item.id) // Filter sub-menu items based on parent menu item
                    .map((subItem) => (
                      <li key={subItem.id} className="mb-2">
                        <a href={subItem.link} className="hover:text-gray-400">
                          {subItem.name}
                        </a>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings and Logout */}
      <div className="px-4 py-4 border-t border-gray-700">
        <ul>
          <li className="mb-4">
            <a href="/settings" className="hover:text-gray-400">
              Settings
            </a>
          </li>
          <li>
            <a href="/logout" className="hover:text-gray-400">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
