import { useState } from 'react';
import iconPasswordOff from '../assets/icons/icon_password_off.svg';
import iconPasswordOn from '../assets/icons/icon_password_on.svg';


function Input({type, title='', placeholder='', value, updateValue}){
  const [showPassword, setShowPassword] = useState(false);

  let passwordIcon = type === 'password' ? (
    <PasswordIcon showPassword={showPassword} onTogglePassword={() => setShowPassword(!showPassword)}/>
  ) : (
    <></>
  );

  return (
    <label className='cursor-pointer select-none'>
      {title}
      <div className='custom-input'>
        <input type={type === "password" ? (showPassword ? "text" : "password") : type} placeholder={placeholder} value={value} onChange={(event) => updateValue(event.target.value)}/>

        {passwordIcon}
      </div>
    </label>
  )
}


function PasswordIcon({showPassword, onTogglePassword}){
  let iconSrc = showPassword ? iconPasswordOn : iconPasswordOff;

  return (
    <div className='flex flex-col justify-center h-full' onClick={onTogglePassword}>
      <img src={iconSrc} className='w-7 h-7 select-none'/>
    </div>
  )
}


export default Input;