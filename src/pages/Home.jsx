import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import UserGrowthChart from './UserGrowthChart';

function Home() {

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>COLLEGES</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>0</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>NOTES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>0</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>USERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>0</h1>
            </div>
        </div>

              {/* User Growth Chart */}
      <div className="chart-container">
        <h2>User Growth</h2>
        <UserGrowthChart />
      </div>
    </main>

  )
}

export default Home