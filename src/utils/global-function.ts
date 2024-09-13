import { useUIStore } from "../store/ui";

export function getDateMenuLeft(date: string) {
  const now = new Date();
  const dataDate = new Date(date);

  const substract = now.getTime() - dataDate.getTime();

  const minute = Math.floor(substract / (1000 * 60));

  if (minute > 60) {
    const hours = Math.floor(minute / 60);

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d`;
    }

    return `${hours}h`;
  } else {
    return `${minute}m`;
  }
}

export function displaySuccessToast(message: string) {
  const uiStore = useUIStore.getState();
  uiStore.showToast(message, "failed");
}

export function handlingError(e: any) {
  const uiStore = useUIStore.getState();

  const res = e.response;

  if (res?.data?.message) {
    uiStore.showToast(res?.data?.message, "failed");
  } else {
    uiStore.showToast("Error occured, please try again", "failed");
  }
}
