"use client"
export function getCookie(name) {
  if (typeof document !== 'undefined')
  {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
}

export function checkCookie(name) {
  let cookies = document.cookie
  let tokenExist = cookies.includes(name)
  return tokenExist
}
