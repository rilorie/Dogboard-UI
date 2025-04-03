export async function getRandomPhotos(setData) {
  const url = "https://dog.ceo/api/breeds/image/random/50";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    setData(json.message);
    //   console.log(json)
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getRandomPhotosByBreed(breed, setData) {
  const url = `https://dog.ceo/api/breed/${breed.toLowerCase()}/images`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    setData(json.message);
    //   console.log(json)
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getRandomSinglePhoto(setData) {
  const url = `https://dog.ceo/api/breeds/image/random`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    setData(json.message);
    //   console.log(json)
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getProfiles() {
  const url = `http://localhost:8080/api/v1/profile`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    // setData(json.message);
    console.log(json)
    return json;
  } catch (error) {
    console.error(error.message);
  }
}