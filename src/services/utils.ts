export function setCookie(
  name: string,
  value: string,
  props: { [key: string]: any } & { expires?: number | Date | string } = {}
) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, "", { expires: -1 });
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([$?*|{}\]\\^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function timeSince(date: Date): string {
  const currentDate = new Date();
  const bufferDate = new Date(date.getTime());
  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  const formatter = new Intl.RelativeTimeFormat("ru", { numeric: "auto" });

  let seconds = Math.floor((currentDate.getTime() - date.getTime()) / 1000);
  let intervalDay = seconds / 86400;

  let timeAgo = null;

  const yyyy = bufferDate.getFullYear();
  const mm = ("0" + (bufferDate.getMonth() + 1)).slice(-2);
  const dd = ("0" + bufferDate.getDate()).slice(-2);
  const today = dd + "." + mm + "." + yyyy;

  if (intervalDay < 7) {
    timeAgo = formatter.format(-1 * Math.floor(intervalDay), "days");
  }

  return `${timeAgo || today}, ${getHoursAndMins(
    bufferDate
  )} i-GMT${getTimeZone()}`;
}

export function getHoursAndMins(date: Date) {
  const mins = ("0" + date.getMinutes()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  return hours + ":" + mins;
}

function getTimeZone(): string {
  const currentTimeZoneOffsetInHours = new Date().getTimezoneOffset() / 60;
  if (currentTimeZoneOffsetInHours > 0) {
    return `-${Math.abs(currentTimeZoneOffsetInHours)}`;
  } else if (currentTimeZoneOffsetInHours < 0) {
    return `+${Math.abs(currentTimeZoneOffsetInHours)}`;
  }
  return currentTimeZoneOffsetInHours.toString();
}
