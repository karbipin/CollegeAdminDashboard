import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillGearFill } from 'react-icons/bs';
import { AiFillCopy } from "react-icons/ai";
import { HiAcademicCap, HiClipboardList, HiCubeTransparent, HiSun, HiArchive , HiCollection} from "react-icons/hi";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
           Admin Panel
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <NavLink to="/" activeClassName="active">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/college" activeClassName="active">
            <HiAcademicCap className='icon' /> College
          </NavLink>
        </li>
         <li className='sidebar-list-item'>
          <NavLink to="/users" activeClassName="active">
            <BsPeopleFill className='icon' /> Users
          </NavLink>
        </li>
        {/* <li className='sidebar-list-item'>
          <NavLink to="/Settings" activeClassName="active">
            <HiClipboardList className='icon' /> Exam
          </NavLink>
        </li> */}


        {/* try */}
        <li className='sidebar-list-item'>
          <NavLink to="/Notes" activeClassName="active">
            <AiFillCopy className='icon' /> Notes
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/Admission" activeClassName="active">
            <HiSun className='icon' /> Admissions
          </NavLink>
        </li>

        <li className='sidebar-list-item'>
          <NavLink to="/AdmissionApplicationsTable" activeClassName="active">
            <HiSun className='icon' /> Admission Applications
          </NavLink>
        </li>
        
        <li className='sidebar-list-item'>
          <NavLink to="/EnrollmentRequestsTable" activeClassName="active">
            <HiSun className='icon' /> Enrollment Requests
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/Training" activeClassName="active">
            <HiCubeTransparent className='icon' /> Training
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/CoursePage" activeClassName="active">
            <HiArchive className='icon' /> Course
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/SyllabusPage" activeClassName="active">
            <HiCollection className='icon' /> Syllabus
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/AdsPage" activeClassName="active">
            <HiCollection className='icon' /> AdsPage
          </NavLink>
        </li>



      </ul>
    </aside>
  );
}

export default Sidebar;
