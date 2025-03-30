import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { IoBookSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { FiLock, FiRepeat } from "react-icons/fi";

import { ChevronDownIcon, GridIcon, HorizontaLDots } from "../icons";
import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
    // subItems: [{ name: "Ecommerce", path: "/", pro: false }],
  },
  {
    icon: <IoBookSharp />,
    name: "Books",
    path: "/books",
  },

  {
    icon: <FaUsers />,
    name: "Students",
    path: "/students",
  },
  {
    name: "Circulations",
    icon: <FiRepeat />,
    path: "/circulations",
  },
  {
    name: "Reports",
    icon: <TbReportSearch />,
    path: "/reports",
  },


];

const othersItems: NavItem[] = [
  {
    icon: <FiLock />,
    name: "Authentication",
    subItems: [
      { name: "Log In", path: "/signin", pro: false },
      { name: "Register", path: "/signup", pro: false },

    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main " ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4 ">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group   ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active   bg-[#e2641b]"
                  : "menu-item-inactive text-white  hover:bg-[#e2641b]"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size   ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active text-lg text"
                    : "menu-item-icon-inactive text-white text-lg"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text text-white text-lg">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-white"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group transition-colors duration-200  ${
                //   isActive(nav.path) ? "menu-item-active bg-[#F7BC41] text-lg" : "menu-item-inactive text-white text-lg hover:bg-[#F7BC41]"
                isActive(nav.path) ? "menu-item-active bg-[#e2641b] text-lg" : "menu-item-inactive text-white text-lg hover:bg-[#e2641b]"

                }`}
              >
                <span
                  className={`menu-item-icon-size text-white ${
                    isActive(nav.path)
                      ? "menu-item-icon-active text-white"
                      : "menu-item-icon-inactive text-white"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item  text-white${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active bg-orange-500 text-white text-[16px]"
                          : "menu-dropdown-item-inactive text-[16px] hover:bg-orange-500 hover:text-white"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active "
                                : "menu-dropdown-badge-inactive "
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                      
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-[#0079C0] dark:bg-gray-900 dark:border-gray-800 text-gray-100 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 `}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
             
              <div className="flex items-center gap-3 ">
                <img
                  className="   object-contain transition-transform duration-300 hover:scale-105"
                  src="/gems-logo.png"
                  alt="Gems LMS Logo"
                  width={60}
                />
                <span className="text-lg font-semibold text-gray-100 dark:text-gray-200  tracking-widest ">
                  GEMS LMS
                </span>
              </div>
            </>
          ) : (
            <img
              src="/lmslogo.png"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>


      
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar  ">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-100 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-100 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center "
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
