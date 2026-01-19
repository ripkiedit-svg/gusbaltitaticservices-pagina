// session.js
// Cookie-based lightweight session for static sites.
// NOTE: this is for convenience (remembering technician). It is NOT strong security.

const SESSION_COOKIE = "techSession";

function setCookie(name, value, hours = 12) {
  const d = new Date();
  d.setTime(d.getTime() + hours * 60 * 60 * 1000);
  document.cookie =
    name + "=" + encodeURIComponent(value) +
    "; expires=" + d.toUTCString() +
    "; path=/; SameSite=Lax";
}

function getCookie(name) {
  const cookies = document.cookie.split(";").map((c) => c.trim());
  for (const c of cookies) {
    if (c.startsWith(name + "=")) {
      return decodeURIComponent(c.substring((name + "=").length));
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie =
    name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax";
}

function setTechSession(sessionObj, hours = 12) {
  setCookie(SESSION_COOKIE, JSON.stringify(sessionObj), hours);
}

function getTechSession() {
  const raw = getCookie(SESSION_COOKIE);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function clearTechSession() {
  deleteCookie(SESSION_COOKIE);
}

function isLogged() {
  const s = getTechSession();
  return !!(s && s.verified && s.tecnico);
}
