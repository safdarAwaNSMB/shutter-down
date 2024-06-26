import React, { useState, useRef, } from "react";
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
} from 'reactstrap';
import ShootStar from '../assets/Profile/ShootStar.svg';
import { ToastContainer} from 'react-toastify';
import Edit from '../assets/Profile/Edit.svg';
import { all } from 'axios';

function ShootDropDown(props) {
  const { existedUsers, userChecked, userUnChecked, usersToShow, allowedPersons, allEvents, currentEvent } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const target = useRef(null);


  const toggle = async () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const shooterDatesHandler = (user) => {
    let pushShooter = true
    if(allEvents && currentEvent){
      let dummy = {}

      allEvents.map((event) => {
        if(event.eventDate === currentEvent.eventDate){
          dummy[event.eventDate] = Array.isArray(dummy[event.eventDate]) ?
          [...dummy[event.eventDate],...event.shootDirectors ] : [...event.shootDirectors,user ]
        }else{
          dummy[event.eventDate] = event.shootDirectors
        }
      })
      for (const date in dummy) {
        const events = dummy[date];
        const seen = new Set();  // To store JSON stringified versions of objects

        for (const event of events) {
            const eventString = JSON.stringify(event);
            if (seen.has(eventString)) {
                return false; // Duplicate found
            }
            seen.add(eventString);
        }
      }
      return true; // No duplicates found
    }
    return pushShooter
  }

  return (
    <div className="d-flex">
      <ToastContainer />

      <ButtonDropdown>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle
            className='DropDownBox tableDropdwn'
            style={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            {
              props?.data?.length === 0 ?
                <div style={{ whiteSpace: 'nowrap' }}>
                  <img alt='' src={ShootStar} style={{ marginRight: '5px' }} />
                  Select ({allowedPersons})
                </div>
                :
                <div style={{ whiteSpace: 'nowrap' }}>
                  <img alt='' src={Edit} /> ({allowedPersons})
                </div>
            }

          </DropdownToggle>
          <DropdownMenu
            className="dropOpenBox"
          >
            {usersToShow?.map((user, index) => (
              <DropdownItem
                key={user._id}
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {user.firstName} {user.lastName}
                <input
                  ref={target}
                  className='ml-2 mx-2'
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      if (existedUsers?.length >= allowedPersons){
                        window.notify(`Maximum Limit is ${allowedPersons}, uncheck previous!`, 'error');
                        return
                      } else {
                        if(shooterDatesHandler(user)){
                          userChecked(user);
                        }else{
                          window.notify("This shooter has already been assigned on the same date", 'error')
                        }
                      }
                    } else {
                      userUnChecked(user)
                    }
                  }}
                  checked={existedUsers?.length > 0 && existedUsers?.some(existingUser => existingUser._id === user._id)}
                />
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </ButtonDropdown>
    </div>
  );
}



export default ShootDropDown;
