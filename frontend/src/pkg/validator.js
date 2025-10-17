import { FCapitalize } from "./functions";

//validate userLogin
export function ValidUserLogin(value) {
  if(value.match(/^[a-zA-Z0-9]+$/) === null){
    return {value: '', error: 'Некорректный логин!'};
  }
  if(value.match(/[a-zA-Z]+/) === null){
    return {value: '', error: 'Логин должен содержать латинскую букву!'};
  }
  if(value.length < 4){
    return {value: '', error: 'Логин слишком короткий!'};
  }
  if(value.length > 25){
    return {value: '', error: 'Логин слишком длинный!'}; 
  }
  return {value: value, error: ''};
}

//validate userPassword
export function ValidUserPassword(value) {
  // if(value.match(/^[a-zA-Z0-9-]+$/) === null){
  //   return {value: '', error: 'Incorrect password!'};
  // }
  // if(value.match(/[a-zA-Z]+/) === null){
  //   return {value: '', error: 'Пароль должен содержать латнскую букву!'};
  // }
  // if(value.match(/[a-z]+/) === null){
  //   return {value: '', error: 'Пароль должен содердать прописную букву!'};
  // }
  // if(value.match(/[A-Z]+/) === null){
  //   return {value: '', error: 'Пароль должен содержать заглавную букву!'};
  // }
  // if(value.match(/[0-9]+/) === null){
  //   return {value: '', error: 'Пароль долже содержать цифру!'};
  // }
  // if(value.length < 8){
  if(value.length < 4){
    return {value: '', error: 'Пароль слишком короткий!'};
  }
  if(value.length > 50){
    return {value: '', error: 'Пароль слишком длинный!'};
  }
  return {value: value, error: ''};
}

//validate userEmail
export function ValidUserEmail(value) {
  if(value.toLowerCase().match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) === null){
    return {value: '', error: 'Некорректный адрес электронной почты!'};
  }
  return {value: value, error: ''}
}

//validate userName
export function ValidUserName(value) {
  if(value.match(/^[а-яА-Яa-zA-ZёЁ]+([-'`]{1}[а-яА-Яa-zA-ZёЁ]+)?$/) === null){
    return {value: '', error: 'Некорректное имя!'};
  }
  if(value.length < 2){
    return {value: '', error: 'Имя слишком короткое!'};
  }
  if(value.length > 30){
    return {value: '', error: 'Имя слишком длинное!'};
  }
  return {value: FCapitalize(value.toLowerCase()), error: ''}
}

//validate userSurname
export function ValidUserSurname(value) {
  if(value.match(/^[а-яА-Яa-zA-ZёЁ]+([-'`]{1}[а-яА-Яa-zA-ZёЁ]+)?$/) === null){
    return {value: '', error: 'Некорректная фамилия!'};
  }
  if(value.length < 2){
    return {value: '', error: 'Фамилия слишком короткая!'};
  }
  if(value.length > 30){
    return {value: '', error: 'Фамилия слишком длинная!'};
  }
  return {value: FCapitalize(value.toLowerCase()), error: ''}
}

//validate userThirdname
export function ValidUserThirdname(value) {
  if(value.length === 0){
    return {value: '', error: ''}
  }
  if(value.match(/^[а-яА-Яa-zA-ZёЁ]+([-'`]{1}[а-яА-Яa-zA-ZёЁ]+)?$/) === null){
    return {value: '', error: 'Некорректное отчество!'};
  }
  if(value.length < 2){
    return {value: '', error: 'Отчество слишком короткое!'};
  }
  if(value.length > 30){
    return {value: '', error: 'Отчество слишком длинное!'};
    
  }
  return {value: FCapitalize(value.toLowerCase()), error: ''}
}

export function ValidUserFIO(value){
  if(value.split(' ').length !== 3) return {value: '', error: 'Некорректное ФИО!'};
  const [name, surname, thirdname] = value.split(' ');

  const nameValid = ValidUserName(name);
  const surnameValid = ValidUserSurname(surname);
  const thirdnameValid = ValidUserThirdname(thirdname);

  if(nameValid.error === '' && surnameValid.error === '' && thirdnameValid.error === ''){
    return {value: value, error: ''};
  }

  return {value: '', error: 'Некорректное ФИО!'};
}

