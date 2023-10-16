import { MdManageAccounts } from 'react-icons/md';
import { BiTrip, BiSolidUserCircle } from 'react-icons/bi';
import { RiBillFill } from 'react-icons/ri';
import { AiFillSetting } from 'react-icons/ai';
import "./sidebar.css";

const Sidebar = () => {
    return (
        <section className="sideBar">
            <div className="logoDiv flex">
                <a href="" className="logo flex">
                    <BiSolidUserCircle className="icon" />
                      
                </a>
            </div>

            <div className='menu'>
                <ul className="navItem">
                    <li className="navList">
                        <MdManageAccounts className="icon"/>
                    </li>
                    <li className="navList">
                        <BiTrip className="icon"/>
                    </li>
                    <li className="navList">
                        <RiBillFill className="icon"/>
                    </li>
                    <li className="navList">
                        <AiFillSetting className="icon"/>
                    </li>
                </ul>
            </div>
        </section>
    )
}
export default Sidebar;