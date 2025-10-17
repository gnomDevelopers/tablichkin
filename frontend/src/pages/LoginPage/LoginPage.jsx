import { useState } from 'react';
import api from '../../api/api';
import * as Validator from '../../pkg/validator'

import SwapperWidget from './widgets/reg-log-swapper';
import Input from '../../lib/customInput';
import Button from '../../lib/customButton';

import loginBg from '../../assets/images/loginPageBg.png';


function LoginPage() {
  const [isLoginSelected, setIsLoginSelected] = useState(true);
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: '',
    registerFio: '',
    registerEmail: '',
    registerPassword: '',
    registerRepeatPassword: ''
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const execAuth = async () => {
    if (isLoginSelected) {
      const valid = validateLoginData(formData.loginEmail, formData.loginPassword);

      console.log(`valid: `, valid);
      if (valid !== '') return; // Вывод сообщения об ошибке
      
      const res = await api.auth.login(formData.loginEmail, formData.loginPassword);
      
      // Logic
      
      return;
    } 
    else {
      const valid = validateRegisterData(formData.registerFio, formData.registerEmail, formData.registerPassword, formData.registerRepeatPassword);
      
      console.log(`valid: `, valid);
      if (valid !== '') return; // Вывод сообщение об ошибке

      const res = await api.auth.register(formData.registerFio, formData.registerEmail, formData.registerPassword);

      // Logic

      return;
    }
  }

  return (
    <div className="flex flex-row w-svw h-svh overflow-hidden items-stretch bg-0">

      <article className='flex flex-col w-1/2 shrink-0 relative overflow-hidden'>

        <img src={loginBg} alt="background" className='h-full w-auto object-cover object-left'/>

        <div className='absolute inset-0 bg-green-900/40'></div>

        <div className="absolute inset-0 backdrop-blur-xs"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-8xl font-bold text-center select-none">Табличкин</h1>
        </div>

      </article>
      <article className='flex flex-col w-1/2 shrink-0 justify-center items-center'>

        <div className='flex flex-col gap-8'>

          <div className='flex flex-col items-center w-full'>
            <h2 className='text-3xl select-none'>Добро пожаловать в Табличкин!</h2>
          </div>

          <div className='mt-2 mb-10'>
            <SwapperWidget selected={isLoginSelected} setSelected={setIsLoginSelected}/>
          </div>

          <div className='flex flex-col items-stretch gap-8'>
              {
                isLoginSelected ? (
                  <div className='flex flex-col gap-6'>
                    <Input 
                      type='text' 
                      title='Электронная почта:' 
                      placeholder='tablichkin@mail.com' 
                      value={formData.loginEmail}
                      updateValue={(value) => updateFormData('loginEmail', value)}
                      />
                    <Input 
                      type='password' 
                      title='Пароль:' 
                      placeholder='your_password' 
                      value={formData.loginPassword}
                      updateValue={(value) => updateFormData('loginPassword', value)}
                      />
                  </div>
                ) : (
                  <div className='flex flex-col gap-6'>
                    <Input 
                      type='text' 
                      title='ФИО:' 
                      placeholder='Иванов Иван Иванович' 
                      value={formData.registerFio}
                      updateValue={(value) => updateFormData('registerFio', value)}
                      />
                    <Input 
                      type='text' 
                      title='Электронная почта:' 
                      placeholder='tablichkin@mail.com' 
                      value={formData.registerEmail}
                      updateValue={(value) => updateFormData('registerEmail', value)}
                      />
                    <Input 
                      type='password' 
                      title='Пароль:' 
                      placeholder='your_password' 
                      value={formData.registerPassword}
                      updateValue={(value) => updateFormData('registerPassword', value)}
                      />
                    <Input 
                      type='password' 
                      title='Повторите пароль:' 
                      placeholder='your_password_again' 
                      value={formData.registerRepeatPassword}
                      updateValue={(value) => updateFormData('registerRepeatPassword', value)}
                      />
                  </div>
                )
              }

            <div className='flex flex-col items-center w-full mt-14'>
              <Button text={isLoginSelected ? "Войти" : "Регистрация"} textSize='text-lg' px='px-14' onClick={() => execAuth()}/>
            </div>
          </div>
        </div>

      </article>
    </div>
  )
}

function validateLoginData(email, password) {
  if (typeof email !== 'string' || typeof password !== 'string') return 'Не все обязательные поля заполнены!';
  
  const emailVal = Validator.ValidUserEmail(email)
  if (emailVal.error !== '') return emailVal.error;
  
  const passwordVal = Validator.ValidUserPassword(password)
  if (passwordVal.error !== '') return passwordVal.error;

  return '';
}

function validateRegisterData(fio, email, password, repeatPassword) {
  if (typeof fio !== 'string' || typeof email !== 'string' || typeof password !== 'string' || typeof repeatPassword !== 'string') return 'Не все обязательные поля заполнены!';
  
  const fioVal = Validator.ValidUserFIO(fio)
  if (fioVal.error !== '') return fioVal.error;
  
  const emailVal = Validator.ValidUserEmail(email)
  if (emailVal.error !== '') return emailVal.error;
  
  const passwordVal = Validator.ValidUserPassword(password)
  if (passwordVal.error !== '') return passwordVal.error;
  
  const passwordRepeatVal = password === repeatPassword;
  if (!passwordRepeatVal) return 'Пароли не совпадают!'

  return '';
}

export default LoginPage;