import React from 'react';
import './profile.css';
import { Avatar } from 'antd';

const Profile = () => {
  return (
    <section className='profile'>
      <div className='avatar'>
      <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
    size={{ xs: 48, sm: 64, md: 80, lg: 128, xl: 160, xxl: 200 }}>N</Avatar>
    </div>
    <h3 className='fullName'>Do Minh Nguyet</h3>
    <div className='username'>nguyetdtm</div>
    <div className='personalInfo'>
      <div>Phone: </div><label>0338164245</label>
      <div>Email: </div><label>dtmnguyet171@gmail.com</label>
      <div>Address: </div><label>Nam Dinh</label>
    </div>
    </section>
  )
}
export default Profile;