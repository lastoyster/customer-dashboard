import { photos, URL1 } from "@/utils/constants";

export const fetchPhotos = async () => {
    try {
        const response = await fetch(URL1);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("url not giving phots, returned constants", error);
        return photos;
    }
};

export default fetchPhotos;
