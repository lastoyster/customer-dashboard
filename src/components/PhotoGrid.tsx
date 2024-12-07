import { fetchPhotos } from "@/services/PhotoService";
import { Photo } from "@/types/types";
import { useEffect, useState } from "react";

interface PhotoGridProps {
    id?: number;
}

const PhotoGrid = ({ id }: PhotoGridProps) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loadedPhotos, setLoadedPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadPhotos = async () => {
            setLoading(true);
            try {
                const data = await fetchPhotos();
                console.log(data);
                setLoadedPhotos(data);
                // Initialize with first 9 photos if available
                setPhotos(data.slice(0, 9));
            } catch (error) {
                console.error("Error fetching photos:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPhotos();

        const updatePhotos = (photos: Photo[]): Photo[] => {
            if (loadedPhotos.length === 0) return photos;
            // Select 9 random photos from the loadedPhotos array
            const shuffledPhotos = [...loadedPhotos].sort(
                () => 0.5 - Math.random()
            );
            return shuffledPhotos.slice(0, 9);
        };

        const intervalId = setInterval(() => {
            setPhotos((prevPhotos) => updatePhotos(prevPhotos));
        }, 10000); // Update every 10 second

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg font-semibold text-gray-600">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen max-h-[calc(100vh-64px)] overflow-y-auto p-4 mb-18">
            {/* Adjust max-h to account for fixed header/footer if needed */}
            <div className="grid grid-cols-3 gap-4">
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="relative group overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={photo.url}
                            alt={`Photo ${photo.id}`}
                            className="w-full h-40 object-cover transition-opacity duration-300 group-hover:opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoGrid;
