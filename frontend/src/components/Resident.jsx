import React from 'react';
import { MdPerson, MdPerson2, MdPerson3, MdPerson4 } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FiAtSign } from "react-icons/fi";


function Resident({details}) {
    const pfpArray = [
        <MdPerson size={"2rem"}/>,
        <MdPerson2 size={"2rem"}/>,
        <MdPerson3 size={"2rem"}/>,
        <MdPerson4 size={"2rem"}/>
      ]
  let randomIcon = Math.floor(Math.random() * 4);

  return (
    <div className='residents-parent flex'>
        <div className="residents-1 flex">
        <div className="residents-pfp">
        {pfpArray[randomIcon]}
        </div>
        <div className="residents-name">
        {details.name}
        </div>
        </div>
        <div className="residents-2 flex">
        <FiAtSign size={"2rem"}/>
            <div className="resident-username">
                {details.username}
            </div>
            
        </div>
        <div className="residents-3 flex">
        <div className="residents-mail">
            <IoMdMail size={"2rem"}/>
            </div>
            <div className="resident-email">
                {details.contact.email}
            </div>
        </div>
    </div>
  )
}

export default Resident