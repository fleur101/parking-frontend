export async function getLocation() {
  if (!navigator.geolocation) {
    return { error: "Geolocation module is not available" };
  }
  // get position

  const getCurrentPositionPromise = new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      maximumAge: 1,
      timeout: 30000
    });
  });
  try {
    const pos = await getCurrentPositionPromise;
    console.log(pos);
    return {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    };
  } catch (error) {
    return { error };
  }
}
