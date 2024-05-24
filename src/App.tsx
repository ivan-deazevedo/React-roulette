import './App.css';
import Header from './components/Header';
import React, { useEffect, useState } from 'react';
import ListResto from './components/resto/ListRestos';
import { Resto } from './models/restaurants';
import RouletteWheel from './components/rouletteWheel/RouletteWheel';
import { Data } from './components/rouletteWheel/RouletteWheel';
import './App.css'
import AddForm from './components/addForm/AddForm';
import { UpdateRestaurantTeller, fetchData, fetchUserData } from './api_functions/apiFunctions';
import { User } from './models/users';
import ListUsers from './components/users/ListUsers';
import AddUserForm from './components/addForm/AddUserForm';

// kleur codes voor het roulettewheel.
const colors : string[] = [
  '#32CD32',
  '#1E90FF',
  '#DC143C',
  '#F0E68C',
  '#9370DB',
  '#D2691E',
  '#00FF7F',
  '#BC8F8F',
  '#7FFFD4',
  '#87CEFA',
  '#32CD32',
  '#1E90FF',
  '#DC143C',
  '#F0E68C',
  '#9370DB',
  '#D2691E',
  '#00FF7F',
  '#BC8F8F',
  '#7FFFD4',
  '#87CEFA',
]

// opbouw van roulettewheel array
function convertRestoToData(restos: Resto[]): Data[] {
  return restos.map((resto , key) => ({ option: resto.naam, url: resto.weburl, style: { backgroundColor: colors[key], textColor: 'black'}}));
}

function App() {
  const [restos, setResto] = useState<Resto[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [switchToWheel, setSwitchToWheel] = React.useState(false);
  const [addresto, setAddResto] = React.useState(false);
  const [adduser, setAddUser] = React.useState(false);

  // functie om het roulettewheel te renderen en de db te updaten voor het aantal keer geselecteerd.
  const handleSwitch = () => {
    setSwitchToWheel(!switchToWheel);
    if(switchToWheel === false){
      var wheelData = WheelData();
      wheelData.forEach(async resto => {
        var teller = resto.teller+1;
          await UpdateRestaurantTeller(resto.id, teller, resto.weburl)
      });
    }
    else{
      fetchRestoData()
    }
  };

  // api fetch uitvoeren bij opstart van app.
  useEffect(() => {
    fetchRestoData();
    FetchUserData();
  }, []);

  // restaurant data fetchen
  const fetchRestoData = async () =>{
    const data = await fetchData();
    setResto(data);
  }

   // user data fetchen
  const FetchUserData = async () =>{
    const users = await fetchUserData()
    setUsers(users)
  }

  const callbackFetch = async () => {
    fetchRestoData();
    FetchUserData();
  }


  // array met data voor roulette wheel vullen.
  const wheelData = convertRestoToData(WheelData());

  function WheelData(){
    const wheelRestos : Resto[] = [];
    restos.forEach(resto => {
      if (resto.isChecked) {
        wheelRestos.push(resto);
      }
    });

    if (wheelRestos.length === 0 ){
      return restos
    };

    return wheelRestos;
  }

  const GetRandomUser = () => {
    var checkedUsers : User[] = [];
    users.forEach(user => {
      if (user.isChecked) {
        checkedUsers.push(user);
      }
    });
    var randomIndex = Math.floor(Math.random() * checkedUsers.length);
    var random = checkedUsers[randomIndex];

    return `${random.voornaam} ${random.familienaam}`;
  };

  // boolean aanpassen om addform voor restaurant te renderen.
  const SwitchToAddRestaurantForm = () => {
    if(adduser === true){
      setAddUser(false)
    }
    setAddResto(!addresto);
  }

  const SwitchToAddUserForm = () => {
    if(addresto === true){
      setAddResto(false)
    }
    setAddUser(!adduser);
  }

  return (
    <>
      <Header />
      {!switchToWheel && 
      <nav>
        <ul>
          <li onClick={SwitchToAddRestaurantForm}>Add Restaurant</li>
          <li onClick={SwitchToAddUserForm}>Add User</li>
        </ul>
      </nav>}
      <div className='main_body'>
        {!addresto && !adduser && <button className='wheel_button' onClick={handleSwitch}>Wheel</button>}
        {!switchToWheel && addresto &&
        <div>
          <AddForm fetchDataCallBack={callbackFetch} />
        </div> }
        {!switchToWheel && adduser && 
        <div>
          <AddUserForm fetchUserDataCallBack={callbackFetch} />
        </div>}
        { !switchToWheel && !addresto && !adduser && 
        <div className='div_tables'>
          <ListResto restos={restos} fetchCallBack={callbackFetch} />
          <ListUsers users={users} fetchCallBack={callbackFetch} />
          </div>}
        { switchToWheel && wheelData.length > 0 && <RouletteWheel data={wheelData} user={GetRandomUser()}/>}
      </div>
    </>   
  );
}

export default App;
